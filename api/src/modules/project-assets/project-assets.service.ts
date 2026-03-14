import { Injectable, NotFoundException, InternalServerErrorException, Logger, BadRequestException, HttpException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateProjectAssetDto } from './dto/create-project-asset.dto';
import { UpdateProjectAssetDto } from './dto/update-project-asset.dto';
import { ProjectAssetQueryDto } from './dto/query-project-asset.dto';
import { DocumentsService } from '../documents/documents.service';
import { VideoGenerationJobData } from './jobs/video-generation.processor';
import { InjectQueue } from '@nestjs/bullmq';
import { VIDEO_GENERATION_JOB, VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { Queue } from 'bullmq';
import { AssetStatus, DocumentType } from '@/generated/prisma';
import { ensureMinDimensions } from '@/shared/utils/images/image-processor.util';
import { transformVariationToImageModelPayload } from '@/integrations/aimlapi/core/config/mappers/image-mapping.config';
import { GenerateImageDto } from './dto/generate-image.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { AimlApiService } from '@/integrations/aimlapi/aimlapi.service';


@Injectable()
export class ProjectAssetsService {
  private readonly logger = new Logger(ProjectAssetsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentsService: DocumentsService,
    private readonly aiHelperService: AiHelperService,
    private readonly aimlApiService: AimlApiService,
    @InjectQueue(VIDEO_GENERATION_QUEUE) private readonly videoQueue: Queue<VideoGenerationJobData>,
  ) { }

  async create(user_uuid: string, createProjectAssetDto: CreateProjectAssetDto) {
    try {

      return {
        status: 'created',
        data: createProjectAssetDto,
      }

    } catch (error) {
      this.logger.error(`Failed to create project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to create project asset', { cause: error });
    }
  }

  async findAll(user_uuid: string, query: ProjectAssetQueryDto) {
    try {
      const { page = 1, limit = 10, ...filterQuery } = query;

      const where: any = {
        user_uuid,
        ...filterQuery,
      };

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.prisma.projectAsset.findMany({
          where,
          include: {
            document: true,
          },
          orderBy: {
            created_at: 'desc',
          },
          skip,
          take: limit,
        }),
        this.prisma.projectAsset.count({ where }),
      ]);

      return {
        data,
        pagination: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve project assets: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve project assets', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const asset = await this.prisma.projectAsset.findFirst({
        where: { uuid, user_uuid },
        include: {
          document: true,
          project: true,
          scene: true,
          scene_variation_video: true,
        },
      });

      if (!asset) {
        throw new NotFoundException(`Project asset with uuid ${uuid} not found`);
      }

      return asset;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to retrieve project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve project asset', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      const asset = await this.findOne(user_uuid, uuid);

      if (!asset.document_uuid) {
        throw new BadRequestException('Document uuid is required');
      }

      await this.documentsService.deleteDocument(asset.document_uuid);

      return await this.prisma.projectAsset.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to delete project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete project asset', { cause: error });
    }
  }

  async createVideo(user_uuid: string, scene_variation_uuid: string) {
    try {

      if (!scene_variation_uuid) {
        throw new BadRequestException('Scene variation uuid is required');
      }

      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid: scene_variation_uuid, user_uuid },
        include: {
          scene: true,
        }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      // await this.documentsService.deleteExistingVideoForVariation(variation.uuid);

      const projectAsset = await this.prisma.projectAsset.upsert({
        where: { scene_variation_uuid: variation.uuid },
        update: {
          status: AssetStatus.PENDING,
          error_message: null,
          provider_job_id: null,
          document_uuid: null,
        },
        create: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          status: AssetStatus.PENDING,
          type: DocumentType.VIDEO,
        }
      });

      await this.videoQueue.add(VIDEO_GENERATION_JOB, {
        projectAssetUuid: projectAsset.uuid,
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: true,
      });

      return projectAsset;

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to trigger video generation', { cause: error });
    }
  }

  async uploadPromptImage(user_uuid: string, uuid: string, file: any) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: {
          prompt_image: true,
          scene: true,
        },
      });

      // 1. Delete old prompt image if it exists
      // await this.removePromptImage(user_uuid, uuid);

      // 2. Upload new image
      const filename = `prompt-image-${uuid}-${Date.now()}`;

      // Ensure minimum dimensions for providers like Kling
      const processedBuffer = await ensureMinDimensions(file.buffer);

      const documentUuid = await this.documentsService.saveImageFromBuffer(
        processedBuffer,
        filename,
        file.mimetype,
      );

      // 3. Create ProjectAsset
      const asset = await this.prisma.projectAsset.create({
        data: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          type: DocumentType.IMAGE,
          status: AssetStatus.COMPLETED,
          document_uuid: documentUuid,
        }
      });

      // 4. Update variation
      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          prompt_image_uuid: asset.uuid,
        },
        include: {
          prompt_image: { include: { document: true } },
        },
      });

      return asset;

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to upload prompt image', { cause: error });
    }
  }

  async removePromptImage(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: { prompt_image: true }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      if (variation.prompt_image) {
        if (variation.prompt_image.document_uuid) {
          await this.documentsService.deleteDocument(variation.prompt_image.document_uuid);
        }
        await this.prisma.projectAsset.delete({
          where: { uuid: variation.prompt_image.uuid }
        });
      }

      return await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          prompt_image_uuid: null,
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to remove prompt image', { cause: error });
    }
  }

  async createImage(user_uuid: string, uuid: string, generateImageDto: GenerateImageDto, file?: any) {
    try {
      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid },
        include: { scene: true }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      // await this.removePromptImage(user_uuid, uuid);

      let temporaryImageUuid: string | undefined;

      if (file) {
        const filename = `temp-ref-image-${uuid}-${Date.now()}`;

        const processedBuffer = await ensureMinDimensions(file.buffer);

        temporaryImageUuid = await this.documentsService.saveImageFromBuffer(
          processedBuffer,
          filename,
          file.mimetype,
        );

        const tempDoc = await this.prisma.document.findUnique({ where: { uuid: temporaryImageUuid } });
        if (tempDoc) {
          if (!generateImageDto.image_urls) generateImageDto.image_urls = [];
          generateImageDto.image_urls.push(tempDoc.url);
        }
      }

      // Create ProjectAsset for generation
      const asset = await this.prisma.projectAsset.create({
        data: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          type: DocumentType.IMAGE,
          status: AssetStatus.PROCESSING,
        }
      });


      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          prompt_image_uuid: asset.uuid,
        }
      });

      // Start the generation process in background
      setImmediate(() => {
        this.generateAndSaveImageBackground(uuid, generateImageDto, temporaryImageUuid).catch((err) => {
          this.logger.error(`Background image generation failed for variation ${uuid}: ${err.message}`);
        });
      });

      return { status: 'generating' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to initiate image generation', { cause: error });
    }
  }

  private async generateAndSaveImageBackground(uuid: string, generateImageDto: GenerateImageDto, temporaryImageUuid?: string) {
    try {

      if (generateImageDto.enrich_prompt) {
        const enrichedPrompt = await this.aiHelperService.enrichImagePrompt({
          prompt_text: generateImageDto.prompt_text,
          ai_model: generateImageDto.ai_model,

        });

        generateImageDto.prompt_text = enrichedPrompt.response;
      }

      const payload = transformVariationToImageModelPayload(generateImageDto, generateImageDto.ai_model);

      const response = await this.aimlApiService.image.create(payload);

      // if (temporaryImageUuid) {
      //   await this.documentsService.deleteDocument(temporaryImageUuid).catch(err =>
      //     this.logger.error(`Failed to delete temporary reference image ${temporaryImageUuid}: ${err.message}`)
      //   );
      // }

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from AIML API');
      }

      const imageUrl = response.data[0].url;
      if (!imageUrl) {
        throw new Error('Image URL is missing in the response');
      }

      const filename = `generated-image-${uuid}-${Date.now()}.png`;
      const documentUuid = await this.documentsService.saveImageFromUrl(imageUrl, filename);

      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid },
        select: { prompt_image_uuid: true }
      });

      if (variation?.prompt_image_uuid) {
        await this.prisma.projectAsset.update({
          where: { uuid: variation.prompt_image_uuid },
          data: {
            document_uuid: documentUuid,
            status: AssetStatus.COMPLETED,
          }
        });
      }

      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          ai_generated: true,
        }
      });

    } catch (err) {
      // Extract detailed error message if it's an HttpException
      let errorMessage = err.message || 'Unknown error occurred during generation';
      if (err instanceof HttpException) {
        const response = err.getResponse();
        if (typeof response === 'object' && response !== null) {
          errorMessage = (response as any).details || (response as any).message || errorMessage;
        }
      }

      this.logger.error(`Background image processing error: ${errorMessage}`);

      if (temporaryImageUuid) {
        await this.documentsService.deleteDocument(temporaryImageUuid).catch(() => { });
      }

      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid },
        select: { prompt_image_uuid: true }
      });

      if (variation?.prompt_image_uuid) {
        await this.prisma.projectAsset.update({
          where: { uuid: variation.prompt_image_uuid },
          data: {
            status: AssetStatus.FAILED,
            error_message: errorMessage,
          }
        });
      }

    }
  }
}

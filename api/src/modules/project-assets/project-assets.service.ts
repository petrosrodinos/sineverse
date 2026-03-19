import { Injectable, NotFoundException, InternalServerErrorException, Logger, BadRequestException, HttpException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateProjectAssetDto, CreateProjectAssetVideoDto, GenerateProjectAssetImageDto } from './dto/create-project-asset.dto';
import { UpdateProjectAssetDto } from './dto/update-project-asset.dto';
import { ProjectAssetQueryDto } from './dto/query-project-asset.dto';
import { DocumentsService } from '../documents/documents.service';
import { VideoGenerationJobData } from './jobs/video-generation.processor';
import { InjectQueue } from '@nestjs/bullmq';
import { VIDEO_GENERATION_JOB, VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { Queue } from 'bullmq';
import { AssetStatus, DocumentType, AssetRole } from '@/generated/prisma';
import { ensureMinDimensions } from '@/shared/utils/images/image-processor.util';
import { transformVariationToImageModelPayload } from '@/integrations/aimlapi/core/config/mappers/image-mapping.config';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { AimlApiService } from '@/integrations/aimlapi/aimlapi.service';
import { EnrichProjectAssetVideoDto } from './dto/enrich-project-asset.dto';


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
      const { page = 1, limit = 10, type, role, selected, ...filterQuery } = query;

      const where: any = {
        user_uuid,
        ...filterQuery,
      };

      if (type) {
        where.type = { in: type.split(',').map((t) => t.trim()) };
      }

      if (role) {
        where.role = { in: role.split(',').map((r) => r.trim()) };
      }

      if (selected !== undefined) {
        where.scene_variation = { selected };
      }

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.prisma.projectAsset.findMany({
          where,
          include: {
            document: true,
            prompt_images: {
              include: {
                document: true,
              }
            }
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
          prompt_images: {
            include: {
              document: true,
            }
          }
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

      if (asset.document_uuid) {
        await this.documentsService.deleteDocument(asset.document_uuid);
        return asset;
      }

      return await this.prisma.projectAsset.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to delete project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete project asset', { cause: error });
    }
  }

  async select(user_uuid: string, uuid: string) {
    try {
      const asset = await this.prisma.projectAsset.findFirst({
        where: { uuid, user_uuid },
      });

      if (!asset) {
        throw new NotFoundException(`Project asset with uuid ${uuid} not found`);
      }

      if (asset.scene_variation_uuid) {
        await this.prisma.projectAsset.updateMany({
          where: {
            scene_variation_uuid: asset.scene_variation_uuid,
            type: asset.type,
            role: asset.role,
            uuid: { not: uuid },
          },
          data: { selected: false },
        });
      }

      return await this.prisma.projectAsset.update({
        where: { uuid },
        data: { selected: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to select project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to select project asset', { cause: error });
    }
  }

  async createVideo(user_uuid: string, scene_variation_uuid: string, dto: CreateProjectAssetVideoDto) {
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

      const { prompt_image_uuids, ...metadata } = dto;
      const projectAsset = await this.prisma.projectAsset.create({
        data: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          status: AssetStatus.PENDING,
          type: DocumentType.VIDEO,
          role: AssetRole.GENERATED_VIDEO,
          metadata: metadata as any,
          prompt_images: prompt_image_uuids ? {
            connect: prompt_image_uuids.map(uuid => ({ uuid }))
          } : undefined
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
        include: { scene: true },
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const filename = `prompt-image-${uuid}-${Date.now()}`;
      const processedBuffer = await ensureMinDimensions(file.buffer);
      const documentUuid = await this.documentsService.saveImageFromBuffer(
        processedBuffer,
        filename,
        file.mimetype,
      );

      const asset = await this.prisma.projectAsset.create({
        data: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          type: DocumentType.IMAGE,
          role: AssetRole.PROMPT_IMAGE,
          status: AssetStatus.COMPLETED,
          document_uuid: documentUuid,
        }
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
        include: { project_assets: { where: { role: AssetRole.PROMPT_IMAGE } } }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const promptImage = variation.project_assets[0];

      if (promptImage) {
        if (promptImage.document_uuid) {
          await this.documentsService.deleteDocument(promptImage.document_uuid);
        }
        await this.prisma.projectAsset.delete({
          where: { uuid: promptImage.uuid }
        });
      }

      return variation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to remove prompt image', { cause: error });
    }
  }

  async createImage(user_uuid: string, uuid: string, generateImageDto: GenerateProjectAssetImageDto, file?: any) {
    try {
      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid },
        include: { scene: true }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

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

      const asset = await this.prisma.projectAsset.create({
        data: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          type: DocumentType.IMAGE,
          role: AssetRole.PROMPT_IMAGE,
          status: AssetStatus.PROCESSING,
        }
      });

      setImmediate(() => {
        this.generateAndSaveImageBackground(uuid, generateImageDto, asset.uuid, temporaryImageUuid).catch((err) => {
          this.logger.error(`Background image generation failed for variation ${uuid}: ${err.message}`);
        });
      });

      return { status: 'generating' };
    } catch (error) {
      this.logger.error(`Failed to initiate image generation for variation ${uuid}: ${error.message}`);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to initiate image generation', { cause: error });
    }
  }

  async enrichProjectAssetVideo(user_uuid: string, uuid: string, enrichProjectAssetDto: EnrichProjectAssetVideoDto) {
    try {
      const { directions, include_prompt, include_negative_prompt, include_video_generation_options } = enrichProjectAssetDto;

      const projectAsset = await this.prisma.projectAsset.findFirst({
        where: { uuid, user_uuid },
        include: {
          project: true,
          scene_variation: true,
          scene: true,
        }
      });

      if (!projectAsset) throw new NotFoundException('Project asset not found');

      const scene = projectAsset.scene;
      const project = projectAsset.project;
      const variation = projectAsset.scene_variation;

      const metadata: any = projectAsset.metadata || {};

      const enrichedData = await this.aiHelperService.enrichSceneVariation({
        original_concept: project.original_concept,
        enriched_concept: project.enriched_concept,
        genres: project.genres as string[],
        tones: project.tones as string[],
        prompt_text: metadata.prompt_text,
        negative_prompt: metadata.negative_prompt,
        project_title: project.title,
        scene_title: scene.title,
        scene_description: scene.description,
        scene_variation_title: variation.title,
        ai_model: metadata.ai_model,
        directions: directions,
        include_prompt,
        include_negative_prompt,
        include_video_generation_options,
      });

      const newProjectAsset = {
        ...metadata,
        ...enrichedData,
      };

      return newProjectAsset;

    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to enrich scene variation', { cause: error });
    }
  }

  private async generateAndSaveImageBackground(uuid: string, generateImageDto: GenerateProjectAssetImageDto, assetUuid: string, temporaryImageUuid?: string) {
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

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from AIML API');
      }

      const imageUrl = response.data[0].url;
      if (!imageUrl) {
        throw new Error('Image URL is missing in the response');
      }

      const filename = `generated-image-${uuid}-${Date.now()}.png`;
      const documentUuid = await this.documentsService.saveImageFromUrl(imageUrl, filename);

      await this.prisma.projectAsset.update({
        where: { uuid: assetUuid },
        data: {
          document_uuid: documentUuid,
          status: AssetStatus.COMPLETED,
        }
      });

      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          ai_generated: true,
        }
      });

    } catch (err) {
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

      await this.prisma.projectAsset.update({
        where: { uuid: assetUuid },
        data: {
          status: AssetStatus.FAILED,
          error_message: errorMessage,
        }
      });
    }
  }
}

import { Injectable, NotFoundException, InternalServerErrorException, Logger, HttpException } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneVariationQueryDto } from './dto/query-scene-variation.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { EnrichSceneVariationDto } from './dto/enrich-scene-variation.dto';
import { DocumentsService } from '../documents/documents.service';
import { AimlApiService } from '@/integrations/aimlapi/aimlapi.service';
import { GenerateImageDto } from './dto/generate-image.dto';
import { MediaStatus } from '@/generated/prisma';
import { ensureMinDimensions } from '@/shared/utils/images/image-processor.util';
import { transformVariationToImageModelPayload } from '@/integrations/aimlapi/core/config/mappers/image-mapping.config';

@Injectable()
export class SceneVariationsService {
  private readonly logger = new Logger(SceneVariationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiHelperService: AiHelperService,
    private readonly documentsService: DocumentsService,
    private readonly aimlApiService: AimlApiService,
  ) { }

  async create(user_uuid: string, createSceneVariationDto: CreateSceneVariationDto) {
    try {
      const scene = await this.prisma.scene.findFirst({ where: { uuid: createSceneVariationDto.scene_uuid, user_uuid } });
      if (!scene) throw new NotFoundException('Scene not found');

      return await this.prisma.sceneVariation.create({
        data: {
          ...createSceneVariationDto,
          ai_model: createSceneVariationDto.ai_model as any,
          user_uuid,
          scene_uuid: scene.uuid,
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create scene variation', { cause: error });
    }
  }

  async findAll(user_uuid: string, query: SceneVariationQueryDto) {
    try {
      const where: any = {
        user_uuid,
        ...(query.scene_uuid && { scene_uuid: query.scene_uuid }),
      };

      return await this.prisma.sceneVariation.findMany({
        where,
        include: {
          scene_video: { include: { video: true } },
          prompt_image: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene variations', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: {
          scene_video: { include: { video: true } },
          prompt_image: true,
        },
      });
      if (!variation) throw new NotFoundException('Scene variation not found');
      return variation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene variation', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateSceneVariationDto: UpdateSceneVariationDto) {
    try {
      const variation = await this.findOne(user_uuid, uuid);

      if (updateSceneVariationDto.selected === true) {
        return await this.prisma.$transaction(async (tx) => {
          // Deselect all other variations of the same scene
          await tx.sceneVariation.updateMany({
            where: {
              scene_uuid: variation.scene_uuid,
              uuid: { not: uuid },
              user_uuid,
            },
            data: { selected: false }
          });

          // Update this variation
          return await tx.sceneVariation.update({
            where: { uuid },
            data: {
              ...updateSceneVariationDto,
              ai_model: updateSceneVariationDto.ai_model as any,
            }
          });
        });
      }

      return await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          ...updateSceneVariationDto,
          ai_model: updateSceneVariationDto.ai_model as any,
        }
      });
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update scene variation', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      await this.documentsService.deleteVariationDocuments(uuid);
      return await this.prisma.sceneVariation.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene variation', { cause: error });
    }
  }

  async duplicate(user_uuid: string, uuid: string) {
    try {
      const variation = await this.findOne(user_uuid, uuid);
      const {
        id,
        uuid: oldUuid,
        created_at,
        updated_at,
        selected,
        scene_video,
        prompt_image,
        ...dataToCopy
      } = variation;

      return await this.prisma.sceneVariation.create({
        data: {
          ...dataToCopy,
          title: `${variation.title} (Copy)`,
          selected: false,
        }
      });
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to duplicate scene variation', { cause: error });
    }
  }

  async enrichSceneVariation(user_uuid: string, uuid: string, enrichSceneVariationDto: EnrichSceneVariationDto) {
    try {
      const { directions, include_prompt, include_negative_prompt, include_video_generation_options } = enrichSceneVariationDto;

      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: {
          scene: {
            include: {
              project: true
            }
          }
        }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const scene = variation.scene;
      const project = scene.project;

      const enrichedData = await this.aiHelperService.enrichSceneVariation({
        original_concept: project.original_concept,
        enriched_concept: project.enriched_concept,
        genres: project.genres as string[],
        tones: project.tones as string[],
        prompt_text: variation.prompt_text,
        negative_prompt: variation.negative_prompt,
        project_title: project.title,
        scene_title: scene.title,
        scene_description: scene.description,
        scene_variation_title: variation.title,
        ai_model: variation.ai_model,
        directions: directions,
        include_prompt,
        include_negative_prompt,
        include_video_generation_options,
      });

      const newVariation = {
        ...variation,
        ...enrichedData,
      };

      return newVariation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to enrich scene variation', { cause: error });
    }
  }

  async uploadPromptImage(user_uuid: string, uuid: string, file: any) {
    try {
      const variation = await this.findOne(user_uuid, uuid);

      // 1. Delete old prompt image if it exists
      if (variation.prompt_image_uuid) {
        await this.documentsService.deleteDocument(variation.prompt_image_uuid);
      }

      // 2. Upload new image
      const filename = `prompt-image-${uuid}-${Date.now()}`;

      // Ensure minimum dimensions for providers like Kling
      const processedBuffer = await ensureMinDimensions(file.buffer);

      const documentUuid = await this.documentsService.saveImageFromBuffer(
        processedBuffer,
        filename,
        file.mimetype,
      );

      // 3. Update variation
      return await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          prompt_image_uuid: documentUuid,
        },
        include: {
          prompt_image: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to upload prompt image', { cause: error });
    }
  }

  async removePromptImage(user_uuid: string, uuid: string) {
    try {
      const variation = await this.findOne(user_uuid, uuid);

      if (variation.prompt_image_uuid) {
        await this.documentsService.deleteDocument(variation.prompt_image_uuid);
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
      const variation = await this.findOne(user_uuid, uuid);

      await this.removePromptImage(user_uuid, uuid);

      let temporaryImageUuid: string | undefined;

      if (file) {
        const filename = `temp-ref-image-${uuid}-${Date.now()}`;

        // Ensure minimum dimensions for providers like Kling
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

      // Merge existing variation settings with generation DTO to ensure style consistency
      const generationParams = {
        ...variation,
        ...generateImageDto,
      };

      // Set variation status to PROCESSING
      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          image_generation_status: MediaStatus.PROCESSING,
          image_generation_error: null
        }
      });

      // Start the generation process in background
      setImmediate(() => {
        this.generateAndSaveImageBackground(uuid, generationParams, temporaryImageUuid).catch((err) => {
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
      const payload = transformVariationToImageModelPayload(generateImageDto, generateImageDto.model);
      const response = await this.aimlApiService.image.create(payload);

      if (temporaryImageUuid) {
        await this.documentsService.deleteDocument(temporaryImageUuid).catch(err =>
          this.logger.error(`Failed to delete temporary reference image ${temporaryImageUuid}: ${err.message}`)
        );
      }

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from AIML API');
      }

      const imageUrl = response.data[0].url;
      if (!imageUrl) {
        throw new Error('Image URL is missing in the response');
      }

      const filename = `generated-image-${uuid}-${Date.now()}.png`;
      const documentUuid = await this.documentsService.saveImageFromUrl(imageUrl, filename);

      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          prompt_image_uuid: documentUuid,
          image_generation_status: MediaStatus.COMPLETED,
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

      await this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          image_generation_status: MediaStatus.FAILED,
          image_generation_error: errorMessage,
        }
      });
    }
  }
}
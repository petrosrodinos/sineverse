import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneVariationQueryDto } from './dto/query-scene-variation.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { EnrichSceneVariationDto } from './dto/enrich-scene-variation.dto';
import { DocumentsService } from '../documents/documents.service';
import { ProjectAssetGenerationConfig } from '../project-assets/interfaces/project-assets.interfaces';
import { AssetRole, AssetStatus, DocumentType } from '@/generated/prisma';

@Injectable()
export class SceneVariationsService {
  private readonly logger = new Logger(SceneVariationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiHelperService: AiHelperService,
    private readonly documentsService: DocumentsService,
  ) { }

  private extractConfig(dto: any): Partial<ProjectAssetGenerationConfig> {
    const config: Partial<ProjectAssetGenerationConfig> = {
      prompt_text: dto.prompt_text,
      negative_prompt: dto.negative_prompt,
      style: dto.style,
      tone: dto.tone,
      genre: dto.genre,
      camera_style: dto.camera_style,
      shot_type: dto.shot_type,
      camera_movement: dto.camera_movement,
      lens_type: dto.lens_type,
      depth_of_field: dto.depth_of_field,
      lighting: dto.lighting,
      color_grade: dto.color_grade,
      time_of_day: dto.time_of_day,
      aspect_ratio: dto.aspect_ratio,
      resolution: dto.resolution,
      fps: dto.fps,
      duration_sec: dto.duration_sec,
      ai_model: dto.ai_model,
      seed: dto.seed,
      creativity: dto.creativity,
      motion_strength: dto.motion_strength,
      guidance_scale: dto.guidance_scale,
      audio_style: dto.audio_style,
      include_sound: dto.include_sound,
    };
    return Object.fromEntries(Object.entries(config).filter(([_, v]) => v !== undefined));
  }

  private mapVariationForFrontend(variation: any) {
    if (!variation) return variation;
    const projectAssets = variation.project_assets || [];

    const videoAsset = projectAssets.find((pa: any) => pa.role === AssetRole.GENERATED_VIDEO);
    const promptImageAsset = projectAssets.find((pa: any) => pa.role === AssetRole.PROMPT_IMAGE);

    const config = videoAsset?.metadata || {};

    const { project_assets, ...rest } = variation;

    return {
      ...rest,
      ...config, // Spread config at the root for frontend compatibility
      video: videoAsset || null,
      prompt_image: promptImageAsset || null,
      project_assets,
    };
  }

  async create(user_uuid: string, createSceneVariationDto: CreateSceneVariationDto) {
    try {
      const scene = await this.prisma.scene.findFirst({ where: { uuid: createSceneVariationDto.scene_uuid, user_uuid } });
      if (!scene) throw new NotFoundException('Scene not found');


      const variation = await this.prisma.sceneVariation.create({
        data: {
          title: createSceneVariationDto.title,
          selected: createSceneVariationDto.selected ?? false,
          user_uuid,
          scene_uuid: scene.uuid,
        }
      });

      return variation;
    } catch (error) {
      this.logger.error(error);
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

      const variations = await this.prisma.sceneVariation.findMany({
        where,
        include: {
          project_assets: { include: { document: true } },
        },
      });

      return variations;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to retrieve scene variations', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: {
          project_assets: { include: { document: true } },
          scene: true,
        },
      });
      if (!variation) throw new NotFoundException('Scene variation not found');
      return variation;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene variation', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateSceneVariationDto: UpdateSceneVariationDto) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: { project_assets: true },
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const variationUpdateData: any = {};
      if (updateSceneVariationDto.title !== undefined) variationUpdateData.title = updateSceneVariationDto.title;
      if (updateSceneVariationDto.selected !== undefined) variationUpdateData.selected = updateSceneVariationDto.selected;

      const performUpdates = async (tx: any) => {
        if (updateSceneVariationDto.selected === true) {
          await tx.sceneVariation.updateMany({
            where: {
              scene_uuid: variation.scene_uuid,
              uuid: { not: uuid },
              user_uuid,
            },
            data: { selected: false }
          });
        }

        if (Object.keys(variationUpdateData).length > 0) {
          await tx.sceneVariation.update({
            where: { uuid },
            data: variationUpdateData,
          });
        }

        return tx.sceneVariation.findUnique({
          where: { uuid },
          include: { project_assets: { include: { document: true } }, scene: true }
        });
      };

      const result = await this.prisma.$transaction(performUpdates);

      return result;

    } catch (error) {
      this.logger.error(error);
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
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: { project_assets: true }
      });
      if (!variation) throw new NotFoundException('Scene variation not found');

      const {
        id,
        uuid: oldUuid,
        created_at,
        updated_at,
        selected,
        ai_generated,
        project_assets,
        ...dataToCopy
      } = variation;

      const oldVideoAsset = project_assets.find(pa => pa.role === AssetRole.GENERATED_VIDEO);
      const metadataToCopy = oldVideoAsset ? (oldVideoAsset.metadata || {}) : {};

      const scene = await this.prisma.scene.findFirst({ where: { uuid: variation.scene_uuid } });

      const newVariation = await this.prisma.sceneVariation.create({
        data: {
          ...dataToCopy,
          title: `${variation.title} (Copy)`,
          selected: false,
          project_assets: {
            create: {
              user_uuid,
              project_uuid: scene?.project_uuid || '',
              type: DocumentType.VIDEO,
              role: AssetRole.GENERATED_VIDEO,
              status: AssetStatus.PENDING,
              metadata: metadataToCopy as any,
            }
          }
        },
        include: {
          project_assets: { include: { document: true } }
        }
      });
      return newVariation;
    } catch (error) {
      this.logger.error(error);
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
          },
          project_assets: true,
        }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const scene = variation.scene;
      const project = scene.project;

      const videoAsset = variation.project_assets.find(pa => pa.role === AssetRole.GENERATED_VIDEO);
      const metadata: any = videoAsset?.metadata || {};

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

      const newVariation = {
        ...variation,
        ...metadata,
        ...enrichedData,
      };

      return newVariation;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to enrich scene variation', { cause: error });
    }
  }
}
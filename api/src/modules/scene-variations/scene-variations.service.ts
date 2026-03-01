import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneVariationQueryDto } from './dto/query-scene-variation.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { EnrichSceneVariationDto } from './dto/enrich-scene-variation.dto';

@Injectable()
export class SceneVariationsService {
  constructor(private readonly prisma: PrismaService, private readonly aiHelperService: AiHelperService) { }

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

      return await this.prisma.sceneVariation.findMany({ where, include: { scene_video: true } });

    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene variations', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({ where: { uuid, user_uuid } });
      if (!variation) throw new NotFoundException('Scene variation not found');
      return variation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene variation', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateSceneVariationDto: UpdateSceneVariationDto) {
    try {
      await this.findOne(user_uuid, uuid);
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
      return await this.prisma.sceneVariation.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene variation', { cause: error });
    }
  }

  async duplicate(user_uuid: string, uuid: string) {
    try {
      const variation = await this.findOne(user_uuid, uuid);
      const { id, uuid: oldUuid, created_at, updated_at, selected, ...dataToCopy } = variation;

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

      console.log(enrichedData)

      return this.prisma.sceneVariation.update({
        where: { uuid },
        data: {
          ...enrichedData,
        }
      });

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to enrich scene variation', { cause: error });
    }
  }
}
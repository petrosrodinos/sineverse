import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneQueryDto } from './dto/query-scene.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { GenerateAiScenesDto } from './dto/generate-ai-scenes.dto';
import { GenerateAiScenesSchemaType } from '@/shared/services/ai-helper/schemas/scene-variation.schema';
import { ReorderScenesDto } from './dto/reorder-scenes.dto';
import { DocumentsService } from '../documents/documents.service';

@Injectable()
export class ScenesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiHelperService: AiHelperService,
    private readonly documentsService: DocumentsService,
  ) { }

  async create(user_uuid: string, createSceneDto: CreateSceneDto) {
    try {

      const scenes = await this.findAll(user_uuid, { project_uuid: createSceneDto.project_uuid });
      const order = scenes.length + 1;

      return await this.prisma.scene.create({ data: { ...createSceneDto, user_uuid, order } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create scene', { cause: error });
    }
  }

  async findAll(user_uuid: string, query?: SceneQueryDto) {
    try {

      const whereClause: any = { user_uuid };

      if (query?.project_uuid) {
        whereClause.project_uuid = query.project_uuid;
      }

      return await this.prisma.scene.findMany({
        where: whereClause,
        include: {
          scene_variations: true
        },
        orderBy: {
          order: 'asc'
        }
      });

    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scenes', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {

      const scene = await this.prisma.scene.findFirst({
        where: { uuid, user_uuid }, include: {
          scene_variations: {
            include: {
              project_assets: true
            }
          }
        }
      });

      if (!scene) throw new NotFoundException('Scene not found');

      return scene;

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateSceneDto: UpdateSceneDto) {
    try {
      return await this.prisma.scene.update({ where: { uuid, user_uuid }, data: updateSceneDto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update scene', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.documentsService.deleteSceneDocuments(uuid);
      return await this.prisma.scene.delete({ where: { uuid, user_uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene', { cause: error });
    }
  }

  async generateAiScenes(user_uuid: string, generateAiScenesDto: GenerateAiScenesDto) {

    try {

      const {
        project_uuid,
        number_of_scenes,
        scene_variations,
        continue_scenes,
        enrich_concept,
        directions,
      } = generateAiScenesDto;

      const project = await this.prisma.project.findUnique({
        where: { user_uuid, uuid: project_uuid }, include: {
          scenes: true
        }
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const config = {
        project_title: project.title,
        original_concept: project.original_concept,
        enriched_concept: project.enriched_concept,
        genres: project.genres as string[],
        tones: project.tones as string[],
        directions,
        number_of_scenes,
        scene_variations,
        continue_scenes,
        enrich_concept,
        scenes: project.scenes.map(scene => ({
          order: scene.order,
          title: scene.title,
          description: scene.description
        }))
      }

      const generatedAiScenes: GenerateAiScenesSchemaType = await this.aiHelperService.generateAiScenes(config);

      if (!generatedAiScenes?.scenes?.length) {
        throw new InternalServerErrorException('Failed to generate ai scenes');
      }

      const newScenes = await this.prisma.$transaction(
        generatedAiScenes.scenes.map(scene =>
          this.prisma.scene.create({
            data: {
              project: { connect: { uuid: project_uuid } },
              user: { connect: { uuid: user_uuid } },
              order: scene.order,
              title: scene.title,
              description: scene.description,
              scene_variations: {
                create: scene.scene_variations.map(({ title, ...variation }) => ({
                  ...variation,
                  title,
                  user: { connect: { uuid: user_uuid } },
                })),
              },
            },
          }),
        ),
      );

      return newScenes;

    } catch (error) {
      throw new InternalServerErrorException('Failed to generate ai scenes', { cause: error });
    }
  }

  async reorder(reorderScenesDto: ReorderScenesDto) {
    try {
      const { scenes } = reorderScenesDto;

      return await this.prisma.$transaction(async (tx) => {
        // Step 1: Displacement to temporary high values to avoid unique constraint conflict
        const offset = 10000;
        for (const scene of scenes) {
          await tx.scene.update({
            where: { uuid: scene.uuid },
            data: { order: scene.order + offset },
          });
        }

        // Step 2: Final update to intended orders
        for (const scene of scenes) {
          await tx.scene.update({
            where: { uuid: scene.uuid },
            data: { order: scene.order },
          });
        }
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to reorder scenes', { cause: error });
    }
  }
}
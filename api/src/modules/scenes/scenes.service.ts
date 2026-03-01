import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneQueryDto } from './dto/query-scene.dto';

@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createSceneDto: CreateSceneDto) {
    try {

      const scenes = await this.findAll(user_uuid);
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
        where: whereClause, include: {
          scene_variations: true
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
              scene_videos: true
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
      return await this.prisma.scene.delete({ where: { uuid, user_uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene', { cause: error });
    }
  }
}
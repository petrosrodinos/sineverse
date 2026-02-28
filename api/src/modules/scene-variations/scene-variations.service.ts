import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class SceneVariationsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createSceneVariationDto: CreateSceneVariationDto) {
    try {
      const scene = await this.prisma.scene.findFirst({ where: { uuid: createSceneVariationDto.scene_uuid, project: { user_uuid } } });
      if (!scene) throw new NotFoundException('Scene not found');

      return await this.prisma.sceneVariation.create({
        data: {
          ...createSceneVariationDto,
          ai_model: createSceneVariationDto.ai_model as any,
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create scene variation', { cause: error });
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.sceneVariation.findMany({ where: { scene: { project: { user_uuid } } } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene variations', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({ where: { uuid, scene: { project: { user_uuid } } } });
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
}
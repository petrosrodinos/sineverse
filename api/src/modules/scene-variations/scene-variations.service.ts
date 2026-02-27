import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class SceneVariationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSceneVariationDto: CreateSceneVariationDto) {
    try {
      return await this.prisma.sceneVariation.create({ 
        data: {
          ...createSceneVariationDto,
          ai_model: createSceneVariationDto.ai_model as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create scene variation', { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prisma.sceneVariation.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene variations', { cause: error });
    }
  }

  async findOne(uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findUnique({ where: { uuid } });
      if (!variation) throw new NotFoundException('Scene variation not found');
      return variation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene variation', { cause: error });
    }
  }

  async update(uuid: string, updateSceneVariationDto: UpdateSceneVariationDto) {
    try {
      return await this.prisma.sceneVariation.update({ 
        where: { uuid }, 
        data: {
          ...updateSceneVariationDto,
          ai_model: updateSceneVariationDto.ai_model as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update scene variation', { cause: error });
    }
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.sceneVariation.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene variation', { cause: error });
    }
  }
}
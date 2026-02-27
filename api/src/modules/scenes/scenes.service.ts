import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSceneDto: CreateSceneDto) {
    try {
      return await this.prisma.scene.create({ data: createSceneDto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create scene', { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prisma.scene.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scenes', { cause: error });
    }
  }

  async findOne(uuid: string) {
    try {
      const scene = await this.prisma.scene.findUnique({ where: { uuid } });
      if (!scene) throw new NotFoundException('Scene not found');
      return scene;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene', { cause: error });
    }
  }

  async update(uuid: string, updateSceneDto: UpdateSceneDto) {
    try {
      return await this.prisma.scene.update({ where: { uuid }, data: updateSceneDto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update scene', { cause: error });
    }
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.scene.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene', { cause: error });
    }
  }
}
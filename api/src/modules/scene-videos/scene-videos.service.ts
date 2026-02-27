import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class SceneVideosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSceneVideoDto: CreateSceneVideoDto) {
    try {
      return await this.prisma.sceneVideo.create({ 
        data: {
          ...createSceneVideoDto,
          status: createSceneVideoDto.status as any,
          provider: createSceneVideoDto.provider as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create scene video', { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prisma.sceneVideo.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene videos', { cause: error });
    }
  }

  async findOne(uuid: string) {
    try {
      const video = await this.prisma.sceneVideo.findUnique({ where: { uuid } });
      if (!video) throw new NotFoundException('Scene video not found');
      return video;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene video', { cause: error });
    }
  }

  async update(uuid: string, updateSceneVideoDto: UpdateSceneVideoDto) {
    try {
      return await this.prisma.sceneVideo.update({ 
        where: { uuid }, 
        data: {
          ...updateSceneVideoDto,
          status: updateSceneVideoDto.status as any,
          provider: updateSceneVideoDto.provider as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update scene video', { cause: error });
    }
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.sceneVideo.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene video', { cause: error });
    }
  }
}
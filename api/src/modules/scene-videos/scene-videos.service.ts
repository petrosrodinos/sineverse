import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VIDEO_GENERATION_QUEUE, VIDEO_GENERATION_JOB } from './queues/video.constants';
import { VideoStatus } from '@/generated/prisma';

@Injectable()
export class SceneVideosService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue(VIDEO_GENERATION_QUEUE) private readonly videoQueue: Queue,
  ) { }

  async create(user_uuid: string, createSceneVideoDto: CreateSceneVideoDto) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid: createSceneVideoDto.scene_variation_uuid, user_uuid }
      });
      if (!variation) throw new NotFoundException('Scene variation not found');

      const sceneVideo = await this.prisma.sceneVideo.create({
        data: {
          user_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          status: VideoStatus.PENDING,
        }
      });

      await this.videoQueue.add(VIDEO_GENERATION_JOB, {
        sceneVideoUuid: sceneVideo.uuid,
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: true,
      });

      return {
        status: 'started',
        provider_job_id: sceneVideo.uuid,
        data: sceneVideo,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to trigger video generation', { cause: error });
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.sceneVideo.findMany({ where: { user_uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve scene videos', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const video = await this.prisma.sceneVideo.findFirst({ where: { uuid, user_uuid } });
      if (!video) throw new NotFoundException('Scene video not found');
      return video;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scene video', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateSceneVideoDto: UpdateSceneVideoDto) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.sceneVideo.update({
        where: { uuid },
        data: {
          ...updateSceneVideoDto,
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update scene video', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.sceneVideo.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete scene video', { cause: error });
    }
  }
}
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import axios from 'axios';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';
import { FinalProjectQueryDto } from './dto/query-final-project.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { FINAL_RENDER_QUEUE, FINAL_RENDER_JOB, FinalProjectRenderStatus } from './render/render.constants';
import type { FinalRenderJobData } from './render/render.processor';

@Injectable()
export class FinalProjectsService {
  private readonly logger = new Logger(FinalProjectsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue(FINAL_RENDER_QUEUE) private readonly finalRenderQueue: Queue,
  ) {}

  async create(user_uuid: string, createFinalProjectDto: CreateFinalProjectDto) {
    try {
      const project = await this.prisma.project.findFirst({
        where: { uuid: createFinalProjectDto.project_uuid, user_uuid },
      });
      if (!project) throw new NotFoundException('Project not found');

      return await this.prisma.finalProject.create({
        data: { ...createFinalProjectDto, user_uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create final project', { cause: error });
    }
  }

  async findAll(user_uuid: string, query?: FinalProjectQueryDto) {
    try {
      const where: Record<string, unknown> = { user_uuid };
      if (query?.project_uuid) {
        where.project_uuid = query.project_uuid;
      }
      return await this.prisma.finalProject.findMany({
        where,
        orderBy: { created_at: 'desc' },
        include: { video: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve final projects', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const finalProject = await this.prisma.finalProject.findFirst({
        where: { uuid, user_uuid },
        include: {
          video: true,
          timeline_clips: {
            include: { transition_in: true, transition_out: true, captions: true },
            orderBy: { start_sec: 'asc' },
          },
        },
      });
      if (!finalProject) throw new NotFoundException('Final project not found');
      return finalProject;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve final project', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateFinalProjectDto: UpdateFinalProjectDto) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.finalProject.update({ where: { uuid }, data: updateFinalProjectDto });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update final project', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.finalProject.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete final project', { cause: error });
    }
  }

  async startRender(user_uuid: string, uuid: string) {
    try {
      this.logger.log(
        `Start render requested for finalProject=${uuid} by user=${user_uuid}`,
      );

      const finalProject = await this.findOne(user_uuid, uuid);

      if (finalProject.render_status === FinalProjectRenderStatus.RENDERING) {
        throw new ConflictException('A render is already in progress for this project');
      }

      try {
        const client = await this.finalRenderQueue.client;
        await client.ping();
      } catch (error) {
        const details =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message?: unknown }).message ?? 'Unknown queue connection error')
            : 'Unknown queue connection error';
        this.logger.error(
          `Render queue unavailable for finalProject=${uuid}: ${details}`,
        );
        throw new ServiceUnavailableException(
          'Render queue is unavailable. Verify Redis is running and REDIS_URL is valid.',
        );
      }

      await this.prisma.finalProject.update({
        where: { uuid },
        data: { render_status: FinalProjectRenderStatus.RENDERING },
      });

      const jobData: FinalRenderJobData = { finalProjectUuid: uuid };
      const job = await this.finalRenderQueue.add(FINAL_RENDER_JOB, jobData);

      this.logger.log(
        `Render job queued for finalProject=${uuid} jobId=${job.id}`,
      );

      return { message: 'Render queued successfully' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) throw error;
      if (error instanceof ServiceUnavailableException) throw error;
      const details =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message ?? 'Unknown error')
          : 'Unknown error';
      const stack =
        error && typeof error === 'object' && 'stack' in error
          ? String((error as { stack?: unknown }).stack ?? '')
          : undefined;
      this.logger.error(
        `Failed to start render for finalProject=${uuid}: ${details}`,
        stack,
      );
      throw new InternalServerErrorException('Failed to start render', { cause: error });
    }
  }

  async downloadVideo(user_uuid: string, uuid: string): Promise<{
    buffer: Buffer;
    filename: string;
    mimetype: string;
  }> {
    try {
      const finalProject = await this.findOne(user_uuid, uuid);
      if (!finalProject.video?.url) {
        throw new NotFoundException('Rendered video not found for this project');
      }
      const response = await axios.get<ArrayBuffer>(finalProject.video.url, {
        responseType: 'arraybuffer',
      });
      const filename = finalProject.video.filename || `estate-render-${uuid}.mp4`;
      const mimetype = finalProject.video.mimetype || 'video/mp4';
      return {
        buffer: Buffer.from(response.data),
        filename,
        mimetype,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to download rendered video', {
        cause: error,
      });
    }
  }
}

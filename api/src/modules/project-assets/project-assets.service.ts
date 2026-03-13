import { Injectable, NotFoundException, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateProjectAssetDto } from './dto/create-project-asset.dto';
import { UpdateProjectAssetDto } from './dto/update-project-asset.dto';
import { ProjectAssetQueryDto } from './dto/query-project-asset.dto';
import { DocumentsService } from '../documents/documents.service';
import { VideoGenerationJobData } from './jobs/video-generation.processor';
import { InjectQueue } from '@nestjs/bullmq';
import { VIDEO_GENERATION_JOB, VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { Queue } from 'bullmq';
import { AssetStatus, DocumentType } from '@/generated/prisma';

@Injectable()
export class ProjectAssetsService {
  private readonly logger = new Logger(ProjectAssetsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentsService: DocumentsService,
    @InjectQueue(VIDEO_GENERATION_QUEUE) private readonly videoQueue: Queue<VideoGenerationJobData>,
  ) { }

  async create(user_uuid: string, createProjectAssetDto: CreateProjectAssetDto) {
    try {

      return await this.prisma.projectAsset.create({
        data: {
          ...createProjectAssetDto,
          user_uuid,
        }
      });
    } catch (error) {
      this.logger.error(`Failed to create project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to create project asset', { cause: error });
    }
  }

  async findAll(user_uuid: string, query: ProjectAssetQueryDto) {
    try {
      const where: any = {
        user_uuid,
        ...query,
      };

      return await this.prisma.projectAsset.findMany({
        where,
        include: {
          document: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (error) {
      this.logger.error(`Failed to retrieve project assets: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve project assets', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const asset = await this.prisma.projectAsset.findFirst({
        where: { uuid, user_uuid },
        include: {
          document: true,
          project: true,
          scene: true,
          scene_variation_video: true,
        },
      });

      if (!asset) {
        throw new NotFoundException(`Project asset with uuid ${uuid} not found`);
      }

      return asset;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to retrieve project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve project asset', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateProjectAssetDto: UpdateProjectAssetDto) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.projectAsset.update({
        where: { uuid },
        data: updateProjectAssetDto,
        include: {
          document: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to update project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to update project asset', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      const asset = await this.findOne(user_uuid, uuid);

      // Note: If we want to delete the physical file as well, 
      // we would use DocumentsService here. 
      // For now, let's keep it simple as per schema cascade logic or manual management.

      return await this.prisma.projectAsset.delete({
        where: { uuid },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Failed to delete project asset: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete project asset', { cause: error });
    }
  }

  async createVideo(user_uuid: string, scene_variation_uuid: string) {
    try {

      if (!scene_variation_uuid) {
        throw new BadRequestException('Scene variation uuid is required');
      }

      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid: scene_variation_uuid, user_uuid },
        include: {
          scene: true,
        }
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      // await this.documentsService.deleteExistingVideoForVariation(variation.uuid);

      const projectAsset = await this.prisma.projectAsset.upsert({
        where: { scene_variation_uuid: variation.uuid },
        update: {
          status: AssetStatus.PENDING,
          error_message: null,
          provider_job_id: null,
          document_uuid: null,
        },
        create: {
          user_uuid,
          project_uuid: variation.scene.project_uuid,
          scene_uuid: variation.scene_uuid,
          scene_variation_uuid: variation.uuid,
          status: AssetStatus.PENDING,
          type: DocumentType.VIDEO,
        }
      });

      await this.videoQueue.add(VIDEO_GENERATION_JOB, {
        projectAssetUuid: projectAsset.uuid,
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
        provider_job_id: projectAsset.uuid,
        data: projectAsset,
      };

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to trigger video generation', { cause: error });
    }
  }
}

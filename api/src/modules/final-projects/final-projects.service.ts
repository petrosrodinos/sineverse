import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';
import { FinalProjectQueryDto } from './dto/query-final-project.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class FinalProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user_uuid: string,
    createFinalProjectDto: CreateFinalProjectDto,
  ) {
    try {
      const project = await this.prisma.project.findFirst({
        where: { uuid: createFinalProjectDto.project_uuid, user_uuid },
      });
      if (!project) throw new NotFoundException('Project not found');

      return await this.prisma.finalProject.create({
        data: {
          ...createFinalProjectDto,
          user_uuid,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create final project', {
        cause: error,
      });
    }
  }

  async findAll(user_uuid: string, query?: FinalProjectQueryDto) {
    try {
      const where: Record<string, unknown> = { user_uuid };
      if (query?.project_uuid) {
        where.project_uuid = query.project_uuid;
      }
      return await this.prisma.finalProject.findMany({ where, orderBy: { created_at: 'desc' } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve final projects',
        { cause: error },
      );
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const finalProject = await this.prisma.finalProject.findFirst({
        where: { uuid, user_uuid },
        include: {
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
      throw new InternalServerErrorException(
        'Failed to retrieve final project',
        { cause: error },
      );
    }
  }

  async update(
    user_uuid: string,
    uuid: string,
    updateFinalProjectDto: UpdateFinalProjectDto,
  ) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.finalProject.update({
        where: { uuid },
        data: updateFinalProjectDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update final project', {
        cause: error,
      });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.finalProject.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete final project', {
        cause: error,
      });
    }
  }
}

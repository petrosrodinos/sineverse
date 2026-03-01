import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user_uuid: string, createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({
        data: {
          ...createProjectDto,
          user: {
            connect: {
              uuid: user_uuid,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create project', { cause: error });
    }
  }

  async findAll(user_uuid: string) {
    try {
      return await this.prisma.project.findMany({ where: { user_uuid }, orderBy: { created_at: 'desc' } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects', { cause: error });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const project = await this.prisma.project.findFirst({ where: { uuid, user_uuid } });
      if (!project) throw new NotFoundException('Project not found');
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve project', { cause: error });
    }
  }

  async update(user_uuid: string, uuid: string, updateProjectDto: UpdateProjectDto) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.project.update({
        where: { uuid },
        data: {
          ...updateProjectDto,
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project', { cause: error });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      return await this.prisma.project.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete project', { cause: error });
    }
  }
}
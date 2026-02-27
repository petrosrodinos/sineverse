import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({ 
        data: {
          ...createProjectDto,
          status: createProjectDto.status as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project', { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prisma.project.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects', { cause: error });
    }
  }

  async findOne(uuid: string) {
    try {
      const project = await this.prisma.project.findUnique({ where: { uuid } });
      if (!project) throw new NotFoundException('Project not found');
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve project', { cause: error });
    }
  }

  async update(uuid: string, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({ 
        where: { uuid }, 
        data: {
          ...updateProjectDto,
          status: updateProjectDto.status as any,
        } 
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project', { cause: error });
    }
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.project.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete project', { cause: error });
    }
  }
}
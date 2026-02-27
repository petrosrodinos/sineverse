import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class FinalProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinalProjectDto: CreateFinalProjectDto) {
    try {
      return await this.prisma.finalProject.create({ data: createFinalProjectDto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create final project', { cause: error });
    }
  }

  async findAll() {
    try {
      return await this.prisma.finalProject.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve final projects', { cause: error });
    }
  }

  async findOne(uuid: string) {
    try {
      const finalProject = await this.prisma.finalProject.findUnique({ where: { uuid } });
      if (!finalProject) throw new NotFoundException('Final project not found');
      return finalProject;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve final project', { cause: error });
    }
  }

  async update(uuid: string, updateFinalProjectDto: UpdateFinalProjectDto) {
    try {
      return await this.prisma.finalProject.update({ where: { uuid }, data: updateFinalProjectDto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update final project', { cause: error });
    }
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.finalProject.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete final project', { cause: error });
    }
  }
}
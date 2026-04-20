import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateTimelineTransitionDto } from './dto/create-timeline-transition.dto';
import { UpdateTimelineTransitionDto } from './dto/update-timeline-transition.dto';

@Injectable()
export class TimelineTransitionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimelineTransitionDto) {
    try {
      return await this.prisma.timelineTransition.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create transition', {
        cause: error,
      });
    }
  }

  async findOne(uuid: string) {
    try {
      const transition = await this.prisma.timelineTransition.findUnique({
        where: { uuid },
      });

      if (!transition) throw new NotFoundException('Transition not found');

      return transition;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to retrieve transition', {
        cause: error,
      });
    }
  }

  async update(uuid: string, dto: UpdateTimelineTransitionDto) {
    try {
      await this.findOne(uuid);

      return await this.prisma.timelineTransition.update({
        where: { uuid },
        data: dto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to update transition', {
        cause: error,
      });
    }
  }

  async remove(uuid: string) {
    try {
      await this.findOne(uuid);

      return await this.prisma.timelineTransition.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to delete transition', {
        cause: error,
      });
    }
  }
}

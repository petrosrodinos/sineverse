import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateTimelineCaptionDto } from './dto/create-timeline-caption.dto';
import { UpdateTimelineCaptionDto } from './dto/update-timeline-caption.dto';
import { TimelineCaptionQueryDto } from './dto/query-timeline-caption.dto';

@Injectable()
export class TimelineCaptionsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertClipOwnership(user_uuid: string, clip_uuid: string) {
    const clip = await this.prisma.timelineClip.findUnique({
      where: { uuid: clip_uuid },
      include: { final_project: true },
    });

    if (!clip || clip.final_project.user_uuid !== user_uuid) {
      throw new NotFoundException('Timeline clip not found');
    }

    return clip;
  }

  async create(user_uuid: string, dto: CreateTimelineCaptionDto) {
    try {
      await this.assertClipOwnership(user_uuid, dto.clip_uuid);

      return await this.prisma.timelineCaption.create({ data: dto });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to create caption', {
        cause: error,
      });
    }
  }

  async findAll(user_uuid: string, query: TimelineCaptionQueryDto) {
    try {
      await this.assertClipOwnership(user_uuid, query.clip_uuid);

      return await this.prisma.timelineCaption.findMany({
        where: { clip_uuid: query.clip_uuid },
        orderBy: { start_sec: 'asc' },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to retrieve captions', {
        cause: error,
      });
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const caption = await this.prisma.timelineCaption.findUnique({
        where: { uuid },
      });

      if (!caption) throw new NotFoundException('Caption not found');

      await this.assertClipOwnership(user_uuid, caption.clip_uuid);

      return caption;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to retrieve caption', {
        cause: error,
      });
    }
  }

  async update(user_uuid: string, uuid: string, dto: UpdateTimelineCaptionDto) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.timelineCaption.update({
        where: { uuid },
        data: dto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to update caption', {
        cause: error,
      });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.timelineCaption.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to delete caption', {
        cause: error,
      });
    }
  }
}

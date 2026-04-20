import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateTimelineClipDto } from './dto/create-timeline-clip.dto';
import { UpdateTimelineClipDto } from './dto/update-timeline-clip.dto';
import { TimelineClipQueryDto } from './dto/query-timeline-clip.dto';

@Injectable()
export class TimelineClipsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertFinalProjectOwnership(
    user_uuid: string,
    final_project_uuid: string,
  ) {
    const fp = await this.prisma.finalProject.findFirst({
      where: { uuid: final_project_uuid, user_uuid },
    });

    if (!fp) throw new NotFoundException('Final project not found');

    return fp;
  }

  async create(user_uuid: string, dto: CreateTimelineClipDto) {
    try {
      await this.assertFinalProjectOwnership(user_uuid, dto.final_project_uuid);

      return await this.prisma.timelineClip.create({
        data: {
          project_uuid: dto.project_uuid,
          final_project_uuid: dto.final_project_uuid,
          project_asset_uuid: dto.project_asset_uuid,
          start_sec: dto.start_sec,
          end_sec: dto.end_sec,
          trim_start: dto.trim_start,
          trim_end: dto.trim_end,
          volume: dto.volume ?? 1.0,
          speed: dto.speed ?? 1.0,
        },
        include: { transition_in: true, transition_out: true, captions: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to create timeline clip', {
        cause: error,
      });
    }
  }

  async findAll(user_uuid: string, query: TimelineClipQueryDto) {
    try {
      await this.assertFinalProjectOwnership(
        user_uuid,
        query.final_project_uuid,
      );

      const where: Record<string, unknown> = {
        final_project_uuid: query.final_project_uuid,
      };

      if (query.project_asset_uuid) {
        where.project_asset_uuid = query.project_asset_uuid;
      }

      return await this.prisma.timelineClip.findMany({
        where,
        include: { transition_in: true, transition_out: true, captions: true },
        orderBy: { start_sec: 'asc' },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Failed to retrieve timeline clips',
        { cause: error },
      );
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const clip = await this.prisma.timelineClip.findUnique({
        where: { uuid },
        include: { transition_in: true, transition_out: true, captions: true },
      });

      if (!clip) throw new NotFoundException('Timeline clip not found');

      await this.assertFinalProjectOwnership(
        user_uuid,
        clip.final_project_uuid,
      );

      return clip;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      )
        throw error;

      throw new InternalServerErrorException(
        'Failed to retrieve timeline clip',
        { cause: error },
      );
    }
  }

  async update(user_uuid: string, uuid: string, dto: UpdateTimelineClipDto) {
    try {
      const clip = await this.findOne(user_uuid, uuid);

      const { transition_out_type, transition_out_duration, ...clipFields } =
        dto;

      let transition_out_uuid = clip.transition_out_uuid;

      if (transition_out_type !== undefined) {
        const duration = transition_out_duration ?? 0.5;

        if (clip.transition_out_uuid) {
          await this.prisma.timelineTransition.update({
            where: { uuid: clip.transition_out_uuid },
            data: { type: transition_out_type, duration },
          });
        } else {
          const created = await this.prisma.timelineTransition.create({
            data: { type: transition_out_type, duration },
          });

          transition_out_uuid = created.uuid;
        }
      }

      return await this.prisma.timelineClip.update({
        where: { uuid },
        data: { ...clipFields, transition_out_uuid },
        include: { transition_in: true, transition_out: true, captions: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to update timeline clip', {
        cause: error,
      });
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);

      return await this.prisma.timelineClip.delete({ where: { uuid } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to delete timeline clip', {
        cause: error,
      });
    }
  }
}

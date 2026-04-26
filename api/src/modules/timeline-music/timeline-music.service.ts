import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { TimelineMusicQueryDto } from './dto/query-timeline-music.dto';
import { UpsertTimelineMusicDto } from './dto/upsert-timeline-music.dto';
import {
  getEstateAudioTrackById,
  getEstateAudioTrackUrl,
} from './utils/estate-audio-tracks.utils';

@Injectable()
export class TimelineMusicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private async assertFinalProjectOwnership(
    user_uuid: string,
    final_project_uuid: string,
  ) {
    const finalProject = await this.prisma.finalProject.findFirst({
      where: { uuid: final_project_uuid, user_uuid },
    });

    if (!finalProject) {
      throw new NotFoundException('Final project not found');
    }

    return finalProject;
  }

  private async ensureAudioDocument(track_id: string) {
    const track = getEstateAudioTrackById(track_id);

    if (!track) {
      throw new BadRequestException('Invalid estate audio track');
    }

    const path = getEstateAudioTrackUrl(track);
    const url = this.resolveAudioUrl(path);

    const existing = await this.prisma.document.findFirst({
      where: { url, mimetype: track.mimetype },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.document.create({
      data: {
        filename: track.filename,
        mimetype: track.mimetype,
        size: 0,
        url,
        path: url,
      },
    });
  }

  private resolveAudioUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const baseUrl = this.configService.get<string>('APP_URL');

    if (!baseUrl) {
      return path;
    }

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${normalizedBaseUrl}${normalizedPath}`;
  }

  async findAll(user_uuid: string, query: TimelineMusicQueryDto) {
    try {
      await this.assertFinalProjectOwnership(
        user_uuid,
        query.final_project_uuid,
      );

      return this.prisma.timelineMusic.findMany({
        where: { final_project_uuid: query.final_project_uuid },
        include: { audio: true },
        orderBy: { created_at: 'asc' },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Failed to retrieve timeline music',
        { cause: error },
      );
    }
  }

  async upsertForFinalProject(
    user_uuid: string,
    final_project_uuid: string,
    dto: UpsertTimelineMusicDto,
  ) {
    try {
      await this.assertFinalProjectOwnership(user_uuid, final_project_uuid);

      if (dto.track_id === 'none') {
        await this.prisma.timelineMusic.deleteMany({
          where: { final_project_uuid },
        });

        return null;
      }

      const audioDocument = await this.ensureAudioDocument(dto.track_id);

      const existing = await this.prisma.timelineMusic.findFirst({
        where: { final_project_uuid },
        orderBy: { created_at: 'asc' },
      });

      const start_sec = dto.start_sec ?? 0;

      const end_sec = dto.end_sec ?? 4;

      const volume = dto.volume ?? 1;

      if (existing) {
        return this.prisma.timelineMusic.update({
          where: { uuid: existing.uuid },
          data: {
            audio_uuid: audioDocument.uuid,
            start_sec,
            end_sec,
            volume,
          },
          include: { audio: true },
        });
      }

      return this.prisma.timelineMusic.create({
        data: {
          final_project_uuid,
          audio_uuid: audioDocument.uuid,
          start_sec,
          end_sec,
          volume,
        },
        include: { audio: true },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to save timeline music', {
        cause: error,
      });
    }
  }
}

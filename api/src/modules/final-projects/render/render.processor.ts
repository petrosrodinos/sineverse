import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { DocumentsService } from '@/modules/documents/documents.service';
import { RenderService } from './render.service';
import {
  FINAL_RENDER_QUEUE,
  FinalProjectRenderStatus,
} from './render.constants';
import { COMPOSITION_FPS } from './render.types';
import type {
  ClipData,
  MusicData,
  FinalProjectCompositionProps,
} from './render.types';

export interface FinalRenderJobData {
  finalProjectUuid: string;
}

@Processor(FINAL_RENDER_QUEUE)
export class RenderProcessor extends WorkerHost {
  private readonly logger = new Logger(RenderProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly renderService: RenderService,
    private readonly documentsService: DocumentsService,
  ) {
    super();
  }

  async process(job: Job<FinalRenderJobData>): Promise<void> {
    const { finalProjectUuid } = job.data;
    const renderAttemptId = Date.now();

    try {
      await this.prisma.finalProject.update({
        where: { uuid: finalProjectUuid },
        data: { render_status: FinalProjectRenderStatus.RENDERING },
      });

      const finalProject = await this.prisma.finalProject.findUnique({
        where: { uuid: finalProjectUuid },
        include: {
          timeline_clips: {
            orderBy: { start_sec: 'asc' },
            include: {
              project_asset: { include: { document: true } },
              transition_out: true,
              captions: true,
            },
          },
          timeline_music: {
            include: { audio: true },
            take: 1,
            orderBy: { created_at: 'asc' },
          },
        },
      });

      if (!finalProject) {
        throw new Error(`FinalProject ${finalProjectUuid} not found`);
      }

      const inputProps = this.buildCompositionProps(finalProject);

      if (inputProps.clips.length === 0) {
        throw new Error(
          'No renderable clips found — ensure all videos have been generated',
        );
      }

      const videoBuffer = await this.renderService.render(inputProps);

      const filename = `final-render-${finalProjectUuid}-${Date.now()}.mp4`;

      const videoUuid = await this.documentsService.saveVideoFromBuffer(
        videoBuffer,
        filename,
      );

      await this.prisma.finalProject.update({
        where: { uuid: finalProjectUuid },
        data: {
          video_uuid: videoUuid,
          render_status: FinalProjectRenderStatus.COMPLETED,
          metadata: {
            final_project_uuid: finalProjectUuid,
            status: FinalProjectRenderStatus.COMPLETED,
            attempt_id: renderAttemptId,
            created_at: new Date().toISOString(),
            video_uuid: videoUuid,
          },
        },
      });
    } catch (error: any) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message ?? 'Render failed')
          : 'Render failed';
      const errorStack =
        error && typeof error === 'object' && 'stack' in error
          ? String((error as { stack?: unknown }).stack ?? '')
          : undefined;
      const errorName =
        error && typeof error === 'object' && 'name' in error
          ? String((error as { name?: unknown }).name ?? '')
          : undefined;

      this.logger.error(
        `Render failed for ${finalProjectUuid}: ${errorMessage}`,
        errorStack,
      );

      await this.prisma.finalProject
        .update({
          where: { uuid: finalProjectUuid },
          data: {
            render_status: FinalProjectRenderStatus.FAILED,
            metadata: {
              final_project_uuid: finalProjectUuid,
              status: FinalProjectRenderStatus.FAILED,
              attempt_id: renderAttemptId,
              created_at: new Date().toISOString(),
              error: {
                message: errorMessage,
                name: errorName,
                stack: errorStack,
              },
            },
          },
        })
        .catch(() => {});

      throw error;
    }
  }

  private buildCompositionProps(
    finalProject: any,
  ): FinalProjectCompositionProps {
    let currentFrame = 0;

    const clips: ClipData[] = [];

    for (const clip of finalProject.timeline_clips) {
      const videoUrl: string | undefined = clip.project_asset?.document?.url;

      if (!videoUrl) continue;

      const trimStart = clip.trim_start ?? 0;

      const trimEnd = clip.trim_end ?? 4;

      const speed = Math.max(clip.speed ?? 1.0, 0.1);

      const volume = clip.volume ?? 1.0;

      const sourceDuration = Math.max(trimEnd - trimStart, 0.1);

      const clipDurationFrames = Math.max(
        Math.round((sourceDuration / speed) * COMPOSITION_FPS),
        1,
      );

      const transitionType = clip.transition_out?.type ?? 'FADE';

      const transitionDurationFrames = Math.max(
        Math.round((clip.transition_out?.duration ?? 0.5) * COMPOSITION_FPS),
        1,
      );

      const captions = (clip.captions ?? [])
        .map((caption: any) => {
          const startFrame = Math.max(
            Math.round((caption.start_sec ?? 0) * COMPOSITION_FPS),
            0,
          );

          const endFrame = Math.min(
            Math.round((caption.end_sec ?? 0) * COMPOSITION_FPS),
            clipDurationFrames,
          );

          return {
            text: caption.text ?? '',
            start_frame: startFrame,
            end_frame: Math.max(endFrame, startFrame + 1),
            position: caption.position ?? 'BOTTOM_CENTER',
            style: caption.style ?? 'CINEMATIC_SOFT',
          };
        })
        .filter((caption: { text: string }) => caption.text.trim().length > 0);

      clips.push({
        video_url: videoUrl,
        trim_start_frames: Math.round(trimStart * COMPOSITION_FPS),
        trim_end_frames: Math.round(trimEnd * COMPOSITION_FPS),
        volume,
        speed,
        start_frame: currentFrame,
        duration_frames: clipDurationFrames,
        transition: {
          type: transitionType,
          duration_frames: transitionDurationFrames,
        },
        captions,
      });

      currentFrame += clipDurationFrames;
    }

    let music: MusicData | null = null;

    const musicEntry = finalProject.timeline_music?.[0];

    if (musicEntry?.audio?.filename) {
      music = {
        audio_filename: musicEntry.audio.filename,
        volume: musicEntry.volume ?? 1.0,
      };
    }

    return { clips, music };
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { VIDEO_GENERATION_QUEUE } from '../queues/video.constants';
import { AiService } from '@/integrations/ai/services/ai.service';
import { GCPDocumentsService } from '../services/gcp-documents.service';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { VideoStatus } from '@/generated/prisma';

export interface VideoGenerationJobData {
    sceneVideoUuid: string;
}

@Processor(VIDEO_GENERATION_QUEUE)
export class VideoGenerationProcessor extends WorkerHost {
    private readonly logger = new Logger(VideoGenerationProcessor.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly gcpService: GCPDocumentsService,
    ) {
        super();
    }

    async process(job: Job<VideoGenerationJobData>): Promise<any> {
        const { sceneVideoUuid } = job.data;
        this.logger.log(`Processing video generation job for SceneVideo: ${sceneVideoUuid}`);

        const sceneVideo = await this.prisma.sceneVideo.findUnique({
            where: { uuid: sceneVideoUuid },
            include: { scene_variation: true },
        });

        if (!sceneVideo || !sceneVideo.scene_variation) {
            this.logger.error(`SceneVideo or variation not found: ${sceneVideoUuid}`);
            return;
        }

        try {
            await this.prisma.sceneVideo.update({
                where: { uuid: sceneVideoUuid },
                data: { status: VideoStatus.PROCESSING },
            });

            const variation = sceneVideo.scene_variation;

            // 1. Trigger AI generation (Blocking call with internal SDK polling)
            this.logger.log(`Starting video generation for ${sceneVideoUuid} using ${variation.ai_model}`);

            const genResponse = await this.aiService.generateVideo({
                provider: variation.ai_model || 'veo',
                model: variation.ai_model || 'veo-3',
                prompt: variation.prompt_text,
                negative_prompt: variation.negative_prompt,
                aspect_ratio: variation.aspect_ratio,
                resolution: variation.resolution,
                duration_sec: variation.duration_sec,
                seed: variation.seed,
            });

            if (genResponse.status === 'completed' && genResponse.videoBuffer) {
                // 2. Save the generated video buffer to GCP
                const buffer = Buffer.from(genResponse.videoBuffer);
                const videoUuid = await this.gcpService.saveVideoFromBuffer(
                    buffer,
                    `video_${sceneVideoUuid}.mp4`
                );

                await this.prisma.sceneVideo.update({
                    where: { uuid: sceneVideoUuid },
                    data: {
                        status: VideoStatus.COMPLETED,
                        video_uuid: videoUuid,
                        provider_job_id: genResponse.provider_job_id,
                    },
                });

                this.logger.log(`Successfully completed video generation for ${sceneVideoUuid}`);
            } else {
                throw new Error('Video generation failed to return a valid result');
            }

        } catch (error) {
            this.logger.error(`Failed to generate video: ${error.message}`, error.stack);

            await this.prisma.sceneVideo.update({
                where: { uuid: sceneVideoUuid },
                data: {
                    status: VideoStatus.FAILED,
                    error_message: error.message,
                },
            });

            throw error;
        }
    }
}

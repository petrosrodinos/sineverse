import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { VIDEO_GENERATION_QUEUE } from '../queues/video.constants';
import { AimlApiService } from '@/integrations/aimlapi/aimlapi.service';
import { GCPDocumentsService } from '../services/gcp-documents.service';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { VideoStatus } from '@/generated/prisma';
import { MODELS_CONFIG } from '@/integrations/aimlapi/core/config/models.config';
import { GenerationType, VideoModel } from '@/integrations/aimlapi/core/constants';

export interface VideoGenerationJobData {
    sceneVideoUuid: string;
}

@Processor(VIDEO_GENERATION_QUEUE)
export class VideoGenerationProcessor extends WorkerHost {
    private readonly logger = new Logger(VideoGenerationProcessor.name);
    private readonly POLL_INTERVAL_MS = 15000; // 15 seconds

    constructor(
        private readonly prisma: PrismaService,
        private readonly aimlApiService: AimlApiService,
        private readonly gcpService: GCPDocumentsService,
        private readonly schedulerRegistry: SchedulerRegistry,
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
            const model = variation.ai_model || VideoModel.KLING_VIDEO_V3_STANDARD;
            const modelConfig = MODELS_CONFIG[model];

            // 1. Prepare payload based on generation type
            this.logger.log(`Triggering AIML API video generation for ${sceneVideoUuid} using ${model}`);

            const commonParams = {
                model,
                duration: variation.duration_sec || 5,
                aspect_ratio: variation.aspect_ratio || '16:9',
                negative_prompt: variation.negative_prompt,
                seed: variation.seed ? parseInt(variation.seed) : undefined,
                cfg_scale: variation.guidance_scale,
            };

            let aiPayload: any = { ...commonParams };

            if (modelConfig?.type === GenerationType.IMAGE_TO_VIDEO) {
                // Fetch image url if it's an image-to-video model
                const variationWithImage = await this.prisma.sceneVariation.findUnique({
                    where: { uuid: variation.uuid },
                    include: { prompt_image: true }
                });

                aiPayload.image_url = variationWithImage?.prompt_image?.url;
                aiPayload.prompt = variation.prompt_text;

                if (!aiPayload.image_url) {
                    throw new Error(`Model ${model} requires an image, but no prompt image found for variation ${variation.uuid}`);
                }
            } else if (modelConfig?.type === GenerationType.VIDEO_TO_VIDEO) {
                // For video-to-video, we might need a source video (currently not fully supported in variation schema, but placeholder here)
                aiPayload.prompt = variation.prompt_text;
                // aiPayload.video_url = ... 
            } else {
                // Default to Text-to-Video
                aiPayload.prompt = variation.prompt_text;
            }

            const genResponse = await this.aimlApiService.video.create(aiPayload);

            if (!genResponse.id) {
                throw new Error('Failed to get a generation ID from AIML API');
            }

            // 2. Clear existing polling if any (defensive)
            const intervalName = `poll_video_${sceneVideoUuid}`;
            this.stopPolling(intervalName);

            // 3. Update job ID in DB
            await this.prisma.sceneVideo.update({
                where: { uuid: sceneVideoUuid },
                data: { provider_job_id: genResponse.id },
            });

            // 4. Start polling cron job (Interval)
            this.logger.log(`Starting polling interval for task ${genResponse.id}`);

            const interval = setInterval(async () => {
                await this.pollStatus(genResponse.id, model, sceneVideoUuid, intervalName);
            }, this.POLL_INTERVAL_MS);

            this.schedulerRegistry.addInterval(intervalName, interval);

            return { status: 'polling_initiated', taskId: genResponse.id };

        } catch (error: any) {
            let details = error.message;
            if (error.getResponse && typeof error.getResponse === 'function') {
                const response = error.getResponse();
                details = response?.details || response?.message || JSON.stringify(response);
            }

            this.logger.error(`Failed to initiate video generation: ${details}`, error.stack);

            await this.prisma.sceneVideo.update({
                where: { uuid: sceneVideoUuid },
                data: {
                    status: VideoStatus.FAILED,
                    error_message: details,
                },
            });

            throw error;
        }
    }

    private async pollStatus(taskId: string, model: string, sceneVideoUuid: string, intervalName: string) {
        try {
            const statusResponse = await this.aimlApiService.video.getStatus(taskId, model);
            this.logger.debug(`Polling status for ${sceneVideoUuid}: ${statusResponse.status}`);

            if (statusResponse.status === 'completed' && statusResponse.video?.url) {
                this.logger.log(`Video generation COMPLETED for ${sceneVideoUuid}. Saving...`);

                // Stop polling
                this.stopPolling(intervalName);

                // Save to GCP
                const videoUuid = await this.gcpService.saveVideoFromUrl(
                    statusResponse.video.url,
                    `video_${sceneVideoUuid}.mp4`
                );

                // Update final status
                await this.prisma.sceneVideo.update({
                    where: { uuid: sceneVideoUuid },
                    data: {
                        status: VideoStatus.COMPLETED,
                        video_uuid: videoUuid,
                    },
                });

            } else if (statusResponse.status === 'error') {
                const errorMsg = statusResponse.error?.message || 'Unknown provider error';
                this.logger.error(`Video generation FAILED for ${sceneVideoUuid}: ${errorMsg}`);

                this.stopPolling(intervalName);

                await this.prisma.sceneVideo.update({
                    where: { uuid: sceneVideoUuid },
                    data: {
                        status: VideoStatus.FAILED,
                        error_message: errorMsg,
                    },
                });
            }
        } catch (error) {
            this.logger.error(`Error during status polling for ${sceneVideoUuid}: ${error.message}`);
            // We keep polling unless it's a critical fatal error or multiple failures
        }
    }

    private stopPolling(name: string) {
        try {
            this.schedulerRegistry.getInterval(name);
            this.schedulerRegistry.deleteInterval(name);
            this.logger.log(`Stopped polling interval: ${name}`);
        } catch (e) {
            // Interval not found, ignore
        }
    }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpException, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { VIDEO_GENERATION_QUEUE } from '../queues/video.constants';
import { AimlApiService } from '@/integrations/aimlapi/aimlapi.service';
import { DocumentsService } from '@/modules/documents/documents.service';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { VideoModels } from '@/integrations/aimlapi/core/constants';
import { transformVariationToModelPayload } from '@/integrations/aimlapi/core/config/mappers/video-mapping.config';
import { AssetRole, AssetStatus } from '@/generated/prisma';

export interface VideoGenerationJobData {
    projectAssetUuid: string;
}

@Processor(VIDEO_GENERATION_QUEUE)
export class VideoGenerationProcessor extends WorkerHost {
    private readonly logger = new Logger(VideoGenerationProcessor.name);
    private readonly POLL_INTERVAL_MS = 15000; // 15 seconds

    constructor(
        private readonly prisma: PrismaService,
        private readonly aimlApiService: AimlApiService,
        private readonly documentsService: DocumentsService,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {
        super();
    }

    async process(job: Job<VideoGenerationJobData>): Promise<any> {
        const { projectAssetUuid } = job.data;

        const projectAsset = await this.prisma.projectAsset.findUnique({
            where: { uuid: projectAssetUuid },
            include: {
                scene_variation: {
                    include: {
                        project_assets: {
                            where: { role: AssetRole.PROMPT_IMAGE },
                            include: { document: true }
                        }
                    }
                }
            },
        });

        if (!projectAsset || !projectAsset.scene_variation) {
            this.logger.error(`projectAsset or variation not found: ${projectAssetUuid}`);
            return;
        }

        try {

            await this.prisma.projectAsset.update({
                where: { uuid: projectAssetUuid },
                data: { status: AssetStatus.PROCESSING },
            });

            const variation = projectAsset.scene_variation;
            const metadata = (projectAsset.metadata || {}) as any;
            const promptImageAsset = variation.project_assets?.[0];

            const configForMapping = {
                ...variation,
                ...metadata,
                prompt_image: promptImageAsset || null,
            };

            const model = metadata.ai_model || VideoModels.KLING_VIDEO_V3_STANDARD;

            const payload = transformVariationToModelPayload(configForMapping, model);

            const genResponse = await this.aimlApiService.video.create(payload);

            if (!genResponse.id) {
                throw new Error('Failed to get a generation ID from AIML API');
            }

            // 2. Clear existing polling if any (defensive)
            const intervalName = `poll_video_${projectAssetUuid}`;
            this.stopPolling(intervalName);

            // 3. Update job ID in DB
            await this.prisma.projectAsset.update({
                where: { uuid: projectAssetUuid },
                data: { provider_job_id: genResponse.id },
            });

            // 4. Start polling cron job (Interval)

            const interval = setInterval(async () => {
                await this.pollStatus(genResponse.id, projectAssetUuid, intervalName);
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

            if (this.isRequestTimeout(error, details)) {
                await this.deleteVideoProjectAssetKeepPromptImages(projectAssetUuid);
                return { status: 'timeout', removed: true };
            }

            await this.prisma.projectAsset.update({
                where: { uuid: projectAssetUuid },
                data: {
                    status: AssetStatus.FAILED,
                    error_message: details,
                },
            });

            throw error;
        }
    }

    private isRequestTimeout(error: unknown, details: string): boolean {
        if (/timeout|timed out|ETIMEDOUT|ECONNABORTED|deadline/i.test(details)) {
            return true;
        }
        if (error instanceof HttpException) {
            const status = error.getStatus();
            if (status === 408 || status === 504) {
                return true;
            }
        }
        if (error && typeof error === 'object') {
            const e = error as { code?: string; cause?: { code?: string } };
            if (e.code === 'ECONNABORTED' || e.code === 'ETIMEDOUT') {
                return true;
            }
            if (e.cause?.code === 'ETIMEDOUT' || e.cause?.code === 'ECONNABORTED') {
                return true;
            }
        }
        return false;
    }

    private async deleteVideoProjectAssetKeepPromptImages(projectAssetUuid: string): Promise<void> {
        try {
            await this.prisma.projectAsset.delete({
                where: { uuid: projectAssetUuid },
            });
            this.logger.warn(`Removed video project asset ${projectAssetUuid} after request timeout (prompt images unchanged).`);
        } catch (deleteError: any) {
            this.logger.error(`Could not delete video project asset ${projectAssetUuid}: ${deleteError?.message}`);
            await this.prisma.projectAsset.update({
                where: { uuid: projectAssetUuid },
                data: {
                    status: AssetStatus.FAILED,
                    error_message: 'Request timed out',
                },
            });
        }
    }

    private async pollStatus(taskId: string, projectAssetUuid: string, intervalName: string) {
        try {
            const statusResponse = await this.aimlApiService.video.getStatus(taskId);

            if (statusResponse.status === 'completed' && statusResponse.video?.url) {

                // Stop polling
                this.stopPolling(intervalName);

                try {
                    // Save to GCP
                    const videoUuid = await this.documentsService.saveVideoFromUrl(
                        statusResponse.video.url,
                        `video_${projectAssetUuid}.mp4`
                    );

                    // Update final status
                    await this.prisma.projectAsset.update({
                        where: { uuid: projectAssetUuid },
                        data: {
                            status: AssetStatus.COMPLETED,
                            document_uuid: videoUuid,
                        },
                    });
                } catch (saveError) {
                    this.logger.error(`Failed to save video to storage: ${saveError.message}`);
                    await this.prisma.projectAsset.update({
                        where: { uuid: projectAssetUuid },
                        data: {
                            status: AssetStatus.FAILED,
                            error_message: `Storage Error: ${saveError.message}`,
                        },
                    });
                }

            } else if (statusResponse.status === 'error') {
                const errorMsg = statusResponse.error?.message || 'Unknown provider error';
                this.logger.error(`Video generation FAILED for ${projectAssetUuid}: ${errorMsg}`);

                this.stopPolling(intervalName);

                await this.prisma.projectAsset.update({
                    where: { uuid: projectAssetUuid },
                    data: {
                        status: AssetStatus.FAILED,
                        error_message: errorMsg,
                    },
                });
            }
        } catch (error) {
            this.logger.error(`Error during status polling for ${projectAssetUuid}: ${error.message}`);
            // We keep polling unless it's a critical fatal error or multiple failures
        }
    }

    private stopPolling(name: string) {
        try {
            this.schedulerRegistry.getInterval(name);
            this.schedulerRegistry.deleteInterval(name);
        } catch (e) {
            // Interval not found, ignore
        }
    }
}

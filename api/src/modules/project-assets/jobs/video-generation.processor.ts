import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpException, Logger } from '@nestjs/common';
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
    private readonly MAX_POLL_ERRORS = 8;

    constructor(
        private readonly prisma: PrismaService,
        private readonly aimlApiService: AimlApiService,
        private readonly documentsService: DocumentsService,
    ) {
        super();
    }

    async process(job: Job<VideoGenerationJobData>): Promise<any> {
        const { projectAssetUuid } = job.data;
        this.logger.log(`[video-job:${job.id}] started for asset=${projectAssetUuid}`);

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
            this.logger.error(`[video-job:${job.id}] projectAsset or variation not found: ${projectAssetUuid}`);
            return;
        }

        try {
            this.logger.log(`[video-job:${job.id}] setting asset to PROCESSING`);

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
            this.logger.log(`[video-job:${job.id}] selected model=${model} promptImage=${promptImageAsset?.uuid ?? 'none'}`);

            const payload = transformVariationToModelPayload(configForMapping, model);
            this.logger.debug(`[video-job:${job.id}] mapped payload=${JSON.stringify(payload)}`);

            const genResponse = await this.aimlApiService.video.create(payload);
            this.logger.log(`[video-job:${job.id}] provider generation created id=${genResponse.id} status=${genResponse.status}`);

            if (!genResponse.id) {
                throw new Error('Failed to get a generation ID from AIML API');
            }

            // 2. Update provider job ID in DB
            await this.prisma.projectAsset.update({
                where: { uuid: projectAssetUuid },
                data: { provider_job_id: genResponse.id },
            });
            this.logger.log(`[video-job:${job.id}] stored provider_job_id=${genResponse.id}`);

            await this.pollUntilTerminal(genResponse.id, projectAssetUuid);
            this.logger.log(`[video-job:${job.id}] finished successfully asset=${projectAssetUuid}`);

            return { status: 'completed', taskId: genResponse.id };

        } catch (error: any) {
            let details = error.message;
            if (error.getResponse && typeof error.getResponse === 'function') {
                const response = error.getResponse();
                details = response?.details || response?.message || JSON.stringify(response);
            }

            this.logger.error(`[video-job:${job.id}] failed: ${details}`, error.stack);

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

            throw new Error(details);
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

    private async pollUntilTerminal(taskId: string, projectAssetUuid: string): Promise<void> {
        let pollErrors = 0;
        let pollCount = 0;
        this.logger.log(`[video-poll:${taskId}] started for asset=${projectAssetUuid}`);

        for (;;) {
            pollCount += 1;
            this.logger.debug(`[video-poll:${taskId}] cycle=${pollCount} checking local status`);
            const currentAsset = await this.prisma.projectAsset.findUnique({
                where: { uuid: projectAssetUuid },
                select: { status: true },
            });

            if (!currentAsset) {
                throw new Error('Project asset not found during polling');
            }

            if (currentAsset.status !== AssetStatus.PENDING && currentAsset.status !== AssetStatus.PROCESSING) {
                throw new Error(`Polling stopped because asset transitioned to ${currentAsset.status}`);
            }

            try {
                this.logger.debug(`[video-poll:${taskId}] cycle=${pollCount} requesting provider status`);
                const statusResponse = await this.aimlApiService.video.getStatus(taskId);
                pollErrors = 0;

                const normalizedStatus = (statusResponse.status || '').toLowerCase();
                const isCompleted = normalizedStatus === 'completed';
                const isFailed = ['error', 'failed', 'failure', 'cancelled', 'canceled'].includes(normalizedStatus);
                this.logger.log(`[video-poll:${taskId}] cycle=${pollCount} providerStatus=${statusResponse.status}`);

                if (isCompleted && statusResponse.video?.url) {
                    this.logger.log(`[video-poll:${taskId}] completed with video url, uploading to storage`);
                    const videoUuid = await this.documentsService.saveVideoFromUrl(
                        statusResponse.video.url,
                        `video_${projectAssetUuid}.mp4`,
                    );

                    await this.prisma.projectAsset.update({
                        where: { uuid: projectAssetUuid },
                        data: {
                            status: AssetStatus.COMPLETED,
                            document_uuid: videoUuid,
                        },
                    });
                    this.logger.log(`[video-poll:${taskId}] asset completed document_uuid=${videoUuid}`);

                    return;
                }

                if (isFailed || statusResponse.error) {
                    const errorMsg = statusResponse.error?.message || 'Unknown provider error';
                    this.logger.error(`[video-poll:${taskId}] provider returned failed status: ${errorMsg}`);

                    await this.prisma.projectAsset.update({
                        where: { uuid: projectAssetUuid },
                        data: {
                            status: AssetStatus.FAILED,
                            error_message: errorMsg,
                        },
                    });

                    throw new Error(errorMsg);
                }
            } catch (error) {
                const details = this.extractErrorMessage(error);
                this.logger.error(`[video-poll:${taskId}] cycle=${pollCount} polling error: ${details}`);

                const isInferenceNotFound = /inference not found/i.test(details);
                const isModelMaintenance = /model is under maintenance|under maintenance/i.test(details);
                const isRateOrProviderUnavailable = /status code 524|status code 502|status code 503|status code 504|temporarily unavailable/i.test(details);
                pollErrors += 1;
                const shouldFail = isInferenceNotFound || isModelMaintenance || pollErrors >= this.MAX_POLL_ERRORS;
                this.logger.warn(`[video-poll:${taskId}] cycle=${pollCount} pollErrors=${pollErrors} shouldFail=${shouldFail}`);

                if (shouldFail) {
                    await this.prisma.projectAsset.update({
                        where: { uuid: projectAssetUuid },
                        data: {
                            status: AssetStatus.FAILED,
                            error_message: details,
                        },
                    });

                    throw new Error(details);
                }

                if (isRateOrProviderUnavailable) {
                    this.logger.warn(`[video-poll:${taskId}] transient provider timeout/unavailable, will retry`);
                }
            }

            this.logger.debug(`[video-poll:${taskId}] sleeping ${this.POLL_INTERVAL_MS}ms before next cycle`);
            await this.sleep(this.POLL_INTERVAL_MS);
        }
    }

    private extractErrorMessage(error: unknown): string {
        if (error instanceof HttpException) {
            const response = error.getResponse();
            if (typeof response === 'string') {
                return response;
            }
            if (response && typeof response === 'object') {
                const payload = response as { details?: string; message?: string | string[] };
                if (payload.details) {
                    return payload.details;
                }
                if (Array.isArray(payload.message)) {
                    return payload.message.join(', ');
                }
                if (payload.message) {
                    return payload.message;
                }
            }
        }

        if (error && typeof error === 'object' && 'message' in error) {
            const withMessage = error as { message?: string };
            if (withMessage.message) {
                return withMessage.message;
            }
        }

        return 'Unknown polling error';
    }

    private async sleep(ms: number): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
}

import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { VIDEO_PROVIDER_TOKEN, AiProvider } from '../core/constants';
import { VideoGenerationProvider } from '../core/interfaces/video-provider.interface';
import { CreateVideoSchema, CreateVideoResponse, VideoStatusResponse } from '../core/schemas/video.schema';
import { getModelConfig } from '../core/config/models.config';

@Injectable()
export class CreateVideoService {
    private readonly logger = new Logger(CreateVideoService.name);
    private readonly providerRegistry: Map<AiProvider, VideoGenerationProvider>;

    constructor(
        @Inject(VIDEO_PROVIDER_TOKEN)
        private readonly providers: VideoGenerationProvider[],
    ) {
        this.providerRegistry = new Map(
            providers.map(p => [p.providerName, p])
        );
    }

    async execute(input: unknown): Promise<CreateVideoResponse> {
        const validation = CreateVideoSchema.safeParse(input);

        if (!validation.success) {
            const errorTrace = validation.error.errors
                .map(e => `${e.path.join('.')}: ${e.message}`)
                .join('; ');

            this.logger.error(`Payload validation failed: ${errorTrace}`);

            throw new HttpException({
                error: 'PayloadValidationFailed',
                message: errorTrace,
            }, HttpStatus.BAD_REQUEST);
        }

        const request = validation.data;

        const modelConfig = getModelConfig(request.model);
        if (!modelConfig) {
            throw new HttpException(
                `Model ${request.model} is not configured.`,
                HttpStatus.BAD_REQUEST
            );
        }

        const provider = this.providerRegistry.get(modelConfig.provider);
        if (!provider) {
            this.logger.error(`Provider implementation for ${modelConfig.provider} is missing.`);
            throw new HttpException(
                `Provider ${modelConfig.provider} is temporarily unavailable.`,
                HttpStatus.SERVICE_UNAVAILABLE
            );
        }

        this.logger.debug(`Delegating generation for ${request.model} to ${modelConfig.provider}`);
        return provider.createVideo(request);
    }

    /**
     * Retrieves status for a specific task and model.
     */
    async getStatus(taskId: string, model: string): Promise<VideoStatusResponse> {
        const config = getModelConfig(model);
        if (!config) {
            throw new HttpException('Invalid model for status check.', HttpStatus.BAD_REQUEST);
        }

        const provider = this.providerRegistry.get(config.provider);
        if (!provider) {
            throw new HttpException('Provider not found in registry.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return provider.getVideoStatus(taskId);
    }
}

import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { VIDEO_PROVIDER_TOKEN, AiProvider } from '../core/constants';
import { VideoGenerationProvider } from '../core/interfaces/video-provider.interface';
import { CreateVideoSchema, CreateVideoRequest, CreateVideoResponse, VideoStatusResponse } from '../core/schemas/video.schema';
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

    /**
     * Orchestrates video generation.
     * Resolves the correct provider based on the model configuration.
     */
    async execute(input: unknown): Promise<CreateVideoResponse> {
        // 1. Validate input payload
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

        // TypeScript now correctly infers 'request' as the union 'CreateVideoRequest'
        const request = validation.data;

        // 2. Resolve Model Configuration
        const modelConfig = getModelConfig(request.model);
        if (!modelConfig) {
            throw new HttpException(
                `Model ${request.model} is not configured.`,
                HttpStatus.BAD_REQUEST
            );
        }

        // 3. Resolve Provider
        const provider = this.providerRegistry.get(modelConfig.provider);
        if (!provider) {
            this.logger.error(`Provider implementation for ${modelConfig.provider} is missing.`);
            throw new HttpException(
                `Provider ${modelConfig.provider} is temporarily unavailable.`,
                HttpStatus.SERVICE_UNAVAILABLE
            );
        }

        // 4. Delegate to Provider
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

import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { VIDEO_PROVIDER_TOKEN, AiProvider } from '../core/constants';
import { VideoGenerationProvider } from '../core/interfaces/video-provider.interface';
import { CreateVideoResponse, VideoStatusResponse, CreateVideoSchema } from '../core/schemas';

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
        const validation = await CreateVideoSchema.safeParseAsync(input);

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
        const providerName = this.getProviderForModel(request.model);
        const provider = this.providerRegistry.get(providerName);

        if (!provider) {
            this.logger.error(`Provider implementation for ${providerName} is missing.`);
            throw new HttpException(
                `Provider ${providerName} is temporarily unavailable.`,
                HttpStatus.SERVICE_UNAVAILABLE
            );
        }

        this.logger.debug(`Delegating generation for ${request.model} to ${providerName}`);
        return provider.createVideo(request);
    }

    /**
     * Retrieves status for a specific task and model.
     */
    async getStatus(taskId: string, model: string): Promise<VideoStatusResponse> {
        const providerName = this.getProviderForModel(model);
        const provider = this.providerRegistry.get(providerName);

        if (!provider) {
            throw new HttpException('Provider not found in registry.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return provider.getVideoStatus(taskId);
    }

    private getProviderForModel(model: string): AiProvider {
        if (model.includes('kling')) return AiProvider.KLING;
        if (model.includes('veo')) return AiProvider.GOOGLE;
        if (model.includes('seedance') || model.includes('omnihuman')) return AiProvider.BYTEDANCE;
        if (model.includes('runway')) return AiProvider.RUNWAY;
        if (model.includes('wan')) return AiProvider.ALIBABA;

        // Fallback or default
        return AiProvider.KLING;
    }
}

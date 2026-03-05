import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AiProvider, VideoModel, GenerationType } from '../../../core/constants';
import { MODELS_CONFIG, getProviderModelId } from '../../../core/config/models.config';
import { VideoGenerationProvider } from '../../../core/interfaces/video-provider.interface';
import { CreateVideoRequest, CreateVideoResponse, VideoStatusResponse } from '../../../core/schemas/video.schema';

@Injectable()
export class CreateVideoKlingService implements VideoGenerationProvider {
    private readonly logger = new Logger(CreateVideoKlingService.name);
    private readonly baseUrl = 'https://api.aimlapi.com/v2';
    readonly providerName = AiProvider.KLING;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async createVideo(request: CreateVideoRequest): Promise<CreateVideoResponse> {
        const payload = this.mapRequestToPayload(request);
        this.logger.debug(`[KlingProvider] Sending generation payload: ${JSON.stringify(payload, null, 2)}`);

        try {
            const response = await this.performApiCall<any>('POST', '/video/generations', payload);

            if (!response || !response.id) {
                throw new Error('Invalid response from Kling API: Missing generation ID');
            }

            return {
                id: response.id,
                status: this.normalizeStatus(response.status),
            };
        } catch (error) {
            this.handleProviderError(error, `generation with model ${request.model}`);
        }
    }

    async getVideoStatus(taskId: string): Promise<VideoStatusResponse> {
        try {
            const response = await this.performApiCall<any>('GET', `/video/generations?generation_id=${taskId}`);

            return {
                id: response.id,
                status: this.normalizeStatus(response.status),
                video: response.video ? { url: response.video.url } : null,
                error: response.error ? { name: response.error.name, message: response.error.message } : null,
            };
        } catch (error) {
            this.handleProviderError(error, 'status retrieval');
        }
    }

    async cancelVideo(taskId: string): Promise<void> {
        this.logger.warn(`Cancel requested for ${taskId} but not implemented by provider.`);
        throw new HttpException('Cancel operation not supported by Kling provider.', HttpStatus.NOT_IMPLEMENTED);
    }

    /**
     * Categorical request mapping.
     * Kling API usually expects similar payloads for models with the same generation type.
     */
    private mapRequestToPayload(request: CreateVideoRequest): any {
        const modelConfig = MODELS_CONFIG[request.model];

        if (!modelConfig) {
            throw new Error(`Model configuration missing for: ${request.model}`);
        }

        const commonPayload: any = {
            model: getProviderModelId(request.model),
            duration: request.duration,
            aspect_ratio: request.aspect_ratio,
            negative_prompt: request.negative_prompt,
            cfg_scale: request.cfg_scale !== undefined
                ? (request.cfg_scale > 1 ? Math.min(request.cfg_scale / 10, 1.0) : request.cfg_scale)
                : undefined,
            seed: request.seed,
        };

        let specificPayload: any = {};

        // Categorical mapping based on GenerationType
        switch (modelConfig.type) {
            case GenerationType.TEXT_TO_VIDEO:
                const textReq = request as any;
                specificPayload = {
                    prompt: textReq.prompt,
                    multi_prompt: textReq.multi_prompt,
                };
                break;

            case GenerationType.IMAGE_TO_VIDEO:
                const imageReq = request as any;
                specificPayload = {
                    image_url: imageReq.image_url,
                    prompt: imageReq.prompt,
                    tail_image_url: imageReq.tail_image_url,
                    camera_control: imageReq.camera_control,
                };
                break;

            case GenerationType.VIDEO_TO_VIDEO:
                const videoReq = request as any;
                specificPayload = {
                    video_url: videoReq.video_url,
                    prompt: videoReq.prompt,
                };
                break;

            default:
                throw new Error(`Unsupported generation type ${modelConfig.type} for provider Kling`);
        }

        // Merge and deep clean undefined/null values
        return this.cleanPayload({ ...commonPayload, ...specificPayload });
    }

    private cleanPayload(obj: any): any {
        const clean: any = {};
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value !== undefined && value !== null) {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    const nested = this.cleanPayload(value);
                    if (Object.keys(nested).length > 0) {
                        clean[key] = nested;
                    }
                } else if (Array.isArray(value)) {
                    if (value.length > 0) {
                        clean[key] = value;
                    }
                } else {
                    clean[key] = value;
                }
            }
        });
        return clean;
    }

    private async performApiCall<T>(method: 'GET' | 'POST', path: string, data?: any): Promise<T> {
        const apiKey = this.configService.get<string>('AIMLAPI_KEY');
        if (!apiKey) {
            this.logger.error('AIMLAPI_KEY is missing in environment config.');
            throw new HttpException('API Configuration Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const url = `${this.baseUrl}${path}`;
        const headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };

        try {
            const request$ = method === 'POST'
                ? this.httpService.post<T>(url, data, { headers })
                : this.httpService.get<T>(url, { headers });

            const response = await firstValueFrom(request$);
            return response.data;
        } catch (error: any) {
            throw error; // Rethrow to handle in caller
        }
    }

    private normalizeStatus(status: string): 'queued' | 'generating' | 'completed' | 'error' {
        const statusMap: Record<string, 'queued' | 'generating' | 'completed' | 'error'> = {
            'queued': 'queued',
            'generating': 'generating',
            'completed': 'completed',
            'error': 'error',
        };
        return statusMap[status] || 'error';
    }

    private handleProviderError(error: any, context: string): never {
        const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = error.response?.data?.error?.message || error.message || 'Unknown provider error';

        this.logger.error(`[KlingProvider] Failure during ${context}: ${errorMessage}`);

        throw new HttpException({
            provider: this.providerName,
            error: 'ProviderExecutionError',
            details: errorMessage,
        }, statusCode);
    }
}

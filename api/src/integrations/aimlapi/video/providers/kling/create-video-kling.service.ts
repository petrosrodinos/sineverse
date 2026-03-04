import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AiProvider, KlingModel } from '../../../core/constants';
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
     * Type-safe request mapping using discriminated union logic.
     */
    private mapRequestToPayload(request: CreateVideoRequest): any {
        // Direct access within switch for perfect TypeScript narrowing
        switch (request.model) {
            case KlingModel.V3_PRO_TEXT_TO_VIDEO:
                return {
                    model: request.model,
                    prompt: request.prompt,
                    multi_prompt: request.multi_prompt,
                    duration: request.duration,
                    aspect_ratio: request.aspect_ratio,
                    negative_prompt: request.negative_prompt,
                    cfg_scale: request.cfg_scale,
                };

            case KlingModel.V1_STANDARD_IMAGE_TO_VIDEO:
                return {
                    model: request.model,
                    image_url: request.image_url,
                    prompt: request.prompt,
                    tail_image_url: request.tail_image_url,
                    duration: request.duration,
                    negative_prompt: request.negative_prompt,
                    cfg_scale: request.cfg_scale,
                    camera_control: request.camera_control,
                };

            default:
                // This ensures all cases in the union are handled
                const _exhaustiveCheck: never = request;
                throw new Error(`Model mapping not implemented for: ${(request as any).model}`);
        }
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

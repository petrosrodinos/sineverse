import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateVideoRequest, CreateVideoResponse, VideoStatusResponse } from '../core/schemas';

@Injectable()
export class CreateVideoAdapter {
    private readonly logger = new Logger(CreateVideoAdapter.name);
    private readonly baseUrl = 'https://api.aimlapi.com/v2';

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async createVideo(request: CreateVideoRequest): Promise<CreateVideoResponse> {
        const payload = this.cleanPayload(request);
        this.logger.debug(`Sending generation payload: ${JSON.stringify(payload, null, 2)}`);

        try {
            const response = await this.performApiCall<any>('POST', '/video/generations', payload);

            if (!response || !response.id) {
                throw new Error('Invalid response: Missing generation ID');
            }

            return {
                id: response.id,
                status: response.status,
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
                status: response.status,
                video: response.video ? { url: response.video.url } : null,
                error: response.error ? { name: response.error.name, message: response.error.message } : null,
            };
        } catch (error) {
            this.handleProviderError(error, 'status retrieval');
        }
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

    private handleProviderError(error: any, context: string): never {
        const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = error.response?.data?.error?.message || error.message || 'Unknown error';

        this.logger.error(`Failure during ${context}: ${errorMessage}`);

        throw new HttpException({
            error: 'ProviderExecutionError',
            details: errorMessage,
        }, statusCode);
    }
}

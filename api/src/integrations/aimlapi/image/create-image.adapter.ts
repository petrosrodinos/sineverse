import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateVideoRequest, CreateVideoResponse, VideoStatusResponse } from '../core/schemas';

@Injectable()
export class CreateVideoAdapter {
    private readonly logger = new Logger(CreateVideoAdapter.name);
    private readonly baseUrl = 'https://api.aimlapi.com/v1';

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async createImage(request: CreateVideoRequest): Promise<CreateVideoResponse> {

        try {
            const response = await this.performApiCall<any>('POST', '/images/generations', request);

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

    async geImageStatus(taskId: string): Promise<VideoStatusResponse> {
        try {
            const response = await this.performApiCall<any>('GET', `/images/generations?generation_id=${taskId}`);

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

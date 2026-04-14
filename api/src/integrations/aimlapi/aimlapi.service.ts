import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateVideoService } from './video/create-video.service';
import {
  CreateVideoResponse,
  VideoStatusResponse,
  ImageGenerationResponse,
} from './core/schemas';
import { CreateImageService } from './image/create-image.service';

export interface AimlBillingBalance {
  current_balance: number;
  currency?: string;
  raw: unknown;
}

@Injectable()
export class AimlApiService {
  constructor(
    private readonly videoService: CreateVideoService,
    private readonly imageService: CreateImageService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  get video() {
    return {
      create: (request: unknown): Promise<CreateVideoResponse> => {
        return this.videoService.execute(request);
      },
      getStatus: (taskId: string): Promise<VideoStatusResponse> => {
        return this.videoService.getStatus(taskId);
      },
    };
  }

  get image() {
    return {
      create: async (request: unknown): Promise<ImageGenerationResponse> => {
        return this.imageService.execute(request);
      },
    };
  }

  async getBalance(): Promise<AimlBillingBalance> {
    const apiKey = this.configService.get<string>('AIMLAPI_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('AIMLAPI_KEY is missing');
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const primary = await firstValueFrom(
        this.httpService.get('https://api.aimlapi.com/v2/billing', {
          headers,
          timeout: 15000,
        }),
      );

      return {
        current_balance: Number(primary.data?.current_balance ?? 0),
        currency: primary.data?.currency,
        raw: primary.data,
      };
    } catch {
      const fallback = await firstValueFrom(
        this.httpService.get('https://api.aimlapi.com/v2/billing/detail', {
          headers,
          timeout: 15000,
        }),
      );

      return {
        current_balance: Number(fallback.data?.current_balance ?? 0),
        currency: fallback.data?.currency,
        raw: fallback.data,
      };
    }
  }
}

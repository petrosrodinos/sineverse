import { Injectable } from '@nestjs/common';
import { CreateVideoService } from './video/create-video.service';
import { CreateVideoResponse, VideoStatusResponse, ImageGenerationResponse } from './core/schemas';
import { CreateImageService } from './image/create-image.service';

@Injectable()
export class AimlApiService {
    constructor(private readonly videoService: CreateVideoService, private readonly imageService: CreateImageService) { }

    get video() {
        return {
            create: (request: unknown): Promise<CreateVideoResponse> => {
                return this.videoService.execute(request);
            },
            getStatus: (taskId: string): Promise<VideoStatusResponse> => {
                return this.videoService.getStatus(taskId);
            }
        };
    }

    get image() {
        return {
            create: async (request: unknown): Promise<ImageGenerationResponse> => {
                return this.imageService.execute(request);
            }
        };
    }
}

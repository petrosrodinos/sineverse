import { Injectable } from '@nestjs/common';
import { CreateVideoService } from './video/create-video.service';
import { CreateVideoResponse, VideoStatusResponse } from './core/schemas/video.schema';

@Injectable()
export class AimlApiService {
    constructor(private readonly videoService: CreateVideoService) { }

    get video() {
        return {
            create: (request: unknown): Promise<CreateVideoResponse> => {
                return this.videoService.execute(request);
            },
            getStatus: (taskId: string, model: string): Promise<VideoStatusResponse> => {
                return this.videoService.getStatus(taskId, model);
            }
        };
    }

    get image() {
        return {
            create: async (request: unknown) => {
                throw new Error('Image generation not implemented yet.');
            }
        };
    }
}

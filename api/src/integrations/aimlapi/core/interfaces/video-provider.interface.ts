import { BaseAiProvider } from './base-provider.interface';
import { CreateVideoRequest, CreateVideoResponse, VideoStatusResponse } from '../schemas/video.schema';

export interface VideoGenerationProvider extends BaseAiProvider {
    createVideo(request: CreateVideoRequest): Promise<CreateVideoResponse>;
    getVideoStatus(taskId: string): Promise<VideoStatusResponse>;
    cancelVideo(taskId: string): Promise<void>;
}

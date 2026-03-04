import { z } from 'zod';
import { GenerationType } from '../constants';
import { MODELS_CONFIG } from '../config/models.config';

// Shared parameters across video models
const BaseVideoParams = {
    duration: z.number().int().optional(),
    aspect_ratio: z.enum(['16:9', '9:16', '1:1']).optional(),
    negative_prompt: z.string().optional(),
    cfg_scale: z.number().min(0).max(20).optional(),
    seed: z.number().optional(),
};

// Payload for Text-to-Video
const TextToVideoContent = {
    ...BaseVideoParams,
    prompt: z.string().min(1).optional(),
    multi_prompt: z.array(z.string()).optional(),
};

// Payload for Image-to-Video
const ImageToVideoContent = {
    ...BaseVideoParams,
    image_url: z.string().url(),
    prompt: z.string().optional(),
    tail_image_url: z.string().url().optional(),
    camera_control: z.object({
        type: z.enum(['simple', 'down_back', 'forward_up', 'right_turn_forward', 'left_turn_forward']),
        config: z.object({
            horizontal: z.number().optional(),
            vertical: z.number().optional(),
            pan: z.number().optional(),
            tilt: z.number().optional(),
            roll: z.number().optional(),
            zoom: z.number().optional(),
        }).optional(),
    }).optional(),
};

// Payload for Video-to-Video (Reference/Edit)
const VideoToVideoContent = {
    ...BaseVideoParams,
    video_url: z.string().url(),
    prompt: z.string().optional(),
};

// Helper to get models by generation type
const getModelsByType = (type: string): [string, ...string[]] => {
    const models = Object.keys(MODELS_CONFIG).filter(m => MODELS_CONFIG[m].type === type);
    return models.length > 0 ? (models as [string, ...string[]]) : ["unknown"];
};

/**
 * Unified schema for all video generation requests.
 * Categorizes models into Text-to-Video, Image-to-Video, and Video-to-Video.
 */
export const CreateVideoSchema = z.union([
    z.object({
        model: z.enum(getModelsByType(GenerationType.TEXT_TO_VIDEO)),
        ...TextToVideoContent,
    }),
    z.object({
        model: z.enum(getModelsByType(GenerationType.IMAGE_TO_VIDEO)),
        ...ImageToVideoContent,
    }),
    z.object({
        model: z.enum(getModelsByType(GenerationType.VIDEO_TO_VIDEO)),
        ...VideoToVideoContent,
    }),
]).refine(data => {
    // Determine if it's a Text-to-Video model
    const config = MODELS_CONFIG[data.model];
    if (config?.type === GenerationType.TEXT_TO_VIDEO) {
        const textData = data as any;
        return !!(textData.prompt || textData.multi_prompt);
    }
    return true;
}, {
    message: "Either prompt or multi_prompt must be provided",
    path: ["prompt"],
});

export type CreateVideoRequest = z.infer<typeof CreateVideoSchema>;

export const CreateVideoResponseSchema = z.object({
    id: z.string(),
    status: z.enum(['queued', 'generating', 'completed', 'error']),
});

export type CreateVideoResponse = z.infer<typeof CreateVideoResponseSchema>;

export const VideoStatusResponseSchema = z.object({
    id: z.string(),
    status: z.enum(['queued', 'generating', 'completed', 'error']),
    video: z.object({
        url: z.string().url(),
    }).nullable().optional(),
    error: z.object({
        name: z.string(),
        message: z.string(),
        details: z.any().optional(),
    }).nullable().optional(),
});

export type VideoStatusResponse = z.infer<typeof VideoStatusResponseSchema>;

import { z } from 'zod';
import { KlingModel } from '../constants';

// Shared parameters across video models
const BaseVideoParams = {
    duration: z.number().int().optional(),
    aspect_ratio: z.enum(['16:9', '9:16', '1:1']).optional(),
    negative_prompt: z.string().optional(),
    cfg_scale: z.number().min(0).max(1).optional(),
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

/**
 * Discriminated Union for all video generation requests.
 * 
 * IMPORTANT: Refinements are applied AFTER the union to ensure the members 
 * remain pure ZodObjects, which is required for discriminatedUnion to 
 * correctly perform type narrowing and inference.
 */
export const CreateVideoSchema = z.discriminatedUnion('model', [
    z.object({
        model: z.literal(KlingModel.V3_PRO_TEXT_TO_VIDEO),
        ...TextToVideoContent,
    }),
    z.object({
        model: z.literal(KlingModel.V1_STANDARD_IMAGE_TO_VIDEO),
        ...ImageToVideoContent,
    }),
]).refine(data => {
    // Shared validation logic for Text-to-Video
    if (data.model === KlingModel.V3_PRO_TEXT_TO_VIDEO) {
        return !!(data.prompt || data.multi_prompt);
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

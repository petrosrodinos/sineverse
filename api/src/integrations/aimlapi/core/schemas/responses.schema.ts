import { z } from 'zod';

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

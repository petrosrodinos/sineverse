import { z } from 'zod';

export const CreateVideoResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['queued', 'generating', 'completed', 'error']),
});

export const UsageSchema = z.object({
  credits_used: z.coerce.number(),
  usd_spent: z.coerce.number().optional(),
});

export const MetaSchema = z.object({
  usage: UsageSchema.nullable(),
});

export const VideoStatusResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['queued', 'generating', 'completed', 'error']),
  video: z
    .object({
      url: z.string().url(),
    })
    .nullable()
    .optional(),
  error: z
    .object({
      name: z.string(),
      message: z.string(),
      details: z.any().optional(),
    })
    .nullable()
    .optional(),
  meta: MetaSchema.nullable(),
  raw: z.unknown().optional(),
});

export const ImageDataSchema = z.object({
  url: z.string().url().nullable(),
  b64_json: z.string().nullable(),
});

export const ImageGenerationResponseSchema = z.object({
  data: z.array(ImageDataSchema).nullable(),
  meta: MetaSchema.nullable(),
  raw: z.unknown().optional(),
});

export type ImageGenerationResponse = z.infer<
  typeof ImageGenerationResponseSchema
>;

export type CreateVideoResponse = z.infer<typeof CreateVideoResponseSchema>;

export type VideoStatusResponse = z.infer<typeof VideoStatusResponseSchema>;

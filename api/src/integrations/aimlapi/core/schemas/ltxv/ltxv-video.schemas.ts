import { z } from 'zod';
import { ImageURLSchema } from '../google/google-video.schemas';

const LtxvDurationSchema = z.union([
  z.literal(6),
  z.literal(8),
  z.literal(10),
]);

const LtxvResolutionSchema = z
  .enum(['1080p', '1440p', '2160p'])
  .default('1080p');

export const Ltxv2VideoSchema = z.object({
  model: z.literal('ltxv/ltxv-2'),
  prompt: z.string(),
  image_url: ImageURLSchema,
  duration: LtxvDurationSchema.default(6),
  resolution: LtxvResolutionSchema,
  fps: z.number().int().optional(),
  seed: z.number().int().optional(),
});

export const Ltxv2FastVideoSchema = z.object({
  model: z.literal('ltxv/ltxv-2-fast'),
  prompt: z.string(),
  image_url: ImageURLSchema,
  duration: LtxvDurationSchema.default(6),
  resolution: LtxvResolutionSchema,
  fps: z.number().int().optional(),
  seed: z.number().int().optional(),
});

export type Ltxv2VideoRequest = z.infer<typeof Ltxv2VideoSchema>;
export type Ltxv2FastVideoRequest = z.infer<typeof Ltxv2FastVideoSchema>;

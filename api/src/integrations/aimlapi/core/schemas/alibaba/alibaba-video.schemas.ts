import { z } from 'zod';
import { ImageURLSchema } from '../google/google-video.schemas';

const AlibabaAspectRatioSchema = z.enum(['16:9', '9:16', '1:1']).default('16:9');
const AlibabaResolutionSchema = z
  .enum(['480p', '720p', '1080p'])
  .default('1080p');
const AlibabaDurationSchema = z.union([z.literal(5), z.literal(10)]).default(10);

export const AlibabaWan25I2VPreviewSchema = z.object({
  model: z.literal('alibaba/wan2.5-i2v-preview'),
  prompt: z.string(),
  image_url: ImageURLSchema,
  resolution: AlibabaResolutionSchema,
  aspect_ratio: AlibabaAspectRatioSchema,
  duration: AlibabaDurationSchema,
  negative_prompt: z.string().optional(),
  seed: z.number().int().optional(),
  enhance_prompt: z.boolean().default(true),
});

export type AlibabaWan25I2VPreviewRequest = z.infer<
  typeof AlibabaWan25I2VPreviewSchema
>;

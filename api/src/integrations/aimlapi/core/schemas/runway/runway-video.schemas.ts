import { z } from 'zod';
import { ImageURLSchema } from '../google/google-video.schemas';

const RunwayAspectRatioSchema = z
  .enum(['16:9', '9:16', '1:1', '2.35:1', '4:3'])
  .default('16:9');

export const RunwayActTwoImageToVideoSchema = z.object({
  model: z.literal('runway-act-two'),
  prompt: z.string(),
  image_url: ImageURLSchema.optional(),
  negative_prompt: z.string().optional(),
  duration: z.number().int().min(1).max(30).default(4),
  aspect_ratio: RunwayAspectRatioSchema,
  seed: z.number().int().optional(),
});

export type RunwayActTwoImageToVideoRequest = z.infer<
  typeof RunwayActTwoImageToVideoSchema
>;

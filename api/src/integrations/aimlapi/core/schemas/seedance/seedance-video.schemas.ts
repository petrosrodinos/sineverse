import { z } from 'zod';

const ResolutionSchema = z.enum(['480p', '720p', '1080p']).default('1080p');

const DurationSchema = z.union([z.literal(5), z.literal(10)]).default(5);

const AspectRatioSchema = z
  .enum(['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', '9:21'])
  .default('16:9');

export const ResolutionEnum = z
  .enum(['480p', '720p', '1080p'])
  .default('1080p');

export const DurationEnum = z.union([z.literal(5), z.literal(10)]).default(5);

export const WatermarkSchema = z.boolean().default(false);

export const CameraFixedSchema = z.boolean().default(false);

export const ImageURLSchema = z
  .string()
  .refine(
    (val) =>
      /^data:image\/[a-zA-Z]+;base64,/.test(val) || /^https?:\/\/.+/.test(val),
    {
      message: 'Must be a valid URL or Base64-encoded image string',
    },
  );

export const SeedanceLiteT2VSchema = z.object({
  model: z.literal('bytedance/seedance-1-0-lite-t2v'),
  prompt: z.string(),
  resolution: ResolutionSchema,
  duration: DurationSchema,
  watermark: z.boolean().default(false),
  seed: z.number().int().optional(),
  camerafixed: z.boolean().default(false),
  aspect_ratio: AspectRatioSchema,
});

export const SeedanceLiteI2VSchema = z.object({
  model: z.literal('bytedance/seedance-1-0-lite-i2v'),
  image_url: z.string().url(),
  prompt: z.string(),
  resolution: ResolutionEnum,
  duration: DurationEnum,
  watermark: WatermarkSchema,
  seed: z.number().int().optional(),
  camerafixed: CameraFixedSchema,
});

export const SeedanceProT2VSchema = z.object({
  model: z.enum([
    'bytedance/seedance-1-0-pro-t2v',
    'bytedance/seedance-1-0-pro-fast',
  ]),
  image_url: ImageURLSchema,
  last_image_url: ImageURLSchema.optional(),
  prompt: z.string(),
  resolution: ResolutionEnum,
  duration: DurationEnum,
  watermark: WatermarkSchema,
  seed: z.number().int().optional(),
  camerafixed: CameraFixedSchema,
});

export const SeedanceProI2VSchema = z.object({
  model: z.literal('bytedance/seedance-1-0-pro-i2v'),
  image_url: ImageURLSchema,
  last_image_url: ImageURLSchema.optional(),
  prompt: z.string(),
  resolution: ResolutionEnum.default('1080p'),
  duration: DurationEnum,
  watermark: WatermarkSchema,
  seed: z.number().int().optional(),
  camerafixed: CameraFixedSchema,
});

export type SeedanceLiteT2VRequest = z.infer<typeof SeedanceLiteT2VSchema>;

export type SeedanceLiteI2VRequest = z.infer<typeof SeedanceLiteI2VSchema>;

export type SeedanceProT2VRequest = z.infer<typeof SeedanceProT2VSchema>;

export type SeedanceProI2VRequest = z.infer<typeof SeedanceProI2VSchema>;

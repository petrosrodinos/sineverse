import { z } from 'zod';

export const GoogleVeo3DurationEnum = z
  .union([z.literal(4), z.literal(6), z.literal(8)])
  .default(8);
export const GoogleVeo3AspectRatioEnum = z
  .enum(['16:9', '9:16', '1:1', '2.35:1', '4:3'])
  .default('16:9');
export const GoogleVeo3ResolutionEnum = z.enum(['720P', '1080P']);

export const EnhancePromptSchema = z.boolean().default(true);
export const GenerateAudioSchema = z.boolean().default(true);

export const ImageURLSchema = z
  .string()
  .refine(
    (val) =>
      /^data:image\/[a-zA-Z]+;base64,/.test(val) || /^https?:\/\/.+/.test(val),
    {
      message: 'Must be a valid URL or Base64-encoded image string',
    },
  );

export const GoogleVeo3T2VideoSchema = z.object({
  model: z.enum([
    'google/veo3',
    'google/veo-3.0-fast',
    'google/veo-3.1-t2v',
    'google/veo-3.1-t2v-fast',
  ]),
  prompt: z.string(),
  negative_prompt: z.string().optional(),
  duration: GoogleVeo3DurationEnum.default(8),
  aspect_ratio: GoogleVeo3AspectRatioEnum,
  resolution: GoogleVeo3ResolutionEnum.default('720P'),
  seed: z.number().int().optional(),
  enhance_prompt: EnhancePromptSchema,
  generate_audio: GenerateAudioSchema,
});

export const GoogleVeo3I2VideoSchema = z.object({
  model: z.literal('google/veo-3.0-i2v'),
  prompt: z.string(),
  image_url: ImageURLSchema.optional(),
  negative_prompt: z.string().optional(),
  duration: GoogleVeo3DurationEnum.default(8),
  aspect_ratio: GoogleVeo3AspectRatioEnum,
  resolution: GoogleVeo3ResolutionEnum.default('720P'),
  seed: z.number().int().optional(),
  enhance_prompt: EnhancePromptSchema,
  generate_audio: GenerateAudioSchema,
});

export type GoogleVeo3T2VideoRequest = z.infer<typeof GoogleVeo3T2VideoSchema>;
export type GoogleVeo3I2VideoRequest = z.infer<typeof GoogleVeo3I2VideoSchema>;

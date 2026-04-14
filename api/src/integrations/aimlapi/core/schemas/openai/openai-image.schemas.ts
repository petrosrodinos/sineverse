import { z } from 'zod';

export const ImageModelEnum = z.enum(['dall-e-3']);

export const ImageCountEnum = z.enum(['1']).transform(Number);

export const ImageQualityEnum = z.enum(['standard', 'hd']);

export const ImageSizeEnum = z.enum(['1024x1024', '1024x1792', '1792x1024']);

export const ImageStyleEnum = z.enum(['vivid', 'natural']);

export const ImageResponseFormatEnum = z.enum(['url', 'b64_json']);

export const GptImageQualityEnum = z.enum(['low', 'medium', 'high']);

export const GptImageSizeEnum = z.enum(['1024x1024', '1024x1536', '1536x1024']);

export const GptImageResponseFormatEnum = z.enum(['url', 'b64_json']);

export const Dalle3ImageGenerationSchema = z
  .object({
    model: z.enum(['dall-e-3']).default('dall-e-3'),
    prompt: z.string().max(4000, 'Prompt must be at most 4000 characters'),
    n: z
      .number()
      .int()
      .refine((v) => v === 1, 'Only 1 image is supported')
      .default(1),
    quality: ImageQualityEnum.default('standard'),
    size: ImageSizeEnum.default('1024x1024'),
    style: ImageStyleEnum.default('vivid'),
    response_format: ImageResponseFormatEnum.default('url'),
  })
  .passthrough();

export const GptImageSchema = z
  .object({
    model: z.enum(['openai/gpt-image-1-5']).default('openai/gpt-image-1-5'),
    prompt: z.string().max(32000),
    quality: GptImageQualityEnum.default('medium'),
    size: GptImageSizeEnum.default('1024x1024'),
    response_format: GptImageResponseFormatEnum.default('url'),
  })
  .passthrough();

export type GptImageInput = z.infer<typeof GptImageSchema>;

export type Dalle3ImageGenerationInput = z.infer<
  typeof Dalle3ImageGenerationSchema
>;

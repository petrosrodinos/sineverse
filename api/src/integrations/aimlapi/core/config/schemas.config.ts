import { z } from 'zod';
import { VideoModels, ImageModels } from '../constants';
import * as KlingSchemas from '../schemas/kling/kling-video.schemas';
import * as GoogleSchemas from '../schemas/google/google-video.schemas';
import * as SeedanceSchemas from '../schemas/seedance/seedance-video.schemas';

import * as KlingImageSchemas from '../schemas/kling/kling-image.schemas';
import * as GoogleImageSchemas from '../schemas/google/google-image.schemas';
import * as OpenAIImageSchemas from '../schemas/openai/openai-image.schemas';

/**
 * Maps internal VideoModel identifiers to their specific Zod validation schemas.
 */
export const VIDEO_MODEL_SCHEMAS_CONFIG: Record<string, z.ZodTypeAny> = {
  // Kling AI
  [VideoModels.KLING_STANDARD_TEXT_TO_VIDEO]:
    KlingSchemas.KlingStandardTextToVideoSchema,
  [VideoModels.KLING_VIDEO_V3_STANDARD]:
    KlingSchemas.KlingVideoV3TextToVideoSchema,
  [VideoModels.KLING_VIDEO_V3_PRO]: KlingSchemas.KlingVideoV3TextToVideoSchema,
  [VideoModels.KLING_VIDEO_V3_STANDARD_IMAGE]:
    KlingSchemas.KlingVideoV3ImageToVideoSchema,
  [VideoModels.KLING_STANDARD_IMAGE_TO_VIDEO]:
    KlingSchemas.KlingStandardImageToVideoSchema,
  [VideoModels.KLING_2_1]: KlingSchemas.KlingV21TextToVideoSchema,
  [VideoModels.KLING_2_1_IMAGE]: KlingSchemas.KlingImageToVideoV21Schema,

  // Google
  [VideoModels.VEO_3]: GoogleSchemas.GoogleVeo3T2VideoSchema,
  [VideoModels.VEO_3_FAST]: GoogleSchemas.GoogleVeo3T2VideoSchema,
  [VideoModels.VEO_3_1]: GoogleSchemas.GoogleVeo3T2VideoSchema,
  [VideoModels.VEO_3_1_FAST]: GoogleSchemas.GoogleVeo3T2VideoSchema,
  [VideoModels.VEO_2_IMAGE]: GoogleSchemas.GoogleVeo3I2VideoSchema,

  // ByteDance / Seedance
  [VideoModels.SEEDANCE_1_0_PRO]: SeedanceSchemas.SeedanceProT2VSchema,
  [VideoModels.SEEDANCE_1_0_PRO_FAST]: SeedanceSchemas.SeedanceProT2VSchema,
  [VideoModels.SEEDANCE_1_0_LITE_TEXT]: SeedanceSchemas.SeedanceLiteT2VSchema,
  [VideoModels.SEEDANCE_1_0_LITE_IMAGE]: SeedanceSchemas.SeedanceLiteI2VSchema,
};

export const IMAGE_MODEL_SCHEMAS_CONFIG: Record<string, z.ZodTypeAny> = {
  // Kling AI
  [ImageModels.KLING_IMAGE_O1]: KlingImageSchemas.ImageGenerationSchema,

  // Google
  [ImageModels.IMAGEN_4_FAST]: GoogleImageSchemas.Imagen4FastSchema,
  [ImageModels.IMAGEN_4]: GoogleImageSchemas.Imagen4Schema,

  // OpenAI
  [ImageModels.DALLE_3]: OpenAIImageSchemas.Dalle3ImageGenerationSchema,
  [ImageModels.GPT_IMAGE_1_5]: OpenAIImageSchemas.GptImageSchema,
};

/**
 * Returns the correct schema based on the model.
 */
export function getVideoModelSchema(model: string): z.ZodTypeAny {
  const activeSchema = VIDEO_MODEL_SCHEMAS_CONFIG[model];

  if (!activeSchema) {
    throw new Error(
      `No specific schema defined for model: ${model}. Make sure it is mapped in MODEL_SCHEMAS_CONFIG.`,
    );
  }

  return activeSchema;
}

export function getImageModelSchema(model: string): z.ZodTypeAny {
  const activeSchema = IMAGE_MODEL_SCHEMAS_CONFIG[model];

  if (!activeSchema) {
    throw new Error(
      `No specific schema defined for model: ${model}. Make sure it is mapped in MODEL_SCHEMAS_CONFIG.`,
    );
  }

  return activeSchema;
}

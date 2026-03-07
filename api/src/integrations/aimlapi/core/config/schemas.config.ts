import { z } from 'zod';
import { VideoModels } from '../constants';
import * as KlingSchemas from '../schemas/kling/kling.schemas';
import * as GoogleSchemas from '../schemas/google/google.schemas';
import * as SeedanceSchemas from '../schemas/seedance/seedance.schemas';

/**
 * Maps internal VideoModel identifiers to their specific Zod validation schemas.
 */
export const MODEL_SCHEMAS_CONFIG: Record<string, z.ZodTypeAny> = {
    // Kling AI
    [VideoModels.KLING_STANDARD_TEXT_TO_VIDEO]: KlingSchemas.KlingStandardTextToVideoSchema,
    [VideoModels.KLING_VIDEO_V3_STANDARD]: KlingSchemas.KlingVideoV3TextToVideoSchema,
    [VideoModels.KLING_VIDEO_V3_PRO]: KlingSchemas.KlingVideoV3TextToVideoSchema,
    [VideoModels.KLING_STANDARD_IMAGE_TO_VIDEO]: KlingSchemas.KlingStandardImageToVideoSchema,
    [VideoModels.KLING_2_1]: KlingSchemas.KlingV21TextToVideoSchema,

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

/**
 * Returns the correct schema based on the model.
 */
export function getModelSchema(model: string): z.ZodTypeAny {
    const activeSchema = MODEL_SCHEMAS_CONFIG[model];

    if (!activeSchema) {
        throw new Error(`No specific schema defined for model: ${model}. Make sure it is mapped in MODEL_SCHEMAS_CONFIG.`);
    }

    return activeSchema;
}

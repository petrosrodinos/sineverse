import { z } from 'zod';
import { VideoModel } from '../constants';
import * as KlingSchemas from '../schemas/kling/kling.schemas';
import * as GoogleSchemas from '../schemas/google/google.schemas';
import * as SeedanceSchemas from '../schemas/seedance/seedance.schemas';

/**
 * Maps internal VideoModel identifiers to their specific Zod validation schemas.
 */
export const MODEL_SCHEMAS_CONFIG: Record<string, z.ZodTypeAny> = {
    // Kling AI
    [VideoModel.KLING_VIDEO_V3_STANDARD]: KlingSchemas.KlingVideoV3TextToVideoSchema,
    [VideoModel.KLING_VIDEO_V3_PRO]: KlingSchemas.KlingVideoV3TextToVideoSchema,
    [VideoModel.KLING_V2_1_STANDARD_IMAGE]: KlingSchemas.KlingStandardImageToVideoSchema,
    [VideoModel.KLING_V2_1_PRO_IMAGE]: KlingSchemas.KlingStandardImageToVideoSchema,
    [VideoModel.KLING_2_1]: KlingSchemas.KlingV21TextToVideoSchema,
    [VideoModel.KLING_1_6_STANDARD_8K]: KlingSchemas.KlingStandardTextToVideoSchema,
    [VideoModel.KLING_1_6_PRO_8K]: KlingSchemas.KlingStandardTextToVideoSchema,
    [VideoModel.KLING_AI_TEXT_8K]: KlingSchemas.KlingStandardTextToVideoSchema,
    [VideoModel.KLING_AI_IMAGE_8K]: KlingSchemas.KlingStandardImageToVideoSchema,
    [VideoModel.KLING_V1_5_PRO_TEXT]: KlingSchemas.KlingStandardTextToVideoSchema,
    [VideoModel.KLING_V1_5_STANDARD_IMAGE]: KlingSchemas.KlingStandardImageToVideoSchema,

    // Google
    [VideoModel.VEO_3]: GoogleSchemas.GoogleVeo3T2VideoSchema,
    [VideoModel.VEO_3_FAST]: GoogleSchemas.GoogleVeo3T2VideoSchema,
    [VideoModel.VEO_3_1]: GoogleSchemas.GoogleVeo3T2VideoSchema,
    [VideoModel.VEO_3_1_FAST]: GoogleSchemas.GoogleVeo3T2VideoSchema,
    [VideoModel.VEO_2_IMAGE]: GoogleSchemas.GoogleVeo3I2VideoSchema,

    // ByteDance / Seedance
    [VideoModel.SEEDANCE_1_0_PRO]: SeedanceSchemas.SeedanceProT2VSchema,
    [VideoModel.SEEDANCE_1_0_PRO_FAST]: SeedanceSchemas.SeedanceProT2VSchema,
    [VideoModel.SEEDANCE_1_0_LITE_TEXT]: SeedanceSchemas.SeedanceLiteT2VSchema,
    [VideoModel.SEEDANCE_1_0_LITE_IMAGE]: SeedanceSchemas.SeedanceLiteI2VSchema,
};

/**
 * Returns the correct schema based on the model.
 */
export function getModelSchema(model: string): z.ZodTypeAny {
    const activeSchema = MODEL_SCHEMAS_CONFIG[model];

    if (!activeSchema) {
        throw new Error(`No specific schema defined for model: ${model}. Make sure it is mapped in MODEL_SCHEMAS_CONFIG.`);
    }

    // Provider specific schemas expect provider IDs.
    // We map internal model constants to their corresponding provider model strings here.
    const providerModelId = getProviderModelId(model);

    if (providerModelId !== model) {
        return z.preprocess((data: any) => {
            if (data && typeof data === 'object') {
                return { ...data, model: providerModelId };
            }
            return data;
        }, activeSchema).transform((data: any) => {
            // Keep the internal model identifier so providers can use it for lookup
            return { ...data, model };
        });
    }

    return activeSchema;
}

/**
 * Maps the internal model identifier to the provider expected string.
 */
function getProviderModelId(model: string): string {
    const mapping: Record<string, string> = {
        [VideoModel.KLING_VIDEO_V3_STANDARD]: 'klingai/video-v3-standard-text-to-video',
        [VideoModel.KLING_VIDEO_V3_PRO]: 'klingai/video-v3-pro-text-to-video',
        [VideoModel.VEO_3]: 'google/veo3',
        [VideoModel.VEO_3_FAST]: 'google/veo-3.0-fast',
        [VideoModel.VEO_3_1]: 'google/veo-3.1-t2v',
        [VideoModel.VEO_3_1_FAST]: 'google/veo-3.1-t2v-fast',
        [VideoModel.VEO_2_IMAGE]: 'veo2/image-to-video',
        [VideoModel.SEEDANCE_1_0_PRO]: 'bytedance/seedance-1-0-pro-t2v',
        [VideoModel.SEEDANCE_1_0_PRO_FAST]: 'bytedance/seedance-1-0-pro-fast',
        [VideoModel.SEEDANCE_1_0_LITE_TEXT]: 'bytedance/seedance-1-0-lite-t2v',
        [VideoModel.SEEDANCE_1_0_LITE_IMAGE]: 'bytedance/seedance-1-0-lite-i2v',
    };

    return mapping[model] || model;
}

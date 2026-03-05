import { AiProvider, GenerationType, VideoModel } from '../constants';

export interface ModelCapability {
    provider: AiProvider;
    type: GenerationType;
    providerModel?: string; // The actual model name expected by the provider API
}

export const MODELS_CONFIG: Record<string, ModelCapability> = {
    // Kling AI
    [VideoModel.KLING_VIDEO_V3_STANDARD]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/video-v3-standard-text-to-video' },
    [VideoModel.KLING_VIDEO_V3_PRO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/video-v3-pro-text-to-video' },
    [VideoModel.KLING_2_6_PRO_TEXT_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/video-v2-6-pro-text-to-video' },
    [VideoModel.KLING_2_6_PRO_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'klingai/video-v2-6-pro-image-to-video' },
    [VideoModel.KLING_VIDEO_O1_VIDEO_REFERENCE]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'klingai/video-o1-video-to-video-reference' },
    [VideoModel.KLING_VIDEO_O1_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'klingai/video-o1-image-to-video' },
    [VideoModel.KLING_VIDEO_O1_VIDEO_EDIT]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'klingai/video-o1-video-to-video-edit' },
    [VideoModel.KLING_VIDEO_O1_REFERENCE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'klingai/video-o1-reference-to-video' },
    [VideoModel.KLING_AI_AVATAR_PRO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/avatar-pro' },
    [VideoModel.KLING_AI_AVATAR_STANDARD]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/avatar-standard' },
    [VideoModel.KLING_V2_5_TURBO_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/v2.5-turbo/pro/text-to-video' },
    [VideoModel.KLING_V2_5_TURBO_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'klingai/v2.5-turbo/pro/image-to-video' },
    [VideoModel.KLING_V1_6_MULTI_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v1.6/standard/multi-image-to-video' },
    [VideoModel.KLING_V2_1_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v2.1/pro/image-to-video' },
    [VideoModel.KLING_V2_1_STANDARD_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v2.1/standard/image-to-video' },
    [VideoModel.KLING_V1_6_STANDARD_EFFECTS]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/kling-video-v1.6-standard-effects' },
    [VideoModel.KLING_V1_5_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v1.5/pro/image-to-video' },
    [VideoModel.KLING_V1_5_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.5/pro/text-to-video' },
    [VideoModel.KLING_V1_5_STANDARD_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v1.5/standard/image-to-video' },
    [VideoModel.KLING_2_1]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v2.1/pro/text-to-video' },
    [VideoModel.KLING_2_0_MASTER]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/v2-master-text-to-video' },
    [VideoModel.KLING_1_6_PRO_EFFECTS]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'klingai/kling-video-v1.6-pro-effects' },
    [VideoModel.KLING_1_6_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.6/pro/text-to-video' },
    [VideoModel.KLING_1_6_PRO_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.6/pro/text-to-video' },
    [VideoModel.KLING_1_6_STANDARD_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.6/standard/text-to-video' },
    [VideoModel.KLING_1_6_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.6/standard/text-to-video' },
    [VideoModel.KLING_AI_TEXT_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'kling-video/v1.6/standard/text-to-video' },
    [VideoModel.KLING_AI_IMAGE_8K]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'kling-video/v1.6/standard/image-to-video' },

    // Google
    [VideoModel.VEO_3_1_FAST_EXTEND]: { provider: AiProvider.GOOGLE, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'google/veo3-1-fast-extend-video' },
    [VideoModel.VEO_3_1_EXTEND]: { provider: AiProvider.GOOGLE, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'google/veo3-1-extend-video' },
    [VideoModel.VEO_3_1_FAST]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'google/veo-3.1-t2v-fast' },
    [VideoModel.VEO_3_1]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'google/veo-3.1-t2v' },
    [VideoModel.VEO_3_FAST]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'google/veo-3.0-fast' },
    [VideoModel.VEO_3]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'google/veo3' },
    [VideoModel.VEO_2_IMAGE]: { provider: AiProvider.GOOGLE, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'veo2/image-to-video' },
    [VideoModel.VEO_2_TEXT]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'veo2' },

    // Runway
    [VideoModel.RUNWAY_ALEPH]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'runway/gen4_aleph' },
    [VideoModel.RUNWAY_ACT_TWO]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'runway/act_two' },
    [VideoModel.RUNWAY_GEN_4_TURBO]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'runway/gen4_turbo' },

    // Alibaba Cloud
    [VideoModel.WAN_2_6_VIDEO]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan-2-6-t2v' },
    [VideoModel.WAN_2_2_ANIMATE_REPLACE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-14b-animate-replace' },
    [VideoModel.WAN_2_2_ANIMATE_MOVE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-14b-animate-move' },
    [VideoModel.WAN_2_2_VACE_DEPTH]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-vace-fun-a14b-depth' },
    [VideoModel.WAN_2_2_VACE_INPAINTING]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-vace-fun-a14b-inpainting' },
    [VideoModel.WAN_2_2_VACE_OUTPAINTING]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-vace-fun-a14b-outpainting' },
    [VideoModel.WAN_2_2_VACE_REFRAME]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-vace-fun-a14b-reframe' },
    [VideoModel.WAN_2_2_VACE_POSE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO, providerModel: 'alibaba/wan2.2-vace-fun-a14b-pose' },
    [VideoModel.WAN_2_5_TEXT_PREVIEW]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan2.5-t2v-preview' },
    [VideoModel.WAN_2_5_IMAGE_PREVIEW]: { provider: AiProvider.ALIBABA, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'alibaba/wan2.5-i2v-preview' },
    [VideoModel.WAN_2_1_PLUS]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan2.1-t2v-plus' },
    [VideoModel.WAN_2_1_TURBO]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan2.1-t2v-turbo' },
    [VideoModel.WAN_2_2_PLUS_IMAGE]: { provider: AiProvider.ALIBABA, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'alibaba/wan2.2-i2v-plus' },
    [VideoModel.WAN_2_2_PLUS_TEXT]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan2.2-t2v-plus' },
    [VideoModel.WAN_2_1]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'alibaba/wan2.1-t2v-plus' },

    // ByteDance
    [VideoModel.OMNIHUMAN_V1_5]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'bytedance/omnihuman/v1.5' },
    [VideoModel.OMNIHUMAN_1_5_ALT]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'bytedance/omnihuman' },
    [VideoModel.SEEDANCE_1_0_PRO_FAST]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'bytedance/seedance-1-0-pro-fast' },
    [VideoModel.SEEDANCE_1_0_PRO]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'bytedance/seedance-1-0-pro-t2v' },
    [VideoModel.SEEDANCE_1_0_LITE_IMAGE]: { provider: AiProvider.BYTEDANCE, type: GenerationType.IMAGE_TO_VIDEO, providerModel: 'bytedance/seedance-1-0-lite-i2v' },
    [VideoModel.SEEDANCE_1_0_LITE_TEXT]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO, providerModel: 'bytedance/seedance-1-0-lite-t2v' },

    // Legacy/Constants Support
    [VideoModel.V3_PRO_TEXT_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.V1_STANDARD_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
};

export function getModelConfig(model: string): ModelCapability | undefined {
    return MODELS_CONFIG[model];
}

/**
 * Returns the actual model identifier to be used in the API request to the provider.
 * Falls back to the internal identifier if no specific provider format is defined.
 */
export function getProviderModelId(model: string): string {
    const config = MODELS_CONFIG[model];
    return config?.providerModel || model;
}

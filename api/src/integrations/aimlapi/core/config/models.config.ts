import { AiProvider, GenerationType, VideoModel } from '../constants';

export interface ModelCapability {
    provider: AiProvider;
    type: GenerationType;
}

export const MODELS_CONFIG: Record<string, ModelCapability> = {
    // Kling AI
    [VideoModel.KLING_VIDEO_V3_STANDARD]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_VIDEO_V3_PRO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_2_6_PRO_TEXT_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_2_6_PRO_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_VIDEO_O1_VIDEO_REFERENCE]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.KLING_VIDEO_O1_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_VIDEO_O1_VIDEO_EDIT]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.KLING_VIDEO_O1_REFERENCE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.KLING_AI_AVATAR_PRO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_AI_AVATAR_STANDARD]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_V2_5_TURBO_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_V2_5_TURBO_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_V1_6_MULTI_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_V2_1_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_V2_1_STANDARD_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_V1_6_STANDARD_EFFECTS]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_V1_5_PRO_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_V1_5_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_V1_5_STANDARD_IMAGE]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.KLING_2_1]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_2_0_MASTER]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_1_6_PRO_EFFECTS]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_1_6_PRO_TEXT]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_1_6_PRO_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_1_6_STANDARD_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_1_6_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_AI_TEXT_8K]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.KLING_AI_IMAGE_8K]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },

    // Google
    [VideoModel.VEO_3_1_FAST_EXTEND]: { provider: AiProvider.GOOGLE, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.VEO_3_1_EXTEND]: { provider: AiProvider.GOOGLE, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.VEO_3_1_FAST]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.VEO_3_1]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.VEO_3_FAST]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.VEO_3]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.VEO_2_IMAGE]: { provider: AiProvider.GOOGLE, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.VEO_2_TEXT]: { provider: AiProvider.GOOGLE, type: GenerationType.TEXT_TO_VIDEO },

    // Runway
    [VideoModel.RUNWAY_ALEPH]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.RUNWAY_ACT_TWO]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.RUNWAY_GEN_4_TURBO]: { provider: AiProvider.RUNWAY, type: GenerationType.TEXT_TO_VIDEO },

    // Alibaba Cloud
    [VideoModel.WAN_2_6_VIDEO]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.WAN_2_2_ANIMATE_REPLACE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_ANIMATE_MOVE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_VACE_DEPTH]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_VACE_INPAINTING]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_VACE_OUTPAINTING]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_VACE_REFRAME]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_2_VACE_POSE]: { provider: AiProvider.ALIBABA, type: GenerationType.VIDEO_TO_VIDEO },
    [VideoModel.WAN_2_5_TEXT_PREVIEW]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.WAN_2_5_IMAGE_PREVIEW]: { provider: AiProvider.ALIBABA, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.WAN_2_1_PLUS]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.WAN_2_1_TURBO]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.WAN_2_2_PLUS_IMAGE]: { provider: AiProvider.ALIBABA, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.WAN_2_2_PLUS_TEXT]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.WAN_2_1]: { provider: AiProvider.ALIBABA, type: GenerationType.TEXT_TO_VIDEO },

    // ByteDance
    [VideoModel.OMNIHUMAN_V1_5]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.OMNIHUMAN_1_5_ALT]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.SEEDANCE_1_0_PRO_FAST]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.SEEDANCE_1_0_PRO]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.SEEDANCE_1_0_LITE_IMAGE]: { provider: AiProvider.BYTEDANCE, type: GenerationType.IMAGE_TO_VIDEO },
    [VideoModel.SEEDANCE_1_0_LITE_TEXT]: { provider: AiProvider.BYTEDANCE, type: GenerationType.TEXT_TO_VIDEO },

    // Legacy/Constants Support
    [VideoModel.V3_PRO_TEXT_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.TEXT_TO_VIDEO },
    [VideoModel.V1_STANDARD_IMAGE_TO_VIDEO]: { provider: AiProvider.KLING, type: GenerationType.IMAGE_TO_VIDEO },
};

export function getModelConfig(model: string): ModelCapability | undefined {
    return MODELS_CONFIG[model];
}

export const AiProvider = {
    KLING: 'kling',
    RUNWAY: 'runway',
    GOOGLE: 'google',
    ALIBABA: 'alibaba',
    BYTEDANCE: 'bytedance',
    OPENAI: 'openai',
} as const;


export const GenerationType = {
    TEXT_TO_VIDEO: 'text-to-video',
    IMAGE_TO_VIDEO: 'image-to-video',
    VIDEO_TO_VIDEO: 'video-to-video',
} as const;

export const VideoModel = {
    // Kling AI
    KLING_VIDEO_V3_STANDARD: "kling-video-v3-standard",
    KLING_VIDEO_V3_PRO: "kling-video-v3-pro",
    KLING_2_6_PRO_TEXT_TO_VIDEO: "kling-2.6-pro-text-to-video",
    KLING_2_6_PRO_IMAGE_TO_VIDEO: "kling-2.6-pro-image-to-video",
    KLING_VIDEO_O1_VIDEO_REFERENCE: "kling-video-o1-video-reference",
    KLING_VIDEO_O1_IMAGE_TO_VIDEO: "kling-video-o1-image-to-video",
    KLING_VIDEO_O1_VIDEO_EDIT: "kling-video-o1-video-edit",
    KLING_VIDEO_O1_REFERENCE_TO_VIDEO: "kling-video-o1-reference-to-video",
    KLING_AI_AVATAR_PRO: "kling-ai-avatar-pro",
    KLING_AI_AVATAR_STANDARD: "kling-ai-avatar-standard",
    KLING_V2_5_TURBO_PRO_TEXT: "kling-v2.5-turbo-pro-text",
    KLING_V2_5_TURBO_PRO_IMAGE: "kling-v2.5-turbo-pro-image",
    KLING_V1_6_MULTI_IMAGE: "kling-v1.6-multi-image",
    KLING_V2_1_PRO_IMAGE: "kling-v2.1-pro-image",
    KLING_V2_1_STANDARD_IMAGE: "kling-v2.1-standard-image",
    KLING_V1_5_PRO_IMAGE: "kling-v1.5-pro-image",
    KLING_V1_5_PRO_TEXT: "kling-v1.5-pro-text",
    KLING_V1_5_STANDARD_IMAGE: "kling-v1.5-standard-image",
    KLING_2_1: "kling-2.1",
    KLING_2_0_MASTER: "kling-2.0-master",
    KLING_1_6_PRO_EFFECTS: "kling-1.6-pro-effects",
    KLING_V1_6_STANDARD_EFFECTS: "kling-v1.6-standard-effects",
    KLING_1_6_PRO_TEXT: "kling-1.6-pro-text",
    KLING_1_6_PRO_8K: "kling-1.6-pro-8k",
    KLING_1_6_STANDARD_8K: "kling-1.6-standard-8k",
    KLING_1_6_8K: "kling-1.6-8k",
    KLING_AI_TEXT_8K: "kling-ai-text-8k",
    KLING_AI_IMAGE_8K: "kling-ai-image-8k",

    // Google
    VEO_3_1_FAST_EXTEND: "veo-3.1-fast-extend",
    VEO_3_1_EXTEND: "veo-3.1-extend",
    VEO_3_1_FAST: "veo-3.1-fast",
    VEO_3_1: "veo-3.1",
    VEO_3_FAST: "veo-3-fast",
    VEO_3: "veo-3",
    VEO_2_IMAGE: "veo-2-image",
    VEO_2_TEXT: "veo-2-text",

    // Runway
    RUNWAY_ALEPH: "runway-aleph",
    RUNWAY_ACT_TWO: "runway-act-two",
    RUNWAY_GEN_4_TURBO: "runway-gen-4-turbo",

    // Alibaba Cloud
    WAN_2_6_VIDEO: "wan-2.6-video",
    WAN_2_2_ANIMATE_REPLACE: "wan-2.2-animate-replace",
    WAN_2_2_ANIMATE_MOVE: "wan-2.2-animate-move",
    WAN_2_2_VACE_DEPTH: "wan-2.2-vace-depth",
    WAN_2_2_VACE_INPAINTING: "wan-2.2-vace-inpainting",
    WAN_2_2_VACE_OUTPAINTING: "wan-2.2-vace-outpainting",
    WAN_2_2_VACE_REFRAME: "wan-2.2-vace-reframe",
    WAN_2_2_VACE_POSE: "wan-2.2-vace-pose",
    WAN_2_5_TEXT_PREVIEW: "wan-2.5-text-preview",
    WAN_2_5_IMAGE_PREVIEW: "wan-2.5-image-preview",
    WAN_2_1_PLUS: "wan-2.1-plus",
    WAN_2_1_TURBO: "wan-2.1-turbo",
    WAN_2_2_PLUS_IMAGE: "wan-2.2-plus-image",
    WAN_2_2_PLUS_TEXT: "wan-2.2-plus-text",
    WAN_2_1: "wan-2.1",

    // ByteDance
    OMNIHUMAN_V1_5: "omnihuman-v1.5",
    OMNIHUMAN_1_5_ALT: "omnihuman-1.5-alt",
    SEEDANCE_1_0_PRO_FAST: "seedance-1.0-pro-fast",
    SEEDANCE_1_0_PRO: "seedance-1.0-pro",
    SEEDANCE_1_0_LITE_IMAGE: "seedance-1.0-lite-image",
    SEEDANCE_1_0_LITE_TEXT: "seedance-1.0-lite-text",

    // Legacy Support
    V3_PRO_TEXT_TO_VIDEO: 'klingai/video-v3-pro-text-to-video',
    V1_STANDARD_IMAGE_TO_VIDEO: 'kling-video/v1/standard/image-to-video',
} as const;

export type VideoModel = typeof VideoModel[keyof typeof VideoModel];
export type GenerationType = typeof GenerationType[keyof typeof GenerationType];
export type AiProvider = typeof AiProvider[keyof typeof AiProvider];

export const VIDEO_PROVIDER_TOKEN = 'VIDEO_PROVIDER_TOKEN';

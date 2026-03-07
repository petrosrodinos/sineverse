export const VideoModels = {
    // Kling AI
    KLING_STANDARD_TEXT_TO_VIDEO: "kling-video/v1/standard/text-to-video",
    KLING_VIDEO_V3_STANDARD: "klingai/video-v3-standard-text-to-video",
    KLING_VIDEO_V3_PRO: "klingai/video-v3-pro-text-to-video",
    KLING_STANDARD_IMAGE_TO_VIDEO: "kling-video/v1/standard/image-to-video",
    KLING_2_1: "klingai/v2.1-master-text-to-video",

    // Google
    VEO_3: "google/veo3",
    VEO_3_FAST: "google/veo-3.0-fast",
    VEO_3_1: "google/veo-3.1-t2v",
    VEO_3_1_FAST: "google/veo-3.1-t2v-fast",
    VEO_2_IMAGE: "google/veo-3.0-i2v",

    // ByteDance
    SEEDANCE_1_0_PRO: "bytedance/seedance-1-0-pro-t2v",
    SEEDANCE_1_0_PRO_FAST: "bytedance/seedance-1-0-pro-fast",
    SEEDANCE_1_0_LITE_TEXT: "bytedance/seedance-1-0-lite-t2v",
    SEEDANCE_1_0_LITE_IMAGE: "bytedance/seedance-1-0-lite-i2v",
} as const;

export type VideoModel = typeof VideoModels[keyof typeof VideoModels];
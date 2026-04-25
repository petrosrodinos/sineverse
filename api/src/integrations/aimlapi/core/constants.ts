export const VideoModels = {
  KLING_STANDARD_TEXT_TO_VIDEO: 'kling-video/v1/standard/text-to-video',
  KLING_VIDEO_V3_STANDARD: 'klingai/video-v3-standard-text-to-video',
  KLING_VIDEO_V3_PRO: 'klingai/video-v3-pro-text-to-video',
  KLING_VIDEO_V3_STANDARD_IMAGE: 'klingai/video-v3-standard-image-to-video',
  KLING_VIDEO_V2_6_PRO_IMAGE: 'klingai/video-v2-6-pro-image-to-video',
  KLING_VIDEO_O1_IMAGE: 'klingai/video-o1-image-to-video',
  KLING_V2_5_TURBO_PRO_IMAGE: 'klingai/v2.5-turbo/pro/image-to-video',
  KLING_STANDARD_IMAGE_TO_VIDEO: 'kling-video/v1/standard/image-to-video',
  KLING_V1_PRO_IMAGE_TO_VIDEO: 'kling-video/v1/pro/image-to-video',
  KLING_V1_6_MULTI_IMAGE_TO_VIDEO:
    'kling-video/v1.6/standard/multi-image-to-video',
  KLING_V2_1_STANDARD_IMAGE_TO_VIDEO:
    'kling-video/v2.1/standard/image-to-video',
  KLING_2_1: 'klingai/v2.1-master-text-to-video',
  KLING_2_1_IMAGE: 'klingai/v2.1-master-image-to-video',

  VEO_3: 'google/veo3',
  VEO_3_FAST: 'google/veo-3.0-fast',
  VEO_3_1: 'google/veo-3.1-t2v',
  VEO_3_1_FAST: 'google/veo-3.1-t2v-fast',
  VEO_3_1_IMAGE: 'google/veo-3.1-i2v',
  VEO_2_IMAGE: 'google/veo-3.0-i2v',
  VEO_2_IMAGE_LEGACY: 'veo2/image-to-video',

  WAN_2_5_IMAGE_PREVIEW: 'alibaba/wan2.5-i2v-preview',

  LTXV_2: 'ltxv/ltxv-2',
  LTXV_2_FAST: 'ltxv/ltxv-2-fast',

  RUNWAY_ACT_TWO: 'runway-act-two',

  SEEDANCE_1_0_PRO: 'bytedance/seedance-1-0-pro-t2v',
  SEEDANCE_1_0_PRO_FAST: 'bytedance/seedance-1-0-pro-fast',
  SEEDANCE_1_0_LITE_TEXT: 'bytedance/seedance-1-0-lite-t2v',
  SEEDANCE_1_0_LITE_IMAGE: 'bytedance/seedance-1-0-lite-i2v',
} as const;

export const ImageModels = {
  // Kling AI
  KLING_IMAGE_O1: 'klingai/image-o1',

  // Google
  IMAGEN_4_FAST: 'google/imagen-4.0-fast-generate-001',
  IMAGEN_4: 'google/imagen-4.0-generate-001',

  // OpenAI
  DALLE_3: 'dall-e-3',
  GPT_IMAGE_1_5: 'openai/gpt-image-1-5',
} as const;

export type ImageModel = (typeof ImageModels)[keyof typeof ImageModels];

export type VideoModel = (typeof VideoModels)[keyof typeof VideoModels];

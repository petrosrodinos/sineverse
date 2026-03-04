export enum AiProvider {
    KLING = 'kling',
    RUNWAY = 'runway', // Placeholder for future
    OPENAI = 'openai', // Placeholder for future
}

export enum GenerationType {
    TEXT_TO_VIDEO = 'text-to-video',
    IMAGE_TO_VIDEO = 'image-to-video',
    VIDEO_TO_VIDEO = 'video-to-video',
}

export enum KlingModel {
    V3_PRO_TEXT_TO_VIDEO = 'klingai/video-v3-pro-text-to-video',
    V1_STANDARD_IMAGE_TO_VIDEO = 'kling-video/v1/standard/image-to-video',
}

export const VIDEO_PROVIDER_TOKEN = 'VIDEO_PROVIDER_TOKEN';

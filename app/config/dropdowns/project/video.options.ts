import { VideoStatuses } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export const VideoStatusLabels = {
    [VideoStatuses.PENDING]: "Pending",
    [VideoStatuses.PROCESSING]: "Processing",
    [VideoStatuses.COMPLETED]: "Completed",
    [VideoStatuses.FAILED]: "Failed",
}

export const KlingVideoModels = [
    { name: "klingai/video-v3-standard-text-to-video", label: "Kling Video v3 Standard", provider: "Kling AI", price: { perSecond: 0.218 } },
    { name: "klingai/video-v3-pro-text-to-video", label: "Kling Video v3 Pro", provider: "Kling AI", price: { perSecond: 0.291 } },
    { name: "klingai/v2.1-master-text-to-video", label: "Kling 2.1", provider: "Kling AI", price: { perSecond: 0.294 } },
    { name: "kling-video/v1/standard/text-to-video", label: "Kling V1.5 Pro Text-to-Video", provider: "Kling AI", price: { perSecond: 0.103 } },
    { name: "kling-video/v1/standard/image-to-video", label: "Kling Standard Image-to-Video", provider: "Kling AI", price: { perSecond: 0.059 } },
];

export const GoogleVideoModels = [
    { name: "google/veo-3.1-t2v-fast", label: "Veo 3.1 Fast", provider: "Google", price: { perSecond: 0.13 } },
    { name: "google/veo-3.1-t2v", label: "Veo 3.1", provider: "Google", price: { perSecond: 0.26 } },
    { name: "google/veo-3.0-fast", label: "Veo 3 Fast", provider: "Google", price: { perSecond: 0.105 } },
    { name: "google/veo3", label: "Veo 3", provider: "Google", price: { perSecond: 0.26 } },
    { name: "google/veo-3.0-i2v", label: "Veo 2 Image-to-Video", provider: "Google", price: { perSecond: 0.455 } },
];

export const BytedanceVideoModels = [
    { name: "bytedance/seedance-1-0-pro-fast", label: "Seedance 1.0 Pro Fast", provider: "ByteDance", price: { perMillionTokens: 3.25 } },
    { name: "bytedance/seedance-1-0-pro-t2v", label: "Seedance 1.0 Pro", provider: "ByteDance", price: { perGeneration: 3.25 } },
    { name: "bytedance/seedance-1-0-lite-i2v", label: "Seedance 1.0 Lite Image-to-Video", provider: "ByteDance", price: { perGeneration: 0.024 } },
    { name: "bytedance/seedance-1-0-lite-t2v", label: "Seedance 1.0 Lite Text-to-Video", provider: "ByteDance", price: { perGeneration: 0.024 } },
]

export const VideoModels = [
    ...KlingVideoModels,
    ...GoogleVideoModels,
    ...BytedanceVideoModels,
];

export default VideoModels;
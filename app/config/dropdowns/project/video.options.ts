import { VideoStatuses } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export const VideoStatusLabels = {
    [VideoStatuses.PENDING]: "Pending",
    [VideoStatuses.PROCESSING]: "Processing",
    [VideoStatuses.COMPLETED]: "Completed",
    [VideoStatuses.FAILED]: "Failed",
}

export const KlingVideoModels = [
    { name: "kling-video-v3-standard", label: "Kling Video v3 Standard", provider: "Kling AI", price: { perSecond: 0.218 } },
    { name: "kling-video-v3-pro", label: "Kling Video v3 Pro", provider: "Kling AI", price: { perSecond: 0.291 } },
    { name: "kling-2.6-pro-text-to-video", label: "Kling 2.6 Pro Text-to-Video", provider: "Kling AI", price: { perSecond: 0.091 } },
    { name: "kling-2.6-pro-image-to-video", label: "Kling 2.6 Pro Image-to-Video", provider: "Kling AI", price: { perSecond: 0.091 } },
    { name: "kling-video-o1-video-reference", label: "Kling Video O1 Video-to-Video Reference", provider: "Kling AI", price: { perSecond: 0.218 } },
    { name: "kling-video-o1-image-to-video", label: "Kling Video O1 Image-to-Video", provider: "Kling AI", price: { perSecond: 0.118 } },
    { name: "kling-video-o1-video-edit", label: "Kling Video O1 Video-to-Video Edit", provider: "Kling AI", price: { perSecond: 0.218 } },
    { name: "kling-video-o1-reference-to-video", label: "Kling Video O1 Reference-to-Video", provider: "Kling AI", price: { perSecond: 0.146 } },
    { name: "kling-ai-avatar-pro", label: "Kling AI Avatar Pro", provider: "Kling AI", price: { perSecond: 0.15 } },
    { name: "kling-ai-avatar-standard", label: "Kling AI Avatar Standard", provider: "Kling AI", price: { perSecond: 0.073 } },
    { name: "kling-v2.5-turbo-pro-text", label: "Kling Video v2.5 Turbo Pro Text-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.091 } },
    { name: "kling-v2.5-turbo-pro-image", label: "Kling Video v2.5 Turbo Pro Image-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.091 } },
    { name: "kling-v1.6-multi-image", label: "Kling V1.6 Multi-Image-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.059 } },
    { name: "kling-v2.1-pro-image", label: "Kling V2.1 Pro Image-to-Video", provider: "Kuaishou Technology", price: { perGeneration: 0.103 } },
    { name: "kling-v2.1-standard-image", label: "Kling V2.1 Standard Image-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.059 } },
    { name: "kling-v1.5-pro-image", label: "Kling V1.5 Pro Image-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.103 } },
    { name: "kling-v1.5-pro-text", label: "Kling V1.5 Pro Text-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.103 } },
    { name: "kling-v1.5-standard-image", label: "Kling V1.5 Standard Image-to-Video", provider: "Kuaishou Technology", price: { perSecond: 0.059 } },
    { name: "kling-2.1", label: "Kling 2.1", provider: "Kuaishou Technology", price: { perSecond: 0.294 } },
    { name: "kling-2.0-master", label: "Kling 2.0 Master", provider: "Kuaishou Technology", price: { perSecond: 0.294 } },
    { name: "kling-1.6-pro-effects", label: "Kling 1.6 Pro Effects", provider: "Kuaishou Technology", price: { perSecond: 0.103 } },
    { name: "kling-v1.6-standard-effects", label: "Kling Video v1.6 Standard Effects", provider: "Kuaishou Technology", price: { perSecond: 0.048 } },
    { name: "kling-1.6-pro-text", label: "Kling 1.6 Pro (Text-to-Video)", provider: "Kuaishou Technology", price: { perSecond: 0.103 } },
    { name: "kling-1.6-pro-8k", label: "Kling 1.6 Pro 8K", provider: "Kuaishou Technology", price: { perSecond: 0.103 } },
    { name: "kling-1.6-standard-8k", label: "Kling 1.6 Standard 8K", provider: "Kuaishou Technology", price: { perSecond: 0.059 } },
    { name: "kling-1.6-8k", label: "Kling 1.6 8K", provider: "Kuaishou Technology", price: { perSecond: 0.032 } },
    { name: "kling-ai-text-8k", label: "Kling AI (Text-to-Video) 8K", provider: "Kuaishou Technology", price: { perSecond: 0.029 } },
    { name: "kling-ai-image-8k", label: "Kling AI (Image-to-Video) 8K", provider: "Kuaishou Technology", price: { perSecond: 0.029 } },
];

export const GoogleVideoModels = [
    { name: "veo-3.1-fast-extend", label: "Veo 3.1 Fast Extend Video", provider: "Google", price: { perSecond: 0.13 } },
    { name: "veo-3.1-extend", label: "Veo 3.1 Extend Video", provider: "Google", price: { perSecond: 0.26 } },
    { name: "veo-3.1-fast", label: "Veo 3.1 Fast", provider: "Google", price: { perSecond: 0.13 } },
    { name: "veo-3.1", label: "Veo 3.1", provider: "Google", price: { perSecond: 0.26 } },
    { name: "veo-3-fast", label: "Veo 3 Fast", provider: "Google", price: { perSecond: 0.105 } },
    { name: "veo-3", label: "Veo 3", provider: "Google", price: { perSecond: 0.26 } },
    { name: "veo-2-image", label: "Veo 2 Image-to-Video", provider: "Google", price: { perSecond: 0.455 } },
    { name: "veo-2-text", label: "Veo 2 Text-to-Video", provider: "Google", price: { perSecond: 0.455 } },
];

export const RunWayVideoModels = [
    { name: "runway-aleph", label: "Runway Aleph", provider: "Runway", price: { perSecond: 0.195 } },
    { name: "runway-act-two", label: "Runway Act Two", provider: "Runway", price: { perSecond: 0.065 } },
    { name: "runway-gen-4-turbo", label: "Runway Gen-4 Turbo", provider: "Runway", price: { perSecond: 0.065 } },
]

export const AliBabaVideoModels = [
    { name: "wan-2.6-video", label: "Wan 2.6 Video", provider: "Alibaba Cloud", price: { perSecond: 0.13 } },
    { name: "wan-2.2-animate-replace", label: "Wan 2.2 Animate Replace", provider: "Alibaba Cloud", price: { perGeneration: 0.052 } },
    { name: "wan-2.2-animate-move", label: "Wan 2.2 Animate Move", provider: "Alibaba Cloud", price: { perGeneration: 0.052 } },
    { name: "wan-2.2-vace-depth", label: "Wan 2.2 Vace Depth", provider: "Alibaba Cloud", price: { perGeneration: 0.065 } },
    { name: "wan-2.2-vace-inpainting", label: "Wan 2.2 Vace Inpainting", provider: "Alibaba Cloud", price: { perGeneration: 0.065 } },
    { name: "wan-2.2-vace-outpainting", label: "Wan 2.2 Vace Outpainting", provider: "Alibaba Cloud", price: { perGeneration: 0.065 } },
    { name: "wan-2.2-vace-reframe", label: "Wan 2.2 Vace Reframe", provider: "Alibaba Cloud", price: { perGeneration: 0.065 } },
    { name: "wan-2.2-vace-pose", label: "Wan 2.2 Vace Pose", provider: "Alibaba Cloud", price: { perGeneration: 0.065 } },
    { name: "wan-2.5-text-preview", label: "Wan 2.5 Text-to-Video Preview", provider: "Alibaba Cloud", price: { perSecond: 0.065 } },
    { name: "wan-2.5-image-preview", label: "Wan 2.5 Image-to-Video Preview", provider: "Alibaba Cloud", price: { perSecond: 0.065 } },
    { name: "wan-2.1-plus", label: "Wan 2.1 Plus", provider: "Alibaba Cloud", price: { perGeneration: 0.65 } },
    { name: "wan-2.1-turbo", label: "Wan 2.1 Turbo", provider: "Alibaba Cloud", price: { perGeneration: 0.189 } },
    { name: "wan-2.2-plus-image", label: "Wan 2.2 Plus Image-to-Video", provider: "Alibaba Cloud", price: { perGeneration: 0.525 } },
    { name: "wan-2.2-plus-text", label: "Wan 2.2 Plus Text-to-Video", provider: "Alibaba Cloud", price: { perGeneration: 0.525 } },
    { name: "wan-2.1", label: "Wan 2.1", provider: "Alibaba Cloud", price: { perSecond: 0.047 } },
]

export const BytedanceVideoModels = [
    { name: "omnihuman-v1.5", label: "OmniHuman v1.5", provider: "ByteDance", price: { perSecond: 0.208 } },
    { name: "omnihuman-1.5-alt", label: "OmniHuman 1.5", provider: "ByteDance", price: { perSecond: 0.156 } },
    { name: "seedance-1.0-pro-fast", label: "Seedance 1.0 Pro Fast", provider: "ByteDance", price: { perMillionTokens: 3.25 } },
    { name: "seedance-1.0-pro", label: "Seedance 1.0 Pro", provider: "ByteDance", price: { perGeneration: 3.25 } },
    { name: "seedance-1.0-lite-image", label: "Seedance 1.0 Lite Image-to-Video", provider: "ByteDance", price: { perGeneration: 0.024 } },
    { name: "seedance-1.0-lite-text", label: "Seedance 1.0 Lite Text-to-Video", provider: "ByteDance", price: { perGeneration: 0.024 } },
]

export const VideoModels = [
    ...KlingVideoModels,
    ...GoogleVideoModels,
    ...RunWayVideoModels,
    // ...AliBabaVideoModels,
    ...BytedanceVideoModels,

];


export default VideoModels;
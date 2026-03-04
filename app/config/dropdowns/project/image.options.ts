// ===============================
// GOOGLE
// ===============================
export const GoogleImageModels = [
    {
        name: "gemini-3.1-flash-image",
        label: "Gemini 3.1 Flash Image (Nano Banana 2)",
        price: { inputPer1M: 0.325, outputPer1M: 78 }
    },
    {
        name: "gemini-3-pro-image",
        label: "Gemini 3 Pro Image (Nano Banana Pro)",
        price: { perGeneration: 0.195 }
    },
    {
        name: "gemini-2.5-flash-image",
        label: "Gemini 2.5 Flash Image (Nano Banana)",
        price: { perGeneration: 0.051 }
    },
    { name: "imagen-4-ultra-generate", label: "Imagen 4.0 Ultra Generate", price: { perGeneration: 0.078 } },
    { name: "imagen-4-fast-generate", label: "Imagen 4.0 Fast Generate", price: { perGeneration: 0.026 } },
    { name: "imagen-4-generate", label: "Imagen 4.0 Generate", price: { perGeneration: 0.052 } },
    { name: "imagen-4-ultra", label: "Imagen 4 Ultra", price: { perGeneration: 0.078 } },
    { name: "imagen-4-preview", label: "Imagen 4 Preview", price: { perGeneration: 0.052 } },
    { name: "imagen-3", label: "Imagen 3", price: { perGeneration: 0.039 } }
];


// ===============================
// ALIBABA CLOUD
// ===============================
export const AliBabaImageModels = [
    { name: "wan-2.6", label: "Wan 2.6", price: { perGeneration: 0.039 } },
    { name: "wan-2.2-flash", label: "Wan 2.2 Flash", price: { perGeneration: 0.033 } },
    { name: "wan-2.2-plus", label: "Wan 2.2 Plus", price: { perGeneration: 0.065 } },
    { name: "wan-2.5-preview", label: "Wan 2.5 Preview", price: { perGeneration: 0.039 } },
    { name: "z-image-turbo-lora", label: "Z-Image Turbo LoRA", price: { perMegapixel: 0.011 } },
    { name: "z-image-turbo", label: "Z-Image Turbo", price: { perMegapixel: 0.007 } },
    { name: "qwen-image-edit", label: "Qwen Image Edit", price: { perGeneration: 0.059 } },
    { name: "qwen-image", label: "Qwen Image", price: { perGeneration: 0.026 } }
];


// ===============================
// BLACK FOREST LABS
// ===============================
export const BlackForestImageModels = [
    {
        name: "flux-2-max-edit",
        label: "FLUX.2 Max Edit",
        price: { perMegapixel: 0.091, additionalPerMegapixel: 0.039 }
    },
    {
        name: "flux-2-max",
        label: "FLUX.2 Max",
        price: { perMegapixel: 0.091, additionalPerMegapixel: 0.039 }
    },
    { name: "flux-2-lora", label: "Flux 2 LoRA", price: { perMegapixel: 0.027 } },
    { name: "flux-2-pro", label: "FLUX.2 [pro]", price: { perMegapixel: 0.039 } },
    { name: "flux-2", label: "FLUX.2", price: { perMegapixel: 0.016 } },
    { name: "flux-srpo-image-to-image", label: "Flux SRPO Image-to-Image", price: { perMegapixel: 0.033 } },
    { name: "flux-srpo", label: "Flux SRPO", price: { perMegapixel: 0.033 } },
    { name: "flux-1-kontext-pro", label: "Flux.1 Kontext [pro]", price: { perGeneration: 0.052 } },
    { name: "flux-1-kontext-max", label: "Flux.1 Kontext [max]", price: { perGeneration: 0.104 } },
    { name: "flux-pro-1.1-ultra", label: "Flux pro 1.1 ultra", price: { perGeneration: 0.078 } },
    { name: "flux-pro-1.1", label: "Flux pro 1.1", price: { perGeneration: 0.052 } },
    { name: "flux-realism", label: "Flux realism", price: { perGeneration: 0.046 } },
    { name: "flux-schnell", label: "Flux Schnell", price: { perGeneration: 0.004 } },
    { name: "flux-dev", label: "Flux dev", price: { perGeneration: 0.033 } },
    { name: "flux-pro", label: "Flux pro", price: { perGeneration: 0.065 } }
];


// ===============================
// OPENAI
// ===============================
export const OpenAiImageModels = [
    {
        name: "gpt-image-1.5",
        label: "GPT Image 1.5",
        price: { inputTextPer1M: 6.5, inputImagePer1M: 10.4 }
    },
    {
        name: "gpt-image-1-mini",
        label: "GPT Image 1 Mini",
        price: { perGeneration: 0.007, additionalPerGeneration: 0.676 }
    },
    {
        name: "gpt-image-1-model",
        label: "GPT Image 1 Model",
        price: {
            lowQuality1024: 0.012,
            highQuality1024: 0.175
        }
    },
    {
        name: "dalle-2",
        label: "DALL·E 2",
        price: { highRes: 0.026, lowRes: 0.021 }
    },
    {
        name: "dalle-3",
        label: "DALL·E 3",
        price: { standard: 0.052, highQuality: 0.104 }
    }
];


// ===============================
// BYTEDANCE
// ===============================
export const BytedanceImageModels = [
    { name: "seedream-4.5", label: "Seedream 4.5", price: { perGeneration: 0.052 } },
    { name: "uso", label: "USO", price: { perMegapixel: 0.13 } },
    { name: "seedream-4-edit", label: "Seedream 4 Edit", price: { perGeneration: 0.039 } },
    { name: "seedream-4-text", label: "Seedream 4 Text-to-Image", price: { perGeneration: 0.032 } },
    { name: "seedream-3", label: "Seedream 3.0", price: { perGeneration: 0.032 } }
];


// ===============================
// OTHER PROVIDERS
// ===============================
export const OtherImageModels = [
    { name: "kling-image-o1", label: "Kling Image O1", provider: "Kling AI", price: { perGeneration: 0.036 } },
    { name: "grok-2-image", label: "Grok-2 Image", provider: "xAI", price: { perGeneration: 0.091 } },
    { name: "hunyuan3d-part", label: "Hunyuan3D Part", provider: "Tencent", price: { perGeneration: 0.052 } },
    { name: "hunyuanimage-3", label: "HunyuanImage 3.0", provider: "Tencent", price: { perMegapixel: 0.13 } },
    { name: "reve-remix", label: "Reve Remix Image", provider: "Reve", price: { perGeneration: 0.052 } },
    { name: "reve-edit", label: "Reve Edit Image", provider: "Reve", price: { perGeneration: 0.052 } },
    { name: "reve-create", label: "Reve Create Image", provider: "Reve", price: { perGeneration: 0.031 } },
    { name: "recraft-v3", label: "Recraft V3", provider: "RecraftAI", price: { perGeneration: 0.052 } },
    { name: "stable-diffusion-3.5-large", label: "Stable Diffusion 3.5 Large", provider: "Stability AI", price: { perGeneration: 0.085 } },
    { name: "stable-diffusion-3", label: "Stable Diffusion 3", provider: "Stability AI", price: { perGeneration: 0.046 } }
];



export const imageModels = [
    ...GoogleImageModels,
    ...AliBabaImageModels,
    ...BlackForestImageModels,
    ...OpenAiImageModels,
    ...BytedanceImageModels,
    ...OtherImageModels
];

export default imageModels;
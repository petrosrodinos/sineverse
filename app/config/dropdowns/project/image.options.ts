// ===============================
// GOOGLE
// ===============================
export const GoogleImageModels = [
    { name: "google/imagen-4.0-fast-generate-001", label: "Imagen 4.0 Fast Generate", provider: "Google", price: { perGeneration: 0.026 } },
    { name: "google/imagen-4.0-generate-001", label: "Imagen 4.0 Generate", provider: "Google", price: { perGeneration: 0.052 } },
];


// ===============================
// OPENAI
// ===============================
export const OpenAiImageModels = [
    {
        name: "openai/gpt-image-1-5",
        label: "GPT Image 1.5",
        provider: "OpenAI",
        price: { inputTextPer1M: 6.5, inputImagePer1M: 10.4 }
    },
    {
        name: "dall-e-3",
        label: "DALL·E 3",
        provider: "OpenAI",
        price: { standard: 0.052, highQuality: 0.104 }
    }
];


// ===============================
// OTHER PROVIDERS
// ===============================
export const OtherImageModels = [
    { name: "klingai/image-o1", label: "Kling Image O1", provider: "Kling AI", price: { perGeneration: 0.036 } },
];


export const ImageModels = [
    ...GoogleImageModels,
    ...OpenAiImageModels,
    ...OtherImageModels
];

export default ImageModels;
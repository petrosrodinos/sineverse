import { EnrichImagePromptConfig } from "../interfaces/ai-helper.interfaces";

export const generateEnrichImagePrompt = (config: EnrichImagePromptConfig) => {
    return {
        system: `You are an expert in AI image generation. Your task is to enrich the given image prompt based on the provided context and instructions.`,
        prompt: `
        Context:
        - Original Prompt: ${config.prompt_text}
        - AI Model: ${config.ai_model}
        
        Instructions:
        - Enrich the original prompt by adding relevant details and context.
        - Maintain the original intent and style of the prompt.
        - Ensure the enriched prompt is suitable for AI image generation.
        - Do not add any additional information that is not related to the original prompt.
        - Do not add comments or emojis to the enriched prompt.
        - Generate text only response.
        - Make it max 300 characters.
        
        Please provide the enriched prompt:
        `,
    };
};
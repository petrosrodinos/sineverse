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
        - Do not add comments, emojis, or introductory phrases like "Enriched Prompt:" to the response.
        - Generate raw prompt text only.
        - Make it max 400 characters.
        
        Please provide the enriched prompt:
        `,
    };
};
export interface EnrichProjectConceptPrompt {
    original_concept: string;
    enriched_concept?: string;
    genres?: string[];
    tones?: string[];
    directions?: string;
}

export interface AiPromptResponse {
    system: string;
    prompt: string;
}
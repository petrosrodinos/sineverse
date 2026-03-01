export interface EnrichProjectConceptConfig {
    original_concept: string;
    enriched_concept?: string;
    genres?: string[];
    tones?: string[];
    directions?: string;
}

export interface EnrichSceneVariationConfig extends EnrichProjectConceptConfig {
    include_prompt?: boolean;
    include_negative_prompt?: boolean;
    include_video_generation_options?: boolean;
    project_title: string;
    scene_title: string;
    scene_variation_title: string;
    scene_description?: string;
    prompt_text?: string;
    negative_prompt?: string;
    ai_model?: string;
}



export interface AiPromptResponse {
    system: string;
    prompt: string;
}
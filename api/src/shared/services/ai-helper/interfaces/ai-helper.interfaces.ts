export interface EnrichProjectConceptConfig {
    project_title: string;
    original_concept: string;
    enriched_concept?: string;
    genres?: string[];
    tones?: string[];
    directions?: string;
}

export interface EnrichSceneVariationConfig extends EnrichProjectConceptConfig {
    include_prompt: boolean;
    include_negative_prompt: boolean;
    include_video_generation_options: boolean;
    scene_title?: string;
    scene_variation_title?: string;
    scene_description?: string;
    prompt_text?: string;
    negative_prompt?: string;
    ai_model?: string;
}

export interface GenerateAiScenesConfig extends EnrichProjectConceptConfig {
    number_of_scenes: number;
    scene_variations: number[];
    continue_scenes: boolean;
    enrich_concept: boolean;
    scenes: {
        order: number;
        title: string;
        description: string;
    }[];
}


export interface AiPromptResponse {
    system: string;
    prompt: string;
}
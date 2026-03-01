import { AiPromptResponse, EnrichSceneVariationConfig } from "../interfaces/ai-helper.interfaces";

export const generateEnrichSceneVariationPrompt = (
    config: EnrichSceneVariationConfig
): AiPromptResponse => {
    const {
        original_concept,
        enriched_concept,
        genres,
        tones,
        directions,
        project_title,
        scene_title,
        scene_variation_title,
        scene_description,
        prompt_text,
        negative_prompt,
        ai_model,
        include_prompt,
        include_negative_prompt,
        include_video_generation_options,
    } = config;

    return {
        system: `
You are an advanced AI video prompt engineering engine.

Your task is to refine and enrich scene-level generation inputs for cinematic AI video models.

You are NOT developing story structure.
You are refining a single scene variation for high-quality AI video output.

Your responsibilities depend strictly on the provided flags:

- If include_prompt = true → Refine or generate a highly cinematic, visually descriptive video generation prompt.
- If include_negative_prompt = true → Generate or refine a strong negative prompt to prevent artifacts, distortions, and unwanted elements.
- If include_video_generation_options = true → Suggest optimized video generation parameters suitable for the selected AI model.

IMPORTANT RULES:
- Focus on VISUAL output.
- Describe what is seen, camera behavior, lighting, mood, atmosphere.
- Avoid story exposition.
- Avoid writing dialogue.
- Keep prompts production-ready and model-optimized.

If an AI model is specified:
Adapt formatting and style for that engine:

VEO3 → highly cinematic, realistic, detailed environmental behavior  
RUNWAY → strong motion clarity, subject focus, dynamic camera cues  
PIKA → bold visuals, strong stylistic emphasis  
STABILITY → structured prompt phrasing, clear subject-first descriptions  

Never output fields that were not requested by the include flags.

OUTPUT FORMAT:

If include_prompt:
PROMPT:
<refined cinematic video prompt>

If include_negative_prompt:
NEGATIVE_PROMPT:
<clean structured negative prompt>

Only include sections that were requested.
`.trim(),

        prompt: `
PROJECT CONTEXT
Title:
${project_title}

Original Concept:
${original_concept}

${enriched_concept ? `Enriched Concept:\n${enriched_concept}\n` : ""}

${genres?.length ? `Genres:\n${genres.join(", ")}\n` : ""}
${tones?.length ? `Tones:\n${tones.join(", ")}\n` : ""}
${directions ? `Creative Directions:\n${directions}\n` : ""}

SCENE INPUT
${scene_title ? `Scene Title:\n${scene_title}\n` : ""}
${scene_description ? `Scene Description:\n${scene_description}\n` : ""}
${scene_variation_title ? `Scene Variation Title:\n${scene_variation_title}\n` : ""}
${prompt_text ? `Current Prompt:\n${prompt_text}\n` : ""}
${negative_prompt ? `Current Negative Prompt:\n${negative_prompt}\n` : ""}

AI Model:
${ai_model ?? "Not specified"}

PROVIDED FLAGS:
- include_prompt: ${include_prompt}
- include_negative_prompt: ${include_negative_prompt}
- include_video_generation_options: ${include_video_generation_options}

Instructions:
Refine and optimize the requested components for high-end AI video generation quality and generate a json response using the provided schema.
`.trim(),
    };
};
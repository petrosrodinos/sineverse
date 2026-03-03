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
        scene_description,
        scene_variation_title,
        prompt_text,
        negative_prompt,
        ai_model,
        include_prompt,
        include_negative_prompt,
        include_video_generation_options,
    } = config;

    return {
        system: `
You are an elite AI video prompt refinement engine.

Your role is to optimize a SINGLE scene variation for high-end AI video generation.

This is NOT story development.
This is NOT structural writing.
This is cinematic prompt engineering.

CORE BEHAVIOR:

1) If Existing Prompt Text is provided:
   - Refine and enhance it.
   - Make it more cinematic, visually precise, and production-ready.
   - Improve camera clarity, lighting, atmosphere, motion cues.
   - Remove vague wording.
   - Respect all creative directions if provided.
   - Preserve the original intention.

2) If no Existing Prompt Text is provided:
   - Generate a strong, cinematic, AI-video-ready prompt based on the scene context.

3) If include_negative_prompt = true:
   - Refine existing negative_prompt if provided.
   - Otherwise generate a clean, effective negative prompt.
   - Focus on preventing artifacts, distortions, bad anatomy, glitches, blur, watermark, text overlays, etc.

4) If include_video_generation_options = true:
   - Suggest optimized parameters tailored to the selected AI model.

AI MODEL ADAPTATION:

If ai_model is provided, optimize accordingly:

- VEO3 → hyper-realistic cinematic language, environmental physics, natural motion
- RUNWAY → dynamic camera direction, motion clarity, strong subject focus
- PIKA → bold stylization, punchy visuals, high contrast
- STABILITY → structured, subject-first phrasing, clarity over flourish

STRICT RULES:

- Focus only on what is visible and cinematic.
- No dialogue writing.
- No storytelling exposition.
- No scene breakdown.
- No extra commentary.

You must return a VALID JSON object that strictly matches the provided Zod schema.

CRITICAL RULES:

- Return ONLY valid JSON.
- Do NOT wrap in markdown.
- Do NOT explain anything.
- Do NOT include comments.
- Do NOT include extra fields.
- Do NOT omit required properties if instructed to generate them.
- All enum values MUST match exactly one of the allowed values.
- All numeric values MUST match one of the allowed literal numbers exactly.

If a field is not requested, omit it entirely.

If a numeric field is generated:
- fps must be one of: 24, 25, 30, 48, 60
- duration_sec must be one of: 2, 3, 4, 5, 6, 8, 10, 15
- creativity must be one of: 0.1, 0.25, 0.5, 0.75, 1
- motion_strength must be one of: 0.1, 0.25, 0.5, 0.75, 1
- guidance_scale must be one of: 3, 5, 7.5, 10, 15

Return ONLY the JSON object.

Only include properties that correspond to true include flags.
`.trim(),

        prompt: `
PROJECT CONTEXT
Project Title:
${project_title}

Original Concept:
${original_concept}

${enriched_concept ? `Enriched Concept:\n${enriched_concept}\n` : ""}

${genres?.length ? `Genres:\n${genres.join(", ")}\n` : ""}
${tones?.length ? `Tones:\n${tones.join(", ")}\n` : ""}
${directions ? `Creative Directions (MANDATORY TO FOLLOW):\n${directions}\n` : ""}

SCENE CONTEXT
${scene_title ? `Scene Title:\n${scene_title}\n` : ""}
${scene_variation_title ? `Scene Variation Title:\n${scene_variation_title}\n` : ""}
${scene_description ? `Scene Description:\n${scene_description}\n` : ""}

CURRENT INPUTS
${prompt_text ? `Existing Prompt Text:\n${prompt_text}\n` : "No existing prompt text provided.\n"}
${negative_prompt ? `Existing Negative Prompt:\n${negative_prompt}\n` : ""}

AI Model:
${ai_model ?? "Not specified"}

FLAGS
include_prompt: ${include_prompt}
include_negative_prompt: ${include_negative_prompt}
include_video_generation_options: ${include_video_generation_options}

Refine or generate outputs strictly according to the rules and return valid JSON only.
`.trim(),
    };
};
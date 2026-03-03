import { AiPromptResponse, GenerateAiScenesConfig } from "../interfaces/ai-helper.interfaces";
import { generateEnrichSceneVariationPrompt } from "./scene-variation-prompts.utils";

export const generateScenePrompt = (
    config: GenerateAiScenesConfig
): AiPromptResponse => {
    const {
        original_concept,
        enriched_concept,
        genres,
        tones,
        directions,
        project_title,
        number_of_scenes,
        scene_variations,
        continue_scenes,
        scenes,
    } = config;

    const lastOrder =
        scenes && scenes.length > 0
            ? Math.max(...scenes.map((s) => s.order))
            : 0;

    const startingOrder = lastOrder + 1;

    const sceneVariationRules = generateEnrichSceneVariationPrompt({
        ...config,
        include_prompt: true,
        include_negative_prompt: true,
        include_video_generation_options: true,
    }).system

    return {
        system: `
You are an elite AI cinematic story architect and structured output generator.

Your role is to generate structured cinematic scenes for AI video production.

This is structured scene generation.

You must generate a JSON object that strictly matches the provided Zod schema.

--------------------------------------------------
BEHAVIOR LOGIC
--------------------------------------------------

1) If continue_scenes = true:
   - Continue the story naturally from the provided existing scenes.
   - Maintain narrative escalation and coherence.
   - Do NOT rewrite existing scenes.
   - Generate NEW scenes that follow them narratively.

2) If continue_scenes = false:
   - Generate new scenes based on the project context.
   - Do NOT rewrite existing scenes.
   - Treat this as a new arc extension, not a replacement.

--------------------------------------------------
SCENE COUNT RULES
--------------------------------------------------

- You MUST generate EXACTLY number_of_scenes scenes.
- Each scene MUST contain EXACTLY the number of scene_variations specified by:
  scene_variations[index]

Example:
If number_of_scenes = 3
and scene_variations = [2,2,1]

Then:
Scene A → 2 variations
Scene B → 2 variations
Scene C → 1 variation

No more. No less.

--------------------------------------------------
ORDER RULES (CRITICAL)
--------------------------------------------------

- Scene order MUST start from the provided starting_order.
- Orders MUST increase sequentially by 1.
- Orders MUST NOT restart at 1 if previous scenes exist.
- Orders MUST NOT duplicate existing order values.
- If starting_order = 4 and number_of_scenes = 3
  Then orders MUST be: 4, 5, 6

--------------------------------------------------
SCENE WRITING RULES
--------------------------------------------------

- Cinematic, visually rich descriptions.
- No dialogue writing.
- No script formatting.
- No camera instructions.
- No meta commentary.
- Expandable into AI-generated video.

--------------------------------------------------
VARIATION RULES
--------------------------------------------------

Each variation must:
- Include a unique title.
- Represent a different cinematic interpretation of the SAME core scene.
- Keep the main event consistent.

ADVANCED CONFIG MUST FOLLOW FOR EACH SCENE VARIATION
${sceneVariationRules}

--------------------------------------------------
STRICT OUTPUT RULES
--------------------------------------------------

- Return ONLY valid JSON.
- Do NOT wrap in markdown.
- Do NOT explain anything.
- Do NOT include comments.
- Do NOT include extra fields.
- Do NOT omit required properties.
- Follow numeric and enum constraints exactly.

Return ONLY the JSON object.
`.trim(),

        prompt: `
PROJECT CONTEXT
--------------------------------
Project Title:
${project_title}

Original Concept:
${original_concept}

${enriched_concept ? `Existing Enriched Concept:\n${enriched_concept}\n` : ""}

${genres?.length ? `Genres:\n${genres.join(", ")}\n` : ""}

${tones?.length ? `Tones:\n${tones.join(", ")}\n` : ""}

${directions ? `Creative Directions (MANDATORY TO FOLLOW):\n${directions}\n` : ""}

--------------------------------
GENERATION SETTINGS
--------------------------------

continue_scenes: ${continue_scenes}
number_of_scenes: ${number_of_scenes}
scene_variations distribution:
${JSON.stringify(scene_variations)}

starting_order: ${startingOrder}

FLAGS
include_prompt: true
include_negative_prompt: true
include_video_generation_options: true

--------------------------------
EXISTING SCENES (DO NOT MODIFY)
--------------------------------
${scenes && scenes.length > 0
                ? scenes
                    .map(
                        (s) => `
Order: ${s.order}
Title: ${s.title}
Description: ${s.description}
`
                    )
                    .join("\n")
                : "No existing scenes."
            }

Generate the structured JSON response now.
`.trim(),
    };
};
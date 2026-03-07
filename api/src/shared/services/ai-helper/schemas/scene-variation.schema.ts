import { z } from "zod";
import { STYLE_VALUES, CAMERA_STYLE_VALUES, SHOT_TYPE_VALUES, CAMERA_MOVEMENT_VALUES, LENS_TYPE_VALUES, DEPTH_OF_FIELD_VALUES, LIGHTING_VALUES, COLOR_GRADE_VALUES, TIME_OF_DAY_VALUES, ASPECT_RATIO_VALUES, RESOLUTION_VALUES, AUDIO_STYLE_VALUES, PROJECT_TONE_VALUES, PROJECT_GENRE_VALUES } from "@/shared/config/scene-variations";

export const SceneVariationEnrichSchema = z.object({
    prompt_text: z.string().trim().min(1),
    negative_prompt: z.string().trim(),
    style: z.enum(STYLE_VALUES),
    tone: z.enum(PROJECT_TONE_VALUES),
    genre: z.enum(PROJECT_GENRE_VALUES),
    camera_style: z.enum(CAMERA_STYLE_VALUES),
    shot_type: z.enum(SHOT_TYPE_VALUES),
    camera_movement: z.enum(CAMERA_MOVEMENT_VALUES),
    lens_type: z.enum(LENS_TYPE_VALUES),
    depth_of_field: z.enum(DEPTH_OF_FIELD_VALUES),
    lighting: z.enum(LIGHTING_VALUES),
    color_grade: z.enum(COLOR_GRADE_VALUES),
    time_of_day: z.enum(TIME_OF_DAY_VALUES),
    aspect_ratio: z.enum(ASPECT_RATIO_VALUES),
    resolution: z.enum(RESOLUTION_VALUES),
    audio_style: z.enum(AUDIO_STYLE_VALUES),
    fps: z.union([z.literal(24), z.literal(25), z.literal(30), z.literal(48), z.literal(60)]),
    duration_sec: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(8), z.literal(10), z.literal(15)]),
    guidance_scale: z.number().min(0).max(1),
    motion_strength: z.number().min(0).max(1),
    creativity: z.number().min(0).max(1),
}).strict();

export const GenerateAiScenesSchema = z.object({
    scenes: z.array(z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        order: z.number().min(1),
        scene_variations: z.array(
            SceneVariationEnrichSchema.extend({
                title: z.string().trim().min(1),
            })
        ),
    })),
});

export type SceneVariationEnrichSchemaType = z.infer<typeof SceneVariationEnrichSchema>;
export type GenerateAiScenesSchemaType = z.infer<typeof GenerateAiScenesSchema>;

import { z } from "zod";
import { STYLE_VALUES, CAMERA_STYLE_VALUES, SHOT_TYPE_VALUES, CAMERA_MOVEMENT_VALUES, LENS_TYPE_VALUES, DEPTH_OF_FIELD_VALUES, LIGHTING_VALUES, COLOR_GRADE_VALUES, TIME_OF_DAY_VALUES, ASPECT_RATIO_VALUES, RESOLUTION_VALUES, AUDIO_STYLE_VALUES, PROJECT_TONE_VALUES, PROJECT_GENRE_VALUES } from "@/shared/config/scene-variations";

export const SceneVariationEnrichSchema = z.object({
    prompt_text: z.string().trim().min(1).optional(),
    negative_prompt: z.string().trim().min(1).optional(),
    style: z.enum(STYLE_VALUES).optional(),
    tone: z.enum(PROJECT_TONE_VALUES).optional(),
    genre: z.enum(PROJECT_GENRE_VALUES).optional(),
    camera_style: z.enum(CAMERA_STYLE_VALUES).optional(),
    shot_type: z.enum(SHOT_TYPE_VALUES).optional(),
    camera_movement: z.enum(CAMERA_MOVEMENT_VALUES).optional(),
    lens_type: z.enum(LENS_TYPE_VALUES).optional(),
    depth_of_field: z.enum(DEPTH_OF_FIELD_VALUES).optional(),
    lighting: z.enum(LIGHTING_VALUES).optional(),
    color_grade: z.enum(COLOR_GRADE_VALUES).optional(),
    time_of_day: z.enum(TIME_OF_DAY_VALUES).optional(),
    aspect_ratio: z.enum(ASPECT_RATIO_VALUES).optional(),
    resolution: z.enum(RESOLUTION_VALUES).optional(),
    audio_style: z.enum(AUDIO_STYLE_VALUES).optional(),
    fps: z.union([z.literal(24), z.literal(25), z.literal(30), z.literal(48), z.literal(60)]).optional(),
    duration_sec: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(8), z.literal(10), z.literal(15)]).optional(),
    guidance_scale: z.number().min(1).max(20).optional(),
    motion_strength: z.number().min(0).max(1).optional(),
    creativity: z.number().min(0).max(1).optional(),
}).strict();

export type SceneVariationEnrichSchemaType = z.infer<typeof SceneVariationEnrichSchema>;
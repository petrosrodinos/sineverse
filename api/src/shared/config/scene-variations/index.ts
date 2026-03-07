export const PROJECT_GENRE_VALUES = [
    "action",
    "adventure",
    "animation",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "fantasy",
    "historical",
    "horror",
    "mystery",
    "romance",
    "sci_fi",
    "thriller",
    "western",
    "experimental",
] as const;

export const PROJECT_TONE_VALUES = [
    "dark",
    "lighthearted",
    "gritty",
    "epic",
    "hopeful",
    "melancholic",
    "romantic",
    "suspenseful",
    "mysterious",
    "inspirational",
    "comedic",
    "serious",
    "satirical",
    "intense",
    "whimsical",
] as const;


export const STYLE_VALUES = [
    "cinematic",
    "hyper_realistic",
    "anime",
    "noir",
    "cyberpunk",
    "fantasy",
    "documentary",
    "western",
    "horror",
    "sci_fi",
] as const;

export const CAMERA_MOVEMENT_VALUES = [
    "static",
    "pan",
    "tilt",
    "zoom",
    "dolly",
    "tracking",
    "crane",
] as const;

export const LENS_TYPE_VALUES = [
    "wide_angle",
    "standard",
    "telephoto",
    "macro",
    "anamorphic",
] as const;

export const DEPTH_OF_FIELD_VALUES = [
    "shallow",
    "deep",
] as const;

export const TIME_OF_DAY_VALUES = [
    "morning",
    "noon",
    "afternoon",
    "evening",
    "night",
    "midnight",
] as const;

export const CAMERA_STYLE_VALUES = [
    "handheld",
    "drone",
    "steadicam",
    "tripod",
    "pov",
] as const;

export const SHOT_TYPE_VALUES = [
    "wide_shot",
    "medium_shot",
    "close_up",
    "extreme_close_up",
    "over_the_shoulder",
    "establishing_shot",
] as const;

export const LIGHTING_VALUES = [
    "golden_hour",
    "blue_hour",
    "neon",
    "low_key",
    "high_key",
    "natural_light",
    "studio_light",
] as const;

export const COLOR_GRADE_VALUES = [
    "teal_orange",
    "desaturated",
    "vibrant",
    "black_white",
    "vintage_film",
] as const;

export const AUDIO_STYLE_VALUES = [
    "orchestral",
    "ambient",
    "cinematic_trailer",
    "synthwave",
    "minimal",
    "rock",
    "jazz",
    "blues",
    "hip_hop",
    "pop",
    "country",
    "folk",
    "classical",
    "cinematic",
    "electronic",
] as const;


export const ASPECT_RATIO_VALUES = [
    "16:9",
    "9:16",
    "1:1",
    "2.35:1",
    "4:3",
] as const;

export const RESOLUTION_VALUES = [
    "720p",
    "1080p",
    "1440p",
    "4k",
] as const;

export const AI_MODELS = [
    "VEO3",
    "RUNWAY",
    "PIKA",
    "STABILITY",
] as const;

export const DURATION_VALUES = [
    2, 3, 4, 5, 6, 8, 10, 15,
] as const;



export const MOTION_STRENGTH_VALUES = [
    0.1, 0.25, 0.5, 0.75, 1,
] as const;

export const CREATIVITY_VALUES = [
    0.1, 0.25, 0.5, 0.75, 1,
] as const;


export type ProjectTone = typeof PROJECT_TONE_VALUES[number];
export type ProjectGenre = typeof PROJECT_GENRE_VALUES[number];
export const FPS_VALUES = [24, 25, 30, 48, 60] as const;
export type Creativity = typeof CREATIVITY_VALUES[number];
export type MotionStrength = typeof MOTION_STRENGTH_VALUES[number];
export type AiModel = typeof AI_MODELS[number];
export type Duration = typeof DURATION_VALUES[number];
export type Fps = typeof FPS_VALUES[number];
export type AudioStyle = typeof AUDIO_STYLE_VALUES[number];
export type ColorGrade = typeof COLOR_GRADE_VALUES[number];
export type Lighting = typeof LIGHTING_VALUES[number];
export type Resolution = typeof RESOLUTION_VALUES[number];
export type AspectRatio = typeof ASPECT_RATIO_VALUES[number];
export type ShotType = typeof SHOT_TYPE_VALUES[number];
export type CameraStyle = typeof CAMERA_STYLE_VALUES[number];
export type TimeOfDay = typeof TIME_OF_DAY_VALUES[number];
export type DepthOfField = typeof DEPTH_OF_FIELD_VALUES[number];
export type LensType = typeof LENS_TYPE_VALUES[number];
export type CameraMovement = typeof CAMERA_MOVEMENT_VALUES[number];
export type Style = typeof STYLE_VALUES[number];
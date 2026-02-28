import { Document } from "@/features/documents/interfaces/document.interfaces";
import { ProjectTone, ProjectGenre } from "@/features/projects/interfaces/projects.interfaces";
import { SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

export interface SceneVariation {
    id: string;
    uuid: string;
    prompt_image_uuid?: string;
    scene_uuid: string;
    style?: Style;
    tone?: ProjectTone;
    genre?: ProjectGenre;
    camera?: CameraStyle;
    shot_type?: ShotType;
    camera_movement?: CameraMovement;
    lens_type?: LensType;
    depth_of_field?: DepthOfField;
    lighting?: Lighting;
    color_grade?: ColorGrade;
    time_of_day?: TimeOfDay;
    aspect_ratio?: AspectRatio;
    resolution?: Resolution;
    fps?: Fps;
    duration_sec?: Duration;
    ai_model?: AiModel;
    seed?: number;
    creativity?: Creativity;
    motion_strength?: MotionStrength;
    guidance_scale?: GuidanceScale;
    audio_style?: AudioStyle;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
    created_at: string;
    updated_at: string;
    prompt_image?: Document;
    videos?: SceneVideo[];
    scene?: Scene;
}

export interface CreateSceneVariationDto {
    scene_uuid: string;
    style?: Style;
    tone?: ProjectTone;
    genre?: ProjectGenre;
    camera_style?: CameraStyle;
    shot_type?: ShotType;
    camera_movement?: CameraMovement;
    lens_type?: LensType;
    depth_of_field?: DepthOfField;
    lighting?: Lighting;
    color_grade?: ColorGrade;
    time_of_day?: TimeOfDay;
    aspect_ratio?: AspectRatio;
    resolution?: Resolution;
    fps?: Fps;
    duration_sec?: Duration;
    ai_model?: AiModel;
    seed?: number;
    creativity?: Creativity;
    motion_strength?: MotionStrength;
    guidance_scale?: GuidanceScale;
    audio_style?: AudioStyle;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
}

export interface UpdateSceneVariationDto {
    scene_uuid: string;
    style?: Style;
    tone?: ProjectTone;
    genre?: ProjectGenre;
    camera?: CameraStyle;
    shot_type?: ShotType;
    camera_movement?: CameraMovement;
    lens_type?: LensType;
    depth_of_field?: DepthOfField;
    lighting?: Lighting;
    color_grade?: ColorGrade;
    time_of_day?: TimeOfDay;
    aspect_ratio?: AspectRatio;
    resolution?: Resolution;
    fps?: Fps;
    duration_sec?: Duration;
    ai_model?: AiModel;
    seed?: number;
    creativity?: Creativity;
    motion_strength?: MotionStrength;
    guidance_scale?: GuidanceScale;
    audio_style?: AudioStyle;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
}

export const Styles = {
    cinematic: "cinematic",
    hyper_realistic: "hyper_realistic",
    anime: "anime",
    noir: "noir",
    cyberpunk: "cyberpunk",
    fantasy: "fantasy",
    documentary: "documentary",
    western: "western",
    horror: "horror",
    sci_fi: "sci_fi",
} as const;


export const CameraMovements = {
    static: "static",
    pan: "pan",
    tilt: "tilt",
    zoom: "zoom",
    dolly: "dolly",
    tracking: "tracking",
    crane: "crane",
} as const;

export const LensTypes = {
    wide_angle: "wide_angle",
    standard: "standard",
    telephoto: "telephoto",
    macro: "macro",
    anamorphic: "anamorphic",
} as const;

export const DepthOfFields = {
    shallow: "shallow",
    deep: "deep",
} as const;

export const TimeOfDays = {
    morning: "morning",
    noon: "noon",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
    midnight: "midnight",
} as const;

export const CameraStyles = {
    handheld: "handheld",
    drone: "drone",
    steadicam: "steadicam",
    tripod: "tripod",
    pov: "pov",
} as const;

export const ShotTypes = {
    wide_shot: "wide_shot",
    medium_shot: "medium_shot",
    close_up: "close_up",
    extreme_close_up: "extreme_close_up",
    over_the_shoulder: "over_the_shoulder",
    establishing_shot: "establishing_shot",
} as const;

export const AspectRatios = {
    "16:9": "16:9",
    "9:16": "9:16",
    "1:1": "1:1",
    "2.35:1": "2.35:1",
    "4:3": "4:3",
} as const;

export const Resolutions = {
    "720p": "720p",
    "1080p": "1080p",
    "1440p": "1440p",
    "4k": "4k",
} as const;

export const Lightings = {
    golden_hour: "golden_hour",
    blue_hour: "blue_hour",
    neon: "neon",
    low_key: "low_key",
    high_key: "high_key",
    natural_light: "natural_light",
    studio_light: "studio_light",
} as const;

export const ColorGrades = {
    teal_orange: "teal_orange",
    desaturated: "desaturated",
    vibrant: "vibrant",
    black_white: "black_white",
    vintage_film: "vintage_film",
} as const;

export const AiModels = {
    VEO3: "VEO3",
    RUNWAY: "RUNWAY",
    PIKA: "PIKA",
    STABILITY: "STABILITY",
} as const;

export const AudioStyles = {
    orchestral: "orchestral",
    ambient: "ambient",
    cinematic_trailer: "cinematic_trailer",
    synthwave: "synthwave",
    minimal: "minimal",
    rock: "rock",
    jazz: "jazz",
    blues: "blues",
    hip_hop: "hip_hop",
    pop: "pop",
    country: "country",
    folk: "folk",
    classical: "classical",
    cinematic: "cinematic",
    electronic: "electronic",
} as const;

export const Fps = {
    FPS_24: 24,
    FPS_25: 25,
    FPS_30: 30,
    FPS_48: 48,
    FPS_60: 60,
} as const;

export const Durations = {
    SEC_2: 2,
    SEC_3: 3,
    SEC_4: 4,
    SEC_5: 5,
    SEC_6: 6,
    SEC_8: 8,
    SEC_10: 10,
    SEC_15: 15,
} as const;

export const GuidanceScales = {
    VERY_LOW: 3,
    LOW: 5,
    MEDIUM: 7.5,
    HIGH: 10,
    VERY_HIGH: 15,
} as const;

export const MotionStrengths = {
    VERY_LOW: 0.1,
    LOW: 0.25,
    MEDIUM: 0.5,
    HIGH: 0.75,
    VERY_HIGH: 1,
} as const;

export const Creativities = {
    VERY_LOW: 0.1,
    LOW: 0.25,
    MEDIUM: 0.5,
    HIGH: 0.75,
    VERY_HIGH: 1,
} as const;


export type Creativity = typeof Creativities[keyof typeof Creativities];
export type MotionStrength = typeof MotionStrengths[keyof typeof MotionStrengths];
export type GuidanceScale = typeof GuidanceScales[keyof typeof GuidanceScales];
export type Duration = typeof Durations[keyof typeof Durations];
export type Fps = typeof Fps[keyof typeof Fps];
export type Style = keyof typeof Styles;
export type CameraStyle = keyof typeof CameraStyles;
export type ShotType = keyof typeof ShotTypes;
export type CameraMovement = keyof typeof CameraMovements;
export type LensType = keyof typeof LensTypes;
export type DepthOfField = keyof typeof DepthOfFields;
export type TimeOfDay = keyof typeof TimeOfDays;
export type AspectRatio = keyof typeof AspectRatios;
export type Resolution = keyof typeof Resolutions;
export type Lighting = keyof typeof Lightings;
export type ColorGrade = keyof typeof ColorGrades;
export type AiModel = keyof typeof AiModels;
export type AudioStyle = keyof typeof AudioStyles;

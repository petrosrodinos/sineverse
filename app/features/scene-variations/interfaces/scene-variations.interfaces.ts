export interface SceneVariation {
    id: string;
    scene_uuid: string;
    style?: string;
    mood?: string;
    genre_style?: string;
    camera_style?: string;
    shot_type?: string;
    camera_movement?: string;
    lens_type?: string;
    depth_of_field?: string;
    lighting?: string;
    color_grade?: string;
    time_of_day?: string;
    aspect_ratio?: string;
    resolution?: string;
    fps?: number;
    duration_sec?: number;
    ai_model?: string;
    seed?: number;
    creativity?: number;
    motion_strength?: number;
    guidance_scale?: number;
    audio_style?: string;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateSceneVariationDto {
    scene_uuid: string;
    style?: string;
    mood?: string;
    genre_style?: string;
    camera_style?: string;
    shot_type?: string;
    camera_movement?: string;
    lens_type?: string;
    depth_of_field?: string;
    lighting?: string;
    color_grade?: string;
    time_of_day?: string;
    aspect_ratio?: string;
    resolution?: string;
    fps?: number;
    duration_sec?: number;
    ai_model?: string;
    seed?: number;
    creativity?: number;
    motion_strength?: number;
    guidance_scale?: number;
    audio_style?: string;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
}

export interface UpdateSceneVariationDto {
    scene_uuid: string;
    style?: string;
    mood?: string;
    genre_style?: string;
    camera_style?: string;
    shot_type?: string;
    camera_movement?: string;
    lens_type?: string;
    depth_of_field?: string;
    lighting?: string;
    color_grade?: string;
    time_of_day?: string;
    aspect_ratio?: string;
    resolution?: string;
    fps?: number;
    duration_sec?: number;
    ai_model?: string;
    seed?: number;
    creativity?: number;
    motion_strength?: number;
    guidance_scale?: number;
    audio_style?: string;
    include_sound?: boolean;
    prompt_text: string;
    negative_prompt?: string;
    selected?: boolean;
}

// Style labels
export const StyleOptionsLabels = {
    cinematic: "Cinematic",
    hyper_realistic: "Hyper Realistic",
    anime: "Anime",
    noir: "Noir",
    cyberpunk: "Cyberpunk",
    fantasy: "Fantasy",
    documentary: "Documentary",
    western: "Western",
    horror: "Horror",
    sci_fi: "Sci-Fi",
} as const;

// Mood labels
export const MoodOptionsLabels = {
    dark: "Dark",
    uplifting: "Uplifting",
    tense: "Tense",
    dreamy: "Dreamy",
    epic: "Epic",
    romantic: "Romantic",
    mysterious: "Mysterious",
    melancholic: "Melancholic",
} as const;

// Camera Style labels
export const CameraStyleOptionsLabels = {
    handheld: "Handheld",
    drone: "Drone",
    steadicam: "Steadicam",
    tripod: "Tripod",
    pov: "POV",
} as const;

// Shot Type labels
export const ShotTypeOptionsLabels = {
    wide_shot: "Wide Shot",
    medium_shot: "Medium Shot",
    close_up: "Close-Up",
    extreme_close_up: "Extreme Close-Up",
    over_the_shoulder: "Over The Shoulder",
    establishing_shot: "Establishing Shot",
} as const;

// Aspect Ratio labels
export const AspectRatioOptionsLabels = {
    "16:9": "16:9 (YouTube / Film)",
    "9:16": "9:16 (TikTok / Reels)",
    "1:1": "1:1 (Instagram)",
    "2.35:1": "2.35:1 (Cinematic Wide)",
    "4:3": "4:3 (Classic Film)",
} as const;

// Resolution labels
export const ResolutionOptionsLabels = {
    "720p": "720p HD",
    "1080p": "1080p Full HD",
    "1440p": "1440p QHD",
    "4k": "4K Ultra HD",
} as const;

// Lighting labels
export const LightingOptionsLabels = {
    golden_hour: "Golden Hour",
    blue_hour: "Blue Hour",
    neon: "Neon",
    low_key: "Low Key",
    high_key: "High Key",
    natural_light: "Natural Light",
    studio_light: "Studio Light",
} as const;

// Color Grade labels
export const ColorGradeOptionsLabels = {
    teal_orange: "Teal & Orange",
    desaturated: "Desaturated",
    vibrant: "Vibrant",
    black_white: "Black & White",
    vintage_film: "Vintage Film",
} as const;

// AI Model labels
export const AiModelOptionsLabels = {
    VEO3: "Veo 3",
    RUNWAY: "Runway",
    PIKA: "Pika",
    STABILITY: "Stability",
} as const;

// Audio Style labels
export const AudioStyleOptionsLabels = {
    orchestral: "Orchestral",
    ambient: "Ambient",
    cinematic_trailer: "Cinematic Trailer",
    synthwave: "Synthwave",
    minimal: "Minimal",
} as const;

export type StyleOption = keyof typeof StyleOptionsLabels;
export type MoodOption = keyof typeof MoodOptionsLabels;
export type CameraStyleOption = keyof typeof CameraStyleOptionsLabels;
export type ShotTypeOption = keyof typeof ShotTypeOptionsLabels;
export type AspectRatioOption = keyof typeof AspectRatioOptionsLabels;
export type ResolutionOption = keyof typeof ResolutionOptionsLabels;
export type LightingOption = keyof typeof LightingOptionsLabels;
export type ColorGradeOption = keyof typeof ColorGradeOptionsLabels;
export type AiModelOption = keyof typeof AiModelOptionsLabels;
export type AudioStyleOption = keyof typeof AudioStyleOptionsLabels;

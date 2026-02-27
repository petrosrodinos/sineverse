export const styleOptions = [
    { label: "Cinematic", value: "cinematic" },
    { label: "Hyper Realistic", value: "hyper_realistic" },
    { label: "Anime", value: "anime" },
    { label: "Noir", value: "noir" },
    { label: "Cyberpunk", value: "cyberpunk" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Documentary", value: "documentary" },
    { label: "Western", value: "western" },
    { label: "Horror", value: "horror" },
    { label: "Sci-Fi", value: "sci_fi" },
];

// Mood
export const moodOptions = [
    { label: "Dark", value: "dark" },
    { label: "Uplifting", value: "uplifting" },
    { label: "Tense", value: "tense" },
    { label: "Dreamy", value: "dreamy" },
    { label: "Epic", value: "epic" },
    { label: "Romantic", value: "romantic" },
    { label: "Mysterious", value: "mysterious" },
    { label: "Melancholic", value: "melancholic" },
];

// Camera Style
export const cameraStyleOptions = [
    { label: "Handheld", value: "handheld" },
    { label: "Drone", value: "drone" },
    { label: "Steadicam", value: "steadicam" },
    { label: "Tripod", value: "tripod" },
    { label: "POV", value: "pov" },
];

// Shot Type
export const shotTypeOptions = [
    { label: "Wide Shot", value: "wide_shot" },
    { label: "Medium Shot", value: "medium_shot" },
    { label: "Close-Up", value: "close_up" },
    { label: "Extreme Close-Up", value: "extreme_close_up" },
    { label: "Over The Shoulder", value: "over_the_shoulder" },
    { label: "Establishing Shot", value: "establishing_shot" },
];

// Aspect Ratio
export const aspectRatioOptions = [
    { label: "16:9 (YouTube / Film)", value: "16:9" },
    { label: "9:16 (TikTok / Reels)", value: "9:16" },
    { label: "1:1 (Instagram)", value: "1:1" },
    { label: "2.35:1 (Cinematic Wide)", value: "2.35:1" },
    { label: "4:3 (Classic Film)", value: "4:3" },
];

// Resolution
export const resolutionOptions = [
    { label: "720p HD", value: "720p" },
    { label: "1080p Full HD", value: "1080p" },
    { label: "1440p QHD", value: "1440p" },
    { label: "4K Ultra HD", value: "4k" },
];

// Lighting
export const lightingOptions = [
    { label: "Golden Hour", value: "golden_hour" },
    { label: "Blue Hour", value: "blue_hour" },
    { label: "Neon", value: "neon" },
    { label: "Low Key", value: "low_key" },
    { label: "High Key", value: "high_key" },
    { label: "Natural Light", value: "natural_light" },
    { label: "Studio Light", value: "studio_light" },
];

// Color Grade
export const colorGradeOptions = [
    { label: "Teal & Orange", value: "teal_orange" },
    { label: "Desaturated", value: "desaturated" },
    { label: "Vibrant", value: "vibrant" },
    { label: "Black & White", value: "black_white" },
    { label: "Vintage Film", value: "vintage_film" },
];

// AI Model
export const aiModelOptions = [
    { label: "Veo 3", value: "VEO3" },
    { label: "Runway", value: "RUNWAY" },
    { label: "Pika", value: "PIKA" },
    { label: "Stability", value: "STABILITY" },
];

// Audio Style
export const audioStyleOptions = [
    { label: "Orchestral", value: "orchestral" },
    { label: "Ambient", value: "ambient" },
    { label: "Cinematic Trailer", value: "cinematic_trailer" },
    { label: "Synthwave", value: "synthwave" },
    { label: "Minimal", value: "minimal" },
];

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

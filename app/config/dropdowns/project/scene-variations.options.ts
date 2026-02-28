import { Styles, CameraMovements, LensTypes, DepthOfFields, TimeOfDays, CameraStyles, ShotTypes, AspectRatios, Resolutions, Lightings, ColorGrades, AiModels, AudioStyles, Style, CameraMovement, LensType, DepthOfField, TimeOfDay, CameraStyle, ShotType, AspectRatio, Resolution, Lighting, ColorGrade, AiModel, AudioStyle } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { SliderConfig, DropdownOption } from "@/interfaces/scene-variations-options.interfaces";

export const StylesOptions: DropdownOption<Style>[] = [
    { label: "Cinematic", value: Styles.cinematic },
    { label: "Hyper Realistic", value: Styles.hyper_realistic },
    { label: "Anime", value: Styles.anime },
    { label: "Noir", value: Styles.noir },
    { label: "Cyberpunk", value: Styles.cyberpunk },
    { label: "Fantasy", value: Styles.fantasy },
    { label: "Documentary", value: Styles.documentary },
    { label: "Western", value: Styles.western },
    { label: "Horror", value: Styles.horror },
    { label: "Sci-Fi", value: Styles.sci_fi },
];


export const CameraMovementOptions: DropdownOption<CameraMovement>[] = [
    { label: "Static", value: CameraMovements.static },
    { label: "Pan", value: CameraMovements.pan },
    { label: "Tilt", value: CameraMovements.tilt },
    { label: "Zoom", value: CameraMovements.zoom },
    { label: "Dolly", value: CameraMovements.dolly },
    { label: "Tracking", value: CameraMovements.tracking },
    { label: "Crane", value: CameraMovements.crane },
];

export const LensTypeOptions: DropdownOption<LensType>[] = [
    { label: "Wide Angle", value: LensTypes.wide_angle },
    { label: "Standard", value: LensTypes.standard },
    { label: "Telephoto", value: LensTypes.telephoto },
    { label: "Macro", value: LensTypes.macro },
    { label: "Anamorphic", value: LensTypes.anamorphic },
];

export const DepthOfFieldOptions: DropdownOption<DepthOfField>[] = [
    { label: "Shallow", value: DepthOfFields.shallow },
    { label: "Deep", value: DepthOfFields.deep },
];

export const TimeOfDayOptions: DropdownOption<TimeOfDay>[] = [
    { label: "Morning", value: TimeOfDays.morning },
    { label: "Noon", value: TimeOfDays.noon },
    { label: "Afternoon", value: TimeOfDays.afternoon },
    { label: "Evening", value: TimeOfDays.evening },
    { label: "Night", value: TimeOfDays.night },
    { label: "Midnight", value: TimeOfDays.midnight },
];

export const CameraStyleOptions: DropdownOption<CameraStyle>[] = [
    { label: "Handheld", value: CameraStyles.handheld },
    { label: "Drone", value: CameraStyles.drone },
    { label: "Steadicam", value: CameraStyles.steadicam },
    { label: "Tripod", value: CameraStyles.tripod },
    { label: "POV", value: CameraStyles.pov },
];

export const ShotTypeOptions: DropdownOption<ShotType>[] = [
    { label: "Wide Shot", value: ShotTypes.wide_shot },
    { label: "Medium Shot", value: ShotTypes.medium_shot },
    { label: "Close-Up", value: ShotTypes.close_up },
    { label: "Extreme Close-Up", value: ShotTypes.extreme_close_up },
    { label: "Over The Shoulder", value: ShotTypes.over_the_shoulder },
    { label: "Establishing Shot", value: ShotTypes.establishing_shot },
];

export const AspectRatioOptions: DropdownOption<AspectRatio>[] = [
    { label: "16:9 (YouTube / Film)", value: AspectRatios["16:9"] },
    { label: "9:16 (TikTok / Reels)", value: AspectRatios["9:16"] },
    { label: "1:1 (Instagram)", value: AspectRatios["1:1"] },
    { label: "2.35:1 (Cinematic Wide)", value: AspectRatios["2.35:1"] },
    { label: "4:3 (Classic Film)", value: AspectRatios["4:3"] },
];

export const ResolutionOptions: DropdownOption<Resolution>[] = [
    { label: "720p HD", value: Resolutions["720p"] },
    { label: "1080p Full HD", value: Resolutions["1080p"] },
    { label: "1440p QHD", value: Resolutions["1440p"] },
    { label: "4K Ultra HD", value: Resolutions["4k"] },
];

export const LightingOptions: DropdownOption<Lighting>[] = [
    { label: "Golden Hour", value: Lightings.golden_hour },
    { label: "Blue Hour", value: Lightings.blue_hour },
    { label: "Neon", value: Lightings.neon },
    { label: "Low Key", value: Lightings.low_key },
    { label: "High Key", value: Lightings.high_key },
    { label: "Natural Light", value: Lightings.natural_light },
    { label: "Studio Light", value: Lightings.studio_light },
];

export const ColorGradeOptions: DropdownOption<ColorGrade>[] = [
    { label: "Teal & Orange", value: ColorGrades.teal_orange },
    { label: "Desaturated", value: ColorGrades.desaturated },
    { label: "Vibrant", value: ColorGrades.vibrant },
    { label: "Black & White", value: ColorGrades.black_white },
    { label: "Vintage Film", value: ColorGrades.vintage_film },
];

export const AudioStyleOptions: DropdownOption<AudioStyle>[] = [
    { label: "Orchestral", value: AudioStyles.orchestral },
    { label: "Cinematic", value: AudioStyles.cinematic },
    { label: "Ambient", value: AudioStyles.ambient },
    { label: "Electronic", value: AudioStyles.electronic },
    { label: "Rock", value: AudioStyles.rock },
    { label: "Jazz", value: AudioStyles.jazz },
    { label: "Blues", value: AudioStyles.blues },
    { label: "Hip Hop", value: AudioStyles.hip_hop },
    { label: "Pop", value: AudioStyles.pop },
    { label: "Country", value: AudioStyles.country },
    { label: "Folk", value: AudioStyles.folk },
    { label: "Classical", value: AudioStyles.classical },
    { label: "Electronic", value: AudioStyles.electronic },
    { label: "Rock", value: AudioStyles.rock },
    { label: "Jazz", value: AudioStyles.jazz },
    { label: "Blues", value: AudioStyles.blues },
    { label: "Hip Hop", value: AudioStyles.hip_hop },
    { label: "Pop", value: AudioStyles.pop },
    { label: "Country", value: AudioStyles.country },
    { label: "Folk", value: AudioStyles.folk },
    { label: "Classical", value: AudioStyles.classical },
];

export const AiModelOptions: DropdownOption<AiModel>[] = [
    { label: "Veo 3", value: AiModels.VEO3 },
    { label: "Runway", value: AiModels.RUNWAY },
    { label: "Pika", value: AiModels.PIKA },
    { label: "Stability", value: AiModels.STABILITY },
];


export const CameraMovementOptionsLabels = {
    static: "Static",
    pan: "Pan",
    tilt: "Tilt",
    zoom: "Zoom",
    dolly: "Dolly",
    tracking: "Tracking",
    crane: "Crane",
} as const;

export const LensTypeOptionsLabels = {
    wide_angle: "Wide Angle",
    standard: "Standard",
    telephoto: "Telephoto",
    macro: "Macro",
    anamorphic: "Anamorphic",
} as const;

export const DepthOfFieldOptionsLabels = {
    shallow: "Shallow",
    deep: "Deep",
} as const;

export const TimeOfDayOptionsLabels = {
    morning: "Morning",
    noon: "Noon",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
    midnight: "Midnight",
} as const;

export const CameraStyleOptionsLabels = {
    handheld: "Handheld",
    drone: "Drone",
    steadicam: "Steadicam",
    tripod: "Tripod",
    pov: "POV",
} as const;

export const ShotTypeOptionsLabels = {
    wide_shot: "Wide Shot",
    medium_shot: "Medium Shot",
    close_up: "Close-Up",
    extreme_close_up: "Extreme Close-Up",
    over_the_shoulder: "Over The Shoulder",
    establishing_shot: "Establishing Shot",
} as const;

export const AspectRatioOptionsLabels = {
    "16:9": "16:9 (YouTube / Film)",
    "9:16": "9:16 (TikTok / Reels)",
    "1:1": "1:1 (Instagram)",
    "2.35:1": "2.35:1 (Cinematic Wide)",
    "4:3": "4:3 (Classic Film)",
} as const;

export const ResolutionOptionsLabels = {
    "720p": "720p HD",
    "1080p": "1080p Full HD",
    "1440p": "1440p QHD",
    "4k": "4K Ultra HD",
} as const;

export const LightingOptionsLabels = {
    golden_hour: "Golden Hour",
    blue_hour: "Blue Hour",
    neon: "Neon",
    low_key: "Low Key",
    high_key: "High Key",
    natural_light: "Natural Light",
    studio_light: "Studio Light",
} as const;

export const ColorGradeOptionsLabels = {
    teal_orange: "Teal & Orange",
    desaturated: "Desaturated",
    vibrant: "Vibrant",
    black_white: "Black & White",
    vintage_film: "Vintage Film",
} as const;

export const AiModelOptionsLabels = {
    VEO3: "Veo 3",
    RUNWAY: "Runway",
    PIKA: "Pika",
    STABILITY: "Stability",
} as const;

export const AudioStyleOptionsLabels = {
    orchestral: "Orchestral",
    ambient: "Ambient",
    cinematic_trailer: "Cinematic Trailer",
    synthwave: "Synthwave",
    minimal: "Minimal",
    rock: "Rock",
    jazz: "Jazz",
    blues: "Blues",
    hip_hop: "Hip Hop",
    pop: "Pop",
    country: "Country",
    folk: "Folk",
    classical: "Classical",
    cinematic: "Cinematic",
    electronic: "Electronic",
} as const;

export const MotionStrengthSliderOptions: SliderConfig = {
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.5,
    marks: [
        { value: 0.1, label: "Very Low" },
        { value: 0.5, label: "Medium" },
        { value: 1, label: "Very High" },
    ],
};

export const GuidanceScaleSliderOptions: SliderConfig = {
    min: 3,
    max: 15,
    step: 0.5,
    defaultValue: 7.5,
    marks: [
        { value: 5, label: "Loose" },
        { value: 7.5, label: "Balanced" },
        { value: 12, label: "Strict" },
    ],
};

export const CreativitySliderOptions: SliderConfig = {
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.5,
    marks: [
        { value: 0.1, label: "Conservative" },
        { value: 0.5, label: "Balanced" },
        { value: 1, label: "Experimental" },
    ],
};

export const DurationSliderOptions: SliderConfig = {
    min: 2,
    max: 15,
    step: 1,
    defaultValue: 5,
    marks: [
        { value: 3, label: "3s" },
        { value: 5, label: "5s" },
        { value: 8, label: "8s" },
        { value: 10, label: "10s" },
    ],
};

export const FpsSliderOptions: SliderConfig = {
    min: 24,
    max: 60,
    step: 1,
    defaultValue: 24,
    marks: [
        { value: 24, label: "24 (Cinematic)" },
        { value: 30, label: "30 (Standard)" },
        { value: 60, label: "60 (Smooth)" },
    ],
};

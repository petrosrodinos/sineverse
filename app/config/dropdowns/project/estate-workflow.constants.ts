export const ESTATE_MOCK_FINAL_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export type WorkflowStep = 1 | 2 | 3;

export const ESTATE_TRIM_SEC_MAX = 10;
export const ESTATE_VOLUME_MIN = 0;
export const ESTATE_VOLUME_MAX = 1;
export const ESTATE_VOLUME_STEP = 0.05;
export const ESTATE_SPEED_MIN = 0.5;
export const ESTATE_SPEED_MAX = 2;
export const ESTATE_SPEED_STEP = 0.1;

export const ESTATE_TRANSITION_OPTIONS = [
  { id: "FADE", label: "Fade" },
  { id: "CROSSFADE", label: "Crossfade" },
  { id: "DISSOLVE", label: "Dissolve" },
  { id: "SLIDE_LEFT", label: "Slide left" },
  { id: "SLIDE_RIGHT", label: "Slide right" },
  { id: "ZOOM", label: "Zoom" },
] as const;

export const ESTATE_AUDIO_TRACK_OPTIONS = [
  { id: "none", label: "No music" },
  { id: "ambient_soft", label: "Soft ambient" },
  { id: "piano_minimal", label: "Minimal piano" },
  { id: "upbeat_light", label: "Light upbeat" },
  { id: "cinematic_pad", label: "Cinematic pad" },
] as const;

export const ESTATE_CAPTION_POSITION_OPTIONS = [
  { id: "BOTTOM_CENTER", label: "Bottom center" },
  { id: "BOTTOM_LEFT", label: "Bottom left" },
  { id: "BOTTOM_RIGHT", label: "Bottom right" },
  { id: "TOP_CENTER", label: "Top center" },
  { id: "TOP_LEFT", label: "Top left" },
  { id: "TOP_RIGHT", label: "Top right" },
] as const;

export const ESTATE_CAPTION_STYLE_OPTIONS = [
  { id: "CLEAN_WHITE", label: "Clean white" },
  { id: "BOLD_CONTRAST", label: "Bold contrast" },
  { id: "CINEMATIC_SOFT", label: "Cinematic soft" },
  { id: "MINIMAL_THIN", label: "Minimal thin" },
  { id: "OUTLINE_HIGH_VIS", label: "Outline high visibility" },
] as const;

export const ESTATE_DEFAULT_TRANSITION_ID = ESTATE_TRANSITION_OPTIONS[0].id;
export const ESTATE_DEFAULT_AUDIO_TRACK_ID = ESTATE_AUDIO_TRACK_OPTIONS[0].id;
export const ESTATE_DEFAULT_VOLUME = 1;
export const ESTATE_DEFAULT_SPEED = 1;
export const ESTATE_DEFAULT_CAPTION_START_SEC = 0;
export const ESTATE_DEFAULT_CAPTION_END_SEC = 5;
export const ESTATE_DEFAULT_CAPTION_POSITION = ESTATE_CAPTION_POSITION_OPTIONS[0].id;
export const ESTATE_DEFAULT_CAPTION_STYLE = ESTATE_CAPTION_STYLE_OPTIONS[0].id;

export const ESTATE_MOCK_FINAL_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export type WorkflowStep = 1 | 2 | 3;

export const ESTATE_TRIM_SEC_MAX = 10;

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

export const ESTATE_DEFAULT_TRANSITION_ID = ESTATE_TRANSITION_OPTIONS[0].id;
export const ESTATE_DEFAULT_AUDIO_TRACK_ID = ESTATE_AUDIO_TRACK_OPTIONS[0].id;

export const ESTATE_MOCK_FINAL_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export type WorkflowStep = 1 | 2 | 3;

export const ESTATE_TRANSITION_OPTIONS = [
  { id: "FADE", label: "Fade" },
  { id: "CROSSFADE", label: "Crossfade" },
  { id: "DISSOLVE", label: "Dissolve" },
  { id: "SLIDE_LEFT", label: "Slide left" },
  { id: "SLIDE_RIGHT", label: "Slide right" },
  { id: "ZOOM", label: "Zoom" },
] as const;

export const ESTATE_AUDIO_TRACK_OPTIONS = [
  {
    id: "minimal_piano",
    label: "Minimal piano",
    src: "/estate-audios/minimal-piano.mp3",
  },
  { id: "none", label: "No music", src: "" },
  {
    id: "soft_ambient",
    label: "Soft ambient",
    src: "/estate-audios/soft-ambient.mp3",
  },
  {
    id: "light_upbeat",
    label: "Light upbeat",
    src: "/estate-audios/light-upbeat.mp3",
  },
  {
    id: "cinematic_pad",
    label: "Cinematic pad",
    src: "/estate-audios/cinematic-pad.mp3",
  },
  {
    id: "nostalgic_soft",
    label: "Nostalgic soft",
    src: "/estate-audios/nostalgic-soft.mp3",
  },
] as const;

export const ESTATE_VIDEO_MODEL_OPTIONS = [
  {
    id: "runway-act-two",
    label: "Runway / Runway Act Two",
    price: 0.065,
  },
  {
    id: "klingai/video-v3-standard-image-to-video",
    label: "Kling 2.6 Pro (Best Overall)",
    price: 0.091,
  },
  {
    id: "ltxv/ltxv-2-fast",
    label: "LTXV 2 Fast (Cheapest)",
    price: 0.052,
  },
  {
    id: "klingai/v2.1-master-image-to-video",
    label: "Wan 2.6 (High Consistency)",
    price: 0.13,
  },
  {
    id: "kling-video/v1/standard/image-to-video",
    label: "Kling O1 Image-to-Video (Stable Alternative)",
    price: 0.118,
  },
  {
    id: "google/veo-3.0-i2v",
    label: "Veo 3.1 Lite (Premium Quality)",
    price: 0.104,
  },
] as const;

export type EstateVideoModelOption =
  (typeof ESTATE_VIDEO_MODEL_OPTIONS)[number];

export type EstateVideoModelId = EstateVideoModelOption["id"];

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

export const estateWalkthroughVideoConfig = {
  trimSecMax: 10,
  volumeMin: 0,
  volumeMax: 1,
  volumeStep: 0.05,
  speedMin: 0.5,
  speedMax: 2,
  speedStep: 0.1,
  transitionId: ESTATE_TRANSITION_OPTIONS[0].id,
  audioTrackId: "minimal_piano",
  videoModelId: "runway-act-two" as EstateVideoModelId,
  volume: 1,
  speed: 1,
  captionStartSec: 0,
  captionEndSec: 5,
  captionPosition: ESTATE_CAPTION_POSITION_OPTIONS[0].id,
  captionStyle: ESTATE_CAPTION_STYLE_OPTIONS[0].id,
} as const;

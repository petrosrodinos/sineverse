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
    id: "klingai/video-v2-6-pro-image-to-video",
    label: "Kling AI / Kling 2.6 Pro Image-to-Video",
    price: 0.091,
  },
  {
    id: "klingai/video-o1-image-to-video",
    label: "Kling AI / Kling Video O1 Image to Video",
    price: 0.118,
  },
  {
    id: "alibaba/wan2.5-i2v-preview",
    label: "Alibaba Cloud / Wan 2.5 Image-to-Video Preview",
    price: 0.065,
  },
  {
    id: "klingai/v2.5-turbo/pro/image-to-video",
    label: "Kuaishou Technology / Kling Video v2.5 Turbo Pro Image-to-Video",
    price: 0.091,
  },
  {
    id: "kling-video/v1.6/standard/multi-image-to-video",
    label: "Kuaishou Technology / Kling V1.6 Multi-Image-to-Video",
    price: 0.059,
  },
  {
    id: "kling-video/v2.1/standard/image-to-video",
    label: "Kuaishou Technology / Kling V2.1 Standard Image-to-Video",
    price: 0.059,
  },
  {
    id: "kling-video/v1/pro/image-to-video",
    label: "Kuaishou Technology / Kling V1.5 Pro Image-to-Video",
    price: 0.103,
  },
  {
    id: "kling-video/v1/standard/image-to-video",
    label: "Kuaishou Technology / Kling V1.5 Standard Image-to-Video",
    price: 0.059,
  },
  {
    id: "veo2/image-to-video",
    label: "Google / Veo 2 Image-to-Video",
    price: 0.455,
  },
  {
    id: "google/veo-3.1-i2v",
    label: "Google / Veo 3.1 Image-to-Video",
    price: 0.104,
  },
  {
    id: "klingai/video-v3-standard-image-to-video",
    label: "Kling AI / Kling Video v3 Standard Image-to-Video",
    price: 0.218,
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
  videoModelId: "kling-video/v2.1/standard/image-to-video" as EstateVideoModelId,
  volume: 1,
  speed: 1,
  captionStartSec: 0,
  captionEndSec: 5,
  captionPosition: ESTATE_CAPTION_POSITION_OPTIONS[0].id,
  captionStyle: ESTATE_CAPTION_STYLE_OPTIONS[0].id,
} as const;

import { VideoModels } from '@/integrations/aimlapi/core/constants';

export const ESTATE_WALKTHROUGH_VIDEO_MODEL = VideoModels.VEO_3_FAST;

export const ESTATE_WALKTHROUGH_VIDEO_PROMPT_TEXT = [
  'Premium real-estate and short-term rental walkthrough from the reference interior photo.',
  'Slow, smooth camera: gentle forward dolly or subtle arc, as if touring the space on a quiet showing.',
  'Natural daylight through windows, warm neutral tones, clean lines, tasteful staging.',
  'Stable horizon, no handheld shake; cinematic depth and soft parallax between foreground and background.',
  'Inviting, aspirational mood suitable for Airbnb or brokerage listings.',
  'No people, no faces, no text overlays, no logos, no watermarks, no UI.',
  'Photorealistic continuity with the source room; avoid warping walls, doors, or furniture.',
].join(' ');

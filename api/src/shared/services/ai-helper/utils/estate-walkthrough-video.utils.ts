import { VideoModels } from '@/integrations/aimlapi/core/constants';
import { ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO } from '@/shared/config/credits/credits.constants';

export const estateWalkthroughVideoConfig = {
  model: VideoModels.RUNWAY_ACT_TWO,
  fallbackModel: VideoModels.KLING_VIDEO_V3_STANDARD_IMAGE,
  durationSec: 4,
  creditCost: ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO,
  workflowSource: 'ESTATE_WALKTHROUGH',
  promptText: [
    'Premium real-estate and short-term rental walkthrough from the reference interior photo.',
    'Slow, smooth camera: gentle forward dolly or subtle arc, as if touring the space on a quiet showing.',
    'Natural daylight through windows, warm neutral tones, clean lines, tasteful staging.',
    'Stable horizon, no handheld shake; cinematic depth and soft parallax between foreground and background.',
    'Inviting, aspirational mood suitable for Airbnb or brokerage listings.',
    'No people, no faces, no text overlays, no logos, no watermarks, no UI, no showing people at the mirrors.',
    'Photorealistic continuity with the source room; avoid warping walls, doors, or showing or generating furniture and decoration that does not exist in the source photo.',
  ].join(' '),
} as const;

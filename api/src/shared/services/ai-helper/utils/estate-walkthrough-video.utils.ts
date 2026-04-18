import { VideoModels } from '@/integrations/aimlapi/core/constants';

export const estateWalkthroughVideoConfig = {
  model: VideoModels.LTXV_2_FAST,
  durationSec: 4,
  creditCost: 10,
  workflowSource: 'ESTATE_WALKTHROUGH',
  promptText: [
    'Premium real-estate and short-term rental walkthrough from the reference interior photo.',
    'Slow, smooth camera: gentle forward dolly or subtle arc, as if touring the space on a quiet showing.',
    'Natural daylight through windows, warm neutral tones, clean lines, tasteful staging.',
    'Stable horizon, no handheld shake; cinematic depth and soft parallax between foreground and background.',
    'Inviting, aspirational mood suitable for Airbnb or brokerage listings.',
    'No people, no faces, no text overlays, no logos, no watermarks, no UI.',
    'Photorealistic continuity with the source room; avoid warping walls, doors, or furniture.',
  ].join(' '),
} as const;

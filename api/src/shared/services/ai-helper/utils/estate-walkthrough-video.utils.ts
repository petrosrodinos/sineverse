import { VideoModels } from '@/integrations/aimlapi/core/constants';
import { ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO } from '@/shared/config/credits/credits.constants';

export const estateWalkthroughVideoConfig = {
  model: VideoModels.RUNWAY_ACT_TWO,
  fallbackModel: VideoModels.KLING_V2_1_STANDARD_IMAGE_TO_VIDEO,
  durationSec: 4,
  creditCost: ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO,
  workflowSource: 'ESTATE_WALKTHROUGH',
  promptText: [
    'Photorealistic architectural interior or exterior real estate video generated from a reference image.',
    'Slow, smooth camera: gentle forward dolly or subtle arc, as if touring the space on a quiet showing.',
    'Stable horizon, no handheld shake; no zoom, no vertical movement, no walking simulated vertical movement, smooth controlled motion like floating through space only.',
    'Natural daylight with consistent lighting (no time-of-day changes), warm neutral tones, clean lines.',
    'Inviting, aspirational mood suitable for Airbnb or brokerage listings.',
    'Scene must strictly match the input image: do not add, remove, or invent objects or features.',
    'Only apply natural environmental motion IF those elements are clearly present in the image:',
    'trees or plants may have subtle wind movement, water surfaces may have gentle ripples.',
    'If no such elements exist, the entire scene remains still with zero environmental motion.',
    'No hallucinated water, no added pools, no artificial reflections, no invented foliage.',
    'Photorealistic continuity with the source room; no warping of walls, doors, or geometry.',
    'No people, no faces, no reflections of people, no text, no overlays, no logos, no UI.',
    'Output must remain clean, stable, and physically coherent without visual artifacts.',
  ].join(' ')
} as const;

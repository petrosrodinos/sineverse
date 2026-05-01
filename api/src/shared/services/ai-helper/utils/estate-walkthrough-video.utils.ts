import { VideoModels } from '@/integrations/aimlapi/core/constants';
import { ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO } from '@/shared/config/credits/credits.constants';

export const estateWalkthroughVideoConfig = {
  model: VideoModels.RUNWAY_ACT_TWO,
  fallbackModel: VideoModels.KLING_VIDEO_V3_STANDARD_IMAGE,
  durationSec: 4,
  creditCost: ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO,
  workflowSource: 'ESTATE_WALKTHROUGH',
  promptText: [
    'Photorealistic architectural interior or exterior real estate video generated from a reference image.',
    'Camera is completely fixed on a tripod, fully locked and static.',
    'No camera movement: no dolly, no translation, no pan, no tilt, no rotation.',
    'No handheld motion, no shake, no drift, no zoom, no perspective change.',
    'Scene composition and architecture remain identical to the source image at all times.',
    'Professional real estate listing footage with high visual realism and stability.',
    'Natural environmental motion is allowed and must remain subtle and physically realistic:',
    'gentle wind movement in trees and leaves, soft ripples and reflections in pools or water surfaces, slight natural water shimmer, minimal plant movement.',
    'Lighting must remain consistent with a single moment in time (no sunrise, no sunset, no time progression, no dramatic lighting shifts).',
    'No morphing, no warping, no structural changes, no object generation.',
    'No people, no faces, no reflections of people, no text, no overlays, no logos, no UI.',
    'Output must remain clean, realistic, and physically coherent without visual artifacts.',
  ].join(' ')
  // promptText: [
  //   'Photorealistic architectural interior video generated from a reference image.',
  //   'Camera is fixed on a tripod, completely static.',
  //   'No movement of any kind: no dolly, no translation, no pan, no rotation.',
  //   'No handheld effect, no walking simulation, no shake, no drift.',
  //   'No zoom or perspective change.',
  //   'Frame remains perfectly stable over time.',
  //   'Scene remains identical to the source image with high structural consistency.',
  //   'Professional real estate listing shot, clean and precise.',
  //   'Natural daylight, realistic shadows, neutral tones.',
  //   'No people, no reflections, no text, no overlays, no logos, no UI.',
  // ].join(' ')
  // promptText: [
  //   'Photorealistic architectural interior video generated from a single reference image.',
  //   'Camera is fully stabilized on a rigid mechanical slider.',
  //   'Very slow and minimal forward motion (subtle push-in, less than 0.5 meter total movement).',
  //   'Motion is strictly linear on a single axis, with constant speed.',
  //   'No handheld characteristics: no walking, no body motion, no footsteps.',
  //   'No vertical movement, no bobbing, no lateral drift, no sway.',
  //   'Camera orientation locked: no tilt, no roll, no pan.',
  //   'No zoom or focal length change; perspective remains constant.',
  //   'Only subtle parallax between foreground and background.',
  //   'Scene remains identical to the source image with high structural consistency.',
  //   'Natural daylight, realistic shadows, neutral tones.',
  //   'No people, no reflections, no text, no overlays, no logos, no UI.',
  //   'Camera behaves like a fixed tripod slider shot, not a moving handheld camera.'
  // ].join(' ')
} as const;

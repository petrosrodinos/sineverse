import { VideoModels } from '@/integrations/aimlapi/core/constants';
import { ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO } from '@/shared/config/credits/credits.constants';

export const estateWalkthroughVideoConfig = {
  model: VideoModels.RUNWAY_ACT_TWO,
  fallbackModel: VideoModels.KLING_VIDEO_V3_STANDARD_IMAGE,
  durationSec: 4,
  creditCost: ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO,
  workflowSource: 'ESTATE_WALKTHROUGH',
  promptText: [
    'Premium real-estate and short-term rental walkthrough generated from the reference interior photo.',
    'Camera behaves like a motorized gimbal or tripod-mounted dolly, NOT handheld, NOT body-mounted, NOT walking footage.',
    'Perfectly stabilized motion: zero shake, zero jitter, zero micro-bounce, zero handheld artifacts.',
    'Constant velocity slow forward dolly movement through space (smooth linear translation), no acceleration or deceleration.',
    'Camera height fixed at eye-level (~1.6m) with a perfectly level horizon; no tilt, no roll, no sway.',
    'No simulated footsteps, no head movement, no natural body motion.',
    'Strictly no zoom of any kind: no digital zoom, no focal zoom, no field-of-view change; perspective remains constant.',
    'Motion comes only from physical camera translation, producing clean and stable parallax between foreground and background.',
    'Professional real-estate video style, similar to footage captured on a stabilized gimbal or slider.',
    'Natural daylight through windows, warm neutral tones, clean lines, tasteful staging.',
    'Photorealistic continuity with the source room; preserve exact layout, geometry, and existing furniture only.',
    'Do not warp walls, doors, or perspective; do not add or remove objects.',
    'No people, no faces, no reflections of people, no text overlays, no logos, no watermarks, no UI.',
  ].join(' ')
} as const;

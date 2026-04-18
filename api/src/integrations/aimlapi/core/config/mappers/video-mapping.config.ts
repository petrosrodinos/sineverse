import { estateWalkthroughVideoConfig } from '@/shared/services/ai-helper/utils/estate-walkthrough-video.utils';

const NORMALIZED_ASPECT_RATIO_BY_MODEL: Record<string, readonly string[]> = {
  default: ['16:9', '9:16', '1:1'],
  kling: ['16:9', '9:16', '1:1', '2.35:1', '4:3'],
  veo: ['16:9', '9:16', '1:1', '2.35:1', '4:3'],
  seedance: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', '9:21'],
};

const normalizeAspectRatio = (
  model: string,
  aspectRatio?: string,
): string | undefined => {
  if (!aspectRatio) {
    return undefined;
  }

  const normalized = aspectRatio.replace('x', ':').trim();

  if (model.includes('seedance') && normalized === '2.35:1') {
    return '21:9';
  }

  const allowed = model.includes('kling')
    ? NORMALIZED_ASPECT_RATIO_BY_MODEL.kling
    : model.includes('veo')
      ? NORMALIZED_ASPECT_RATIO_BY_MODEL.veo
      : model.includes('seedance')
        ? NORMALIZED_ASPECT_RATIO_BY_MODEL.seedance
        : NORMALIZED_ASPECT_RATIO_BY_MODEL.default;

  if (allowed.includes(normalized)) {
    return normalized;
  }

  return allowed[0];
};

const normalizeDuration = (
  model: string,
  duration?: number,
): number | undefined => {
  if (!duration || !Number.isFinite(duration)) {
    return undefined;
  }

  const normalized = Math.floor(duration);

  if (model.includes('ltxv')) {
    if ([6, 8, 10].includes(normalized)) {
      return normalized;
    }
    if (normalized <= 6) {
      return 6;
    }
    if (normalized <= 8) {
      return 8;
    }
    return 10;
  }

  if (model.includes('seedance')) {
    return [5, 10].includes(normalized) ? normalized : 5;
  }

  if (
    model.includes('kling-video/v1/standard') ||
    model.includes('v2.1-master')
  ) {
    return [5, 10].includes(normalized) ? normalized : 5;
  }

  if (model.includes('klingai/video-v3')) {
    if (normalized < 3) return 3;
    if (normalized > 15) return 15;
    return normalized;
  }

  if (model.includes('veo')) {
    return [4, 6, 8].includes(normalized) ? normalized : 8;
  }

  return normalized;
};

export const transformVariationToModelPayload = (
  variation: any,
  model: string,
): any => {
  const estateWalkthrough =
    variation.workflow_source === estateWalkthroughVideoConfig.workflowSource;
  const resolveGenerateAudio = (): boolean | undefined => {
    if (estateWalkthrough) {
      return false;
    }
    if (variation.include_sound === true) {
      return true;
    }
    if (variation.include_sound === false) {
      return false;
    }
    return undefined;
  };

  const buildPrompt = () => {
    const parts = [variation.prompt_text || ''];

    if (variation.style) parts.push(`style: ${variation.style}`);
    if (variation.tone) parts.push(`tone: ${variation.tone}`);
    if (variation.genre) parts.push(`genre: ${variation.genre}`);
    if (variation.camera_style) parts.push(`camera: ${variation.camera_style}`);
    if (variation.shot_type && variation.shot_type !== 'customize')
      parts.push(`shot: ${variation.shot_type}`);
    if (variation.camera_movement)
      parts.push(`movement: ${variation.camera_movement}`);
    if (variation.lens_type) parts.push(`lens: ${variation.lens_type}`);
    if (variation.depth_of_field)
      parts.push(`depth of field: ${variation.depth_of_field}`);
    if (variation.lighting) parts.push(`lighting: ${variation.lighting}`);
    if (variation.color_grade)
      parts.push(`color grade: ${variation.color_grade}`);
    if (variation.time_of_day) parts.push(`time: ${variation.time_of_day}`);
    if (variation.aspect_ratio)
      parts.push(`aspect ratio: ${variation.aspect_ratio}`);
    if (variation.resolution) parts.push(`resolution: ${variation.resolution}`);
    if (variation.fps) parts.push(`fps: ${variation.fps}`);
    if (variation.guidance_scale)
      parts.push(`guidance scale: ${variation.guidance_scale}`);
    if (variation.creativity) parts.push(`creativity: ${variation.creativity}`);
    if (variation.motion_strength)
      parts.push(`motion strength: ${variation.motion_strength}`);
    if (variation.negative_prompt)
      parts.push(`negative prompt: ${variation.negative_prompt}`);

    return parts.filter((p) => p.length > 0).join(', ');
  };

  const basePayload: any = {
    model,
    prompt: buildPrompt(),
    seed: variation.seed ? parseInt(variation.seed) : undefined,
    aspect_ratio: normalizeAspectRatio(model, variation.aspect_ratio),
    duration: normalizeDuration(model, variation.duration_sec),
  };

  // Kling Mappings
  if (model.includes('kling')) {
    const isV3 = model.includes('v3');
    const isImage = model.includes('image');

    const klingPayload: any = {
      ...basePayload,
      negative_prompt: variation.negative_prompt || undefined,
      cfg_scale: variation.guidance_scale || undefined,
    };

    if (isImage && variation.prompt_image?.document?.url) {
      klingPayload.image_url = variation.prompt_image.document.url;
    }

    if (isV3) {
      klingPayload.shot_type = 'customize';
      klingPayload.generate_audio = resolveGenerateAudio();
    }

    return klingPayload;
  }

  if (model.includes('ltxv')) {
    const ltxPayload: any = {
      model,
      prompt: basePayload.prompt,
      seed: basePayload.seed,
      duration: normalizeDuration(model, variation.duration_sec),
      resolution: variation.resolution || '1080p',
    };

    if (variation.prompt_image?.document?.url) {
      ltxPayload.image_url = variation.prompt_image.document.url;
    }

    const ga = resolveGenerateAudio();
    if (ga !== undefined) {
      ltxPayload.generate_audio = ga;
    }

    return ltxPayload;
  }

  // Google Veo Mappings
  if (model.includes('veo')) {
    const googlePayload: any = {
      ...basePayload,
      negative_prompt: variation.negative_prompt || undefined,
      resolution: variation.resolution || undefined,
      generate_audio: resolveGenerateAudio(),
    };

    if (model.includes('i2v') && variation.prompt_image?.document?.url) {
      googlePayload.image_url = variation.prompt_image.document.url;
    }

    return googlePayload;
  }

  // Seedance Mappings
  if (model.includes('seedance')) {
    const seedancePayload: any = {
      ...basePayload,
      resolution: variation.resolution || undefined,
    };

    if (model.includes('i2v') && variation.prompt_image?.document?.url) {
      seedancePayload.image_url = variation.prompt_image.document.url;
    }

    return seedancePayload;
  }

  // Default fallback
  return {
    ...basePayload,
    image_url: variation.prompt_image?.document?.url || undefined,
  };
};

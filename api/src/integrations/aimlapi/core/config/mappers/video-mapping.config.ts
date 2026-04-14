/**
 * Maps a Prisma SceneVariation to a model-specific payload for AIML API.
 */

const NORMALIZED_ASPECT_RATIO_BY_MODEL: Record<string, readonly string[]> = {
    default: ['16:9', '9:16', '1:1'],
    kling: ['16:9', '9:16', '1:1', '2.35:1', '4:3'],
    veo: ['16:9', '9:16', '1:1', '2.35:1', '4:3'],
    seedance: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', '9:21'],
};

const normalizeAspectRatio = (model: string, aspectRatio?: string): string | undefined => {
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

export const transformVariationToModelPayload = (variation: any, model: string): any => {
    const buildPrompt = () => {
        const parts = [variation.prompt_text || ''];

        if (variation.style) parts.push(`style: ${variation.style}`);
        if (variation.tone) parts.push(`tone: ${variation.tone}`);
        if (variation.genre) parts.push(`genre: ${variation.genre}`);
        if (variation.camera_style) parts.push(`camera: ${variation.camera_style}`);
        if (variation.shot_type && variation.shot_type !== 'customize') parts.push(`shot: ${variation.shot_type}`);
        if (variation.camera_movement) parts.push(`movement: ${variation.camera_movement}`);
        if (variation.lens_type) parts.push(`lens: ${variation.lens_type}`);
        if (variation.depth_of_field) parts.push(`depth of field: ${variation.depth_of_field}`);
        if (variation.lighting) parts.push(`lighting: ${variation.lighting}`);
        if (variation.color_grade) parts.push(`color grade: ${variation.color_grade}`);
        if (variation.time_of_day) parts.push(`time: ${variation.time_of_day}`);
        if (variation.aspect_ratio) parts.push(`aspect ratio: ${variation.aspect_ratio}`);
        if (variation.resolution) parts.push(`resolution: ${variation.resolution}`);
        if (variation.fps) parts.push(`fps: ${variation.fps}`);
        if (variation.guidance_scale) parts.push(`guidance scale: ${variation.guidance_scale}`);
        if (variation.creativity) parts.push(`creativity: ${variation.creativity}`);
        if (variation.motion_strength) parts.push(`motion strength: ${variation.motion_strength}`);
        if (variation.negative_prompt) parts.push(`negative prompt: ${variation.negative_prompt}`);

        return parts.filter(p => p.length > 0).join(', ');
    };

    const basePayload: any = {
        model,
        prompt: buildPrompt(),
        seed: variation.seed ? parseInt(variation.seed) : undefined,
        aspect_ratio: normalizeAspectRatio(model, variation.aspect_ratio),
        duration: variation.duration_sec || undefined,
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
            klingPayload.generate_audio = variation.include_sound !== null ? variation.include_sound : undefined;
        }

        return klingPayload;
    }

    // Google Veo Mappings
    if (model.includes('veo')) {
        const googlePayload: any = {
            ...basePayload,
            negative_prompt: variation.negative_prompt || undefined,
            resolution: variation.resolution || undefined,
            generate_audio: variation.include_sound !== null ? variation.include_sound : undefined,
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
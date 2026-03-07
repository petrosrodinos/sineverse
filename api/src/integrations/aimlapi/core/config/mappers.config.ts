/**
 * Maps a Prisma SceneVariation to a model-specific payload for AIML API.
 */
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

        return parts.filter(p => p.length > 0).join(', ');
    };

    const basePayload: any = {
        model,
        prompt: buildPrompt(),
        seed: variation.seed ? parseInt(variation.seed) : undefined,
        aspect_ratio: variation.aspect_ratio?.replace('x', ':') || undefined,
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

        if (isImage && variation.prompt_image?.url) {
            klingPayload.image_url = variation.prompt_image.url;
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

        if (model.includes('i2v') && variation.prompt_image?.url) {
            googlePayload.image_url = variation.prompt_image.url;
        }

        return googlePayload;
    }

    // Seedance Mappings
    if (model.includes('seedance')) {
        const seedancePayload: any = {
            ...basePayload,
            resolution: variation.resolution || undefined,
        };

        if (model.includes('i2v') && variation.prompt_image?.url) {
            seedancePayload.image_url = variation.prompt_image.url;
        }

        return seedancePayload;
    }

    // Default fallback
    return {
        ...basePayload,
        image_url: variation.prompt_image?.url || undefined,
    };
};

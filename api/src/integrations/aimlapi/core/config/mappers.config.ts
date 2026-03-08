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

/**
 * Maps a Prisma SceneVariation to an image-specific payload for AIML API.
 */
export const transformVariationToImageModelPayload = (variation: any, model: string): any => {
    const buildPrompt = () => {
        const prompt = variation.prompt || variation.prompt_text || '';
        const parts = [prompt];
        if (variation.style) parts.push(`style: ${variation.style}`);
        return parts.filter(p => p.length > 0).join(', ');
    };

    const basePayload: any = {
        model,
        prompt: buildPrompt(),
        aspect_ratio: variation.aspect_ratio?.replace('x', ':') || undefined,
        resolution: variation.resolution || undefined,
        size: variation.size || undefined,
        quality: variation.quality || undefined,
        style: variation.style || undefined,
        n: variation.n || undefined,
        enhance_prompt: variation.enhance_prompt || undefined,
        convert_base64_to_url: variation.convert_base64_to_url || undefined,
        response_format: variation.response_format || undefined,
    };

    // Kling Image Mappings
    if (model.includes('kling')) {
        const urls = variation.image_urls || (variation.prompt_image?.url ? [variation.prompt_image.url] : []);
        const payload = { ...basePayload };
        if (urls.length > 0) {
            payload.image_urls = urls;
        }
        return payload;
    }


    // Google Imagen Mappings
    if (model.includes('imagen')) {
        return {
            ...basePayload,
            aspect_ratio: variation.aspect_ratio?.replace('x', ':') || "1:1",
        };
    }

    // OpenAI DALL-E / GPT Image Mappings
    if (model.includes('dalle') || model.includes('gpt-image')) {
        return {
            ...basePayload,
            size: variation.resolution || "1024x1024",
        };
    }

    return basePayload;
};


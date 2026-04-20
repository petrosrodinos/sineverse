/**
 * Maps a Prisma SceneVariation to an image-specific payload for AIML API.
 */
export const transformVariationToImageModelPayload = (
  variation: any,
  model: string,
): any => {
  const buildPrompt = () => {
    const prompt = variation.prompt || variation.prompt_text || '';

    const parts = [prompt];

    return parts.filter((p) => p.length > 0).join(', ');
  };

  const basePayload: any = {
    model,
    prompt: buildPrompt(),
    enhance_prompt: Boolean(variation.enrich_prompt || false),
  };

  // Kling Image Mappings
  if (model.includes('kling')) {
    const urls = variation.image_urls || [];

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
    };
  }

  // OpenAI DALL-E / GPT Image Mappings
  if (model.includes('dalle') || model.includes('gpt-image')) {
    return {
      ...basePayload,
    };
  }

  return basePayload;
};

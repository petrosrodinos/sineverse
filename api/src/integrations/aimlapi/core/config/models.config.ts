import { AiProvider, GenerationType, KlingModel } from '../constants';

export interface ModelCapability {
    provider: AiProvider;
    type: GenerationType;
    displayName: string;
}

export const MODELS_CONFIG: Record<string, ModelCapability> = {
    [KlingModel.V3_PRO_TEXT_TO_VIDEO]: {
        provider: AiProvider.KLING,
        type: GenerationType.TEXT_TO_VIDEO,
        displayName: 'Kling V3 Pro (Text to Video)',
    },
    [KlingModel.V1_STANDARD_IMAGE_TO_VIDEO]: {
        provider: AiProvider.KLING,
        type: GenerationType.IMAGE_TO_VIDEO,
        displayName: 'Kling V1 Standard (Image to Video)',
    },
};

export function getModelConfig(model: string): ModelCapability | undefined {
    return MODELS_CONFIG[model];
}

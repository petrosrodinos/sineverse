import { AiService } from '@/integrations/ai/services/ai.service';
import { Injectable } from '@nestjs/common';
import { generateEnrichProjectConceptPrompt } from '../utils/project-prompts.utils';
import { generateEnrichSceneVariationPrompt } from '../utils/scene-variation-prompts.utils';
import { EnrichImagePromptConfig, EnrichProjectConceptConfig, EnrichSceneVariationConfig, GenerateAiScenesConfig } from '../interfaces/ai-helper.interfaces';
import { GenerateAiScenesSchema, GenerateAiScenesSchemaType, ProjectAssetVideoSchema, ProjectAssetVideoSchemaType } from '../schemas/scene-variation.schema';
import { generateScenePrompt } from '../utils/generate-scene-prompts.utils';
import { generateEnrichImagePrompt } from '../utils/enrich-image-prompts.utils';
import { AIGenerateTextResponse } from '@/integrations/ai/interfaces/ai.interface';

@Injectable()
export class AiHelperService {

    constructor(private readonly aiService: AiService) { }

    async enrichProjectConcept(config: EnrichProjectConceptConfig) {

        const generatedPrompt = generateEnrichProjectConceptPrompt(config);

        try {

            const response = await this.aiService.generateText({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
            });

            if (!response.response) throw new Error('Failed to enrich project concept');

            return response;

        } catch (error) {
            throw new Error('Failed to enrich project concept');
        }
    }

    async enrichSceneVariation(config: EnrichSceneVariationConfig): Promise<ProjectAssetVideoSchemaType> {

        try {

            const generatedPrompt = generateEnrichSceneVariationPrompt(config);

            const response = await this.aiService.generateTextWithSchema({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
                schema: ProjectAssetVideoSchema
            });

            if (!response.response) throw new Error('Failed to enrich scene variation');

            return response.response;

        } catch (error) {
            throw new Error('Failed to enrich scene variation');
        }
    }

    async generateAiScenes(config: GenerateAiScenesConfig): Promise<GenerateAiScenesSchemaType> {

        try {

            const generatedPrompt = generateScenePrompt(config);

            const response = await this.aiService.generateTextWithSchema({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
                schema: GenerateAiScenesSchema
            });

            if (!response.response) throw new Error('Failed to generate AI scenes');

            return response.response;

        } catch (error) {
            console.log(error);
            throw new Error('Failed to generate AI scenes');
        }

    }

    async enrichImagePrompt(config: EnrichImagePromptConfig): Promise<AIGenerateTextResponse> {

        try {

            const generatedPrompt = generateEnrichImagePrompt(config);

            const response = await this.aiService.generateText({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
            });

            if (!response.response) throw new Error('Failed to generate image prompt');

            return response;

        } catch (error) {
            throw new Error('Failed to generate image prompt');
        }

    }

}

import { AiService } from '@/integrations/ai/services/ai.service';
import { Injectable } from '@nestjs/common';
import { generateEnrichProjectConceptPrompt } from '../utils/project-prompts.utils';
import { generateEnrichSceneVariationPrompt } from '../utils/scene-variation-prompts.utils';
import { EnrichProjectConceptConfig, EnrichSceneVariationConfig } from '../interfaces/ai-helper.interfaces';
import { SceneVariationEnrichSchema, SceneVariationEnrichSchemaType } from '../schemas/scene-variation.schema';

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

    async enrichSceneVariation(config: EnrichSceneVariationConfig): Promise<SceneVariationEnrichSchemaType> {

        try {

            const generatedPrompt = generateEnrichSceneVariationPrompt(config);

            const response = await this.aiService.generateTextWithSchema({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
                schema: SceneVariationEnrichSchema
            });

            if (!response.response) throw new Error('Failed to enrich scene variation');

            return response.response;

        } catch (error) {
            throw new Error('Failed to enrich scene variation');
        }
    }

}

import { AiService } from '@/integrations/ai/services/ai.service';
import { Injectable } from '@nestjs/common';
import { generateEnrichProjectConceptPrompt } from '../utils/prompts.utils';
import { EnrichProjectDto } from '@/modules/projects/dto/enrich-project.dto';
import { EnrichProjectConceptPrompt } from '../interfaces/ai-helper.interfaces';

@Injectable()
export class AiHelperService {

    constructor(private readonly aiService: AiService) { }

    async enrichProjectConcept(prompt: EnrichProjectConceptPrompt) {

        const generatedPrompt = generateEnrichProjectConceptPrompt(prompt);

        try {

            const response = await this.aiService.generateText({
                system: generatedPrompt.system,
                prompt: generatedPrompt.prompt,
            });

            return response;

        } catch (error) {
        }
    }

}

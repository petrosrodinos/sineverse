import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createOpenAI } from '@ai-sdk/openai';
import { AIModelInfo, AiModels, AiProvider, AiProviders } from '../interfaces/ai.interface';
import { EnvConfig } from '../../../shared/config/env/env.validation';

@Injectable()
export class AiConfig {
    private readonly logger = new Logger(AiConfig.name);
    private readonly openaiClient: ReturnType<typeof createOpenAI>;
    private readonly supportedModels: AIModelInfo[] = [
        { provider: AiProviders.openai, model: AiModels.openai.gpt4o },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4oMini },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4Turbo },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4 },
        { provider: AiProviders.openai, model: AiModels.openai.gpt35Turbo },
        { provider: AiProviders.grok, model: AiModels.grok.grokBeta },
        { provider: AiProviders.grok, model: AiModels.grok.grokPro },
        { provider: AiProviders.gemini, model: AiModels.gemini.geminiPro },
        { provider: AiProviders.gemini, model: AiModels.gemini.geminiProVision },
        { provider: AiProviders.gemini, model: AiModels.gemini.gemini15Pro },
    ];

    constructor(private readonly configService: ConfigService<EnvConfig>) {
        const apiKey = this.configService.get('OPENAI_API_KEY');
        this.openaiClient = createOpenAI({ apiKey });
        this.logger.debug('OpenAI client initialized');
    }

    getModelAdapter(provider: AiProvider = AiProviders.openai, model: string = AiModels.openai.gpt4o) {
        switch (provider) {
            case AiProviders.openai:
                return this.openaiClient(model);
            case AiProviders.grok:
                throw new Error('Grok provider not yet implemented. SDK required.');
            case AiProviders.gemini:
                throw new Error('Gemini provider not yet implemented. SDK required.');
            default:
                return this.openaiClient(model);
        }
    }

    getEmbeddingModel(model: string = 'text-embedding-3-small') {
        return this.openaiClient.embedding(model);
    }


    isModelSupported(provider: AiProvider, model: string): boolean {
        return this.supportedModels.some(
            supportedModel => supportedModel.provider === provider && supportedModel.model === model
        );
    }

    getSupportedModels(): AIModelInfo[] {
        return [...this.supportedModels];
    }

    getModelsByProvider(provider: AiProvider): AIModelInfo[] {
        return this.supportedModels.filter(model => model.provider === provider);
    }

    validateProviderAndModel(provider: AiProvider, model: string): void {
        if (!this.isModelSupported(provider, model)) {
            const availableModels = this.getModelsByProvider(provider)
                .map(m => m.model)
                .join(', ');

            throw new Error(
                `Model ${model} is not supported for provider ${provider}. ` +
                `Available models for ${provider}: ${availableModels || 'none'}`
            );
        }
    }
}
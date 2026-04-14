import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {
  AIModelInfo,
  AiModels,
  AiProvider,
  AiProviders,
} from '../interfaces/ai.interface';
import { EnvConfig } from '../../../shared/config/env/env.validation';

@Injectable()
export class AiConfig {
  private readonly logger = new Logger(AiConfig.name);
  private readonly openaiClient: ReturnType<typeof createOpenAI>;
  private readonly googleClient: ReturnType<typeof createGoogleGenerativeAI>;

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
    // Experimental/Planned models (Not yet supported in SDK)
    // { provider: AiProviders.openai, model: 'sora' },
    // { provider: AiProviders.runway, model: 'gen3' },
    // { provider: AiProviders.pika, model: 'pika-1.5' },
  ];

  constructor(private readonly configService: ConfigService<EnvConfig>) {
    const openaiApiKey = this.configService.get('OPENAI_API_KEY');
    this.openaiClient = createOpenAI({ apiKey: openaiApiKey });

    const googleApiKey = this.configService.get('GOOGLE_API_KEY');
    this.googleClient = createGoogleGenerativeAI({ apiKey: googleApiKey });

    this.logger.debug('AI SDK clients initialized');
  }

  getModelAdapter(
    provider: AiProvider = AiProviders.openai,
    model: string = AiModels.openai.gpt4o,
  ) {
    switch (provider) {
      case AiProviders.openai:
        return this.openaiClient(model);
      case AiProviders.gemini:
        return this.googleClient(model);
      default:
        return this.openaiClient(model);
    }
  }

  getVideoModelAdapter(provider: string, model: string) {
    switch (provider) {
      case AiProviders.gemini:
      case 'veo':
        return this.googleClient.videoModel(model);
      case AiProviders.openai:
        throw new Error(
          'OpenAI Video (Sora) is not yet supported by the @ai-sdk/openai provider. Please use Gemini/Veo.',
        );
      case AiProviders.runway:
      case AiProviders.pika:
        throw new Error(
          `Provider ${provider} is not yet integrated with the Vercel AI SDK.`,
        );
      default:
        throw new Error(
          `Video provider ${provider} not supported by AI SDK yet.`,
        );
    }
  }

  getEmbeddingModel(model: string = 'text-embedding-3-small') {
    return this.openaiClient.embedding(model);
  }

  isModelSupported(provider: AiProvider, model: string): boolean {
    return this.supportedModels.some(
      (supportedModel) =>
        supportedModel.provider === provider && supportedModel.model === model,
    );
  }

  getSupportedModels(): AIModelInfo[] {
    return [...this.supportedModels];
  }

  getModelsByProvider(provider: AiProvider): AIModelInfo[] {
    return this.supportedModels.filter((model) => model.provider === provider);
  }

  validateProviderAndModel(provider: AiProvider, model: string): void {
    if (!this.isModelSupported(provider, model)) {
      const availableModels = this.getModelsByProvider(provider)
        .map((m) => m.model)
        .join(', ');

      throw new Error(
        `Model ${model} is not supported for provider ${provider}. ` +
          `Available models for ${provider}: ${availableModels || 'none'}`,
      );
    }
  }
}

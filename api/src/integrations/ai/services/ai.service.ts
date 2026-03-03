import { Injectable, Logger } from '@nestjs/common';
import { embed, generateObject, generateText, streamText, experimental_generateVideo } from 'ai';
import {
    AIGenerateObjectResponse,
    AIGenerateOptions,
    AIGenerateTextResponse,
    AIStreamTextOptions,
    AIGenerateVideoOptions,
    AIVideoResponse,
} from '../interfaces/ai.interface';
import { AiConfig } from '../utils/ai.config';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { calculateAiCost } from '../utils/ai-cost';

@Injectable()
export class AiService {

    constructor(private readonly aiConfig: AiConfig) { }

    private readonly logger = new Logger(AiService.name);

    async generateText(options: AIGenerateOptions): Promise<AIGenerateTextResponse> {
        try {

            // this.aiConfig.validateProviderAndModel(options.provider, options.model);

            const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

            const { text, usage } = await generateText({
                prompt: options.prompt,
                model: modelAdapter,
                system: options?.system || 'You are a helpful assistant.',
                temperature: options.temperature,
                maxOutputTokens: options.maxOutputTokens,
                topP: options.topP,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
            });

            const cost = calculateAiCost({
                provider: options.provider,
                model: options.model,
                inputTokens: usage.inputTokens ?? 0,
                outputTokens: usage.outputTokens ?? 0,
            });

            return {
                response: text,
                usage: cost,
            };
        } catch (error) {
            this.logger.error(`Error generating text: ${error.message}`);
            throw new Error(`Failed to generate text: ${error.message}`);
        }
    }


    async generateTextWithSchema<T>(options: AIGenerateOptions<T>): Promise<AIGenerateObjectResponse<T>> {
        const maxRetries = 3;
        let lastError: Error;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

                // We cast to any here to prevent TypeScript from attempting to resolve 
                // the excessively deep recursive types inherent in the AI SDK's generateObject
                // and Zod schemas, which often exceeds the recursion limit.
                const result = await generateObject({
                    model: modelAdapter as any,
                    schema: (options?.schema ?? z.any()) as any,
                    prompt: options.prompt,
                    system: options?.system || 'You are a helpful assistant.',
                });

                const { object, usage } = result;

                const cost = calculateAiCost({
                    provider: options.provider,
                    model: options.model,
                    inputTokens: usage.inputTokens ?? 0,
                    outputTokens: usage.outputTokens ?? 0,
                });

                return {
                    response: object as T,
                    usage: cost,
                };

            } catch (error) {
                lastError = error;

                if (attempt < maxRetries) {
                    this.logger.warn(`Schema validation error on attempt ${attempt}, retrying... Error: ${error.message}`);
                    continue;
                }

                this.logger.error(`Error generating text on attempt ${attempt}: ${error.message}`);
                throw new Error(`Failed to generate text: ${error.message}`);
            }
        }

        throw lastError || new Error('Failed to generate text after all retry attempts');
    }

    async streamText(options: AIStreamTextOptions): Promise<void> {
        try {

            this.aiConfig.validateProviderAndModel(options.provider, options.model);

            const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

            const stream = await streamText({
                model: modelAdapter,
                system: options.system,
                prompt: options.prompt,
                temperature: options.temperature,
                maxOutputTokens: options.maxOutputTokens,
                topP: options.topP,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
            });

            let fullText = '';

            for await (const chunk of stream.textStream) {
                if (options.onToken) {
                    options.onToken(chunk);
                }
                fullText += chunk;
            }

            if (options.onComplete) {
                options.onComplete(fullText);
            }

        } catch (error) {
            this.logger.error(`Error streaming text: ${error.message}`, error.stack);
            throw new Error(`Failed to stream text: ${error.message}`);
        }
    }

    async embedText(text: string): Promise<number[]> {
        const embeddingModel = openai.embedding('text-embedding-3-small');
        const { embedding } = await embed({
            model: embeddingModel,
            value: text,
        });
        return embedding;
    }

    /**
     * Triggers real video generation using the AI SDK.
     * This method handles the polling internally as per the latest AI SDK implementation.
     */
    async generateVideo(options: AIGenerateVideoOptions): Promise<AIVideoResponse> {
        this.logger.log(`Generating real video on ${options.provider} with model ${options.model}`);
        this.aiConfig.validateProviderAndModel(options.provider as any, options.model);

        try {
            const videoModel = this.aiConfig.getVideoModelAdapter(options.provider, options.model);

            const { video } = await experimental_generateVideo({
                model: videoModel,
                prompt: options.prompt,
                aspectRatio: options.aspect_ratio as any,
                // duration is supported by some providers in the SDK
            });

            // The SDK returns a Uint8Array (video buffer) when complete.
            return {
                provider_job_id: `v_${Date.now()}`,
                status: 'completed',
                videoBuffer: video.uint8Array,
            };
        } catch (error) {
            this.logger.error(`AI SDK Video Generation Error: ${error.message}`);
            throw new Error(`AI Provider Video Error: ${error.message}`);
        }
    }

    /**
     * Placeholder as the current AI SDK generateVideo handles polling internally.
     */
    async getVideoStatus(providerJobId: string, provider: string): Promise<AIVideoResponse> {
        throw new Error('Direct status check not implemented for blocking SDK calls. Use the background job lifecycle.');
    }

}

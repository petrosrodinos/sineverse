import { ApiProperty } from '@nestjs/swagger';

export class GenerateImageDto {
    @ApiProperty({ description: 'The AI model to use for image generation' })
    ai_model: string;

    @ApiProperty({ description: 'The prompt text to use for image generation' })
    prompt_text: string;

    @ApiProperty({ description: 'Optional list of image URLs for guidance (e.g., for Kling)', required: false })
    image_urls?: string[];

    @ApiProperty({ description: 'Whether to enrich the prompt', required: false })
    enrich_prompt?: boolean;

}



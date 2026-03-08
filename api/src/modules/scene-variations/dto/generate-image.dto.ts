import { ApiProperty } from '@nestjs/swagger';

export class GenerateImageDto {
    @ApiProperty({ description: 'The AI model to use for image generation' })
    model: string;

    @ApiProperty({ description: 'The prompt text to use for image generation' })
    prompt: string;

    @ApiProperty({ description: 'The aspect ratio of the image (e.g., 16:9, 1:1)', required: false })
    aspect_ratio?: string;

    @ApiProperty({ description: 'The resolution of the image (e.g., 1K, 2K)', required: false })
    resolution?: string;

    @ApiProperty({ description: 'The size of the image (for OpenAI, e.g., 1024x1024)', required: false })
    size?: string;

    @ApiProperty({ description: 'Optional list of image URLs for guidance (e.g., for Kling)', required: false })
    image_urls?: string[];

    @ApiProperty({ description: 'The quality of the generation (e.g., hd, standard)', required: false })
    quality?: string;

    @ApiProperty({ description: 'The style of the generation (e.g., vivid, natural)', required: false })
    style?: string;

    @ApiProperty({ description: 'Number of images to generate (e.g., 1)', required: false })
    n?: number;

    @ApiProperty({ description: 'Whether to enhance the prompt (Google Imagen)', required: false })
    enhance_prompt?: boolean;

    @ApiProperty({ description: 'The format of the response (e.g., url, b64_json)', required: false })
    response_format?: string;
}



import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EnrichSceneVariationDto {
    @ApiPropertyOptional({
        description: 'Directions for the scene variation',
        example: 'Add more details to the scene variation'
    })
    @IsString()
    @IsOptional()
    directions?: string;

    @ApiPropertyOptional({
        description: 'Whether to generate the prompt',
        example: true
    })
    @IsBoolean()
    include_prompt: boolean;

    @ApiPropertyOptional({
        description: 'Whether to generate the negative prompt',
        example: true
    })
    @IsBoolean()
    include_negative_prompt: boolean;

    @ApiPropertyOptional({
        description: 'Whether to generate the video generation options',
        example: true
    })
    @IsBoolean()
    include_video_generation_options: boolean;
}
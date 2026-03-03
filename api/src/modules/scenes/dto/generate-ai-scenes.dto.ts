import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateAiScenesDto {

    @ApiPropertyOptional({
        description: 'Project UUID',
        example: '12345678-1234-1234-1234-123456789012'
    })
    @IsString()
    project_uuid: string;

    @ApiPropertyOptional({
        description: 'Directions for the scene variation',
        example: 'Add more details to the scene variation'
    })
    @IsString()
    @IsOptional()
    directions?: string;

    @ApiPropertyOptional({
        description: 'Whether to continue the scene',
        example: true
    })
    @IsBoolean()
    continue_scenes: boolean;

    @ApiPropertyOptional({
        description: 'Whether to enrich the prompt',
        example: true
    })
    @IsBoolean()
    enrich_concept: boolean;

    @ApiPropertyOptional({
        description: 'Number of scenes to generate',
        example: 10
    })
    @IsNumber()
    number_of_scenes: number;

    @ApiPropertyOptional({
        description: 'Scene variations to generate',
        example: [1, 2, 3]
    })
    @IsArray()
    scene_variations: number[];

}

import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EnrichProjectAssetVideoDto {
  @ApiPropertyOptional({
    description: 'Directions for the project asset',
    example: 'Add more details to the project asset',
  })
  @IsString()
  @IsOptional()
  directions?: string;

  @ApiPropertyOptional({
    description: 'Whether to generate the prompt',
    example: true,
  })
  @IsBoolean()
  include_prompt: boolean;

  @ApiPropertyOptional({
    description: 'Whether to generate the negative prompt',
    example: true,
  })
  @IsBoolean()
  include_negative_prompt: boolean;

  @ApiPropertyOptional({
    description: 'Whether to generate the video generation options',
    example: true,
  })
  @IsBoolean()
  include_video_generation_options: boolean;
}

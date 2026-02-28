import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {

  @ApiPropertyOptional({ description: 'Title of the project' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Original concept of the project' })
  @IsString()
  original_concept: string;

  @ApiPropertyOptional({ description: 'Enriched concept of the project (typically AI generated)' })
  @IsString()
  @IsOptional()
  enriched_concept?: string;

  @ApiPropertyOptional({ description: 'Genre of the project' })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({ description: 'Tone of the project' })
  @IsString()
  @IsOptional()
  tone?: string;

  @ApiPropertyOptional({ description: 'Current status of the project', enum: ['DRAFT', 'ENRICHED', 'SCENES_GENERATED', 'PROMPTS_GENERATED', 'VIDEOS_GENERATING', 'COMPLETED'] })
  @IsString()
  @IsOptional()
  status?: string;
}
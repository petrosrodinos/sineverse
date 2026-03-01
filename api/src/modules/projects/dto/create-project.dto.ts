import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {

  @ApiPropertyOptional({ description: 'Title of the project' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Original concept of the project' })
  @IsString()
  original_concept: string;

  @ApiPropertyOptional({ description: 'Enriched concept of the project (typically AI generated)' })
  @IsString()
  @IsOptional()
  enriched_concept?: string;

  @ApiPropertyOptional({ description: 'Genres of the project', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @ApiPropertyOptional({ description: 'Tones of the project', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tones?: string[];

}
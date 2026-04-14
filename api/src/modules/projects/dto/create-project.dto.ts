import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectType } from '@/generated/prisma';

export class CreateProjectDto {
  @ApiPropertyOptional({ description: 'Title of the project' })
  @IsString()
  title: string;

  @ApiProperty({ enum: ProjectType, description: 'Project vertical' })
  @IsEnum(ProjectType)
  type: ProjectType;

  @ApiPropertyOptional({ description: 'Original concept of the project' })
  @IsString()
  @IsOptional()
  original_concept?: string;

  @ApiPropertyOptional({
    description: 'Enriched concept of the project (typically AI generated)',
  })
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

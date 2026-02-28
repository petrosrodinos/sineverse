import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSceneVideoDto {
  @ApiProperty({ description: 'UUID of the scene variation' })
  @IsString()
  scene_variation_uuid: string;

  @ApiProperty({ description: 'UUID of the scene' })
  @IsString()
  scene_uuid: string;

  @ApiProperty({ description: 'AI video generation provider enum' })
  @IsString()
  provider: string;

  @ApiPropertyOptional({ description: 'Whether this video is the selected final video' })
  @IsBoolean()
  @IsOptional()
  selected?: boolean;

  @ApiPropertyOptional({ description: 'Job ID from the AI provider' })
  @IsString()
  @IsOptional()
  provider_job_id?: string;

  @ApiPropertyOptional({ description: 'Duration in seconds' })
  @IsInt()
  @IsOptional()
  duration_sec?: number;

  @ApiPropertyOptional({ description: 'Resolution specification' })
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiPropertyOptional({ description: 'Current status of the video job' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Error message from the generation attempt' })
  @IsString()
  @IsOptional()
  error_message?: string;
}
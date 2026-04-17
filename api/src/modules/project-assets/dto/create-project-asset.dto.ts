import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectAssetDto {
  @ApiProperty({ description: 'The UUID of the project this asset belongs to' })
  @IsUUID()
  @IsNotEmpty()
  project_uuid: string;

  @ApiPropertyOptional({
    description: 'The UUID of the scene this asset belongs to',
  })
  @IsUUID()
  @IsOptional()
  scene_uuid?: string;

  @ApiPropertyOptional({
    description: 'The UUID of the scene variation this asset belongs to',
  })
  @IsUUID()
  @IsOptional()
  scene_variation_uuid?: string;
}

export class CreateProjectAssetVideoDto extends CreateProjectAssetDto {
  @ApiPropertyOptional({
    description: 'Whether this variation is the selected one',
  })
  @IsBoolean()
  @IsOptional()
  selected?: boolean;

  @ApiProperty({ description: 'The generation prompt text' })
  @IsString()
  @IsOptional()
  prompt_text?: string;

  @ApiPropertyOptional({ description: 'Negative prompts to avoid' })
  @IsString()
  @IsOptional()
  negative_prompt?: string;

  @ApiPropertyOptional({ description: 'Creative style' })
  @IsString()
  @IsOptional()
  style?: string;

  @ApiPropertyOptional({ description: 'Tone of the scene' })
  @IsString()
  @IsOptional()
  tone?: string;

  @ApiPropertyOptional({ description: 'Genre style specific' })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({ description: 'Camera style' })
  @IsString()
  @IsOptional()
  camera_style?: string;

  @ApiPropertyOptional({ description: 'Type of shot' })
  @IsString()
  @IsOptional()
  shot_type?: string;

  @ApiPropertyOptional({ description: 'Camera movement' })
  @IsString()
  @IsOptional()
  camera_movement?: string;

  @ApiPropertyOptional({ description: 'Type of lens used' })
  @IsString()
  @IsOptional()
  lens_type?: string;

  @ApiPropertyOptional({ description: 'Depth of field' })
  @IsString()
  @IsOptional()
  depth_of_field?: string;

  @ApiPropertyOptional({ description: 'Lighting type' })
  @IsString()
  @IsOptional()
  lighting?: string;

  @ApiPropertyOptional({ description: 'Color grading description' })
  @IsString()
  @IsOptional()
  color_grade?: string;

  @ApiPropertyOptional({ description: 'Time of day for the variation' })
  @IsString()
  @IsOptional()
  time_of_day?: string;

  @ApiPropertyOptional({ description: 'Aspect ratio format' })
  @IsString()
  @IsOptional()
  aspect_ratio?: string;

  @ApiPropertyOptional({ description: 'Resolution specification' })
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiPropertyOptional({ description: 'Frames per second' })
  @IsInt()
  @IsOptional()
  fps?: number;

  @ApiPropertyOptional({ description: 'Duration in seconds' })
  @IsInt()
  @IsOptional()
  duration_sec?: number;

  @ApiPropertyOptional({ description: 'AI Model used for generation' })
  @IsString()
  @IsOptional()
  ai_model?: string;

  @ApiPropertyOptional({ description: 'Generation seed' })
  @IsString()
  @IsOptional()
  seed?: string;

  @ApiPropertyOptional({ description: 'Creativity ratio (0-1)' })
  @IsNumber()
  @IsOptional()
  creativity?: number;

  @ApiPropertyOptional({ description: 'Motion strength ratio (0-1)' })
  @IsNumber()
  @IsOptional()
  motion_strength?: number;

  @ApiPropertyOptional({ description: 'Prompt adherence ratio (0-1)' })
  @IsNumber()
  @IsOptional()
  guidance_scale?: number;

  @ApiPropertyOptional({ description: 'Style of the audio' })
  @IsString()
  @IsOptional()
  audio_style?: string;

  @ApiPropertyOptional({ description: 'Should audio be generated' })
  @IsBoolean()
  @IsOptional()
  include_sound?: boolean;

  @ApiPropertyOptional({
    description: 'UUIDs of prompt images to associate with this video',
  })
  @IsOptional()
  prompt_image_uuids?: string[];
}

export class GenerateProjectAssetImageDto {
  @ApiProperty({ description: 'The AI model to use for image generation' })
  @IsString()
  ai_model: string;

  @ApiProperty({ description: 'The prompt text to use for image generation' })
  @IsString()
  prompt_text: string;

  @ApiProperty({
    description: 'Optional list of image URLs for guidance (e.g., for Kling)',
    required: false,
  })
  image_urls?: string[];

  @ApiProperty({ description: 'Whether to enrich the prompt', required: false })
  enrich_prompt?: boolean;
}

export class CreateEstateWalkthroughVideosDto {
  @ApiProperty({ description: 'The UUID of the project for walkthrough clips' })
  @IsUUID()
  @IsNotEmpty()
  project_uuid: string;

  @ApiPropertyOptional({
    description: 'Optional AI video model override for walkthrough generation',
  })
  @IsString()
  @IsOptional()
  ai_model?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEstateScenesFromImagesDto {
  @ApiProperty({ description: 'UUID of the associated project' })
  @IsString()
  project_uuid: string;

  @ApiPropertyOptional({
    description: 'Preferred AI model for estate walkthrough video generation',
  })
  @IsString()
  @IsOptional()
  ai_model?: string;
}

import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSceneVariationDto {
  @ApiProperty({ description: 'UUID of the parent scene' })
  @IsString()
  scene_uuid: string;

  @ApiProperty({ description: 'Title of the variation' })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Whether this variation is the selected one',
  })
  @IsBoolean()
  @IsOptional()
  selected?: boolean;
}

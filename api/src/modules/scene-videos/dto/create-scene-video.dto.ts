import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSceneVideoDto {
  @ApiProperty({ description: 'UUID of the scene variation' })
  @IsString()
  scene_variation_uuid: string;

}
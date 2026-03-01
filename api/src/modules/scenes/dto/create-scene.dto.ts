import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSceneDto {
  @ApiProperty({ description: 'UUID of the associated project' })
  @IsString()
  project_uuid: string;

  @ApiPropertyOptional({ description: 'Title of the scene' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the scene' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Order sequence of the scene' })
  @IsInt()
  @IsOptional()
  order: number;

}
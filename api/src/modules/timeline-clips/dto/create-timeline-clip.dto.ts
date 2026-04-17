import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTimelineClipDto {
  @ApiProperty()
  @IsString()
  project_uuid: string;

  @ApiProperty()
  @IsString()
  final_project_uuid: string;

  @ApiProperty()
  @IsString()
  project_asset_uuid: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  start_sec: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  end_sec: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  trim_start?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  trim_end?: number;

  @ApiPropertyOptional({ default: 1.0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  volume?: number;

  @ApiPropertyOptional({ default: 1.0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  speed?: number;
}

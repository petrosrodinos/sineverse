import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTimelineCaptionDto {
  @ApiProperty()
  @IsString()
  clip_uuid: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  start_sec: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  end_sec: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  style?: string;
}

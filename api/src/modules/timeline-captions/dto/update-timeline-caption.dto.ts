import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTimelineCaptionDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  start_sec?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  end_sec?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  style?: string;
}

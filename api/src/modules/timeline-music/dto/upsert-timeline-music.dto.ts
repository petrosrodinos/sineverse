import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertTimelineMusicDto {
  @ApiProperty({
    description:
      'Estate audio track id or "none" to clear timeline music for this final project',
  })
  @IsString()
  track_id: string;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  start_sec?: number;

  @ApiPropertyOptional({ default: 4 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  end_sec?: number;

  @ApiPropertyOptional({ default: 1, minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  volume?: number;
}

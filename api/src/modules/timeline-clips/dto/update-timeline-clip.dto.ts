import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TimelineTransitionType } from '@/generated/prisma';

export class UpdateTimelineClipDto {
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
  @IsNumber()
  @Min(0)
  @IsOptional()
  trim_start?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  trim_end?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  volume?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  speed?: number;

  @ApiPropertyOptional({ enum: TimelineTransitionType, description: 'Sets or updates the transition_out type for this clip' })
  @IsEnum(TimelineTransitionType)
  @IsOptional()
  transition_out_type?: TimelineTransitionType;

  @ApiPropertyOptional({ description: 'Transition out duration in seconds' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  transition_out_duration?: number;
}

import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TimelineTransitionType } from '@/generated/prisma';

export class UpdateTimelineTransitionDto {
  @ApiPropertyOptional({ enum: TimelineTransitionType })
  @IsEnum(TimelineTransitionType)
  @IsOptional()
  type?: TimelineTransitionType;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  duration?: number;
}

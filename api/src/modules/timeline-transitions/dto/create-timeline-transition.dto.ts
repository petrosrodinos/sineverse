import { IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TimelineTransitionType } from '@/generated/prisma';

export class CreateTimelineTransitionDto {
  @ApiProperty({ enum: TimelineTransitionType })
  @IsEnum(TimelineTransitionType)
  type: TimelineTransitionType;

  @ApiProperty({ description: 'Transition duration in seconds' })
  @IsNumber()
  @Min(0)
  duration: number;
}

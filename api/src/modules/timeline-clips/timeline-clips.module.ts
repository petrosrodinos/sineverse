import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { TimelineClipsService } from './timeline-clips.service';
import { TimelineClipsController } from './timeline-clips.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TimelineClipsController],
  providers: [TimelineClipsService],
  exports: [TimelineClipsService],
})
export class TimelineClipsModule {}

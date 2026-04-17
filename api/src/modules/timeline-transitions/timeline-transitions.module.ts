import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { TimelineTransitionsService } from './timeline-transitions.service';
import { TimelineTransitionsController } from './timeline-transitions.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TimelineTransitionsController],
  providers: [TimelineTransitionsService],
  exports: [TimelineTransitionsService],
})
export class TimelineTransitionsModule {}

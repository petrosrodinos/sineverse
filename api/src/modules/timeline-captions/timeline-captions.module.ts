import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { TimelineCaptionsService } from './timeline-captions.service';
import { TimelineCaptionsController } from './timeline-captions.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TimelineCaptionsController],
  providers: [TimelineCaptionsService],
  exports: [TimelineCaptionsService],
})
export class TimelineCaptionsModule {}

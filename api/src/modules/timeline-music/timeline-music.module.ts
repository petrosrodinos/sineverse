import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { TimelineMusicService } from './timeline-music.service';
import { TimelineMusicController } from './timeline-music.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TimelineMusicController],
  providers: [TimelineMusicService],
  exports: [TimelineMusicService],
})
export class TimelineMusicModule {}

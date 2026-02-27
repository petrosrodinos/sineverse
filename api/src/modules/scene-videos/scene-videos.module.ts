import { Module } from '@nestjs/common';
import { SceneVideosService } from './scene-videos.service';
import { SceneVideosController } from './scene-videos.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SceneVideosController],
  providers: [SceneVideosService],
})
export class SceneVideosModule { }

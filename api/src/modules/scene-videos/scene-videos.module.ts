import { Module } from '@nestjs/common';
import { SceneVideosService } from './scene-videos.service';
import { SceneVideosController } from './scene-videos.controller';

@Module({
  controllers: [SceneVideosController],
  providers: [SceneVideosService],
})
export class SceneVideosModule {}

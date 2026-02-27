import { Module } from '@nestjs/common';
import { SceneVariationsService } from './scene-variations.service';
import { SceneVariationsController } from './scene-variations.controller';

@Module({
  controllers: [SceneVariationsController],
  providers: [SceneVariationsService],
})
export class SceneVariationsModule {}

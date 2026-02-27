import { Module } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';

@Module({
  controllers: [ScenesController],
  providers: [ScenesService],
})
export class ScenesModule {}

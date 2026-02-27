import { Module } from '@nestjs/common';
import { SceneVariationsService } from './scene-variations.service';
import { SceneVariationsController } from './scene-variations.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SceneVariationsController],
  providers: [SceneVariationsService],
})
export class SceneVariationsModule { }

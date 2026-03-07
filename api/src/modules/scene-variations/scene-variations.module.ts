import { Module } from '@nestjs/common';
import { SceneVariationsService } from './scene-variations.service';
import { SceneVariationsController } from './scene-variations.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiHelperModule } from '@/shared/services/ai-helper/ai-helper.module';
import { SceneVideosModule } from '../scene-videos/scene-videos.module';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [PrismaModule, AiHelperModule, DocumentsModule, SceneVideosModule],
  controllers: [SceneVariationsController],
  providers: [SceneVariationsService],
})
export class SceneVariationsModule { }

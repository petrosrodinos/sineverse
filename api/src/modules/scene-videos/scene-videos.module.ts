import { Module } from '@nestjs/common';
import { SceneVideosService } from './scene-videos.service';
import { SceneVideosController } from './scene-videos.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { VideoGenerationProcessor } from './jobs/video-generation.processor';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { AimlApiModule } from '@/integrations/aimlapi/aimlapi.module';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [
    PrismaModule,
    GcsIntegrationModule,
    AiIntegrationModule,
    AimlApiModule,
    BullModule.registerQueue({
      name: VIDEO_GENERATION_QUEUE,
    }),
    DocumentsModule,
  ],
  controllers: [SceneVideosController],
  providers: [
    SceneVideosService,
    VideoGenerationProcessor,
  ],
  exports: [SceneVideosService],
})
export class SceneVideosModule { }

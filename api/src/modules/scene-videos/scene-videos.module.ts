import { Module } from '@nestjs/common';
import { SceneVideosService } from './scene-videos.service';
import { SceneVideosController } from './scene-videos.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { GCPDocumentsService } from './services/gcp-documents.service';
import { VideoGenerationProcessor } from './jobs/video-generation.processor';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';

import { AiIntegrationModule } from '@/integrations/ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    GcsIntegrationModule,
    AiIntegrationModule,
    BullModule.registerQueue({
      name: VIDEO_GENERATION_QUEUE,
    }),
  ],
  controllers: [SceneVideosController],
  providers: [
    SceneVideosService,
    GCPDocumentsService,
    VideoGenerationProcessor,
  ],
  exports: [SceneVideosService],
})
export class SceneVideosModule { }

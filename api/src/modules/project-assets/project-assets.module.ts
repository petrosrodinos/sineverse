import { Module } from '@nestjs/common';
import { AiHelperModule } from '@/shared/services/ai-helper/ai-helper.module';
import { ProjectAssetsService } from './project-assets.service';
import { ProjectAssetsController } from './project-assets.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { VIDEO_GENERATION_QUEUE } from './queues/video.constants';
import { VideoGenerationProcessor } from './jobs/video-generation.processor';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { AimlApiModule } from '@/integrations/aimlapi/aimlapi.module';
import { DocumentsModule } from '../documents/documents.module';
import { BullModule } from '@nestjs/bullmq';
import { CreditsModule } from '../credits/credits.module';

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
    AiHelperModule,
    CreditsModule,
  ],
  controllers: [ProjectAssetsController],
  providers: [ProjectAssetsService, VideoGenerationProcessor],
})
export class ProjectAssetsModule {}

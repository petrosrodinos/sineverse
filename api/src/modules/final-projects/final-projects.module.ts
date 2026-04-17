import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { FinalProjectsService } from './final-projects.service';
import { FinalProjectsController } from './final-projects.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DocumentsModule } from '@/modules/documents/documents.module';
import { RenderService } from './render/render.service';
import { RenderProcessor } from './render/render.processor';
import { FINAL_RENDER_QUEUE } from './render/render.constants';

@Module({
  imports: [
    PrismaModule,
    DocumentsModule,
    BullModule.registerQueue({ name: FINAL_RENDER_QUEUE }),
  ],
  controllers: [FinalProjectsController],
  providers: [FinalProjectsService, RenderService, RenderProcessor],
})
export class FinalProjectsModule {}

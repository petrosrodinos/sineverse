import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiHelperModule } from '@/shared/services/ai-helper/ai-helper.module';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [PrismaModule, AiHelperModule, DocumentsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }

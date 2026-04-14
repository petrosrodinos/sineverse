import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DocumentsModule } from '../documents/documents.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, DocumentsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

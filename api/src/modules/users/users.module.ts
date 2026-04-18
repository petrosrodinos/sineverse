import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DocumentsModule } from '../documents/documents.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, DocumentsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

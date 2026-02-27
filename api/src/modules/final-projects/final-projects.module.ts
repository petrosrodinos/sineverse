import { Module } from '@nestjs/common';
import { FinalProjectsService } from './final-projects.service';
import { FinalProjectsController } from './final-projects.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinalProjectsController],
  providers: [FinalProjectsService],
})
export class FinalProjectsModule { }

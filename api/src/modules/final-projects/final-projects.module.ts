import { Module } from '@nestjs/common';
import { FinalProjectsService } from './final-projects.service';
import { FinalProjectsController } from './final-projects.controller';

@Module({
  controllers: [FinalProjectsController],
  providers: [FinalProjectsService],
})
export class FinalProjectsModule {}

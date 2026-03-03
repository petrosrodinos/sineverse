import { Module } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiHelperModule } from '@/shared/services/ai-helper/ai-helper.module';

@Module({
  imports: [PrismaModule, AiHelperModule],
  controllers: [ScenesController],
  providers: [ScenesService],
})
export class ScenesModule { }

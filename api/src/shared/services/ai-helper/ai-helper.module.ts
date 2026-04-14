import { Module } from '@nestjs/common';
import { AiHelperService } from './services/ai-helper.service';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';

@Module({
  imports: [AiIntegrationModule],
  providers: [AiHelperService],
  exports: [AiHelperService],
})
export class AiHelperModule {}

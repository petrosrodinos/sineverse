import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { StripeIntegrationModule } from '@/integrations/stripe/stripe.module';
import { CurrencyModule } from '@/integrations/currency/currency.module';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { CreditsWebhooksController } from './credits-webhooks.controller';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    StripeIntegrationModule,
    CurrencyModule,
  ],
  controllers: [CreditsController, CreditsWebhooksController],
  providers: [CreditsService],
  exports: [CreditsService],
})
export class CreditsModule {}

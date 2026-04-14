import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { CurrencyService } from './currency.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}

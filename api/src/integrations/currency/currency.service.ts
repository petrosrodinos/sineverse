import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { Prisma } from '@/generated/prisma';
import { ensurePositiveRate } from './currency.utils';

export type CurrencyConversionResult = {
  amount: number;
  rate: number;
  source: 'live' | 'fallback';
  timestamp: Date;
};

@Injectable()
export class CurrencyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async convertUsdToEur(amountUsd: number): Promise<CurrencyConversionResult> {
    const snapshot = await this.getUsdToEurRate();
    const amount = amountUsd * snapshot.rate;

    return {
      amount,
      rate: snapshot.rate,
      source: snapshot.source,
      timestamp: snapshot.timestamp,
    };
  }

  async getUsdToEurRate(): Promise<{ rate: number; source: 'live' | 'fallback'; timestamp: Date }> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ rates?: { EUR?: number }; date?: string }>(
          'https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR',
          { timeout: 10000 },
        ),
      );

      const rate = ensurePositiveRate(Number(response.data?.rates?.EUR));

      const fetchedAt = response.data?.date ? new Date(response.data.date) : new Date();

      await this.prisma.currencyRateSnapshot.create({
        data: {
          base_currency: 'USD',
          quote_currency: 'EUR',
          rate: new Prisma.Decimal(rate),
          source: 'frankfurter',
          is_fallback: false,
          fetched_at: fetchedAt,
        },
      });

      return {
        rate,
        source: 'live',
        timestamp: fetchedAt,
      };
    } catch (error) {
      const fallback = await this.prisma.currencyRateSnapshot.findFirst({
        where: {
          base_currency: 'USD',
          quote_currency: 'EUR',
        },
        orderBy: {
          fetched_at: 'desc',
        },
      });

      if (!fallback) {
        throw new InternalServerErrorException('Currency rate unavailable and no fallback snapshot exists');
      }

      await this.prisma.currencyRateSnapshot.create({
        data: {
          base_currency: 'USD',
          quote_currency: 'EUR',
          rate: fallback.rate,
          source: 'snapshot_fallback',
          is_fallback: true,
          fetched_at: new Date(),
        },
      });

      return {
        rate: Number(fallback.rate),
        source: 'fallback',
        timestamp: fallback.fetched_at,
      };
    }
  }
}

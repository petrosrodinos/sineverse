import { Prisma } from '@/generated/prisma';

export function stripeCommissionPercentFromFeeAndAmount(
  feeCents: number,
  balanceTransactionAmountCents: number,
): Prisma.Decimal | null {
  if (balanceTransactionAmountCents <= 0) {
    return null;
  }

  return new Prisma.Decimal(feeCents).mul(100).div(balanceTransactionAmountCents);
}

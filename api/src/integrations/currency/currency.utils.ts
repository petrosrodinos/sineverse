export function ensurePositiveRate(rate: number): number {
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error('Invalid FX rate');
  }

  return rate;
}

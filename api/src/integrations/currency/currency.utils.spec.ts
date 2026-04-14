import { ensurePositiveRate } from './currency.utils';

describe('ensurePositiveRate', () => {
  it('returns valid rate', () => {
    expect(ensurePositiveRate(0.91)).toBe(0.91);
  });

  it('throws for non-positive rate', () => {
    expect(() => ensurePositiveRate(0)).toThrow('Invalid FX rate');
  });
});

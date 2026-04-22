import { calculateTokenBilling } from './hybrid-billing';

describe('calculateTokenBilling', () => {
  it('derives credits from USD cost and computes EUR amounts', () => {
    const result = calculateTokenBilling({
      providerChargeUsd: 0.218,
      appFeeMultiplier: 4,
      dollarsPerToken: 0.00983,
      fxRateUsdToEur: 0.84983,
    });

    expect(result.providerCredits).toBe(22);
    expect(result.feeTokens).toBe(88);
    expect(result.grossTokens).toBe(110);
    expect(result.providerChargeEur).toBeCloseTo(0.1853, 3);
    expect(result.appFeeAmountEur).toBeCloseTo(0.7351, 3);
    expect(result.grossChargeAmountEur).toBeCloseTo(0.9189, 3);
  });

  it('handles zero cost', () => {
    const result = calculateTokenBilling({
      providerChargeUsd: 0,
      appFeeMultiplier: 4,
      dollarsPerToken: 0.00983,
      fxRateUsdToEur: 0.84983,
    });

    expect(result.providerCredits).toBe(0);
    expect(result.feeTokens).toBe(0);
    expect(result.grossTokens).toBe(0);
    expect(result.providerChargeEur).toBe(0);
    expect(result.appFeeAmountEur).toBe(0);
    expect(result.grossChargeAmountEur).toBe(0);
  });

  it('handles FILM multiplier (1.25)', () => {
    const result = calculateTokenBilling({
      providerChargeUsd: 0.065,
      appFeeMultiplier: 1.25,
      dollarsPerToken: 0.00983,
      fxRateUsdToEur: 0.9,
    });

    expect(result.providerCredits).toBe(7);
    expect(result.feeTokens).toBe(9);
    expect(result.grossTokens).toBe(16);
  });
});

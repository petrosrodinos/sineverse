import { calculateHybridMoneyFields } from './hybrid-billing';

describe('calculateHybridMoneyFields', () => {
  it('converts USD to EUR and applies app fee rate', () => {
    const result = calculateHybridMoneyFields({
      providerChargeUsd: 10,
      fxRateUsdToEur: 0.92,
      appFeeRate: 0.2,
    });

    expect(result.providerCharge).toBeCloseTo(9.2, 6);
    expect(result.appFeeAmount).toBeCloseTo(1.84, 6);
    expect(result.grossChargeAmount).toBeCloseTo(11.04, 6);
  });
});

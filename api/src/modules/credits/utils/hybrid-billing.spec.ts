import { calculateHybridMoneyFields } from './hybrid-billing';

describe('calculateHybridMoneyFields', () => {
  it('converts USD to EUR and applies app fee rate', () => {
    const result = calculateHybridMoneyFields({
      providerChargeUsd: 10,
      fxRateUsdToEur: 0.92,
      appFeeRatePercent: 20,
    });

    expect(result.providerChargeUsdRounded).toBe(10);
    expect(result.providerCharge).toBe(9.2);
    expect(result.appFeeAmount).toBe(1.84);
    expect(result.grossChargeAmount).toBe(11.04);
  });

  it('rounds USD and matches estate-style fee at rate 4', () => {
    const result = calculateHybridMoneyFields({
      providerChargeUsd: 0.312,
      fxRateUsdToEur: 0.84767,
      appFeeRatePercent: 4,
    });
    expect(result.providerChargeUsdRounded).toBe(0.31);
    expect(result.providerCharge).toBe(0.26);
    expect(result.appFeeAmount).toBe(0.01);
    expect(result.grossChargeAmount).toBe(0.27);
  });
});

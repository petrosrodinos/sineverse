import { calculateUsageCreditsValue } from './utils/credits-calculator';

describe('CreditsService', () => {
  it('applies base markup and estate multiplier', () => {
    const result = calculateUsageCreditsValue({
      providerCreditsUsed: 1000,
      baseMarkupPercent: 0.1,
      projectTypeMultiplier: 1.1,
    });
    expect(result).toBe(1210);
  });

  it('applies base markup and film multiplier', () => {
    const result = calculateUsageCreditsValue({
      providerCreditsUsed: 1000,
      baseMarkupPercent: 0.1,
      projectTypeMultiplier: 1.25,
    });
    expect(result).toBe(1375);
  });

  it('rounds up final value', () => {
    const result = calculateUsageCreditsValue({
      providerCreditsUsed: 3,
      baseMarkupPercent: 0.1,
      projectTypeMultiplier: 1.1,
    });
    expect(result).toBe(4);
  });
});

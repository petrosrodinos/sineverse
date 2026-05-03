export function roundMoney4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function calculateTokenBilling(params: {
  providerChargeUsd: number;
  appFeeMultiplier: number;
  dollarsPerToken: number;
  fxRateUsdToEur: number;
}): {
  providerCredits: number;
  feeTokens: number;
  grossTokens: number;
  providerChargeEur: number;
  appFeeAmountEur: number;
  grossChargeAmountEur: number;
} {
  const { providerChargeUsd, appFeeMultiplier, dollarsPerToken, fxRateUsdToEur } =
    params;

  const providerCredits = Math.round(providerChargeUsd / dollarsPerToken);
  const feeTokens = Math.round(providerCredits * appFeeMultiplier);
  const grossTokens = providerCredits + feeTokens;

  const providerChargeEur = roundMoney4(providerChargeUsd * fxRateUsdToEur);
  const appFeeAmountEur = roundMoney4(providerChargeEur * appFeeMultiplier);
  const grossChargeAmountEur = roundMoney4(providerChargeEur + appFeeAmountEur);

  return {
    providerCredits,
    feeTokens,
    grossTokens,
    providerChargeEur,
    appFeeAmountEur,
    grossChargeAmountEur,
  };
}

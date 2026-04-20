function roundMoney2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateHybridMoneyFields(params: {
  providerChargeUsd: number;
  fxRateUsdToEur: number;
  appFeeMultiplier: number;
}) {
  const { providerChargeUsd, fxRateUsdToEur, appFeeMultiplier } = params;

  const usdRounded = roundMoney2(providerChargeUsd);

  const providerCharge = roundMoney2(usdRounded * fxRateUsdToEur);

  const appFeeAmount = roundMoney2(providerCharge * appFeeMultiplier);

  const grossChargeAmount = roundMoney2(providerCharge + appFeeAmount);

  return {
    providerChargeUsdRounded: usdRounded,
    providerCharge,
    appFeeAmount,
    grossChargeAmount,
  };
}

export function calculateEstateUsageMoneyFromCredits(params: {
  creditsDeducted: number;
  estateMultiplier: number;
  appFeeMultiplier: number;
}): {
  providerCharge: number;
  appFeeAmount: number;
  grossChargeAmount: number;
} | null {
  const { creditsDeducted, estateMultiplier, appFeeMultiplier } = params;

  if (
    !Number.isFinite(creditsDeducted) ||
    creditsDeducted <= 0 ||
    !Number.isFinite(estateMultiplier) ||
    estateMultiplier <= 0 ||
    !Number.isFinite(appFeeMultiplier)
  ) {
    return null;
  }

  const providerCharge = roundMoney2(creditsDeducted / estateMultiplier);

  const appFeeAmount = roundMoney2(providerCharge * appFeeMultiplier);

  const grossChargeAmount = roundMoney2(providerCharge + appFeeAmount);

  return {
    providerCharge,
    appFeeAmount,
    grossChargeAmount,
  };
}

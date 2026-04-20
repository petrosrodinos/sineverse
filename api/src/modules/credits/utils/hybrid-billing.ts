function roundMoney2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateHybridMoneyFields(params: {
  providerChargeUsd: number;
  fxRateUsdToEur: number;
  appFeeRatePercent: number;
}) {
  const { providerChargeUsd, fxRateUsdToEur, appFeeRatePercent } = params;
  const usdRounded = roundMoney2(providerChargeUsd);
  const providerCharge = roundMoney2(usdRounded * fxRateUsdToEur);
  const appFeeAmount = roundMoney2(
    providerCharge * (appFeeRatePercent / 100),
  );
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
  appFeeRatePercent: number;
}): {
  providerCharge: number;
  appFeeAmount: number;
  grossChargeAmount: number;
} | null {
  const { creditsDeducted, estateMultiplier, appFeeRatePercent } = params;
  if (
    !Number.isFinite(creditsDeducted) ||
    creditsDeducted <= 0 ||
    !Number.isFinite(estateMultiplier) ||
    estateMultiplier <= 0 ||
    !Number.isFinite(appFeeRatePercent)
  ) {
    return null;
  }
  const providerCharge = roundMoney2(creditsDeducted / estateMultiplier);
  const appFeeAmount = roundMoney2(
    providerCharge * (appFeeRatePercent / 100),
  );
  const grossChargeAmount = roundMoney2(providerCharge + appFeeAmount);
  return {
    providerCharge,
    appFeeAmount,
    grossChargeAmount,
  };
}

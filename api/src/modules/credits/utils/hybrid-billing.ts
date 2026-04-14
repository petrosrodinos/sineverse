export function calculateHybridMoneyFields(params: {
  providerChargeUsd: number;
  fxRateUsdToEur: number;
  appFeeRate: number;
}) {
  const { providerChargeUsd, fxRateUsdToEur, appFeeRate } = params;
  const providerCharge = providerChargeUsd * fxRateUsdToEur;
  const appFeeAmount = providerCharge * appFeeRate;
  const grossChargeAmount = providerCharge + appFeeAmount;

  return {
    providerCharge,
    appFeeAmount,
    grossChargeAmount,
  };
}

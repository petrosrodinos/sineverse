export function calculateUsageCreditsValue(params: {
  providerCreditsUsed: number;
  baseMarkupPercent: number;
  projectTypeMultiplier: number;
}) {
  const { providerCreditsUsed, baseMarkupPercent, projectTypeMultiplier } = params;
  return Math.ceil(providerCreditsUsed * (1 + baseMarkupPercent) * projectTypeMultiplier);
}

export const CREDIT_PURCHASE_KIND = {
  STRIPE_PURCHASE: "STRIPE_PURCHASE",
  APP_GIFT: "APP_GIFT",
} as const;

export type CreditPurchaseKind =
  (typeof CREDIT_PURCHASE_KIND)[keyof typeof CREDIT_PURCHASE_KIND];

export const REGISTRATION_GIFT_CREDIT_PACK_KEY =
  "APP_REGISTRATION_GIFT" as const;

export function getCreditPurchaseKindLabel(
  kind: CreditPurchaseKind | string | undefined | null,
): string {
  if (kind === CREDIT_PURCHASE_KIND.APP_GIFT) {
    return "App gift";
  }

  return "Purchased";
}

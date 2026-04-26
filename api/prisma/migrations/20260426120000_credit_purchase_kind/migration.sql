CREATE TYPE "CreditPurchaseKind" AS ENUM ('STRIPE_PURCHASE', 'APP_GIFT');

ALTER TABLE "credit_purchases" ADD COLUMN "kind" "CreditPurchaseKind" NOT NULL DEFAULT 'STRIPE_PURCHASE';

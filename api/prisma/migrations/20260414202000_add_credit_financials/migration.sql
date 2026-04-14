ALTER TABLE "credit_purchases"
ADD COLUMN "gross_amount_cents" INTEGER,
ADD COLUMN "stripe_fee_cents" INTEGER,
ADD COLUMN "net_amount_cents" INTEGER;

ALTER TABLE "credit_ledger_entries"
ADD COLUMN "provider_charge_amount" DECIMAL(12, 6),
ADD COLUMN "app_fee_rate" DECIMAL(8, 6),
ADD COLUMN "app_fee_amount" DECIMAL(12, 6),
ADD COLUMN "gross_charge_amount" DECIMAL(12, 6);

UPDATE "credit_purchases"
SET "gross_amount_cents" = "amount_cents"
WHERE "gross_amount_cents" IS NULL;

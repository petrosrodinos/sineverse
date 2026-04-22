ALTER TABLE "credit_ledger_entries"
  ADD COLUMN IF NOT EXISTS "provider_credits_used" INTEGER,
  ADD COLUMN IF NOT EXISTS "fee_tokens" INTEGER,
  ADD COLUMN IF NOT EXISTS "gross_tokens" INTEGER;

ALTER TABLE "credit_ledger_entries"
  ALTER COLUMN "provider_charge_amount_usd" TYPE DECIMAL(12,4),
  ALTER COLUMN "provider_charge_amount" TYPE DECIMAL(12,4),
  ALTER COLUMN "app_fee_rate" TYPE DECIMAL(10,4),
  ALTER COLUMN "app_fee_amount" TYPE DECIMAL(12,4),
  ALTER COLUMN "gross_charge_amount" TYPE DECIMAL(12,4);

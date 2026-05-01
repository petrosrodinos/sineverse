ALTER TABLE "credit_ledger_entries"
ADD COLUMN "requested_duration_sec" INTEGER,
ADD COLUMN "provider_cost_usd_per_second" DECIMAL(12, 6);

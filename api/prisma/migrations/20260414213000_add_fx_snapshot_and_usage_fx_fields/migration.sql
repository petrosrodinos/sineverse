ALTER TABLE "credit_ledger_entries"
ADD COLUMN "provider_charge_amount_usd" DECIMAL(12, 6),
ADD COLUMN "fx_rate_usd_to_eur" DECIMAL(12, 6),
ADD COLUMN "fx_source" TEXT,
ADD COLUMN "fx_timestamp" TIMESTAMP(3);

CREATE TABLE "currency_rate_snapshots" (
    "id" SERIAL NOT NULL,
    "base_currency" TEXT NOT NULL,
    "quote_currency" TEXT NOT NULL,
    "rate" DECIMAL(12, 6) NOT NULL,
    "source" TEXT NOT NULL,
    "is_fallback" BOOLEAN NOT NULL DEFAULT false,
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "currency_rate_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "currency_rate_snapshots_base_currency_quote_currency_fetched_at_idx"
ON "currency_rate_snapshots"("base_currency", "quote_currency", "fetched_at");

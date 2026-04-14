-- Create enums
CREATE TYPE "CreditLedgerType" AS ENUM ('PURCHASE', 'USAGE', 'ADJUSTMENT', 'REFUND');
CREATE TYPE "CreditPurchaseStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'EXPIRED');

-- Alter users table
ALTER TABLE "users" ADD COLUMN "credits_balance" INTEGER NOT NULL DEFAULT 0;

-- Create credit packs
CREATE TABLE "credit_packs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits_amount" INTEGER NOT NULL,
    "amount_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "stripe_product_id" TEXT,
    "stripe_price_id" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "credit_packs_pkey" PRIMARY KEY ("id")
);

-- Create credit purchases
CREATE TABLE "credit_purchases" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "credit_pack_uuid" TEXT NOT NULL,
    "status" "CreditPurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "credits_amount" INTEGER NOT NULL,
    "amount_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "stripe_session_id" TEXT,
    "stripe_payment_intent_id" TEXT,
    "stripe_charge_id" TEXT,
    "stripe_receipt_url" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "credit_purchases_pkey" PRIMARY KEY ("id")
);

-- Create credit ledger entries
CREATE TABLE "credit_ledger_entries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "type" "CreditLedgerType" NOT NULL,
    "delta_credits" INTEGER NOT NULL,
    "balance_after" INTEGER NOT NULL,
    "project_type" "ProjectType",
    "source" TEXT,
    "source_ref_uuid" TEXT,
    "idempotency_key" TEXT,
    "credit_purchase_uuid" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "credit_ledger_entries_pkey" PRIMARY KEY ("id")
);

-- Unique indexes
CREATE UNIQUE INDEX "credit_packs_uuid_key" ON "credit_packs"("uuid");
CREATE UNIQUE INDEX "credit_packs_key_key" ON "credit_packs"("key");
CREATE UNIQUE INDEX "credit_packs_stripe_product_id_key" ON "credit_packs"("stripe_product_id");
CREATE UNIQUE INDEX "credit_packs_stripe_price_id_key" ON "credit_packs"("stripe_price_id");

CREATE UNIQUE INDEX "credit_purchases_uuid_key" ON "credit_purchases"("uuid");
CREATE UNIQUE INDEX "credit_purchases_stripe_session_id_key" ON "credit_purchases"("stripe_session_id");
CREATE UNIQUE INDEX "credit_purchases_stripe_payment_intent_id_key" ON "credit_purchases"("stripe_payment_intent_id");
CREATE UNIQUE INDEX "credit_purchases_stripe_charge_id_key" ON "credit_purchases"("stripe_charge_id");

CREATE UNIQUE INDEX "credit_ledger_entries_uuid_key" ON "credit_ledger_entries"("uuid");
CREATE UNIQUE INDEX "credit_ledger_entries_idempotency_key_key" ON "credit_ledger_entries"("idempotency_key");

-- Query indexes
CREATE INDEX "credit_packs_active_idx" ON "credit_packs"("active");
CREATE INDEX "credit_packs_key_idx" ON "credit_packs"("key");

CREATE INDEX "credit_purchases_user_uuid_created_at_idx" ON "credit_purchases"("user_uuid", "created_at");
CREATE INDEX "credit_purchases_credit_pack_uuid_idx" ON "credit_purchases"("credit_pack_uuid");
CREATE INDEX "credit_purchases_status_idx" ON "credit_purchases"("status");

CREATE INDEX "credit_ledger_entries_user_uuid_created_at_idx" ON "credit_ledger_entries"("user_uuid", "created_at");
CREATE INDEX "credit_ledger_entries_type_idx" ON "credit_ledger_entries"("type");
CREATE INDEX "credit_ledger_entries_credit_purchase_uuid_idx" ON "credit_ledger_entries"("credit_purchase_uuid");

-- Foreign keys
ALTER TABLE "credit_purchases"
ADD CONSTRAINT "credit_purchases_user_uuid_fkey"
FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "credit_purchases"
ADD CONSTRAINT "credit_purchases_credit_pack_uuid_fkey"
FOREIGN KEY ("credit_pack_uuid") REFERENCES "credit_packs"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "credit_ledger_entries"
ADD CONSTRAINT "credit_ledger_entries_user_uuid_fkey"
FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "credit_ledger_entries"
ADD CONSTRAINT "credit_ledger_entries_credit_purchase_uuid_fkey"
FOREIGN KEY ("credit_purchase_uuid") REFERENCES "credit_purchases"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

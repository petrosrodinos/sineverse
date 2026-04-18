ALTER TABLE "credit_ledger_entries" ADD COLUMN "credits_used" INTEGER;

UPDATE "credit_ledger_entries"
SET "credits_used" = ABS("delta_credits")
WHERE "type" = 'USAGE' AND "credits_used" IS NULL;

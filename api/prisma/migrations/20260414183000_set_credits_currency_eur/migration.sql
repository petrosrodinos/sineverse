ALTER TABLE "credit_packs" ALTER COLUMN "currency" SET DEFAULT 'eur';
ALTER TABLE "credit_purchases" ALTER COLUMN "currency" SET DEFAULT 'eur';

UPDATE "credit_packs"
SET "currency" = 'eur'
WHERE "key" IN ('starter_50', 'creator_250', 'studio_700');

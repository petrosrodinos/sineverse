WITH recalculated AS (
  SELECT
    "uuid",
    ROUND(
      "provider_charge_amount"
      * (CASE WHEN "app_fee_rate" > 1 THEN "app_fee_rate" / 100 ELSE "app_fee_rate" END),
      6
    ) AS "next_app_fee_amount"
  FROM "credit_ledger_entries"
  WHERE
    "type" = 'USAGE'
    AND "provider_charge_amount" IS NOT NULL
    AND "app_fee_rate" IS NOT NULL
)
UPDATE "credit_ledger_entries" cle
SET
  "app_fee_amount" = r."next_app_fee_amount",
  "gross_charge_amount" = ROUND(cle."provider_charge_amount" + r."next_app_fee_amount", 6),
  "updated_at" = NOW()
FROM recalculated r
WHERE cle."uuid" = r."uuid";

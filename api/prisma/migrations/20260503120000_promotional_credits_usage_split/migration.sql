ALTER TABLE "users" ADD COLUMN "promotional_credits_balance" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "credit_ledger_entries" ADD COLUMN "usage_promotional_credits_applied" INTEGER;
ALTER TABLE "credit_ledger_entries" ADD COLUMN "usage_paid_credits_applied" INTEGER;
ALTER TABLE "credit_ledger_entries" ADD COLUMN "app_fee_amount_promotional_eur" DECIMAL(12,4);
ALTER TABLE "credit_ledger_entries" ADD COLUMN "app_fee_amount_paid_eur" DECIMAL(12,4);

DO $$
DECLARE
  u RECORD;
  r RECORD;
  promo INT;
  paid INT;
  d INT;
  pf INT;
  pp INT;
  fee_pr NUMERIC(12,4);
  fee_p NUMERIC(12,4);
  bal INT;
BEGIN
  FOR u IN SELECT uuid, credits_balance FROM users
  LOOP
    promo := 0;
    paid := 0;
    FOR r IN
      SELECT id, type, delta_credits, source, app_fee_amount
      FROM credit_ledger_entries
      WHERE user_uuid = u.uuid
      ORDER BY created_at ASC, id ASC
    LOOP
      IF r.type = 'PURCHASE'::"CreditLedgerType" AND r.delta_credits > 0 THEN
        IF r.source = 'registration_gift' THEN
          promo := promo + r.delta_credits;
        ELSE
          paid := paid + r.delta_credits;
        END IF;
      ELSIF r.type = 'USAGE'::"CreditLedgerType" AND r.delta_credits < 0 THEN
        d := -r.delta_credits;
        pf := LEAST(d, promo);
        pp := d - pf;
        promo := promo - pf;
        paid := paid - pp;
        IF r.app_fee_amount IS NOT NULL AND d > 0 THEN
          fee_pr := ROUND((r.app_fee_amount::NUMERIC * pf::NUMERIC) / d::NUMERIC, 4);
          fee_p := r.app_fee_amount::NUMERIC - fee_pr;
          UPDATE credit_ledger_entries
          SET
            usage_promotional_credits_applied = pf,
            usage_paid_credits_applied = pp,
            app_fee_amount_promotional_eur = fee_pr,
            app_fee_amount_paid_eur = fee_p
          WHERE id = r.id;
        ELSE
          UPDATE credit_ledger_entries
          SET
            usage_promotional_credits_applied = pf,
            usage_paid_credits_applied = pp,
            app_fee_amount_promotional_eur = NULL,
            app_fee_amount_paid_eur = NULL
          WHERE id = r.id;
        END IF;
      END IF;
    END LOOP;
    bal := u.credits_balance;
    IF promo < 0 THEN
      promo := 0;
    END IF;
    IF promo > bal THEN
      promo := bal;
    END IF;
    UPDATE users SET promotional_credits_balance = promo WHERE uuid = u.uuid;
  END LOOP;
END $$;

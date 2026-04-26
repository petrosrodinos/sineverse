export interface CreditsSummary {
  balance: number;
  purchased_credits: number;
  used_credits: number;
}

export interface CreditsUsageStats {
  total_credits_used: number;
  film_credits_used: number;
  estate_credits_used: number;
  other_credits_used: number;
}

export interface CreditPack {
  uuid: string;
  key: string;
  name: string;
  credits_amount: number;
  amount_cents: number;
  currency: string;
  active: boolean;
}

export interface CreditsUsageItem {
  uuid: string;
  type: "USAGE";
  delta_credits: number;
  balance_after: number;
  project_type: "FILM" | "ESTATE" | null;
  source: string | null;
  source_ref_uuid: string | null;
  provider_charge_amount_usd?: number | string | null;
  provider_charge_amount?: number | string | null;
  fx_rate_usd_to_eur?: number | string | null;
  fx_source?: "live" | "fallback" | string | null;
  fx_timestamp?: string | null;
  app_fee_rate?: number | string | null;
  app_fee_amount?: number | string | null;
  gross_charge_amount?: number | string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

export interface AdminCreditUsageQuery {
  page?: number;
  limit?: number;
  user_uuid?: string;
  search?: string;
  sort_by?:
    | "created_at"
    | "delta_credits"
    | "provider_charge_amount_usd"
    | "provider_charge_amount"
    | "app_fee_amount"
    | "gross_charge_amount";
  sort_order?: "asc" | "desc";
}

export interface AdminCreditUsageRow {
  id: number;
  uuid: string;
  type: "USAGE";
  delta_credits: number;
  project_type: "FILM" | "ESTATE" | null;
  source: string | null;
  provider_charge_amount_usd: number | null;
  provider_charge_amount: string | null;
  app_fee_rate: string | null;
  app_fee_amount: string | null;
  gross_charge_amount: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  user: {
    uuid: string;
    email: string;
  };
}

export interface CreditPurchaseItem {
  uuid: string;
  kind: "STRIPE_PURCHASE" | "APP_GIFT";
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "EXPIRED";
  credits_amount: number;
  amount_cents: number;
  gross_amount_cents?: number | null;
  stripe_fee_cents?: number | null;
  net_amount_cents?: number | null;
  currency: string;
  stripe_receipt_url?: string | null;
  created_at: string;
  credit_pack: CreditPack;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface CreateCreditCheckoutPayload {
  pack_key: string;
}

export interface CreateCreditCheckoutResponse {
  session_id: string;
  checkout_url: string | null;
}

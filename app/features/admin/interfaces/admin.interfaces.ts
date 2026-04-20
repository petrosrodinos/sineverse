import { RoleType } from "@/features/user/interfaces/user.interfaces";

export interface AdminOverview {
  total_users: number;
  total_projects: number;
  total_final_projects: number;
  total_videos_created: number;
  total_images_created: number;
  total_token_usage: number;
  total_gross_revenue_cents: number;
  total_net_revenue_cents: number;
  total_stripe_fees_cents: number;
  total_app_fees_collected: number;
  total_aimlapi_provider_cost: {
    usd: number;
    eur: number;
  };
}

export interface AdminPaginationResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: "created_at" | "full_name" | "email" | "role" | "credits_balance";
  sort_order?: "asc" | "desc";
}

export interface AdminUserRow {
  uuid: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: RoleType;
  credits_balance: number;
  token_usage: number;
  created_at: string;
}

export interface UpdateAdminUserPayload {
  email: string;
  full_name: string;
  phone: string | null;
  role: RoleType;
  credits_balance: number;
}

export interface AdminPurchasesQuery {
  page?: number;
  limit?: number;
  search?: string;
  pack_key?: string;
  status?: "PENDING" | "SUCCEEDED" | "FAILED" | "EXPIRED";
  sort_by?:
    | "created_at"
    | "status"
    | "gross_amount_cents"
    | "net_amount_cents"
    | "stripe_fee_cents"
    | "credits_amount";
  sort_order?: "asc" | "desc";
}

export interface AdminPurchaseRow {
  uuid: string;
  user_uuid: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "EXPIRED";
  currency: string;
  credits_amount: number;
  gross_amount_cents: number;
  net_amount_cents: number;
  stripe_fee_cents: number;
  stripe_commission_percent?: number | null;
  app_fee_cents: number;
  created_at: string;
  user: {
    uuid: string;
    email: string;
  };
  credit_pack: {
    key: string;
    name: string;
  };
}

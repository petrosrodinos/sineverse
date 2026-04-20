"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Search } from "lucide-react";
import { useAdminUsers } from "@/features/admin/hooks/use-admin";
import { AdminUsersQuery } from "@/features/admin/interfaces/admin.interfaces";
import { useAdminCreditUsage } from "@/features/credits/hooks/use-credits";
import { AdminCreditUsageQuery, AdminCreditUsageRow } from "@/features/credits/interfaces/credits.interfaces";
import { AdminDataTable } from "./AdminDataTable";

type AdminCreditUsageTabProps = {
  isActive: boolean;
};

const creditUsageColumns = [
  { key: "id", label: "ID" },
  { key: "user", label: "USER (ID / EMAIL)" },
  { key: "provider_charge_amount_usd", label: "PROVIDER CHARGE USD" },
  { key: "provider_charge_amount", label: "PROVIDER CHARGE" },
  { key: "app_fee_rate", label: "APP FEE RATE" },
  { key: "app_fee_amount", label: "APP FEE AMOUNT" },
  { key: "gross_charge_amount", label: "GROSS CHARGE" },
  { key: "generation_model", label: "GENERATION MODEL" },
  { key: "created_at", label: "CREATED AT" },
  { key: "type", label: "TYPE" },
  { key: "delta_credits", label: "DELTA CREDITS" },
  { key: "project_type", label: "PROJECT TYPE" },
  { key: "source", label: "SOURCE" },
];

function getGenerationModel(row: AdminCreditUsageRow): string {
  const value = row.metadata?.generation_model;
  return typeof value === "string" ? value : "—";
}

function formatCurrencyValue(value: number, currency: "USD" | "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}

function formatUsdValue(value: number | null): string {
  if (value === null) return "—";
  return formatCurrencyValue(value, "USD");
}

function formatEurStringValue(value: string | null): string {
  if (value === null) return "—";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return value;
  return formatCurrencyValue(parsed, "EUR");
}

function formatMultiplierValue(value: string | null): string {
  if (value === null) return "—";
  return value.endsWith("x") ? value : `${value}x`;
}

export function AdminCreditUsageTab({ isActive }: AdminCreditUsageTabProps) {
  const usersQuery: AdminUsersQuery = {
    page: 1,
    limit: 100,
    sort_by: "email",
    sort_order: "asc",
  };

  const [creditUsageQuery, setCreditUsageQuery] = useState<AdminCreditUsageQuery>({
    page: 1,
    limit: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });
  const [creditUsageSearchInput, setCreditUsageSearchInput] = useState("");

  const { data: creditUsageData, isLoading: creditUsageLoading } = useAdminCreditUsage(creditUsageQuery, { enabled: isActive });
  const { data: usersData } = useAdminUsers(usersQuery, { enabled: isActive });
  const userFilterOptions = useMemo(
    () => [{ uuid: "all", email: "All users" }, ...(usersData?.items ?? []).map((user) => ({ uuid: user.uuid, email: user.email }))],
    [usersData?.items],
  );

  const creditUsageControls = (
    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:items-end lg:flex lg:w-auto lg:min-w-0 lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-2">
      <Input
        value={creditUsageSearchInput}
        onValueChange={setCreditUsageSearchInput}
        placeholder="Search usage id, user id, user email, source"
        startContent={<Search className="size-4 text-default-400" />}
        className="min-w-0 sm:col-span-2 lg:max-w-sm lg:flex-1"
      />
      <Select
        aria-label="Filter credit usage by user"
        label="User"
        size="sm"
        selectedKeys={[creditUsageQuery.user_uuid ?? "all"]}
        onSelectionChange={(keys) => {
          const next = Array.from(keys)[0] as string;
          setCreditUsageQuery((prev) => ({
            ...prev,
            page: 1,
            user_uuid: next && next !== "all" ? next : undefined,
          }));
        }}
        className="min-w-0 w-full lg:w-64"
      >
        {userFilterOptions.map((user) => (
          <SelectItem key={user.uuid}>{user.email}</SelectItem>
        ))}
      </Select>
      <Select
        aria-label="Sort credit usage by"
        label="Sort"
        size="sm"
        selectedKeys={[creditUsageQuery.sort_by ?? "created_at"]}
        onSelectionChange={(keys) =>
          setCreditUsageQuery((prev) => ({
            ...prev,
            page: 1,
            sort_by: Array.from(keys)[0] as AdminCreditUsageQuery["sort_by"],
          }))
        }
        className="min-w-0 w-full lg:w-52"
      >
        <SelectItem key="created_at">Newest</SelectItem>
        <SelectItem key="delta_credits">Delta Credits</SelectItem>
        <SelectItem key="provider_charge_amount_usd">Provider Charge USD</SelectItem>
        <SelectItem key="provider_charge_amount">Provider Charge</SelectItem>
        <SelectItem key="app_fee_amount">App Fee Amount</SelectItem>
        <SelectItem key="gross_charge_amount">Gross Charge</SelectItem>
      </Select>
      <Button
        variant="flat"
        className="w-full sm:w-auto"
        onPress={() =>
          setCreditUsageQuery((prev) => ({
            ...prev,
            page: 1,
            sort_order: prev.sort_order === "asc" ? "desc" : "asc",
          }))
        }
      >
        {creditUsageQuery.sort_order === "asc" ? "Ascending" : "Descending"}
      </Button>
      <Button
        className="w-full sm:col-span-2 sm:w-auto lg:col-span-1"
        onPress={() =>
          setCreditUsageQuery((prev) => ({
            ...prev,
            page: 1,
            search: creditUsageSearchInput.trim() || undefined,
          }))
        }
      >
        Search
      </Button>
    </div>
  );

  return (
    <div className="mt-4">
      <AdminDataTable<AdminCreditUsageRow>
        title="Credit Usage"
        columns={creditUsageColumns}
        rows={creditUsageData?.items ?? []}
        isLoading={creditUsageLoading}
        page={creditUsageData?.page ?? creditUsageQuery.page ?? 1}
        total={creditUsageData?.total ?? 0}
        limit={creditUsageData?.limit ?? creditUsageQuery.limit ?? 10}
        controls={creditUsageControls}
        controlsPlacement="below"
        emptyContent="No credit usage entries found."
        onPageChange={(page) => setCreditUsageQuery((prev) => ({ ...prev, page }))}
        renderCell={(row, columnKey) => {
          if (columnKey === "id") return row.id;
          if (columnKey === "user") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">{row.user.uuid}</span>
                <span className="text-xs text-default-500">{row.user.email}</span>
              </div>
            );
          }
          if (columnKey === "type") {
            return (
              <Chip size="sm" variant="flat" color="secondary">
                {row.type}
              </Chip>
            );
          }
          if (columnKey === "delta_credits") {
            return row.delta_credits.toLocaleString();
          }
          if (columnKey === "project_type") {
            return row.project_type ?? "—";
          }
          if (columnKey === "source") {
            return row.source ?? "—";
          }
          if (columnKey === "provider_charge_amount_usd") {
            return formatUsdValue(row.provider_charge_amount_usd);
          }
          if (columnKey === "provider_charge_amount") {
            return formatEurStringValue(row.provider_charge_amount);
          }
          if (columnKey === "app_fee_rate") {
            return formatMultiplierValue(row.app_fee_rate);
          }
          if (columnKey === "app_fee_amount") {
            return formatEurStringValue(row.app_fee_amount);
          }
          if (columnKey === "gross_charge_amount") {
            return formatEurStringValue(row.gross_charge_amount);
          }
          if (columnKey === "generation_model") {
            return getGenerationModel(row);
          }
          return new Date(row.created_at).toLocaleString();
        }}
      />
    </div>
  );
}

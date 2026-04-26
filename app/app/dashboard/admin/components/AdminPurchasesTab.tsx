"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Search } from "lucide-react";

import { formatCurrencyFromCents } from "../utils/admin-format";

import { AdminDataTable } from "./AdminDataTable";

import { useAdminPurchases } from "@/features/admin/hooks/use-admin";
import { useCreditPacks } from "@/features/credits/hooks/use-credits";
import {
  AdminPurchaseRow,
  AdminPurchasesQuery,
} from "@/features/admin/interfaces/admin.interfaces";
import {
  CREDIT_PURCHASE_KIND,
  getCreditPurchaseKindLabel,
  REGISTRATION_GIFT_CREDIT_PACK_KEY,
} from "@/config/credits/credit-purchase-kind.constants";

type AdminPurchasesTabProps = {
  isActive: boolean;
};

function purchaseKindChipColor(
  kind: AdminPurchaseRow["kind"],
): "primary" | "default" {
  if (kind === CREDIT_PURCHASE_KIND.APP_GIFT) return "primary";

  return "default";
}

function purchaseStatusChipColor(
  status: AdminPurchaseRow["status"],
): "success" | "warning" | "danger" | "default" {
  if (status === "SUCCEEDED") return "success";

  if (status === "PENDING") return "warning";

  if (status === "FAILED") return "danger";

  if (status === "EXPIRED") return "default";

  return "default";
}

const purchaseColumns = [
  { key: "uuid", label: "PURCHASE ID" },
  { key: "user", label: "USER (ID / EMAIL)" },
  { key: "pack", label: "TYPE" },
  { key: "source", label: "SOURCE" },
  { key: "amounts", label: "AMOUNT (GROSS / NET)" },
  { key: "tokens", label: "TOKENS PURCHASED" },
  { key: "stripe_fees", label: "STRIPE FEES" },
  { key: "status", label: "PAYMENT STATUS" },
  { key: "created_at", label: "CREATED AT" },
];

export function AdminPurchasesTab({ isActive }: AdminPurchasesTabProps) {
  const [purchasesQuery, setPurchasesQuery] = useState<AdminPurchasesQuery>({
    page: 1,
    limit: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const [purchasesSearchInput, setPurchasesSearchInput] = useState("");

  const { data: purchasesData, isLoading: purchasesLoading } =
    useAdminPurchases(purchasesQuery, { enabled: isActive });

  const { data: creditPacks } = useCreditPacks({ enabled: isActive });

  const packTypeFilterItems = useMemo(
    () => [
      { key: "all", label: "All types" },
      {
        key: REGISTRATION_GIFT_CREDIT_PACK_KEY,
        label: "Registration gift",
      },
      ...(creditPacks ?? []).map((pack) => ({
        key: pack.key,
        label: pack.name,
      })),
    ],
    [creditPacks],
  );

  const purchasesControls = (
    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:items-end lg:flex lg:w-auto lg:min-w-0 lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-2">
      <Input
        className="min-w-0 sm:col-span-2 lg:max-w-sm lg:flex-1"
        placeholder="Search purchase id, user id, or user email"
        startContent={<Search className="size-4 text-default-400" />}
        value={purchasesSearchInput}
        onValueChange={setPurchasesSearchInput}
      />
      <Select
        aria-label="Filter by pack type"
        className="min-w-0 w-full lg:w-52"
        label="Type"
        selectedKeys={[purchasesQuery.pack_key ?? "all"]}
        size="sm"
        onSelectionChange={(keys) => {
          const next = Array.from(keys)[0] as string;

          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            pack_key: next && next !== "all" ? next : undefined,
          }));
        }}
      >
        {packTypeFilterItems.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
      <Select
        aria-label="Filter by payment status"
        className="min-w-0 w-full lg:w-44"
        label="Status"
        selectedKeys={[purchasesQuery.status ?? "all"]}
        size="sm"
        onSelectionChange={(keys) => {
          const next = Array.from(keys)[0] as string;

          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            status:
              next && next !== "all"
                ? (next as AdminPurchasesQuery["status"])
                : undefined,
          }));
        }}
      >
        <SelectItem key="all">All statuses</SelectItem>
        <SelectItem key="PENDING">PENDING</SelectItem>
        <SelectItem key="SUCCEEDED">SUCCEEDED</SelectItem>
        <SelectItem key="FAILED">FAILED</SelectItem>
        <SelectItem key="EXPIRED">EXPIRED</SelectItem>
      </Select>
      <Select
        aria-label="Sort purchases by"
        className="min-w-0 w-full lg:w-44"
        label="Sort"
        selectedKeys={[purchasesQuery.sort_by ?? "created_at"]}
        size="sm"
        onSelectionChange={(keys) =>
          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            sort_by: Array.from(keys)[0] as AdminPurchasesQuery["sort_by"],
          }))
        }
      >
        <SelectItem key="created_at">Newest</SelectItem>
        <SelectItem key="gross_amount_cents">Gross</SelectItem>
        <SelectItem key="net_amount_cents">Net</SelectItem>
        <SelectItem key="stripe_fee_cents">Stripe Fee</SelectItem>
        <SelectItem key="credits_amount">Credits</SelectItem>
        <SelectItem key="status">Status</SelectItem>
      </Select>
      <Button
        className="w-full sm:w-auto"
        variant="flat"
        onPress={() =>
          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            sort_order: prev.sort_order === "asc" ? "desc" : "asc",
          }))
        }
      >
        {purchasesQuery.sort_order === "asc" ? "Ascending" : "Descending"}
      </Button>
      <Button
        className="w-full sm:col-span-2 sm:w-auto lg:col-span-1"
        onPress={() =>
          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            search: purchasesSearchInput.trim() || undefined,
          }))
        }
      >
        Search
      </Button>
    </div>
  );

  return (
    <div className="mt-4">
      <AdminDataTable<AdminPurchaseRow>
        columns={purchaseColumns}
        controls={purchasesControls}
        emptyContent="No purchases found."
        isLoading={purchasesLoading}
        limit={purchasesData?.limit ?? purchasesQuery.limit ?? 10}
        page={purchasesData?.page ?? purchasesQuery.page ?? 1}
        renderCell={(row, columnKey) => {
          if (columnKey === "uuid") return row.uuid;

          if (columnKey === "user") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">{row.user.uuid}</span>
                <span className="text-xs text-default-500">
                  {row.user.email}
                </span>
              </div>
            );
          }

          if (columnKey === "pack") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">{row.credit_pack.name}</span>
                <span className="text-xs text-default-500">
                  {row.credit_pack.key}
                </span>
              </div>
            );
          }

          if (columnKey === "source") {
            return (
              <Chip
                color={purchaseKindChipColor(row.kind)}
                size="sm"
                variant="flat"
              >
                {getCreditPurchaseKindLabel(row.kind)}
              </Chip>
            );
          }

          if (columnKey === "amounts") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {formatCurrencyFromCents(
                    row.gross_amount_cents,
                    row.currency,
                  )}
                </span>
                <span className="text-xs text-default-500">
                  {formatCurrencyFromCents(row.net_amount_cents, row.currency)}
                </span>
              </div>
            );
          }

          if (columnKey === "tokens")
            return row.credits_amount.toLocaleString();

          if (columnKey === "stripe_fees")
            return formatCurrencyFromCents(row.stripe_fee_cents, row.currency);

          if (columnKey === "status") {
            return (
              <Chip
                color={purchaseStatusChipColor(row.status)}
                size="sm"
                variant="flat"
              >
                {row.status}
              </Chip>
            );
          }

          return new Date(row.created_at).toLocaleString();
        }}
        rows={purchasesData?.items ?? []}
        title="Credit Purchases"
        total={purchasesData?.total ?? 0}
        onPageChange={(page) =>
          setPurchasesQuery((prev) => ({ ...prev, page }))
        }
      />
    </div>
  );
}

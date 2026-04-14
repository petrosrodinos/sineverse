"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Tab, Tabs } from "@heroui/tabs";
import { Search } from "lucide-react";
import { useAdminOverview, useAdminPurchases, useAdminUsers } from "@/features/admin/hooks/use-admin";
import { AdminPurchaseRow, AdminPurchasesQuery, AdminUserRow, AdminUsersQuery } from "@/features/admin/interfaces/admin.interfaces";
import { AdminDataTable } from "./components/AdminDataTable";
import { MetricCard } from "./components/MetricCard";

function formatCurrencyFromCents(value: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format((value ?? 0) / 100);
}

function formatCurrency(value: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

export function AdminDashboardClient() {
  const [usersQuery, setUsersQuery] = useState<AdminUsersQuery>({
    page: 1,
    limit: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });
  const [purchasesQuery, setPurchasesQuery] = useState<AdminPurchasesQuery>({
    page: 1,
    limit: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const [usersSearchInput, setUsersSearchInput] = useState("");
  const [purchasesSearchInput, setPurchasesSearchInput] = useState("");

  const { data: overview } = useAdminOverview();
  const { data: usersData, isLoading: usersLoading } = useAdminUsers(usersQuery);
  const { data: purchasesData, isLoading: purchasesLoading } = useAdminPurchases(purchasesQuery);

  const usageCards = useMemo(
    () => [
      { label: "Total Users", value: (overview?.total_users ?? 0).toLocaleString() },
      { label: "Total Projects", value: (overview?.total_projects ?? 0).toLocaleString() },
      { label: "Total Videos Created", value: (overview?.total_videos_created ?? 0).toLocaleString() },
      { label: "Total Images Created", value: (overview?.total_images_created ?? 0).toLocaleString() },
      { label: "Total Token Usage", value: (overview?.total_token_usage ?? 0).toLocaleString() },
    ],
    [overview]
  );

  const financialCards = useMemo(
    () => [
      { label: "Total Gross Revenue", value: formatCurrencyFromCents(overview?.total_gross_revenue_cents ?? 0) },
      { label: "Total Net Revenue", value: formatCurrencyFromCents(overview?.total_net_revenue_cents ?? 0) },
      { label: "Total Stripe Fees", value: formatCurrencyFromCents(overview?.total_stripe_fees_cents ?? 0) },
      { label: "Total App Fees Collected", value: formatCurrency(overview?.total_app_fees_collected ?? 0) },
    ],
    [overview]
  );

  const userColumns = [
    { key: "uuid", label: "USER ID" },
    { key: "identity", label: "NAME / EMAIL" },
    { key: "role", label: "ROLE" },
    { key: "tokens", label: "TOKEN BALANCE / USAGE" },
    { key: "created_at", label: "CREATED AT" },
  ];

  const purchaseColumns = [
    { key: "uuid", label: "PURCHASE ID" },
    { key: "user", label: "USER (ID / EMAIL)" },
    { key: "amounts", label: "AMOUNT (GROSS / NET)" },
    { key: "tokens", label: "TOKENS PURCHASED" },
    { key: "stripe_fees", label: "STRIPE FEES" },
    { key: "app_fees", label: "APP FEES" },
    { key: "status", label: "PAYMENT STATUS" },
    { key: "created_at", label: "CREATED AT" },
  ];

  const userControls = (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <Input
        value={usersSearchInput}
        onValueChange={setUsersSearchInput}
        placeholder="Search user id, name, or email"
        startContent={<Search className="size-4 text-default-400" />}
        className="sm:w-[280px]"
      />
      <Select
        aria-label="Sort users by"
        selectedKeys={[usersQuery.sort_by ?? "created_at"]}
        onSelectionChange={(keys) =>
          setUsersQuery((prev) => ({ ...prev, page: 1, sort_by: Array.from(keys)[0] as AdminUsersQuery["sort_by"] }))
        }
        className="sm:w-[180px]"
      >
        <SelectItem key="created_at">Newest</SelectItem>
        <SelectItem key="full_name">Name</SelectItem>
        <SelectItem key="email">Email</SelectItem>
        <SelectItem key="role">Role</SelectItem>
        <SelectItem key="credits_balance">Credit Balance</SelectItem>
      </Select>
      <Button
        variant="flat"
        onPress={() =>
          setUsersQuery((prev) => ({
            ...prev,
            page: 1,
            sort_order: prev.sort_order === "asc" ? "desc" : "asc",
          }))
        }
      >
        {usersQuery.sort_order === "asc" ? "Ascending" : "Descending"}
      </Button>
      <Button onPress={() => setUsersQuery((prev) => ({ ...prev, page: 1, search: usersSearchInput.trim() || undefined }))}>
        Search
      </Button>
    </div>
  );

  const purchasesControls = (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <Input
        value={purchasesSearchInput}
        onValueChange={setPurchasesSearchInput}
        placeholder="Search purchase id, user id, or user email"
        startContent={<Search className="size-4 text-default-400" />}
        className="sm:w-[320px]"
      />
      <Select
        aria-label="Sort purchases by"
        selectedKeys={[purchasesQuery.sort_by ?? "created_at"]}
        onSelectionChange={(keys) =>
          setPurchasesQuery((prev) => ({
            ...prev,
            page: 1,
            sort_by: Array.from(keys)[0] as AdminPurchasesQuery["sort_by"],
          }))
        }
        className="sm:w-[180px]"
      >
        <SelectItem key="created_at">Newest</SelectItem>
        <SelectItem key="gross_amount_cents">Gross</SelectItem>
        <SelectItem key="net_amount_cents">Net</SelectItem>
        <SelectItem key="stripe_fee_cents">Stripe Fee</SelectItem>
        <SelectItem key="credits_amount">Credits</SelectItem>
        <SelectItem key="status">Status</SelectItem>
      </Select>
      <Button
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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6">
      <div className="rounded-2xl border border-default-200 bg-gradient-to-br from-default-100 to-default-50 p-5 sm:p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-default-500">
          System-wide analytics, user account monitoring, and credit purchase tracking.
        </p>
      </div>

      <Tabs aria-label="Admin tabs" variant="underlined">
        <Tab key="overview" title="Overview">
          <div className="mt-4 space-y-6">
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-default-500">Usage & Content</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {usageCards.map((metric) => (
                  <MetricCard key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-default-500">Financials</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {financialCards.map((metric) => (
                  <MetricCard key={metric.label} label={metric.label} value={metric.value} />
                ))}
              </div>
            </section>
          </div>
        </Tab>

        <Tab key="users" title="Users">
          <div className="mt-4">
            <AdminDataTable<AdminUserRow>
              title="Users"
              columns={userColumns}
              rows={usersData?.items ?? []}
              isLoading={usersLoading}
              page={usersData?.page ?? usersQuery.page ?? 1}
              total={usersData?.total ?? 0}
              limit={usersData?.limit ?? usersQuery.limit ?? 10}
              controls={userControls}
              emptyContent="No users found."
              onPageChange={(page) => setUsersQuery((prev) => ({ ...prev, page }))}
              renderCell={(row, columnKey) => {
                if (columnKey === "uuid") return row.uuid;
                if (columnKey === "identity") {
                  return (
                    <div className="flex flex-col">
                      <span className="font-medium">{row.full_name}</span>
                      <span className="text-xs text-default-500">{row.email}</span>
                    </div>
                  );
                }
                if (columnKey === "role") {
                  return <Chip variant="flat">{row.role}</Chip>;
                }
                if (columnKey === "tokens") {
                  return (
                    <div className="flex flex-col">
                      <span className="font-medium">{row.credits_balance.toLocaleString()} balance</span>
                      <span className="text-xs text-default-500">{row.token_usage.toLocaleString()} used</span>
                    </div>
                  );
                }
                return new Date(row.created_at).toLocaleString();
              }}
            />
          </div>
        </Tab>

        <Tab key="purchases" title="Credit Purchases">
          <div className="mt-4">
            <AdminDataTable<AdminPurchaseRow>
              title="Credit Purchases"
              columns={purchaseColumns}
              rows={purchasesData?.items ?? []}
              isLoading={purchasesLoading}
              page={purchasesData?.page ?? purchasesQuery.page ?? 1}
              total={purchasesData?.total ?? 0}
              limit={purchasesData?.limit ?? purchasesQuery.limit ?? 10}
              controls={purchasesControls}
              emptyContent="No purchases found."
              onPageChange={(page) => setPurchasesQuery((prev) => ({ ...prev, page }))}
              renderCell={(row, columnKey) => {
                if (columnKey === "uuid") return row.uuid;
                if (columnKey === "user") {
                  return (
                    <div className="flex flex-col">
                      <span className="font-medium">{row.user.uuid}</span>
                      <span className="text-xs text-default-500">{row.user.email}</span>
                    </div>
                  );
                }
                if (columnKey === "amounts") {
                  return (
                    <div className="flex flex-col">
                      <span className="font-medium">{formatCurrencyFromCents(row.gross_amount_cents, row.currency)}</span>
                      <span className="text-xs text-default-500">{formatCurrencyFromCents(row.net_amount_cents, row.currency)}</span>
                    </div>
                  );
                }
                if (columnKey === "tokens") return row.credits_amount.toLocaleString();
                if (columnKey === "stripe_fees") return formatCurrencyFromCents(row.stripe_fee_cents, row.currency);
                if (columnKey === "app_fees") return formatCurrencyFromCents(row.app_fee_cents, row.currency);
                if (columnKey === "status") return <Chip variant="flat">{row.status}</Chip>;
                return new Date(row.created_at).toLocaleString();
              }}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

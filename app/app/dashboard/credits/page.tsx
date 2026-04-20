"use client";

import type {
  CreditsUsageItem,
  CreditsUsageStats,
} from "@/features/credits/interfaces/credits.interfaces";

import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

import {
  useCreditsPurchases,
  useCreditsSummary,
  useCreditsUsage,
  useCreditsUsageStats,
} from "@/features/credits/hooks/use-credits";
import { formatCreditCurrency } from "@/features/credits/utils/credits-format.utils";
import { CreditPacks } from "@/components/ui/CreditPacks";
import { CreditUsageLedgerMetadata } from "@/config/credits/credits-usage-metadata.constants";

function formatAmount(
  amount: number | string | null | undefined,
  currency: string,
) {
  if (amount === null || amount === undefined) {
    return null;
  }

  const numeric = typeof amount === "string" ? Number(amount) : amount;

  if (!Number.isFinite(numeric)) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(numeric);
}

function usageGenerationDisplay(item: CreditsUsageItem): string {
  const meta = item.metadata;

  if (!meta || typeof meta !== "object") {
    return "—";
  }

  const model = meta[CreditUsageLedgerMetadata.GENERATION_MODEL];

  const assetType = meta[CreditUsageLedgerMetadata.GENERATION_ASSET_TYPE];

  const modelStr = typeof model === "string" ? model : "";

  const typeStr = typeof assetType === "string" ? assetType : "";

  if (modelStr && typeStr) {
    return `${typeStr} · ${modelStr}`;
  }

  return modelStr || typeStr || "—";
}

function getUsageTypeChipColor(
  projectType?: string | null,
): "primary" | "secondary" | "success" | "warning" | "danger" | "default" {
  if (projectType === "FILM") return "secondary";

  if (projectType === "ESTATE") return "primary";

  return "default";
}

function getStatusChipColor(
  status?: string | null,
): "primary" | "secondary" | "success" | "warning" | "danger" | "default" {
  if (status === "SUCCEEDED") return "success";

  if (status === "PENDING") return "warning";

  if (status === "FAILED") return "danger";

  if (status === "EXPIRED") return "default";

  return "default";
}

function usageBreakdownSegments(stats: CreditsUsageStats) {
  const total = stats.total_credits_used;

  if (total <= 0) {
    return [];
  }

  return [
    {
      key: "FILM",
      label: "Film",
      value: stats.film_credits_used,
      barClass: "bg-secondary-500",
    },
    {
      key: "ESTATE",
      label: "Estate",
      value: stats.estate_credits_used,
      barClass: "bg-primary-500",
    },
    {
      key: "OTHER",
      label: "Other",
      value: stats.other_credits_used,
      barClass: "bg-default-500",
    },
  ]
    .filter((s) => s.value > 0)
    .map((s) => ({ ...s, widthPct: (s.value / total) * 100 }));
}

export default function CreditsPage() {
  const { data: summary, isLoading: summaryLoading } = useCreditsSummary();

  const { data: usageStats, isLoading: usageStatsLoading } =
    useCreditsUsageStats();

  const { data: usage } = useCreditsUsage();

  const { data: purchases } = useCreditsPurchases();

  const usageSegments = usageStats ? usageBreakdownSegments(usageStats) : [];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Credits
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-default-500 sm:text-base">
          Your balance, credit packs, and full usage and purchase history in one
          place.
        </p>
      </header>

      <div
        aria-hidden
        className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-default-300/80 to-transparent"
      />

      <section aria-labelledby="credits-balance-heading" className="mt-6">
        <h2
          className="text-xs font-semibold uppercase tracking-[0.2em] text-default-500"
          id="credits-balance-heading"
        >
          Balances
        </h2>
        <div className="mt-6 rounded-2xl bg-default-100/50 p-8 shadow-sm shadow-black/[0.04] ring-1 ring-default-200/60 backdrop-blur-sm sm:p-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 md:divide-x md:divide-default-200/70">
            <div className="md:pr-10">
              <p className="text-sm font-medium text-default-600">
                Available now
              </p>
              {summaryLoading ? (
                <Skeleton className="mt-4 h-16 w-44 rounded-xl" />
              ) : (
                <div className="mt-4 flex flex-wrap items-end gap-2">
                  <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
                    {summary?.balance ?? 0}
                  </span>
                  <span className="pb-1.5 text-sm font-medium uppercase tracking-widest text-default-500">
                    credits
                  </span>
                </div>
              )}
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-default-500">
                Credits power AI generation across your projects. This is what
                you can spend right now.
              </p>
            </div>

            <div className="md:pl-10">
              <p className="text-sm font-medium text-default-600">
                Lifetime usage
              </p>
              {usageStatsLoading ? (
                <div className="mt-4 space-y-4">
                  <Skeleton className="h-16 w-48 rounded-xl" />
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              ) : (
                <>
                  <div className="mt-4 flex flex-wrap items-end gap-2">
                    <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
                      {(usageStats?.total_credits_used ?? 0).toLocaleString()}
                    </span>
                    <span className="pb-1.5 text-sm font-medium uppercase tracking-widest text-default-500">
                      credits
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-default-500">
                    Total credits consumed across all work in this account.
                  </p>
                  {(usageStats?.total_credits_used ?? 0) > 0 &&
                    usageSegments.length > 0 && (
                      <div className="mt-6">
                        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-default-200/80">
                          {usageSegments.map((s) => (
                            <div
                              key={s.key}
                              className={`h-full min-w-0 ${s.barClass}`}
                              style={{ width: `${s.widthPct}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  {(usageStats?.total_credits_used ?? 0) === 0 && (
                    <p className="mt-4 text-sm text-default-500">
                      No usage yet. Generations will show up here.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="credits-purchase-heading"
        className="mt-16 sm:mt-20"
      >
        <CreditPacks showSectionHeader variant="default" />
      </section>

      <section
        aria-labelledby="credits-history-heading"
        className="mt-16 sm:mt-20"
      >
        <h2
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          id="credits-history-heading"
        >
          History
        </h2>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Credit usage and completed purchases.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl bg-content1/40 shadow-sm shadow-black/[0.04] ring-1 ring-default-200/60">
          <Tabs
            aria-label="Credits history tabs"
            classNames={{ panel: "px-4 pb-4 pt-2 sm:px-6 sm:pb-6" }}
            variant="underlined"
          >
            <Tab key="usage" title="Credit usage">
              <Table removeWrapper aria-label="Credits usage table">
                <TableHeader>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>MODEL</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>CREDITS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No usage yet.">
                  {(usage?.items ?? []).map((item) => (
                    <TableRow key={item.uuid}>
                      <TableCell>
                        {new Date(item.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className="max-w-[220px] truncate text-sm text-default-600"
                          title={usageGenerationDisplay(item)}
                        >
                          {usageGenerationDisplay(item)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {formatAmount(item.gross_charge_amount, "EUR") ?? "-"}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground">
                          {item.delta_credits}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="purchases" title="Purchases">
              <Table removeWrapper aria-label="Credits purchases table">
                <TableHeader>
                  <TableColumn>PACK</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>CREDITS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No purchases yet.">
                  {(purchases?.items ?? []).map((item) => (
                    <TableRow key={item.uuid}>
                      <TableCell>
                        {item.credit_pack?.name ?? "Credit Pack"}
                      </TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={getStatusChipColor(item.status)}
                          size="sm"
                          variant="flat"
                        >
                          {item.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        {item.gross_amount_cents != null
                          ? formatCreditCurrency(
                              item.gross_amount_cents,
                              item.currency,
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.credits_amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

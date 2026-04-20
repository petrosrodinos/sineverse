"use client";

import { useMemo } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { useAdminOverview } from "@/features/admin/hooks/use-admin";
import { formatCurrency, formatCurrencyFromCents } from "../utils/admin-format";
import { MetricCard } from "./MetricCard";

type AdminOverviewTabProps = {
  isActive: boolean;
};

export function AdminOverviewTab({ isActive }: AdminOverviewTabProps) {
  const { data: overview } = useAdminOverview({ enabled: isActive });

  const usageCards = useMemo(
    () => [
      { label: "Total Users", value: (overview?.total_users ?? 0).toLocaleString() },
      { label: "Total Projects", value: (overview?.total_projects ?? 0).toLocaleString() },
      { label: "Total Final Projects", value: (overview?.total_final_projects ?? 0).toLocaleString() },
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
      {
        label: "AIMLAPI provider cost (usage)",
        value: `${formatCurrency(overview?.total_aimlapi_provider_cost?.usd ?? 0, "USD")} · ${formatCurrency(overview?.total_aimlapi_provider_cost?.eur ?? 0, "EUR")}`,
      },
    ],
    [overview]
  );

  return (
    <Tabs aria-label="Overview metrics" variant="underlined" className="mt-4">
      <Tab key="usage" title="Usage & Content">
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {usageCards.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </Tab>
      <Tab key="financials" title="Financials">
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {financialCards.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </Tab>
    </Tabs>
  );
}

"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { useCreateCreditCheckout, useCreditPacks, useCreditsPurchases, useCreditsSummary, useCreditsUsage } from "@/features/credits/hooks/use-credits";

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}

function formatAmount(amount: number | string | null | undefined, currency: string) {
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

export default function CreditsPage() {
  const { data: summary, isLoading: summaryLoading } = useCreditsSummary();
  const { data: packs, isLoading: packsLoading } = useCreditPacks();
  const { data: usage } = useCreditsUsage();
  const { data: purchases } = useCreditsPurchases();
  const { mutate: createCheckout, isPending: checkoutPending } = useCreateCreditCheckout();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Credits</h1>
        <p className="text-sm text-default-500">Buy credits, monitor usage, and review purchase history.</p>
      </div>

      <Card>
        <CardHeader className="pb-1">
          <p className="text-sm text-default-500">Current balance</p>
        </CardHeader>
        <CardBody className="pt-0">
          {summaryLoading ? (
            <Skeleton className="h-10 w-24 rounded-lg" />
          ) : (
            <div className="text-4xl font-bold">{summary?.balance ?? 0}</div>
          )}
          <p className="mt-2 text-xs text-default-500">
            Purchased: {summary?.purchased_credits ?? 0} | Used: {summary?.used_credits ?? 0}
          </p>
        </CardBody>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {packsLoading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <Card key={`pack-skeleton-${idx}`}>
              <CardBody className="gap-2">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </CardBody>
            </Card>
          ))}
        {!packsLoading &&
          packs?.map((pack) => (
            <Card key={pack.uuid}>
              <CardBody className="gap-3">
                <div>
                  <p className="text-sm text-default-500">{pack.name}</p>
                  <p className="text-2xl font-semibold">{pack.credits_amount} credits</p>
                </div>
                <p className="text-xl font-bold">{formatCurrency(pack.amount_cents, pack.currency)}</p>
                <Button
                  color="primary"
                  onPress={() => createCheckout({ pack_key: pack.key })}
                  isLoading={checkoutPending}
                >
                  Buy
                </Button>
              </CardBody>
            </Card>
          ))}
      </section>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">History</h2>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Credits history tabs" variant="underlined">
            <Tab key="usage" title="Credit Usage">
              <div className="mt-3 flex flex-col gap-3">
                {!usage?.items?.length && <p className="text-sm text-default-500">No usage yet.</p>}
                {usage?.items?.map((item) => (
                  <div key={item.uuid} className="flex items-center justify-between rounded-lg border border-default-200 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{item.project_type ?? "Unknown"} generation</p>
                      <p className="text-xs text-default-500">{new Date(item.created_at).toLocaleString()}</p>
                      {formatAmount(item.gross_charge_amount, "EUR") && (
                        <p className="text-xs text-default-500">
                          Gross charge: {formatAmount(item.gross_charge_amount, "EUR")}
                        </p>
                      )}
                      {item.fx_source === "fallback" && (
                        <p className="text-[11px] font-medium text-warning">
                          FX fallback rate used
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-semibold">{item.delta_credits}</p>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab key="purchases" title="Purchases">
              <div className="mt-3 flex flex-col gap-3">
                {!purchases?.items?.length && <p className="text-sm text-default-500">No purchases yet.</p>}
                {purchases?.items?.map((item) => (
                  <div key={item.uuid} className="flex items-center justify-between rounded-lg border border-default-200 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{item.credit_pack?.name ?? "Credit Pack"}</p>
                      <p className="text-xs text-default-500">{new Date(item.created_at).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatCurrency(item.amount_cents, item.currency)}</p>
                      <p className="text-xs text-default-500">{item.status}</p>
                      {item.gross_amount_cents !== null && item.gross_amount_cents !== undefined && (
                        <p className="text-[11px] text-default-500">Gross: {formatCurrency(item.gross_amount_cents, item.currency)}</p>
                      )}
                      {item.stripe_fee_cents !== null && item.stripe_fee_cents !== undefined && (
                        <p className="text-[11px] text-default-500">Fee: {formatCurrency(item.stripe_fee_cents, item.currency)}</p>
                      )}
                      {item.net_amount_cents !== null && item.net_amount_cents !== undefined && (
                        <p className="text-[11px] text-default-500">Net: {formatCurrency(item.net_amount_cents, item.currency)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

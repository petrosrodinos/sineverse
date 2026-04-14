"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
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

function getUsageTypeChipColor(projectType?: string | null): "primary" | "secondary" | "success" | "warning" | "danger" | "default" {
  if (projectType === "FILM") return "secondary";
  if (projectType === "ESTATE") return "primary";
  return "default";
}

function getStatusChipColor(status?: string | null): "primary" | "secondary" | "success" | "warning" | "danger" | "default" {
  if (status === "SUCCEEDED") return "success";
  if (status === "PENDING") return "warning";
  if (status === "FAILED") return "danger";
  if (status === "EXPIRED") return "default";
  return "default";
}

export default function CreditsPage() {
  const { data: summary, isLoading: summaryLoading } = useCreditsSummary();
  const { data: packs, isLoading: packsLoading } = useCreditPacks();
  const { data: usage } = useCreditsUsage();
  const { data: purchases } = useCreditsPurchases();
  const { mutate: createCheckout, isPending: checkoutPending } = useCreateCreditCheckout();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6">
      <div className="rounded-2xl border border-default-200 bg-gradient-to-br from-default-100 to-default-50 p-5 sm:p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Credits Center</h1>
        <p className="mt-1 text-sm text-default-500">Manage your balance, top up packs, and review detailed usage and purchase records.</p>
      </div>

      <section className="rounded-2xl border border-default-200 bg-gradient-to-r from-primary-500/10 via-default-100 to-secondary-500/10 px-6 py-7 sm:px-8">
        <p className="text-xs uppercase tracking-[0.18em] text-default-500">Current balance</p>
        {summaryLoading ? (
          <Skeleton className="mt-2 h-12 w-36 rounded-xl" />
        ) : (
          <div className="mt-2 flex items-end gap-3">
            <span className="text-5xl font-bold leading-none text-foreground">{summary?.balance ?? 0}</span>
            <span className="pb-1 text-sm font-medium uppercase tracking-wider text-default-500">credits</span>
          </div>
        )}
      </section>

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
          packs?.map((pack, index) => (
            <Card
              key={pack.uuid}
              className={
                index === 1
                  ? "border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-lg shadow-primary/10"
                  : "border border-default-200 bg-default-50/40 shadow-sm"
              }
            >
              <CardBody className="gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-default-500">{pack.name}</p>
                    <p className="text-3xl font-bold leading-tight">{pack.credits_amount} <span className="text-base font-medium text-default-500">credits</span></p>
                  </div>
                  {index === 1 && (
                    <Chip color="primary" variant="flat" size="sm">
                      Best value
                    </Chip>
                  )}
                </div>
                <p className="text-2xl font-bold">{formatCurrency(pack.amount_cents, pack.currency)}</p>
                <Button
                  color={index === 1 ? "primary" : "default"}
                  variant={index === 1 ? "solid" : "flat"}
                  onPress={() => createCheckout({ pack_key: pack.key })}
                  isLoading={checkoutPending}
                  className="font-semibold"
                >
                  Buy Pack
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
              <div className="mt-3">
                <Table aria-label="Credits usage table" removeWrapper>
                  <TableHeader>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>GROSS CHARGE</TableColumn>
                    <TableColumn>CREDITS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="No usage yet.">
                    {(usage?.items ?? []).map((item) => (
                      <TableRow key={item.uuid}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Chip size="sm" color={getUsageTypeChipColor(item.project_type)} variant="flat">
                              {item.project_type ?? "UNKNOWN"}
                            </Chip>
                            {item.fx_source === "fallback" && (
                              <Chip size="sm" color="warning" variant="dot">
                                FX fallback
                              </Chip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                        <TableCell>{formatAmount(item.gross_charge_amount, "EUR") ?? "-"}</TableCell>
                        <TableCell>
                          <span className="font-semibold text-foreground">{item.delta_credits}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab key="purchases" title="Purchases">
              <div className="mt-3">
                <Table aria-label="Credits purchases table" removeWrapper>
                  <TableHeader>
                    <TableColumn>PACK</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>GROSS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="No purchases yet.">
                    {(purchases?.items ?? []).map((item) => (
                      <TableRow key={item.uuid}>
                        <TableCell>{item.credit_pack?.name ?? "Credit Pack"}</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip size="sm" color={getStatusChipColor(item.status)} variant="flat">
                            {item.status}
                          </Chip>
                        </TableCell>
                        <TableCell>{item.gross_amount_cents != null ? formatCurrency(item.gross_amount_cents, item.currency) : "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { useCallback, useState } from "react";
import { useCreateCreditCheckout, useCreditPacks } from "@/features/credits/hooks/use-credits";
import type { CreditPack } from "@/features/credits/interfaces/credits.interfaces";
import { formatCreditCurrency } from "@/features/credits/utils/credits-format.utils";

type PackPurchaseCardProps = {
  pack: CreditPack;
  isFeatured: boolean;
  isCheckoutLoading: boolean;
  isCheckoutButtonDisabled: boolean;
  compact: boolean;
  onPurchase: (packKey: string) => void;
};

function PackPurchaseCard({ pack, isFeatured, isCheckoutLoading, isCheckoutButtonDisabled, compact, onPurchase }: PackPurchaseCardProps) {
  function handlePress() {
    onPurchase(pack.key);
  }

  return (
    <Card
      className={
        isFeatured
          ? "border border-primary/35 bg-gradient-to-br from-primary/12 to-transparent shadow-lg shadow-primary/10"
          : "border border-default-200/80 bg-default-50/30 shadow-sm shadow-black/5"
      }
    >
      <CardBody className={compact ? "gap-4 p-4" : "gap-5 p-6"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-default-600">{pack.name}</p>
            <p className={`mt-1 font-bold tracking-tight text-foreground ${compact ? "text-2xl" : "text-3xl"}`}>
              {pack.credits_amount} <span className={`font-medium text-default-500 ${compact ? "text-sm" : "text-base"}`}>credits</span>
            </p>
          </div>
          {isFeatured && (
            <Chip color="primary" variant="flat" size="sm">
              Best value
            </Chip>
          )}
        </div>
        <p className={`font-semibold text-foreground ${compact ? "text-xl" : "text-2xl"}`}>{formatCreditCurrency(pack.amount_cents, pack.currency)}</p>
        <Button
          color={isFeatured ? "primary" : "default"}
          variant={isFeatured ? "solid" : "flat"}
          onPress={handlePress}
          isLoading={isCheckoutLoading}
          isDisabled={isCheckoutButtonDisabled}
          className={compact ? "h-10 font-semibold" : "h-11 font-semibold"}
        >
          {isFeatured ? "Buy credits" : "Buy pack"}
        </Button>
      </CardBody>
    </Card>
  );
}

const PACK_SKELETON_KEYS = ["credit-pack-skel-a", "credit-pack-skel-b", "credit-pack-skel-c"] as const;

export type CreditPacksProps = {
  variant?: "default" | "compact";
  showSectionHeader?: boolean;
  className?: string;
};

export function CreditPacks({ variant = "default", showSectionHeader = false, className }: CreditPacksProps) {
  const { data: packs, isLoading: packsLoading } = useCreditPacks();
  const { mutate: createCheckout, isPending: checkoutPending } = useCreateCreditCheckout();
  const [pendingPackKey, setPendingPackKey] = useState<string | null>(null);

  const purchasePack = useCallback(
    (packKey: string) => {
      setPendingPackKey(packKey);
      createCheckout(
        { pack_key: packKey },
        {
          onSettled: () => {
            setPendingPackKey(null);
          },
        },
      );
    },
    [createCheckout],
  );

  const compact = variant === "compact";
  const gridClassName = compact ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={className}>
      {showSectionHeader && (
        <>
          <h2 id="credits-purchase-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Buy credits
          </h2>
          <p className="mt-2 max-w-xl text-sm text-default-500 sm:text-base">Pick a pack and checkout securely. Your balance updates when payment completes.</p>
        </>
      )}
      <div className={gridClassName} role="list">
        {packsLoading &&
          PACK_SKELETON_KEYS.map((key) => (
            <div key={key} className="rounded-2xl border border-default-200/80 bg-default-50/20 p-6 shadow-sm shadow-black/5" role="listitem">
              <div className="space-y-3">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-9 w-36 rounded-md" />
                <Skeleton className="h-7 w-24 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>
          ))}
        {!packsLoading &&
          packs?.map((pack, index) => (
            <div key={pack.uuid} role="listitem">
              <PackPurchaseCard
                pack={pack}
                isFeatured={index === 1}
                isCheckoutLoading={checkoutPending && pendingPackKey === pack.key}
                isCheckoutButtonDisabled={checkoutPending && pendingPackKey !== pack.key}
                compact={compact}
                onPurchase={purchasePack}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

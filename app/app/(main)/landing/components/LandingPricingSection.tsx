"use client";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Check } from "lucide-react";

import { useCreditPacks } from "@/features/credits/hooks/use-credits";
import { formatCreditCurrency } from "@/features/credits/utils/credits-format.utils";
import { Routes } from "@/config/routes";

const PACK_SKELETON_KEYS = ["landing-pack-skel-a", "landing-pack-skel-b", "landing-pack-skel-c"] as const;

type PackFeatureLine = {
  key: string;
  label: string;
};

function buildPackFeatures(creditsAmount: number): PackFeatureLine[] {
  return [
    { key: "generation", label: "Use credits across Sineverse and EstateLift" },
    { key: "expiry", label: "No monthly subscription required" },
    { key: "amount", label: `${creditsAmount.toLocaleString()} credits included` },
  ];
}

export function LandingPricingSection() {
  const { data: packs, isLoading } = useCreditPacks();

  return (
    <section className="scroll-mt-24 mt-8 border-t border-divider/40 pt-10 md:mt-10 md:pt-12" id="pricing">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Pricing
          </h2>
        </div>
        <div className="mt-5 grid gap-4 md:mt-8 md:gap-5 lg:grid-cols-3">
          {isLoading &&
            PACK_SKELETON_KEYS.map((key) => (
              <Card
                key={key}
                className="border border-divider/50 bg-content1/30 shadow-none backdrop-blur-sm dark:bg-content1/20"
              >
                <CardBody className="gap-4 p-6">
                  <Skeleton className="h-6 w-28 rounded-md" />
                  <Skeleton className="h-8 w-32 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                  </div>
                </CardBody>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Skeleton className="h-10 w-full rounded-full" />
                </CardFooter>
              </Card>
            ))}
          {!isLoading &&
            packs?.map((pack, index) => {
              const packFeatures = buildPackFeatures(pack.credits_amount);

              return (
                <Card
                  key={pack.uuid}
                  className={`border shadow-none backdrop-blur-sm ${index === 1 ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20 dark:bg-primary/10" : "border-divider/50 bg-content1/30 dark:bg-content1/20"}`}
                >
                  <CardBody className="gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{pack.name}</h3>
                      <p className="mt-2 text-sm text-default-500">
                        Flexible credits for AI video generation.
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-semibold tracking-tight text-foreground">
                        {formatCreditCurrency(pack.amount_cents, pack.currency)}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {packFeatures.map((line) => (
                        <li key={line.key} className="flex gap-3 text-sm text-default-600">
                          <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                          {line.label}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                      as={NextLink}
                      className="w-full font-medium"
                      color={index === 1 ? "primary" : "default"}
                      href={Routes.auth.sign_up}
                      radius="full"
                      variant={index === 1 ? "shadow" : "bordered"}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}

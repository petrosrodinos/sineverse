"use client";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

import { Routes } from "@/config/routes";

type EstateLiftCreateVideoLinkProps = {
  label: string;
  className?: string;
  radius?: "full" | "lg" | "md" | "sm" | "none";
  size?: "sm" | "md" | "lg";
};

export function EstateLiftCreateVideoLink({
  label,
  className,
  radius = "full",
  size = "lg",
}: EstateLiftCreateVideoLinkProps) {
  const { status } = useSession();

  const href =
    status === "authenticated"
      ? Routes.dashboard
      : Routes.landing.estatelift_workflow;

  const isPending = status === "loading";

  return (
    <Button
      as={NextLink}
      className={className}
      color="primary"
      endContent={<ArrowRight className="size-4" />}
      href={href}
      isDisabled={isPending}
      radius={radius}
      size={size}
    >
      {label}
    </Button>
  );
}

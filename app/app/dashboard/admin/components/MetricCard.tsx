"use client";

import { Card, CardBody } from "@heroui/card";

interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card className="border border-default-200 bg-default-50/40">
      <CardBody className="gap-1 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-default-500">{label}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {description ? <p className="text-xs text-default-500">{description}</p> : null}
      </CardBody>
    </Card>
  );
}

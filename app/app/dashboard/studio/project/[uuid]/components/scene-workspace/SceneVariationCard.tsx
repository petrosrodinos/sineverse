"use client";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { RefreshCw, Plus } from "lucide-react";


interface SceneVariationCardProps {
  variation: SceneVariation;
}

export function SceneVariationCard({ variation }: SceneVariationCardProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);

  return (
    <Card className="rounded-2xl border border-default-200 bg-default-100 overflow-hidden dark:border-default-100/20 dark:bg-default-100/5 transition-all duration-200 hover:shadow-lg">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground bg-default-200 px-2.5 py-1 rounded-lg dark:bg-default-100/30">{variation.uuid}</span>
            <span className="text-sm text-default-500">{variation.style}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="flat" startContent={<RefreshCw className="size-4" />}>
              Regenerate This
            </Button>
          </div>
        </div>
        <Textarea label="Prompt" variant="bordered" classNames={{ input: "min-h-[80px]", inputWrapper: "rounded-xl" }} minRows={3} />
        <Accordion className="px-0 gap-0" selectedKeys={negativeOpen ? ["negative"] : []} onSelectionChange={(k) => setNegativeOpen(Array.from(k).includes("negative"))}>
          <AccordionItem key="negative" aria-label="Negative prompt" title="Negative prompt" classNames={{ trigger: "py-2", content: "pb-2" }}>
            <Textarea variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} minRows={2} />
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}

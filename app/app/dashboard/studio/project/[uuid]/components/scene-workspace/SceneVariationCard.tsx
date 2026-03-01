"use client";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { RefreshCw } from "lucide-react";
import { VideoGenerationOptions } from "./VideoGenerationOptions";

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
}

export function SceneVariationCard({ variation }: SceneVariationCardProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h4 className="text-base font-medium">Prompt & Configuration</h4>
          <p className="text-xs text-default-500">Edit prompt and generation settings.</p>
        </div>
        <Button size="sm" variant="flat" startContent={<RefreshCw className="size-4" />}>
          Regenerate
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <Textarea 
            label="Prompt" 
            variant="bordered" 
            classNames={{ input: "min-h-[80px]", inputWrapper: "rounded-xl" }} 
            minRows={3} 
        />
        <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden" selectedKeys={negativeOpen ? ["negative"] : []} onSelectionChange={(k) => setNegativeOpen(Array.from(k).includes("negative"))}>
          <AccordionItem key="negative" aria-label="Negative prompt" title={<span className="text-sm font-medium">Negative Prompt</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
            <Textarea variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} minRows={2} placeholder="Terms you want to avoid..." />
          </AccordionItem>
        </Accordion>
      </div>

      <div className="dark:border-default-100/10">
        <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
          <AccordionItem key="video-options" aria-label="Video Generation Options" title={<span className="text-sm font-medium">Video Generation Options</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
            <VideoGenerationOptions sceneVariation={variation} />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

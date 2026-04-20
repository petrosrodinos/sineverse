"use client";

import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Textarea } from "@heroui/input";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface EnrichPromptPopoverProps {
  onEnrich: (instructions: string) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function EnrichPromptPopover({
  onEnrich,
  isLoading,
  isDisabled,
}: EnrichPromptPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [instructions, setInstructions] = useState("");

  const handleEnrich = () => {
    onEnrich(instructions);

    setIsOpen(false);
  };

  return (
    <Popover
      showArrow
      isOpen={isOpen}
      offset={10}
      placement="bottom-start"
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <Button
          className="rounded-xl font-medium"
          color="primary"
          isDisabled={isDisabled || isLoading}
          isLoading={isLoading}
          startContent={
            !isLoading ? <Sparkles className="size-4" /> : undefined
          }
        >
          Enrich
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-4">
        <div className="w-full space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">AI Enrichment</h4>
            <p className="text-sm text-default-500">
              Add any specific instructions or focus points for the AI (e.g.,
              &quot;Make it darker&quot;, &quot;Focus on the twist&quot;).
            </p>
          </div>
          <Textarea
            classNames={{ inputWrapper: "rounded-xl" }}
            minRows={3}
            placeholder="Instructions (optional)"
            value={instructions}
            variant="bordered"
            onValueChange={setInstructions}
          />
          <div className="flex justify-end gap-2">
            <Button
              className="rounded-lg"
              size="sm"
              variant="flat"
              onPress={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg"
              color="primary"
              size="sm"
              onPress={handleEnrich}
            >
              Generate
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import { Sparkles, RefreshCw } from "lucide-react";
import type { MovieIdea } from "@/types/studio";

interface IdeaSectionProps {
  idea: MovieIdea;
  onIdeaChange: (raw: string) => void;
  onEnrich: () => void;
  onRegenerateEnriched: () => void;
  isEnriching?: boolean;
}

export function IdeaSection({ idea, onIdeaChange, onEnrich, onRegenerateEnriched, isEnriching }: IdeaSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Describe your movie idea</label>
        <Textarea
          placeholder="A detective in 2040 hunts a clone of himself..."
          value={idea.raw}
          onValueChange={onIdeaChange}
          variant="bordered"
          classNames={{ input: "min-h-[100px]", inputWrapper: "rounded-xl" }}
          minRows={4}
        />
        <Button
          color="primary"
          onPress={onEnrich}
          isDisabled={!idea.raw.trim() || isEnriching}
          isLoading={isEnriching}
          startContent={!isEnriching ? <Sparkles className="size-4" /> : undefined}
          className="rounded-xl font-medium"
        >
          Enrich with AI
        </Button>
      </div>
      {idea.enriched && (
        <Card className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/10 p-4">
          {isEnriching ? (
            <Skeleton className="rounded-xl h-24 w-full" />
          ) : (
            <>
              <p className="text-foreground/90 whitespace-pre-wrap">{idea.enriched}</p>
              <Button
                size="sm"
                variant="flat"
                className="mt-3"
                onPress={onRegenerateEnriched}
                isDisabled={isEnriching}
                startContent={<RefreshCw className="size-4" />}
              >
                Regenerate Enriched Idea
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

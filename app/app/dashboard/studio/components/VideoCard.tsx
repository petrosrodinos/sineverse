"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check, RefreshCw } from "lucide-react";
import type { SceneVideo } from "@/types/studio";
import { getVideoStatusLabel } from "@/utils/studio";
import { VideoStatus } from "@/types/studio";

interface VideoCardProps {
  video: SceneVideo;
  onSelectFinal: () => void;
  onRegenerate: () => void;
  isDisabled?: boolean;
}

export function VideoCard({ video, onSelectFinal, onRegenerate, isDisabled }: VideoCardProps) {
  const statusLabel = getVideoStatusLabel(video.status);
  const isProcessing = video.status === VideoStatus.Processing;

  return (
    <Card
      className={`
        overflow-hidden rounded-2xl border border-default-200/80 bg-default-50/50
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
        dark:border-default-100/20 dark:bg-default-100/5
        ${video.isFinal ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""}
      `}
    >
      <div className="aspect-video w-full bg-default-200/50 dark:bg-default-100/10 flex items-center justify-center">
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-default-400 text-sm">No preview</span>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-default-500">{video.duration}s</span>
          <span className="text-xs text-default-500">{video.resolution}</span>
          <Chip size="sm" variant="flat" color={video.status === VideoStatus.Failed ? "danger" : video.status === VideoStatus.Completed ? "success" : "warning"}>
            {statusLabel}
          </Chip>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={video.isFinal ? "solid" : "flat"}
            color="primary"
            onPress={onSelectFinal}
            isDisabled={isDisabled || isProcessing}
            startContent={video.isFinal ? <Check className="size-4" /> : undefined}
            className="flex-1"
          >
            {video.isFinal ? "Selected" : "Select as Final"}
          </Button>
          <Button size="sm" variant="flat" onPress={onRegenerate} isDisabled={isDisabled || isProcessing} isIconOnly aria-label="Regenerate">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

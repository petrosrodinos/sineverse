"use client";
import { VideoStatusLabels } from "@/config/dropdowns/project/video.options";
import { VideoStatuses, type SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check, RefreshCw } from "lucide-react";

interface VideoCardProps {
  video: SceneVideo;
  onSelectFinal: () => void;
  onRegenerate: () => void;
  isDisabled?: boolean;
}

export function VideoCard({ video, onSelectFinal, onRegenerate, isDisabled }: VideoCardProps) {
  const isProcessing = video.status === VideoStatuses.PROCESSING;

  return (
    <Card
      className={`
        overflow-hidden rounded-2xl border border-default-200 bg-default-100
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
        dark:border-default-100/20 dark:bg-default-100/5
        ${video.selected ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""}
      `}
    >
      <div className="aspect-video w-full bg-default-200 flex items-center justify-center dark:bg-default-100/10">
        {video.video_uuid ? (
          <img src={video.video_uuid} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-default-400 text-sm">No preview</span>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-default-500">{video.duration_sec}s</span>
          <span className="text-xs text-default-500">{video.resolution}</span>
          <Chip size="sm" variant="flat" color={video.status === VideoStatuses.FAILED ? "danger" : video.status === VideoStatuses.COMPLETED ? "success" : "warning"}>
            {VideoStatusLabels[video.status]}
          </Chip>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={video.selected ? "solid" : "flat"}
            color="primary"
            onPress={onSelectFinal}
            isDisabled={isDisabled || isProcessing}
            startContent={video.selected ? <Check className="size-4" /> : undefined}
            className="flex-1"
          >
            {video.selected ? "Selected" : "Select as Final"}
          </Button>
          <Button size="sm" variant="flat" onPress={onRegenerate} isDisabled={isDisabled || isProcessing} isIconOnly aria-label="Regenerate">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

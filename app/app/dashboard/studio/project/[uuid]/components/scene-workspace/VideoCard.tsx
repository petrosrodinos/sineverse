"use client";
import { VideoStatusLabels } from "@/config/dropdowns/project/video.options";
import { ProjectAsset, ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Check, RefreshCw } from "lucide-react";

interface VideoCardProps {
  video: ProjectAsset;
  onSelectFinal: () => void;
  onRegenerate: () => void;
  isDisabled?: boolean;
}

export function VideoCard({ video, onSelectFinal, onRegenerate, isDisabled }: VideoCardProps) {
  const isProcessing = video.status === ProjectAssetStatuses.PROCESSING;

  return (
    <Card
      className={`
        overflow-hidden rounded-2xl border border-default-200 bg-default-100
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
        dark:border-default-100/20 dark:bg-default-100/5
        ${video.scene_variation_video?.selected ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""}
      `}
    >
      <div className="aspect-video w-full bg-default-200 flex items-center justify-center dark:bg-default-100/10">
        {video.document?.url ? (
          <img src={video.document?.url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-default-400 text-sm">No preview</span>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Note: ProjectAsset schema might not have duration_sec and resolution directly, adjusting to avoid errors */}
          <Chip size="sm" variant="flat" color={video.status === ProjectAssetStatuses.FAILED ? "danger" : video.status === ProjectAssetStatuses.COMPLETED ? "success" : "warning"}>
            {VideoStatusLabels[video.status] || video.status}
          </Chip>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={video.scene_variation_video?.selected ? "solid" : "flat"}
            color="primary"
            onPress={onSelectFinal}
            isDisabled={isDisabled || isProcessing}
            startContent={video.scene_variation_video?.selected ? <Check className="size-4" /> : undefined}
            className="flex-1"
          >
            {video.scene_variation_video?.selected ? "Selected" : "Select as Final"}
          </Button>
          <Button size="sm" variant="flat" onPress={onRegenerate} isDisabled={isDisabled || isProcessing} isIconOnly aria-label="Regenerate">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

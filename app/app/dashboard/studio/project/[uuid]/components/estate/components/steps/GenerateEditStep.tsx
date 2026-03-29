"use client";

import { useCallback, useMemo } from "react";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";
import { VideoCard } from "../video/VideoCard";
import { VideoReorderList } from "../video/VideoReorderList";

function ClipRow({ videoAssetUuid }: { videoAssetUuid: string }) {
  const asset = useEstateWorkflowStore((s) => s.videoAssetsByUuid[videoAssetUuid]);

  if (!asset) {
    return null;
  }

  return (
    <VideoCard asset={asset} compact videoAssetUuid={videoAssetUuid} />
  );
}

export function GenerateEditStep() {
  const videoOrder = useEstateWorkflowStore((s) => s.videoOrder);
  const videoAssetsByUuid = useEstateWorkflowStore((s) => s.videoAssetsByUuid);
  const reorderVideoAssets = useEstateWorkflowStore((s) => s.reorderVideoAssets);

  const canReorder = useMemo(
    () => videoOrder.every((id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED),
    [videoOrder, videoAssetsByUuid],
  );

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      reorderVideoAssets(fromIndex, toIndex);
    },
    [reorderVideoAssets],
  );

  const renderItem = useCallback((clipId: string) => {
    return <ClipRow videoAssetUuid={clipId} />;
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <VideoReorderList
        orderedIds={videoOrder}
        renderItem={renderItem}
        onReorder={handleReorder}
        canReorder={canReorder}
      />
    </div>
  );
}

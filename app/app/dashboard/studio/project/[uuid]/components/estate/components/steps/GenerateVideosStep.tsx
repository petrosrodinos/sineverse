"use client";

import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";
import { Clapperboard } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProjectAssets, useCreateEstateWalkthroughVideos } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles, ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { VideoCardReorderProps } from "../video/VideoCard";
import { VideoCard } from "../video/VideoCard";
import type { VideoReorderListRenderContext } from "../video/VideoReorderList";
import { VideoReorderList } from "../video/VideoReorderList";
import { moveIdInOrder } from "../../utils/estate-workflow.utils";

type GenerateVideosStepProps = {
  finalProjectUuid: string | null;
  hasPromptImages: boolean;
};

export function GenerateVideosStep({ finalProjectUuid, hasPromptImages }: GenerateVideosStepProps) {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";

  const { data: assetsResponse, isLoading } = useProjectAssets({ project_uuid: projectUuid, role: AssetRoles.GENERATED_VIDEO, limit: 100 }, { enabled: !!projectUuid });
  const videoAssets = assetsResponse?.data ?? [];

  const [videoOrder, setVideoOrder] = useState<string[]>([]);

  useEffect(() => {
    if (videoAssets.length === 0) return;
    setVideoOrder((prev) => {
      const newUuids = videoAssets.map((a) => a.uuid);
      if (prev.length === newUuids.length && prev.every((id, i) => id === newUuids[i])) {
        return prev;
      }
      return newUuids;
    });
  }, [videoAssets]);

  const videoAssetsByUuid = useMemo(() => {
    const map: Record<string, (typeof videoAssets)[number] | undefined> = {};
    for (const a of videoAssets) {
      map[a.uuid] = a;
    }
    return map;
  }, [videoAssets]);

  const { mutateAsync: createWalkthroughVideos, isPending: isCreatingWalkthrough } = useCreateEstateWalkthroughVideos();

  const autoWalkthroughAttemptedRef = useRef(false);

  const runWalkthroughGeneration = useCallback(async () => {
    if (!projectUuid || !hasPromptImages) {
      addToast({
        title: "Add photos first",
        description: "Upload listing photos in step 1 before generating walkthrough clips.",
        severity: "warning",
      });
      return;
    }
    try {
      await createWalkthroughVideos({ project_uuid: projectUuid });
    } catch {
      addToast({
        title: "Could not start walkthrough clips",
        description: "Check your connection and try again.",
        severity: "danger",
      });
    }
  }, [projectUuid, hasPromptImages, createWalkthroughVideos]);

  useEffect(() => {
    if (!projectUuid || !hasPromptImages || videoOrder.length > 0 || isLoading) return;
    if (autoWalkthroughAttemptedRef.current) return;
    autoWalkthroughAttemptedRef.current = true;
    void runWalkthroughGeneration();
  }, [projectUuid, hasPromptImages, videoOrder.length, isLoading, runWalkthroughGeneration]);

  const canReorder = useMemo(() => videoOrder.every((id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED), [videoOrder, videoAssetsByUuid]);

  const handleReorder = useCallback((fromIndex: number, toIndex: number) => {
    setVideoOrder((prev) => moveIdInOrder(prev, fromIndex, toIndex));
  }, []);

  const renderItem = useCallback(
    (clipId: string, index: number, reorderCtx: VideoReorderListRenderContext) => {
      const assetItem = videoAssetsByUuid[clipId];
      if (!assetItem || !finalProjectUuid) return null;

      const reorder: VideoCardReorderProps = {
        index,
        canReorder: reorderCtx.canReorder,
        onReorder: reorderCtx.onReorder,
        dragIndex: reorderCtx.dragIndex,
        setDragIndex: reorderCtx.setDragIndex,
      };

      return <VideoCard asset={assetItem} compact finalProjectUuid={finalProjectUuid} reorder={reorder} />;
    },
    [videoAssetsByUuid, finalProjectUuid],
  );

  const showGeneratingShell = isCreatingWalkthrough && videoOrder.length === 0 && hasPromptImages;

  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-default-200 bg-gradient-to-br from-default-100/50 to-secondary-500/[0.06] dark:border-default-100/20 dark:from-default-100/10 dark:to-secondary-500/10">
        <CardBody className="gap-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/15 text-secondary-600 dark:text-secondary-400">
                <Clapperboard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">Walkthrough clips</p>
                <p className="text-small text-default-500">Each photo becomes a short clip with smooth camera motion for your listing tour.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">{!hasPromptImages && <p className="text-tiny text-default-500">Add photos in step 1 to enable generation.</p>}</div>
        </CardBody>
      </Card>

      {showGeneratingShell && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-busy="true" aria-label="Preparing walkthrough clips">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={`walkthrough-skeleton-${i}`} className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
              <CardBody className="gap-2 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Skeleton className="h-3.5 w-20 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
                <Skeleton className="h-24 w-full rounded-lg sm:h-28" />
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {videoOrder.length > 0 && <VideoReorderList orderedIds={videoOrder} renderItem={renderItem} onReorder={handleReorder} canReorder={canReorder} />}
    </div>
  );
}

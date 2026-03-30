"use client";

import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";
import { Clapperboard } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCreateEstateWalkthroughVideos } from "@/features/project-assets/hooks/use-project-assets";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";
import type { VideoCardReorderProps } from "../video/VideoCard";
import { VideoCard } from "../video/VideoCard";
import type { VideoReorderListRenderContext } from "../video/VideoReorderList";
import { VideoReorderList } from "../video/VideoReorderList";

function ClipRow({
  videoAssetUuid,
  index,
  reorderCtx,
}: {
  videoAssetUuid: string;
  index: number;
  reorderCtx: VideoReorderListRenderContext;
}) {
  const asset = useEstateWorkflowStore((s) => s.videoAssetsByUuid[videoAssetUuid]);

  if (!asset) {
    return null;
  }

  const reorder: VideoCardReorderProps = {
    index,
    canReorder: reorderCtx.canReorder,
    onReorder: reorderCtx.onReorder,
    dragIndex: reorderCtx.dragIndex,
    setDragIndex: reorderCtx.setDragIndex,
  };

  return <VideoCard asset={asset} compact videoAssetUuid={videoAssetUuid} reorder={reorder} />;
}

export function GenerateEditStep() {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";

  const activeStep = useEstateWorkflowStore((s) => s.activeStep);
  const promptImageAssets = useEstateWorkflowStore((s) => s.promptImageAssets);
  const videoOrder = useEstateWorkflowStore((s) => s.videoOrder);
  const videoAssetsByUuid = useEstateWorkflowStore((s) => s.videoAssetsByUuid);
  const hydrateEstateVideoAssetsFromApi = useEstateWorkflowStore((s) => s.hydrateEstateVideoAssetsFromApi);
  const reorderVideoAssets = useEstateWorkflowStore((s) => s.reorderVideoAssets);

  const { mutateAsync: createWalkthroughVideos, isPending: isCreatingWalkthrough } = useCreateEstateWalkthroughVideos();

  const autoWalkthroughAttemptedRef = useRef(false);

  const runWalkthroughGeneration = useCallback(async () => {
    if (!projectUuid) {
      return;
    }
    const { promptImageAssets: prompts } = useEstateWorkflowStore.getState();
    if (!prompts.length) {
      addToast({
        title: "Add photos first",
        description: "Upload listing photos in step 1 before generating walkthrough clips.",
        severity: "warning",
      });
      return;
    }
    try {
      const assets = await createWalkthroughVideos({
        project_uuid: projectUuid,
      });
      if (assets.length) {
        hydrateEstateVideoAssetsFromApi(assets);
        addToast({
          title: "Walkthrough clips queued",
          description: "AI is generating your listing clips. You can monitor progress below.",
          severity: "success",
        });
      } else {
        addToast({
          title: "No clips queued",
          description: "No prompt images were found for this project.",
          severity: "warning",
        });
      }
    } catch {
      addToast({
        title: "Could not start walkthrough clips",
        description: "Check your connection and try again.",
        severity: "danger",
      });
    }
  }, [projectUuid, createWalkthroughVideos, hydrateEstateVideoAssetsFromApi]);

  useEffect(() => {
    if (activeStep !== 2) {
      autoWalkthroughAttemptedRef.current = false;
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep !== 2 || !projectUuid) {
      return;
    }
    if (autoWalkthroughAttemptedRef.current) {
      return;
    }
    if (!promptImageAssets.length || videoOrder.length > 0) {
      return;
    }
    autoWalkthroughAttemptedRef.current = true;
    void runWalkthroughGeneration();
  }, [activeStep, projectUuid, promptImageAssets.length, videoOrder.length, runWalkthroughGeneration]);

  const canReorder = useMemo(() => videoOrder.every((id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED), [videoOrder, videoAssetsByUuid]);

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      reorderVideoAssets(fromIndex, toIndex);
    },
    [reorderVideoAssets],
  );

  const renderItem = useCallback((clipId: string, index: number, reorderCtx: VideoReorderListRenderContext) => {
    return <ClipRow videoAssetUuid={clipId} index={index} reorderCtx={reorderCtx} />;
  }, []);

  const showGeneratingShell = isCreatingWalkthrough && videoOrder.length === 0 && promptImageAssets.length > 0;

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
                <p className="text-small text-default-500">Each photo becomes a short AI clip with smooth camera motion for your listing tour.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">{!promptImageAssets.length && <p className="text-tiny text-default-500">Add photos in step 1 to enable generation.</p>}</div>
        </CardBody>
      </Card>

      {showGeneratingShell && (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          role="status"
          aria-busy="true"
          aria-label="Preparing walkthrough clips"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={`walkthrough-skeleton-${i}`}
              className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5"
            >
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

"use client";

import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { addToast } from "@heroui/toast";
import { Clapperboard } from "lucide-react";
import { useParams } from "next/navigation";
import type { Key } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProjectAssets, useCreateEstateWalkthroughVideos } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles, ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useTimelineClips, useUpdateTimelineClip } from "@/features/timeline-clips/hooks/use-timeline-clips";
import { useTimelineMusic, useUpsertTimelineMusic } from "@/features/timeline-music/hooks/use-timeline-music";
import {
  ESTATE_AUDIO_TRACK_OPTIONS,
  ESTATE_DEFAULT_AUDIO_TRACK_ID,
} from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import type { VideoCardReorderProps } from "../video/VideoCard";
import { VideoCard } from "../video/VideoCard";
import type { VideoReorderListRenderContext } from "../video/VideoReorderList";
import { VideoReorderList } from "../video/VideoReorderList";
import { moveIdInOrder } from "../../utils/estate-workflow.utils";

type GenerateVideosStepProps = {
  finalProjectUuid: string | null;
  hasPromptImages: boolean;
  walkthroughAiModel: string;
};

const ESTATE_AUDIO_TRACK_ID_BY_FILENAME: Record<string, string> = {
  "soft-ambient.mp3": "soft_ambient",
  "minimal-piano.mp3": "minimal_piano",
  "light-upbeat.mp3": "light_upbeat",
  "cinematic-pad.mp3": "cinematic_pad",
  "nostalgic-soft.mp3": "nostalgic_soft",
};

export function GenerateVideosStep({ finalProjectUuid, hasPromptImages, walkthroughAiModel }: GenerateVideosStepProps) {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";
  const [audioTrackId, setAudioTrackId] = useState<string>(ESTATE_DEFAULT_AUDIO_TRACK_ID);
  const [activeTab, setActiveTab] = useState<string>("videos");
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: assetsResponse, isLoading } = useProjectAssets({ project_uuid: projectUuid, role: AssetRoles.GENERATED_VIDEO, limit: 100 }, { enabled: !!projectUuid });
  const videoAssets = useMemo(
    () =>
      [...(assetsResponse?.data ?? [])].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    [assetsResponse?.data],
  );

  const { data: timelineClips = [] } = useTimelineClips(
    { final_project_uuid: finalProjectUuid ?? "" },
    { enabled: !!finalProjectUuid },
  );

  const { mutateAsync: updateTimelineClip } = useUpdateTimelineClip();
  const { data: timelineMusic } = useTimelineMusic(finalProjectUuid ?? "");
  const { mutate: upsertTimelineMusic } = useUpsertTimelineMusic();

  const orderedVideoIds = useMemo(() => {
    const assetIds = videoAssets.map((asset) => asset.uuid);
    if (timelineClips.length === 0) {
      return assetIds;
    }

    const assetIdSet = new Set(assetIds);
    const clipOrderedIds = timelineClips
      .map((clip) => clip.project_asset_uuid)
      .filter((id) => assetIdSet.has(id));
    const clipOrderedSet = new Set(clipOrderedIds);
    const remainingIds = assetIds.filter((id) => !clipOrderedSet.has(id));

    return [...clipOrderedIds, ...remainingIds];
  }, [videoAssets, timelineClips]);

  const clipByAssetUuid = useMemo(() => {
    const map: Record<string, (typeof timelineClips)[number] | undefined> = {};
    for (const clip of timelineClips) {
      map[clip.project_asset_uuid] = clip;
    }
    return map;
  }, [timelineClips]);

  const [videoOrder, setVideoOrder] = useState<string[]>([]);

  useEffect(() => {
    setVideoOrder((prev) => {
      const incomingIds = orderedVideoIds;
      if (incomingIds.length === 0) {
        return prev.length === 0 ? prev : [];
      }

      if (prev.length === 0) {
        return incomingIds;
      }

      const incomingSet = new Set(incomingIds);
      const preserved = prev.filter((id) => incomingSet.has(id));
      const preservedSet = new Set(preserved);
      const appended = incomingIds.filter((id) => !preservedSet.has(id));
      const next = [...preserved, ...appended];

      if (next.length === prev.length && next.every((id, i) => id === prev[i])) {
        return prev;
      }

      return next;
    });
  }, [orderedVideoIds]);

  const videoAssetsByUuid = useMemo(() => {
    const map: Record<string, (typeof videoAssets)[number] | undefined> = {};
    for (const a of videoAssets) {
      map[a.uuid] = a;
    }
    return map;
  }, [videoAssets]);

  const { mutateAsync: createWalkthroughVideos, isPending: isCreatingWalkthrough } = useCreateEstateWalkthroughVideos();
  const currentMusic = timelineMusic?.[0] ?? null;
  const selectedAudioOption = useMemo(
    () => ESTATE_AUDIO_TRACK_OPTIONS.find((opt) => opt.id === audioTrackId) ?? ESTATE_AUDIO_TRACK_OPTIONS[0],
    [audioTrackId],
  );

  const autoWalkthroughAttemptedRef = useRef(false);

  useEffect(() => {
    if (!currentMusic?.audio?.filename) return;
    const mappedTrackId = ESTATE_AUDIO_TRACK_ID_BY_FILENAME[currentMusic.audio.filename];
    if (mappedTrackId) setAudioTrackId(mappedTrackId);
    setVolume(currentMusic.volume ?? 1);
  }, [currentMusic]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

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
      await createWalkthroughVideos({ project_uuid: projectUuid, ai_model: walkthroughAiModel });
    } catch {
      addToast({
        title: "Could not start walkthrough clips",
        description: "Check your connection and try again.",
        severity: "danger",
      });
    }
  }, [projectUuid, hasPromptImages, createWalkthroughVideos, walkthroughAiModel]);

  useEffect(() => {
    if (!projectUuid || !hasPromptImages || videoOrder.length > 0 || isLoading) return;
    if (autoWalkthroughAttemptedRef.current) return;
    autoWalkthroughAttemptedRef.current = true;
    void runWalkthroughGeneration();
  }, [projectUuid, hasPromptImages, videoOrder.length, isLoading, runWalkthroughGeneration]);

  const canReorder = useMemo(() => videoOrder.every((id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED), [videoOrder, videoAssetsByUuid]);

  const persistReorderedClips = useCallback(
    async (nextOrder: readonly string[]) => {
      if (!finalProjectUuid) {
        return;
      }

      const updates = nextOrder
        .map((assetUuid, index) => {
          const clip = clipByAssetUuid[assetUuid];
          if (!clip) {
            return null;
          }
          const nextStartSec = index;
          const nextEndSec = index + 1;
          if (clip.start_sec === nextStartSec && clip.end_sec === nextEndSec) {
            return null;
          }
          return { uuid: clip.uuid, start_sec: nextStartSec, end_sec: nextEndSec };
        })
        .filter((item): item is { uuid: string; start_sec: number; end_sec: number } => item !== null);

      if (updates.length === 0) {
        return;
      }

      await Promise.all(
        updates.map((update) =>
          updateTimelineClip({
            uuid: update.uuid,
            dto: {
              start_sec: update.start_sec,
              end_sec: update.end_sec,
            },
            invalidateTimelineQueries: false,
          }),
        ),
      );
    },
    [finalProjectUuid, clipByAssetUuid, updateTimelineClip],
  );

  const handleReorder = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) {
      return;
    }

    setVideoOrder((prev) => {
      const nextOrder = moveIdInOrder(prev, fromIndex, toIndex);
      if (nextOrder.every((id, index) => id === prev[index])) {
        return prev;
      }
      void persistReorderedClips(nextOrder);
      return nextOrder;
    });
  }, [persistReorderedClips]);

  const handleAudioChange = useCallback((keys: "all" | Iterable<Key>) => {
    if (keys === "all") return;
    const first = Array.from(keys)[0];
    if (typeof first === "string") {
      setAudioTrackId(first);
      if (!finalProjectUuid) return;
      upsertTimelineMusic({
        finalProjectUuid,
        dto: {
          track_id: first,
          volume,
          start_sec: 0,
          end_sec: currentMusic?.end_sec ?? 4,
        },
      });
    }
  }, [finalProjectUuid, upsertTimelineMusic, volume, currentMusic]);

  const handleAudioMetadata = useCallback(() => {
    const duration = audioRef.current?.duration;
    if (!finalProjectUuid || !duration || !Number.isFinite(duration) || audioTrackId === "none") return;
    upsertTimelineMusic({
      finalProjectUuid,
      dto: {
        track_id: audioTrackId,
        volume,
        start_sec: 0,
        end_sec: duration,
      },
    });
  }, [finalProjectUuid, audioTrackId, volume, upsertTimelineMusic]);

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
        <CardBody className="gap-3 p-3 sm:gap-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary-500/15 text-secondary-600 dark:text-secondary-400 sm:h-11 sm:w-11 sm:rounded-2xl">
                <Clapperboard className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground sm:text-base">Walkthrough clips</p>
                <p className="text-xs leading-relaxed text-default-500 sm:text-small">Each photo becomes a short clip with smooth camera motion for your listing tour.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">{!hasPromptImages && <p className="text-tiny text-default-500">Add photos in step 1 to enable generation.</p>}</div>
        </CardBody>
      </Card>

      <Tabs
        aria-label="Walkthrough step tabs"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key))}
        variant="underlined"
        classNames={{ tabList: "gap-3", panel: "px-0 pt-4" }}
      >
        <Tab key="videos" title="Videos">
          <div className="flex flex-col gap-4">
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
        </Tab>
        <Tab key="audio" title="Background audio">
          <Card className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
            <CardBody className="gap-3 p-4">
              <p className="text-sm font-semibold text-foreground">Background audio</p>
              <Select
                label="Audio track"
                size="sm"
                selectedKeys={new Set([audioTrackId])}
                onSelectionChange={handleAudioChange}
                classNames={{ trigger: "min-h-10" }}
                isDisabled={!finalProjectUuid}
              >
                {ESTATE_AUDIO_TRACK_OPTIONS.map((opt) => (
                  <SelectItem key={opt.id}>{opt.label}</SelectItem>
                ))}
              </Select>
              {selectedAudioOption.id !== "none" && selectedAudioOption.src && (
                <div className="min-w-0">
                  <audio
                    ref={audioRef}
                    controls
                    preload="metadata"
                    src={selectedAudioOption.src}
                    onLoadedMetadata={handleAudioMetadata}
                    className="w-full max-w-full"
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

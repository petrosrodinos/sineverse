"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Skeleton } from "@heroui/skeleton";
import type { Key, MouseEvent as ReactMouseEvent, SyntheticEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, GripVertical, Trash2 } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useProjectAsset } from "@/features/project-assets/hooks/use-project-assets";
import { useDeleteScene } from "@/features/scenes/hooks/use-scenes";
import { ESTATE_CAPTION_POSITION_OPTIONS, ESTATE_CAPTION_STYLE_OPTIONS, ESTATE_DEFAULT_CAPTION_END_SEC, ESTATE_DEFAULT_CAPTION_POSITION, ESTATE_DEFAULT_CAPTION_START_SEC, ESTATE_DEFAULT_CAPTION_STYLE, ESTATE_DEFAULT_SPEED, ESTATE_DEFAULT_TRANSITION_ID, ESTATE_DEFAULT_VOLUME, ESTATE_SPEED_MAX, ESTATE_SPEED_MIN, ESTATE_SPEED_STEP, ESTATE_TRANSITION_OPTIONS, ESTATE_TRIM_SEC_MAX, ESTATE_VOLUME_MAX, ESTATE_VOLUME_MIN, ESTATE_VOLUME_STEP } from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useVideoReorderItem } from "../../hooks/useVideoReorderItem";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";
import { TrimRangeField } from "./TrimRangeField";

export type VideoCardReorderProps = {
  index: number;
  canReorder: boolean;
  onReorder: (fromIndex: number, toIndex: number) => void;
  dragIndex: number | null;
  setDragIndex: (index: number | null) => void;
};

type VideoCardProps = {
  asset: ProjectAsset;
  compact?: boolean;
  videoAssetUuid: string;
  reorder?: VideoCardReorderProps;
};

export function VideoCard({ asset, compact = false, videoAssetUuid, reorder }: VideoCardProps) {
  const mergeEstateVideoAsset = useEstateWorkflowStore((s) => s.mergeEstateVideoAsset);
  const removePromptImageAsset = useEstateWorkflowStore((s) => s.removePromptImageAsset);
  const { mutateAsync: deleteScene, isPending: isDeletingScene } = useDeleteScene();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: polled } = useProjectAsset(videoAssetUuid, {
    refetchInterval: (query) => {
      const st = query.state.data?.status;
      return st === ProjectAssetStatuses.PENDING || st === ProjectAssetStatuses.PROCESSING ? 3000 : false;
    },
  });

  useEffect(() => {
    if (!polled) {
      return;
    }
    mergeEstateVideoAsset(videoAssetUuid, polled);
  }, [polled, videoAssetUuid, mergeEstateVideoAsset]);

  const display = polled ?? asset;
  const sceneOrder = display.scene?.order ?? asset.scene?.order ?? display.scene_variation?.scene?.order ?? asset.scene_variation?.scene?.order;
  const thumbUrl = display.prompt_images?.[0]?.document.url ?? "";
  const videoUrl = display.document?.url ?? "";
  const showEditor = display.status === ProjectAssetStatuses.COMPLETED;
  const isDevelopment = process.env.NODE_ENV === "development";
  const sceneUuid = display.scene_uuid ?? display.scene?.uuid ?? asset.scene_uuid ?? asset.scene?.uuid ?? null;
  const promptImageUuid = useMemo(() => display.prompt_images?.[0]?.uuid ?? asset.prompt_images?.[0]?.uuid ?? null, [display.prompt_images, asset.prompt_images]);

  const trimRange = useEstateWorkflowStore((s) => s.trimRangeByVideoUuid[videoAssetUuid] ?? { start: 0, end: 5 });
  const videoDurationSec = useEstateWorkflowStore((s) => s.videoDurationSecByVideoUuid[videoAssetUuid] ?? ESTATE_TRIM_SEC_MAX);
  const transitionId = useEstateWorkflowStore((s) => s.transitionByVideoUuid[videoAssetUuid] ?? ESTATE_DEFAULT_TRANSITION_ID);
  const volume = useEstateWorkflowStore((s) => s.volumeByVideoUuid[videoAssetUuid] ?? ESTATE_DEFAULT_VOLUME);
  const speed = useEstateWorkflowStore((s) => s.speedByVideoUuid[videoAssetUuid] ?? ESTATE_DEFAULT_SPEED);
  const caption = useEstateWorkflowStore(
    (s) =>
      s.captionByVideoUuid[videoAssetUuid] ?? {
        text: "",
        startSec: ESTATE_DEFAULT_CAPTION_START_SEC,
        endSec: ESTATE_DEFAULT_CAPTION_END_SEC,
        position: ESTATE_DEFAULT_CAPTION_POSITION,
        style: ESTATE_DEFAULT_CAPTION_STYLE,
      },
  );
  const setTrimRange = useEstateWorkflowStore((s) => s.setTrimRange);
  const setVideoDurationSec = useEstateWorkflowStore((s) => s.setVideoDurationSec);
  const setTransition = useEstateWorkflowStore((s) => s.setTransition);
  const setVolume = useEstateWorkflowStore((s) => s.setVolume);
  const setSpeed = useEstateWorkflowStore((s) => s.setSpeed);
  const setCaptionText = useEstateWorkflowStore((s) => s.setCaptionText);
  const setCaptionStartSec = useEstateWorkflowStore((s) => s.setCaptionStartSec);
  const setCaptionEndSec = useEstateWorkflowStore((s) => s.setCaptionEndSec);
  const setCaptionPosition = useEstateWorkflowStore((s) => s.setCaptionPosition);
  const setCaptionStyle = useEstateWorkflowStore((s) => s.setCaptionStyle);

  const handleTrimChange = useCallback(
    (start: number, end: number) => {
      setTrimRange(videoAssetUuid, start, end);
    },
    [videoAssetUuid, setTrimRange],
  );

  const handleTransitionChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") {
        return;
      }
      const first = Array.from(keys)[0];
      if (typeof first === "string") {
        setTransition(videoAssetUuid, first);
      }
    },
    [videoAssetUuid, setTransition],
  );

  const handleVolumeChange = useCallback(
    (raw: number | number[]) => {
      if (typeof raw === "number") {
        setVolume(videoAssetUuid, raw);
      }
    },
    [videoAssetUuid, setVolume],
  );

  const handleSpeedChange = useCallback(
    (raw: number | number[]) => {
      if (typeof raw === "number") {
        setSpeed(videoAssetUuid, raw);
      }
    },
    [videoAssetUuid, setSpeed],
  );

  const handleCaptionTextChange = useCallback(
    (value: string) => {
      setCaptionText(videoAssetUuid, value);
    },
    [videoAssetUuid, setCaptionText],
  );

  const handleCaptionStartSecChange = useCallback(
    (value: string) => {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        setCaptionStartSec(videoAssetUuid, parsed);
      }
    },
    [videoAssetUuid, setCaptionStartSec],
  );

  const handleCaptionEndSecChange = useCallback(
    (value: string) => {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        setCaptionEndSec(videoAssetUuid, parsed);
      }
    },
    [videoAssetUuid, setCaptionEndSec],
  );

  const handleCaptionPositionChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") {
        return;
      }
      const first = Array.from(keys)[0];
      if (typeof first === "string") {
        setCaptionPosition(videoAssetUuid, first);
      }
    },
    [videoAssetUuid, setCaptionPosition],
  );

  const handleCaptionStyleChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") {
        return;
      }
      const first = Array.from(keys)[0];
      if (typeof first === "string") {
        setCaptionStyle(videoAssetUuid, first);
      }
    },
    [videoAssetUuid, setCaptionStyle],
  );

  const handleVideoLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const durationSec = event.currentTarget.duration;
      if (Number.isFinite(durationSec) && durationSec > 0) {
        setVideoDurationSec(videoAssetUuid, durationSec);
      }
    },
    [videoAssetUuid, setVideoDurationSec],
  );

  const handleOpenDeleteModal = useCallback(() => {
    if (!sceneUuid) {
      return;
    }
    setIsDeleteModalOpen(true);
  }, [sceneUuid]);

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeletingScene) {
      return;
    }
    setIsDeleteModalOpen(false);
  }, [isDeletingScene]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, [videoUrl]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }
    el.volume = volume;
    el.playbackRate = speed;
  }, [volume, speed, videoUrl]);

  const handlePreviewMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      if (reorder?.canReorder) {
        event.stopPropagation();
      }
    },
    [reorder?.canReorder],
  );

  const handleConfirmDeleteScene = useCallback(async () => {
    if (!sceneUuid) {
      return;
    }
    await deleteScene(sceneUuid);
    if (promptImageUuid) {
      removePromptImageAsset(promptImageUuid);
    }
    setIsDeleteModalOpen(false);
  }, [sceneUuid, deleteScene, promptImageUuid, removePromptImageAsset]);

  const previewShell = compact ? "relative h-24 w-full overflow-hidden rounded-lg bg-default-200/40 sm:h-28" : "relative aspect-video w-full overflow-hidden rounded-xl bg-default-200/40";

  const reorderHandlers = useVideoReorderItem(
    reorder
      ? {
          index: reorder.index,
          canReorder: reorder.canReorder,
          onReorder: reorder.onReorder,
          setDragIndex: reorder.setDragIndex,
        }
      : {
          index: 0,
          canReorder: false,
          onReorder: () => {},
          setDragIndex: () => {},
        },
  );

  const card = (
    <Card className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
      <CardHeader className={`flex flex-wrap items-center justify-between gap-2 ${compact ? "px-3 pb-2 pt-3" : "px-4 pb-3 pt-4"}`}>
        <span className={compact ? "text-tiny font-semibold text-foreground" : "text-small font-semibold text-foreground"}>Scene {sceneOrder ?? "—"}</span>
        <div className="flex items-center gap-2">
          {display.status === ProjectAssetStatuses.FAILED ? (
            <Chip size="sm" variant="flat" color="danger">
              Failed
            </Chip>
          ) : display.status === ProjectAssetStatuses.COMPLETED ? (
            <Chip size="sm" variant="flat" color="success">
              Complete
            </Chip>
          ) : display.status === ProjectAssetStatuses.PENDING || display.status === ProjectAssetStatuses.PROCESSING ? (
            <Chip size="sm" variant="flat" color="success">
              {display.status === ProjectAssetStatuses.PENDING ? "Queued" : "Processing"}
            </Chip>
          ) : (
            <Chip size="sm" variant="flat">
              {display.status}
            </Chip>
          )}
          {isDevelopment && !!sceneUuid && (
            <Button size="sm" color="danger" variant="flat" isIconOnly onPress={handleOpenDeleteModal} aria-label="Delete scene">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className={compact ? "gap-2 p-3 pt-0" : "gap-4 p-4 pt-0"}>
        <div className={previewShell}>
          {(display.status === ProjectAssetStatuses.PENDING || display.status === ProjectAssetStatuses.PROCESSING) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className={compact ? "h-full w-full rounded-lg" : "h-full w-full rounded-xl"} />
            </div>
          )}
          {display.status === ProjectAssetStatuses.FAILED && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-danger/10 p-2">
              <AlertCircle className="h-8 w-8 text-danger" />
              <p className="text-center text-tiny text-danger line-clamp-3">{display.error_message || "Generation failed"}</p>
              {thumbUrl ? <img alt="" src={thumbUrl} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" /> : null}
            </div>
          )}
          {display.status === ProjectAssetStatuses.COMPLETED && (
            <div className="relative h-full w-full" onMouseDown={videoUrl ? handlePreviewMouseDown : undefined}>
              {videoUrl ? <video ref={videoRef} src={videoUrl} className="h-full w-full object-cover" onLoadedMetadata={handleVideoLoadedMetadata} controls muted playsInline loop preload="metadata" /> : <img alt="" src={thumbUrl} className="h-full w-full object-cover" />}
            </div>
          )}
        </div>
        {showEditor && (
          <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-4"}>
            <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
              <AccordionItem key="caption-options" aria-label="Caption options" title={<span className="text-sm font-medium">Captions</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
                <div className="flex flex-col gap-4">
                  <Input label="Captions" size="sm" value={caption.text} onValueChange={handleCaptionTextChange} />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Input label="Caption Start (sec)" type="number" size="sm" value={caption.startSec.toString()} onValueChange={handleCaptionStartSecChange} />
                    <Input label="Caption End (sec)" type="number" size="sm" value={caption.endSec.toString()} onValueChange={handleCaptionEndSecChange} />
                  </div>
                  <Select label="Caption Position" size="sm" selectedKeys={new Set([caption.position])} onSelectionChange={handleCaptionPositionChange} classNames={{ trigger: "min-h-10" }}>
                    {ESTATE_CAPTION_POSITION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                  <Select label="Caption Style" size="sm" selectedKeys={new Set([caption.style])} onSelectionChange={handleCaptionStyleChange} classNames={{ trigger: "min-h-10" }}>
                    {ESTATE_CAPTION_STYLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </AccordionItem>
              <AccordionItem key="advanced-video-options" aria-label="Advanced video options" title={<span className="text-sm font-medium">Advanced</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
                <div className="flex flex-col gap-4">
                  <Select label="Transition" size="sm" selectedKeys={new Set([transitionId])} onSelectionChange={handleTransitionChange} classNames={{ trigger: "min-h-10" }}>
                    {ESTATE_TRANSITION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                  <TrimRangeField start={trimRange.start} end={trimRange.end} maxSec={videoDurationSec} onChange={handleTrimChange} />
                  <Slider aria-label="Volume" label="Volume" size="sm" minValue={ESTATE_VOLUME_MIN} maxValue={ESTATE_VOLUME_MAX} step={ESTATE_VOLUME_STEP} value={volume} onChange={handleVolumeChange} getValue={(value) => `${Math.round(Number(value) * 100)}%`} />
                  <Slider aria-label="Speed" label="Speed" size="sm" minValue={ESTATE_SPEED_MIN} maxValue={ESTATE_SPEED_MAX} step={ESTATE_SPEED_STEP} value={speed} onChange={handleSpeedChange} getValue={(value) => `${Number(value).toFixed(1)}x`} />
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardBody>
    </Card>
  );

  if (!reorder) {
    return (
      <>
        {card}
        <ConfirmationModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDeleteScene} title="Delete scene" description="Delete this scene and all related assets? This action cannot be undone." confirmText="Delete" confirmColor="danger" isLoading={isDeletingScene} />
      </>
    );
  }

  return (
    <>
      <div className={`min-w-0 rounded-2xl transition-opacity duration-200 ${reorder.dragIndex === reorder.index ? "opacity-60" : "opacity-100"}`} draggable={reorderHandlers.draggable} onDragStart={reorderHandlers.handleDragStart} onDragOver={reorderHandlers.handleDragOver} onDrop={reorderHandlers.handleDrop} onDragEnd={reorderHandlers.handleDragEnd}>
        <div className="flex gap-1.5">
          {reorder.canReorder && (
            <div className="flex shrink-0 cursor-grab items-start pt-2 text-default-400 active:cursor-grabbing" aria-hidden>
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0 flex-1">{card}</div>
        </div>
      </div>
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDeleteScene} title="Delete scene" description="Delete this scene and all related assets? This action cannot be undone." confirmText="Delete" confirmColor="danger" isLoading={isDeletingScene} />
    </>
  );
}

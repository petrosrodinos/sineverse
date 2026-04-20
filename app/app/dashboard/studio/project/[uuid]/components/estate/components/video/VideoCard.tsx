"use client";

import type { Key, SyntheticEvent } from "react";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { TimelineClip } from "@/features/timeline-clips/interfaces/timeline-clips.interfaces";
import type { UpdateTimelineClipDto } from "@/features/timeline-clips/interfaces/timeline-clips.interfaces";
import type { UpdateTimelineCaptionDto } from "@/features/timeline-captions/interfaces/timeline-captions.interfaces";
import type { TimelineTransitionType } from "@/features/timeline-transitions/interfaces/timeline-transitions.interfaces";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Skeleton } from "@heroui/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AlertCircle, GripVertical, Trash2 } from "lucide-react";
import { addToast } from "@heroui/toast";

import {
  ESTATE_CAPTION_POSITION_OPTIONS,
  ESTATE_CAPTION_STYLE_OPTIONS,
  ESTATE_TRANSITION_OPTIONS,
  estateWalkthroughVideoConfig,
} from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useVideoReorderItem } from "../../hooks/useVideoReorderItem";

import { TrimRangeField } from "./TrimRangeField";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import {
  useDeleteProjectAsset,
  useProjectAsset,
} from "@/features/project-assets/hooks/use-project-assets";
import {
  useTimelineClips,
  useCreateTimelineClip,
  useUpdateTimelineClip,
} from "@/features/timeline-clips/hooks/use-timeline-clips";
import {
  useTimelineCaptions,
  useCreateTimelineCaption,
  useUpdateTimelineCaption,
} from "@/features/timeline-captions/hooks/use-timeline-captions";
import { RoleTypes } from "@/features/user/interfaces/user.interfaces";

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
  finalProjectUuid: string;
  reorder?: VideoCardReorderProps;
  timelineClipFromParent?: TimelineClip | null;
  timelineClipsReady?: boolean;
};

export function VideoCard({
  asset,
  compact = false,
  finalProjectUuid,
  reorder,
  timelineClipFromParent,
  timelineClipsReady,
}: VideoCardProps) {
  const videoAssetUuid = asset.uuid;

  const { data: session, status: sessionStatus } = useSession();

  const isAdmin =
    sessionStatus !== "loading" &&
    (session?.role === RoleTypes.ADMIN ||
      session?.role === RoleTypes.SUPER_ADMIN);

  const { mutateAsync: deleteProjectAsset, isPending: isDeletingProjectAsset } =
    useDeleteProjectAsset();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: polled } = useProjectAsset(videoAssetUuid, {
    refetchInterval: (query) => {
      const st = query.state.data?.status;

      return st === ProjectAssetStatuses.PENDING ||
        st === ProjectAssetStatuses.PROCESSING
        ? 3000
        : false;
    },
  });

  const display = polled ?? asset;

  const sceneOrder =
    display.scene?.order ??
    asset.scene?.order ??
    display.scene_variation?.scene?.order ??
    asset.scene_variation?.scene?.order;

  const thumbUrl = display.prompt_images?.[0]?.document.url ?? "";

  const videoUrl = display.document?.url ?? "";

  const showEditor = display.status === ProjectAssetStatuses.COMPLETED;

  const useParentTimelineClip = timelineClipFromParent !== undefined;

  const { data: fetchedClips } = useTimelineClips(
    {
      final_project_uuid: finalProjectUuid,
      project_asset_uuid: videoAssetUuid,
    },
    { enabled: !useParentTimelineClip && showEditor && !!finalProjectUuid },
  );

  const clip = useParentTimelineClip
    ? timelineClipFromParent
    : (fetchedClips?.[0] ?? null);

  const { mutate: createClip } = useCreateTimelineClip();

  const { mutate: updateClip } = useUpdateTimelineClip();

  const [videoDurationSec, setVideoDurationSec] = useState(5);

  const clipInitializedRef = useRef(false);

  useEffect(() => {
    if (
      !showEditor ||
      !finalProjectUuid ||
      clip !== null ||
      clipInitializedRef.current
    )
      return;

    if (useParentTimelineClip && timelineClipsReady === false) return;

    if (!useParentTimelineClip && fetchedClips === undefined) return;

    clipInitializedRef.current = true;

    createClip({
      project_uuid: asset.project_uuid,
      project_asset_uuid: videoAssetUuid,
      final_project_uuid: finalProjectUuid,
      start_sec: 0,
      end_sec: videoDurationSec,
      trim_start: 0,
      trim_end: videoDurationSec,
      volume: estateWalkthroughVideoConfig.volume,
      speed: estateWalkthroughVideoConfig.speed,
    });
  }, [
    showEditor,
    finalProjectUuid,
    clip,
    fetchedClips,
    useParentTimelineClip,
    timelineClipsReady,
    asset.project_uuid,
    videoAssetUuid,
    videoDurationSec,
    createClip,
  ]);

  const [trimStart, setTrimStart] = useState(0);

  const [trimEnd, setTrimEnd] = useState(5);

  const [volume, setVolume] = useState<number>(
    estateWalkthroughVideoConfig.volume,
  );

  const [speed, setSpeed] = useState<number>(
    estateWalkthroughVideoConfig.speed,
  );

  const [transitionType, setTransitionType] = useState<TimelineTransitionType>(
    estateWalkthroughVideoConfig.transitionId as TimelineTransitionType,
  );

  const clipLoadedRef = useRef(false);

  useEffect(() => {
    if (!clip || clipLoadedRef.current) return;

    clipLoadedRef.current = true;

    setTrimStart(clip.trim_start ?? 0);

    setTrimEnd(clip.trim_end ?? videoDurationSec);

    setVolume(clip.volume ?? estateWalkthroughVideoConfig.volume);

    setSpeed(clip.speed ?? estateWalkthroughVideoConfig.speed);

    if (clip.transition_out?.type) {
      setTransitionType(clip.transition_out.type as TimelineTransitionType);
    }
  }, [clip, videoDurationSec]);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleClipUpdate = useCallback(
    (dto: UpdateTimelineClipDto) => {
      if (!clip) return;

      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        updateClip({ uuid: clip.uuid, dto });
      }, 600);
    },
    [clip, updateClip],
  );

  const { data: captions } = useTimelineCaptions(
    { clip_uuid: clip?.uuid ?? "" },
    { enabled: !!clip?.uuid },
  );

  const caption = captions?.[0] ?? null;

  const { mutate: createCaption } = useCreateTimelineCaption();

  const { mutate: updateCaption } = useUpdateTimelineCaption();

  const [captionText, setCaptionText] = useState("");

  const [captionStartSec, setCaptionStartSec] = useState<number>(
    estateWalkthroughVideoConfig.captionStartSec,
  );

  const [captionEndSec, setCaptionEndSec] = useState<number>(videoDurationSec);

  const [captionPosition, setCaptionPosition] = useState<string>(
    estateWalkthroughVideoConfig.captionPosition,
  );

  const [captionStyle, setCaptionStyle] = useState<string>(
    estateWalkthroughVideoConfig.captionStyle,
  );

  const captionLoadedRef = useRef(false);

  useEffect(() => {
    if (!caption || captionLoadedRef.current) return;

    captionLoadedRef.current = true;

    setCaptionText(caption.text);

    setCaptionStartSec(caption.start_sec);

    setCaptionEndSec(caption.end_sec);

    setCaptionPosition(
      caption.position ?? estateWalkthroughVideoConfig.captionPosition,
    );

    setCaptionStyle(caption.style ?? estateWalkthroughVideoConfig.captionStyle);
  }, [caption]);

  const captionDebounceRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleCaptionUpsert = useCallback(
    (
      dto: UpdateTimelineCaptionDto & {
        text: string;
        start_sec: number;
        end_sec: number;
      },
    ) => {
      if (!clip) return;

      clearTimeout(captionDebounceRef.current);

      captionDebounceRef.current = setTimeout(() => {
        if (caption) {
          updateCaption({ uuid: caption.uuid, dto, clip_uuid: clip.uuid });
        } else {
          createCaption({ clip_uuid: clip.uuid, ...dto });
        }
      }, 600);
    },
    [clip, caption, createCaption, updateCaption],
  );

  const handleTrimChange = useCallback(
    (start: number, end: number) => {
      setTrimStart(start);

      setTrimEnd(end);

      scheduleClipUpdate({ trim_start: start, trim_end: end });
    },
    [scheduleClipUpdate],
  );

  const handleTransitionChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") return;

      const first = Array.from(keys)[0];

      if (typeof first === "string") {
        const type = first as TimelineTransitionType;

        setTransitionType(type);

        scheduleClipUpdate({
          transition_out_type: type,
          transition_out_duration: 0.5,
        });
      }
    },
    [scheduleClipUpdate],
  );

  const handleVolumeChange = useCallback(
    (raw: number | number[]) => {
      if (typeof raw === "number") {
        setVolume(raw);

        scheduleClipUpdate({ volume: raw });
      }
    },
    [scheduleClipUpdate],
  );

  const handleSpeedChange = useCallback(
    (raw: number | number[]) => {
      if (typeof raw === "number") {
        setSpeed(raw);

        scheduleClipUpdate({ speed: raw });
      }
    },
    [scheduleClipUpdate],
  );

  const handleCaptionTextChange = useCallback(
    (value: string) => {
      setCaptionText(value);

      scheduleCaptionUpsert({
        text: value,
        start_sec: captionStartSec,
        end_sec: captionEndSec,
        position: captionPosition,
        style: captionStyle,
      });
    },
    [
      scheduleCaptionUpsert,
      captionStartSec,
      captionEndSec,
      captionPosition,
      captionStyle,
    ],
  );

  const handleCaptionStartSecChange = useCallback(
    (value: string) => {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        setCaptionStartSec(parsed);

        scheduleCaptionUpsert({
          text: captionText,
          start_sec: parsed,
          end_sec: captionEndSec,
          position: captionPosition,
          style: captionStyle,
        });
      }
    },
    [
      scheduleCaptionUpsert,
      captionText,
      captionEndSec,
      captionPosition,
      captionStyle,
    ],
  );

  const handleCaptionEndSecChange = useCallback(
    (value: string) => {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        const nextEndSec = Math.min(parsed, videoDurationSec);

        setCaptionEndSec(nextEndSec);

        scheduleCaptionUpsert({
          text: captionText,
          start_sec: captionStartSec,
          end_sec: nextEndSec,
          position: captionPosition,
          style: captionStyle,
        });
      }
    },
    [
      scheduleCaptionUpsert,
      captionText,
      captionStartSec,
      captionPosition,
      captionStyle,
      videoDurationSec,
    ],
  );

  const handleCaptionPositionChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") return;

      const first = Array.from(keys)[0];

      if (typeof first === "string") {
        setCaptionPosition(first);

        scheduleCaptionUpsert({
          text: captionText,
          start_sec: captionStartSec,
          end_sec: captionEndSec,
          position: first,
          style: captionStyle,
        });
      }
    },
    [
      scheduleCaptionUpsert,
      captionText,
      captionStartSec,
      captionEndSec,
      captionStyle,
    ],
  );

  const handleCaptionStyleChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") return;

      const first = Array.from(keys)[0];

      if (typeof first === "string") {
        setCaptionStyle(first);

        scheduleCaptionUpsert({
          text: captionText,
          start_sec: captionStartSec,
          end_sec: captionEndSec,
          position: captionPosition,
          style: first,
        });
      }
    },
    [
      scheduleCaptionUpsert,
      captionText,
      captionStartSec,
      captionEndSec,
      captionPosition,
    ],
  );

  const handleVideoLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const durationSec = event.currentTarget.duration;

      if (Number.isFinite(durationSec) && durationSec > 0) {
        setVideoDurationSec(durationSec);

        if (!clipLoadedRef.current) {
          setTrimEnd(durationSec);
        }

        if (!captionLoadedRef.current) {
          setCaptionEndSec(durationSec);
        }
      }
    },
    [],
  );

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeletingProjectAsset) return;

    setIsDeleteModalOpen(false);
  }, [isDeletingProjectAsset]);

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

    if (!el) return;

    el.volume = volume;

    el.playbackRate = speed;
  }, [volume, speed, videoUrl]);

  const handleConfirmDeleteClip = useCallback(async () => {
    try {
      await deleteProjectAsset(videoAssetUuid);

      setIsDeleteModalOpen(false);

      addToast({ title: "Clip removed", severity: "success" });
    } catch {
      addToast({ title: "Could not remove clip", severity: "danger" });
    }
  }, [videoAssetUuid, deleteProjectAsset]);

  const previewShell = compact
    ? "relative h-24 w-full overflow-hidden rounded-lg bg-default-200/40 sm:h-28"
    : "relative aspect-video w-full overflow-hidden rounded-xl bg-default-200/40";

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
      <CardHeader
        className={`flex flex-wrap items-center justify-between gap-2 ${compact ? "px-3 pb-2 pt-3" : "px-4 pb-3 pt-4"}`}
      >
        <span
          className={
            compact
              ? "text-tiny font-semibold text-foreground"
              : "text-small font-semibold text-foreground"
          }
        >
          Scene {sceneOrder ?? "—"}
        </span>
        <div className="flex items-center gap-2">
          {display.status === ProjectAssetStatuses.FAILED ? (
            <Chip color="danger" size="sm" variant="flat">
              Failed
            </Chip>
          ) : display.status === ProjectAssetStatuses.COMPLETED ? (
            <Chip color="success" size="sm" variant="flat">
              Complete
            </Chip>
          ) : display.status === ProjectAssetStatuses.PENDING ||
            display.status === ProjectAssetStatuses.PROCESSING ? (
            <Chip color="success" size="sm" variant="flat">
              {display.status === ProjectAssetStatuses.PENDING
                ? "Queued"
                : "Processing"}
            </Chip>
          ) : (
            <Chip size="sm" variant="flat">
              {display.status}
            </Chip>
          )}
          {isAdmin && (
            <Button
              isIconOnly
              aria-label="Remove walkthrough clip"
              color="danger"
              size="sm"
              variant="flat"
              onPress={handleOpenDeleteModal}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className={compact ? "gap-2 p-3 pt-0" : "gap-4 p-4 pt-0"}>
        <div className={previewShell}>
          {(display.status === ProjectAssetStatuses.PENDING ||
            display.status === ProjectAssetStatuses.PROCESSING) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton
                className={
                  compact
                    ? "h-full w-full rounded-lg"
                    : "h-full w-full rounded-xl"
                }
              />
            </div>
          )}
          {display.status === ProjectAssetStatuses.FAILED && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-danger/10 p-2">
              <AlertCircle className="h-8 w-8 text-danger" />
              <p className="text-center text-tiny text-danger line-clamp-3">
                {display.error_message || "Generation failed"}
              </p>
              {thumbUrl ? (
                <img
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
                  src={thumbUrl}
                />
              ) : null}
            </div>
          )}
          {display.status === ProjectAssetStatuses.COMPLETED && (
            <div className="relative h-full w-full">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  controls
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                  preload="metadata"
                  src={videoUrl}
                  onLoadedMetadata={handleVideoLoadedMetadata}
                />
              ) : (
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src={thumbUrl}
                />
              )}
            </div>
          )}
        </div>
        {showEditor && (
          <div
            className={compact ? "flex flex-col gap-2" : "flex flex-col gap-4"}
          >
            <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
              <AccordionItem
                key="caption-options"
                aria-label="Caption options"
                classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}
                title={<span className="text-sm font-medium">Captions</span>}
              >
                <div className="flex flex-col gap-4">
                  <Input
                    label="Captions"
                    size="sm"
                    value={captionText}
                    onValueChange={handleCaptionTextChange}
                  />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Input
                      label="Caption Start (sec)"
                      size="sm"
                      type="number"
                      value={captionStartSec.toString()}
                      onValueChange={handleCaptionStartSecChange}
                    />
                    <Input
                      label="Caption End (sec)"
                      max={videoDurationSec}
                      min={0}
                      size="sm"
                      type="number"
                      value={captionEndSec.toString()}
                      onValueChange={handleCaptionEndSecChange}
                    />
                  </div>
                  <Select
                    classNames={{ trigger: "min-h-10" }}
                    label="Caption Position"
                    selectedKeys={new Set([captionPosition])}
                    size="sm"
                    onSelectionChange={handleCaptionPositionChange}
                  >
                    {ESTATE_CAPTION_POSITION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    classNames={{ trigger: "min-h-10" }}
                    label="Caption Style"
                    selectedKeys={new Set([captionStyle])}
                    size="sm"
                    onSelectionChange={handleCaptionStyleChange}
                  >
                    {ESTATE_CAPTION_STYLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </AccordionItem>
              <AccordionItem
                key="advanced-video-options"
                aria-label="Advanced video options"
                classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}
                title={<span className="text-sm font-medium">Advanced</span>}
              >
                <div className="flex flex-col gap-4">
                  <Select
                    classNames={{ trigger: "min-h-10" }}
                    label="Transition"
                    selectedKeys={new Set([transitionType])}
                    size="sm"
                    onSelectionChange={handleTransitionChange}
                  >
                    {ESTATE_TRANSITION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </Select>
                  <TrimRangeField
                    end={trimEnd}
                    maxSec={videoDurationSec}
                    start={trimStart}
                    onChange={handleTrimChange}
                  />
                  <Slider
                    aria-label="Volume"
                    getValue={(value) => `${Math.round(Number(value) * 100)}%`}
                    label="Volume"
                    maxValue={estateWalkthroughVideoConfig.volumeMax}
                    minValue={estateWalkthroughVideoConfig.volumeMin}
                    size="sm"
                    step={estateWalkthroughVideoConfig.volumeStep}
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <Slider
                    aria-label="Speed"
                    getValue={(value) => `${Number(value).toFixed(1)}x`}
                    label="Speed"
                    maxValue={estateWalkthroughVideoConfig.speedMax}
                    minValue={estateWalkthroughVideoConfig.speedMin}
                    size="sm"
                    step={estateWalkthroughVideoConfig.speedStep}
                    value={speed}
                    onChange={handleSpeedChange}
                  />
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
        <ConfirmationModal
          confirmColor="danger"
          confirmText="Remove"
          description="Remove this generated clip only. Your uploaded listing photo stays on the project."
          isLoading={isDeletingProjectAsset}
          isOpen={isDeleteModalOpen}
          title="Remove walkthrough clip"
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteClip}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={`min-w-0 rounded-2xl transition-opacity duration-200 ${reorder.dragIndex === reorder.index ? "opacity-60" : "opacity-100"}`}
        draggable={reorderHandlers.draggable}
        onDragEnd={reorderHandlers.handleDragEnd}
        onDragOver={reorderHandlers.handleDragOver}
        onDragStart={reorderHandlers.handleDragStart}
        onDrop={reorderHandlers.handleDrop}
      >
        <div className="flex gap-1.5">
          {reorder.canReorder && (
            <div
              aria-hidden
              className="flex shrink-0 cursor-grab items-start pt-2 text-default-400 active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0 flex-1">{card}</div>
        </div>
      </div>
      <ConfirmationModal
        confirmColor="danger"
        confirmText="Remove"
        description="Remove this generated clip only. Your uploaded listing photo stays on the project."
        isLoading={isDeletingProjectAsset}
        isOpen={isDeleteModalOpen}
        title="Remove walkthrough clip"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteClip}
      />
    </>
  );
}

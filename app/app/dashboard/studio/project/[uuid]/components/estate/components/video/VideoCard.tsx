"use client";

import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import type { Key } from "react";
import { useCallback } from "react";
import { Play } from "lucide-react";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ESTATE_AUDIO_TRACK_OPTIONS, ESTATE_DEFAULT_AUDIO_TRACK_ID, ESTATE_DEFAULT_TRANSITION_ID, ESTATE_TRANSITION_OPTIONS } from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";
import { TrimRangeField } from "./TrimRangeField";

type VideoCardProps = {
  asset: ProjectAsset;
  compact?: boolean;
  videoAssetUuid: string;
};

export function VideoCard({ asset, compact = false, videoAssetUuid }: VideoCardProps) {
  const thumbUrl = asset.prompt_images?.[0]?.document.url ?? "";
  const showEditor = asset.status === ProjectAssetStatuses.COMPLETED;

  const trimRange = useEstateWorkflowStore((s) => s.trimRangeByVideoUuid[videoAssetUuid] ?? { start: 0, end: 5 });
  const transitionId = useEstateWorkflowStore((s) => s.transitionByVideoUuid[videoAssetUuid] ?? ESTATE_DEFAULT_TRANSITION_ID);
  const audioTrackId = useEstateWorkflowStore((s) => s.estateAudioTrackByVideoUuid[videoAssetUuid] ?? ESTATE_DEFAULT_AUDIO_TRACK_ID);
  const setTrimRange = useEstateWorkflowStore((s) => s.setTrimRange);
  const setTransition = useEstateWorkflowStore((s) => s.setTransition);
  const setEstateAudioTrack = useEstateWorkflowStore((s) => s.setEstateAudioTrack);

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

  const handleAudioChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") {
        return;
      }
      const first = Array.from(keys)[0];
      if (typeof first === "string") {
        setEstateAudioTrack(videoAssetUuid, first);
      }
    },
    [videoAssetUuid, setEstateAudioTrack],
  );

  const previewShell = compact ? "relative h-24 w-full overflow-hidden rounded-lg bg-default-200/40 sm:h-28" : "relative aspect-video w-full overflow-hidden rounded-xl bg-default-200/40";

  const playBtnShell = compact ? "flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-sm" : "flex h-14 w-14 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm";

  const playIconClass = compact ? "h-4 w-4 fill-current" : "h-6 w-6 fill-current";

  return (
    <Card className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
      <CardBody className={compact ? "gap-2 p-3" : "gap-4 p-4"}>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <span className={compact ? "text-tiny font-medium text-default-600" : "text-small font-medium text-default-600"}>scene.order {asset.scene.order}</span>
          <span className="text-tiny uppercase tracking-wide text-default-500">{asset.status}</span>
        </div>
        <div className={previewShell}>
          {asset.status === ProjectAssetStatuses.PENDING && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          )}
          {asset.status === ProjectAssetStatuses.PROCESSING && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-default-200/30">
              <Spinner size="sm" color="secondary" />
            </div>
          )}
          {asset.status === ProjectAssetStatuses.COMPLETED && (
            <>
              <img alt="" src={thumbUrl} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                <div className={playBtnShell}>
                  <Play className={playIconClass} />
                </div>
              </div>
            </>
          )}
        </div>
        {showEditor && (
          <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-4"}>
            <Input label="Captions" size="sm" defaultValue="" />
            <TrimRangeField start={trimRange.start} end={trimRange.end} onChange={handleTrimChange} />
            <Select label="Transition" size="sm" selectedKeys={new Set([transitionId])} onSelectionChange={handleTransitionChange} classNames={{ trigger: "min-h-10" }}>
              {ESTATE_TRANSITION_OPTIONS.map((opt) => (
                <SelectItem key={opt.id}>{opt.label}</SelectItem>
              ))}
            </Select>
            <Divider className="my-1" />
            <Select label="Audio" size="sm" selectedKeys={new Set([audioTrackId])} onSelectionChange={handleAudioChange} classNames={{ trigger: "min-h-10" }}>
              {ESTATE_AUDIO_TRACK_OPTIONS.map((opt) => (
                <SelectItem key={opt.id}>{opt.label}</SelectItem>
              ))}
            </Select>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

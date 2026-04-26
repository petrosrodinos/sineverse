"use client";

import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";

import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Check } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import {
  ESTATE_VIDEO_MODEL_OPTIONS,
  estateWalkthroughVideoConfig,
} from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import {
  useTimelineMusic,
  useUpsertTimelineMusic,
} from "@/features/timeline-music/hooks/use-timeline-music";
import { useEstateStepper } from "../hooks/useEstateStepper";

import { FinalRenderStep } from "./steps/FinalRenderStep";
import { GenerateVideosStep } from "./steps/GenerateVideosStep";
import { UploadPhotosStep } from "./steps/UploadPhotosStep";

import { useFinalProjectByProject } from "@/features/final-projects/hooks/use-final-projects";
import {
  useScenes,
  useCreateEstateScenesFromImages,
} from "@/features/scenes/hooks/use-scenes";
import {
  AssetRoles,
  ProjectAssetStatuses,
} from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useProjectAssets } from "@/features/project-assets/hooks/use-project-assets";

type PendingFile = { id: string; file: File; previewUrl: string };

export function EstateStepper() {
  const params = useParams<{ uuid: string }>();

  const searchParams = useSearchParams();

  const projectUuid = params?.uuid ?? "";

  const stepParam = Number(searchParams.get("step"));

  const initialStep: WorkflowStep =
    stepParam === 1 || stepParam === 2 || stepParam === 3 ? stepParam : 1;

  const [activeStep, setActiveStep] = useState<WorkflowStep>(initialStep);

  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);

  const [selectedVideoModelId, setSelectedVideoModelId] = useState<string>(
    estateWalkthroughVideoConfig.videoModelId,
  );

  const { data: scenes } = useScenes(
    projectUuid ? { project_uuid: projectUuid } : undefined,
    { enabled: !!projectUuid },
  );

  const { data: videoAssetsResponse } = useProjectAssets(
    { project_uuid: projectUuid, role: AssetRoles.GENERATED_VIDEO, limit: 100 },
    {
      enabled: !!projectUuid,
      refetchInterval: (query) => {
        const assets = query.state.data?.data ?? [];

        if (assets.length === 0) {
          return false;
        }

        const hasProcessingAssets = assets.some(
          (asset) =>
            asset.status === ProjectAssetStatuses.PENDING ||
            asset.status === ProjectAssetStatuses.PROCESSING,
        );

        return hasProcessingAssets ? 3000 : false;
      },
    },
  );

  const videoAssets = videoAssetsResponse?.data ?? [];

  const promptImageAssets = useMemo(() => {
    return (scenes ?? []).flatMap((scene) =>
      (scene.scene_variations ?? []).flatMap((sv) =>
        (sv.project_assets ?? []).filter((a) => a.role === "PROMPT_IMAGE"),
      ),
    );
  }, [scenes]);

  const { finalProject } = useFinalProjectByProject(projectUuid);

  const finalProjectUuid = finalProject?.uuid ?? null;

  const {
    data: timelineMusicForSeed,
    isFetched: timelineMusicForSeedFetched,
  } = useTimelineMusic(finalProjectUuid ?? "");

  const { mutate: upsertDefaultTimelineMusic } = useUpsertTimelineMusic();

  const backgroundAudioUserChoseNoneRef = useRef(false);

  const lastSeededFinalProjectUuidRef = useRef<string | null>(null);

  const defaultTimelineMusicSeedAttemptedRef = useRef(false);

  useEffect(() => {
    if (!finalProjectUuid) {
      lastSeededFinalProjectUuidRef.current = null;

      backgroundAudioUserChoseNoneRef.current = false;

      defaultTimelineMusicSeedAttemptedRef.current = false;

      return;
    }

    if (finalProjectUuid !== lastSeededFinalProjectUuidRef.current) {
      lastSeededFinalProjectUuidRef.current = finalProjectUuid;

      backgroundAudioUserChoseNoneRef.current = false;

      defaultTimelineMusicSeedAttemptedRef.current = false;
    }
  }, [finalProjectUuid]);

  useEffect(() => {
    if (!finalProjectUuid || !timelineMusicForSeedFetched) return;

    const rows = timelineMusicForSeed ?? [];

    if (rows.length > 0) return;

    if (backgroundAudioUserChoseNoneRef.current) return;

    if (defaultTimelineMusicSeedAttemptedRef.current) return;

    defaultTimelineMusicSeedAttemptedRef.current = true;

    upsertDefaultTimelineMusic({
      finalProjectUuid,
      dto: {
        track_id: estateWalkthroughVideoConfig.audioTrackId,
        volume: estateWalkthroughVideoConfig.volume,
        start_sec: 0,
        end_sec: 4,
      },
    });
  }, [
    finalProjectUuid,
    timelineMusicForSeed,
    timelineMusicForSeedFetched,
    upsertDefaultTimelineMusic,
  ]);

  const {
    mutateAsync: createEstateScenesFromImages,
    isPending: isCreatingEstateScenes,
  } = useCreateEstateScenesFromImages();

  const { stepLabels, canGoNext, canGoBack, stepReachable } = useEstateStepper({
    activeStep,
    promptImageAssets,
    videoAssets,
    pendingFilesCount: pendingFiles.length,
  });

  const pendingFilesRef = useRef(pendingFiles);

  pendingFilesRef.current = pendingFiles;

  const selectedVideoModel = useMemo(
    () =>
      ESTATE_VIDEO_MODEL_OPTIONS.find(
        (option) => option.id === selectedVideoModelId,
      ) ?? ESTATE_VIDEO_MODEL_OPTIONS[0],
    [selectedVideoModelId],
  );

  const handleStepClick = useCallback(
    (step: WorkflowStep) => () => {
      setActiveStep(step);
    },
    [],
  );

  const handleNext = useCallback(async () => {
    if (activeStep !== 1) {
      setActiveStep((s) => Math.min(s + 1, 3) as WorkflowStep);

      return;
    }

    const files = pendingFilesRef.current.map((pf) => pf.file);

    if (files.length === 0) {
      setActiveStep(2);

      return;
    }

    if (!projectUuid) return;

    try {
      await createEstateScenesFromImages({
        project_uuid: projectUuid,
        files,
        ai_model: selectedVideoModel.id,
      });

      setPendingFiles((prev) => {
        prev.forEach((pf) => URL.revokeObjectURL(pf.previewUrl));

        return [];
      });

      setActiveStep(2);
    } catch {
      return;
    }
  }, [
    activeStep,
    projectUuid,
    createEstateScenesFromImages,
    selectedVideoModel.id,
  ]);

  const handleBack = useCallback(() => {
    setActiveStep((s) => Math.max(s - 1, 1) as WorkflowStep);
  }, []);

  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 sm:gap-4">
          {stepLabels.map(({ step, title, subtitle }) => {
            const isActive = activeStep === step;

            const reachable = stepReachable[step];

            const isComplete = activeStep > step;

            return (
              <button
                key={step}
                className={`w-full rounded-2xl border p-3.5 text-left transition-colors duration-200 sm:p-4 ${
                  isActive
                    ? "border-secondary-500/60 bg-secondary-500/10"
                    : "border-default-200 bg-default-100/30 dark:border-default-100/20 dark:bg-default-100/5"
                } ${reachable ? "cursor-pointer hover:border-secondary-400/50" : "cursor-not-allowed opacity-50"}`}
                disabled={!reachable}
                type="button"
                onClick={reachable ? handleStepClick(step) : undefined}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-small font-semibold ${
                      isComplete
                        ? "bg-secondary-500 text-white"
                        : isActive
                          ? "bg-secondary-500/90 text-white"
                          : "bg-default-200 text-default-600 dark:bg-default-100/20 dark:text-default-300"
                    }`}
                  >
                    {isComplete ? <Check className="h-4 w-4" /> : step}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      {title}
                    </p>
                    <p className="text-tiny text-default-500 sm:text-small">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <Progress
          aria-label="Workflow progress"
          classNames={{ track: "h-1.5 sm:h-2" }}
          color="secondary"
          maxValue={3}
          size="sm"
          value={activeStep}
        />
      </div>

      <div className="rounded-2xl border border-default-200 bg-default-100/40 p-3 shadow-sm dark:border-default-100/20 dark:bg-default-100/5 sm:p-4 md:p-8">
        <div className="transition-opacity duration-300">
          {activeStep === 1 && (
            <UploadPhotosStep
              pendingFiles={pendingFiles}
              selectedVideoModelId={selectedVideoModelId}
              setPendingFiles={setPendingFiles}
              onVideoModelChange={setSelectedVideoModelId}
            />
          )}
          {activeStep === 2 && (
            <GenerateVideosStep
              backgroundAudioUserChoseNoneRef={backgroundAudioUserChoseNoneRef}
              finalProjectUuid={finalProjectUuid}
              hasPromptImages={promptImageAssets.length > 0}
              walkthroughAiModel={selectedVideoModel.id}
            />
          )}
          {activeStep === 3 && (
            <FinalRenderStep finalProjectUuid={finalProjectUuid} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-default-200 pt-5 dark:border-default-100/20 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
        <div className="w-full sm:w-auto">
          {canGoBack && (
            <Button
              className="w-full sm:w-auto"
              variant="light"
              onPress={handleBack}
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          {activeStep !== 3 && (
            <Button
              className="w-full sm:w-auto"
              color="secondary"
              isDisabled={!canGoNext || isCreatingEstateScenes}
              isLoading={isCreatingEstateScenes}
              onPress={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

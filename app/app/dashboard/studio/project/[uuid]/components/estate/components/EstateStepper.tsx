"use client";

import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Check } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useProjectAssets } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useScenes, useCreateEstateScenesFromImages } from "@/features/scenes/hooks/use-scenes";
import { useFinalProjectByProject } from "@/features/final-projects/hooks/use-final-projects";
import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useEstateStepper } from "../hooks/useEstateStepper";
import { FinalRenderStep } from "./steps/FinalRenderStep";
import { GenerateVideosStep } from "./steps/GenerateVideosStep";
import { UploadPhotosStep } from "./steps/UploadPhotosStep";

type PendingFile = { id: string; file: File; previewUrl: string };

export function EstateStepper() {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";

  const [activeStep, setActiveStep] = useState<WorkflowStep>(1);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);

  const { data: scenes } = useScenes(
    projectUuid ? { project_uuid: projectUuid } : undefined,
    { enabled: !!projectUuid },
  );

  const { data: videoAssetsResponse } = useProjectAssets(
    { project_uuid: projectUuid, role: AssetRoles.GENERATED_VIDEO, limit: 100 },
    { enabled: !!projectUuid },
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

  const { mutateAsync: createEstateScenesFromImages, isPending: isCreatingEstateScenes } = useCreateEstateScenesFromImages();

  const { stepLabels, canGoNext, canGoBack, stepReachable } = useEstateStepper({
    activeStep,
    promptImageAssets,
    videoAssets,
    pendingFilesCount: pendingFiles.length,
  });

  const pendingFilesRef = useRef(pendingFiles);
  pendingFilesRef.current = pendingFiles;

  const handleStepClick = useCallback((step: WorkflowStep) => () => {
    setActiveStep(step);
  }, []);

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
      await createEstateScenesFromImages({ project_uuid: projectUuid, files });
      setPendingFiles((prev) => {
        prev.forEach((pf) => URL.revokeObjectURL(pf.previewUrl));
        return [];
      });
      setActiveStep(2);
    } catch {
      return;
    }
  }, [activeStep, projectUuid, createEstateScenesFromImages]);

  const handleBack = useCallback(() => {
    setActiveStep((s) => Math.max(s - 1, 1) as WorkflowStep);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {stepLabels.map(({ step, title, subtitle }) => {
            const isActive = activeStep === step;
            const reachable = stepReachable[step];
            const isComplete = activeStep > step;
            return (
              <button
                key={step}
                type="button"
                onClick={reachable ? handleStepClick(step) : undefined}
                disabled={!reachable}
                className={`flex flex-1 flex-col gap-1 rounded-2xl border p-4 text-left transition-colors duration-200 ${
                  isActive
                    ? "border-secondary-500/60 bg-secondary-500/10"
                    : "border-default-200 bg-default-100/30 dark:border-default-100/20 dark:bg-default-100/5"
                } ${reachable ? "cursor-pointer hover:border-secondary-400/50" : "cursor-not-allowed opacity-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-small font-semibold ${
                    isComplete ? "bg-secondary-500 text-white" : isActive ? "bg-secondary-500/90 text-white" : "bg-default-200 text-default-600 dark:bg-default-100/20 dark:text-default-300"
                  }`}>
                    {isComplete ? <Check className="h-4 w-4" /> : step}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">{title}</p>
                    <p className="text-small text-default-500">{subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <Progress aria-label="Workflow progress" size="sm" value={activeStep} maxValue={3} color="secondary" classNames={{ track: "h-1.5" }} />
      </div>

      <div className="rounded-2xl border border-default-200 bg-default-100/40 p-4 shadow-sm dark:border-default-100/20 dark:bg-default-100/5 md:p-8">
        <div className="transition-opacity duration-300">
          {activeStep === 1 && <UploadPhotosStep pendingFiles={pendingFiles} setPendingFiles={setPendingFiles} />}
          {activeStep === 2 && <GenerateVideosStep finalProjectUuid={finalProject?.uuid ?? null} hasPromptImages={promptImageAssets.length > 0} />}
          {activeStep === 3 && <FinalRenderStep finalProjectUuid={finalProject?.uuid ?? null} />}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-default-200 pt-6 dark:border-default-100/20">
        <div>
          {canGoBack && (
            <Button variant="light" onPress={handleBack}>
              Back
            </Button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {activeStep !== 3 && (
            <Button
              color="secondary"
              onPress={handleNext}
              isDisabled={!canGoNext || isCreatingEstateScenes}
              isLoading={isCreatingEstateScenes}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

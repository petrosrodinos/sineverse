"use client";

import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Check } from "lucide-react";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { useCreateEstateScenesFromImages } from "@/features/scenes/hooks/use-scenes";
import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useEstateStepper } from "../hooks/useEstateStepper";
import { useEstateWorkflowStore } from "../stores/estate-workflow.store";
import { FinalRenderStep } from "./steps/FinalRenderStep";
import { GenerateEditStep } from "./steps/GenerateEditStep";
import { UploadPhotosStep } from "./steps/UploadPhotosStep";

export function EstateStepper() {
  const { activeStep, stepLabels, canGoNext, canGoBack, goNext, goBack, goToStep, stepReachable } = useEstateStepper();
  const skipStep2 = useEstateWorkflowStore((s) => s.skipStep2);
  const getUploadedFiles = useEstateWorkflowStore((s) => s.getUploadedFiles);
  const hydratePromptImageAssetsFromScenes = useEstateWorkflowStore((s) => s.hydratePromptImageAssetsFromScenes);
  const { mutateAsync: createEstateScenesFromImages, isPending: isCreatingEstateScenes } =
    useCreateEstateScenesFromImages();
  const params = useParams<{ uuid: string }>();

  const handleStepClick = useCallback(
    (step: WorkflowStep) => () => {
      goToStep(step);
    },
    [goToStep],
  );

  const handleNext = useCallback(async () => {
    if (activeStep !== 1) {
      goNext();
      return;
    }

    const files = getUploadedFiles();
    if (files.length === 0) {
      goNext();
      return;
    }

    const projectUuid = params?.uuid;
    if (!projectUuid) {
      return;
    }

    try {
      const scenes = await createEstateScenesFromImages({
        project_uuid: projectUuid,
        files,
      });
      hydratePromptImageAssetsFromScenes(scenes);
      goNext();
    } catch {
      return;
    }
  }, [
    activeStep,
    createEstateScenesFromImages,
    getUploadedFiles,
    goNext,
    hydratePromptImageAssetsFromScenes,
    params?.uuid,
  ]);

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSkip = useCallback(() => {
    skipStep2();
  }, [skipStep2]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {stepLabels.map(({ step, title, subtitle }) => {
            const isActive = activeStep === step;
            const reachable = stepReachable[step];
            const isComplete = activeStep > step;
            return (
              <button key={step} type="button" onClick={reachable ? handleStepClick(step) : undefined} disabled={!reachable} className={`flex flex-1 flex-col gap-1 rounded-2xl border p-4 text-left transition-colors duration-200 ${isActive ? "border-secondary-500/60 bg-secondary-500/10" : "border-default-200 bg-default-100/30 dark:border-default-100/20 dark:bg-default-100/5"} ${reachable ? "cursor-pointer hover:border-secondary-400/50" : "cursor-not-allowed opacity-50"}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-small font-semibold ${isComplete ? "bg-secondary-500 text-white" : isActive ? "bg-secondary-500/90 text-white" : "bg-default-200 text-default-600 dark:bg-default-100/20 dark:text-default-300"}`}>{isComplete ? <Check className="h-4 w-4" /> : step}</span>
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
          {activeStep === 1 && <UploadPhotosStep />}
          {activeStep === 2 && <GenerateEditStep />}
          {activeStep === 3 && <FinalRenderStep />}
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
          {activeStep === 2 && (
            <Button variant="bordered" color="default" onPress={handleSkip}>
              Skip
            </Button>
          )}
          {activeStep !== 3 && (
            <Button color="secondary" onPress={handleNext} isDisabled={!canGoNext || isCreatingEstateScenes} isLoading={isCreatingEstateScenes}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

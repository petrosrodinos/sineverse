"use client";

import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";

import { useMemo } from "react";

import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";

type EstateStepperInput = {
  activeStep: WorkflowStep;
  promptImageAssets: ProjectAsset[];
  videoAssets: ProjectAsset[];
  pendingFilesCount: number;
};

const STEP_LABELS: readonly {
  step: WorkflowStep;
  title: string;
  subtitle: string;
}[] = [
  { step: 1, title: "Upload Photos", subtitle: "Add listing images" },
  {
    step: 2,
    title: "Generate & Edit Clips",
    subtitle: "AI clips from your photos",
  },
  { step: 3, title: "Generate Final Video", subtitle: "Review and render" },
];

export function useEstateStepper({
  activeStep,
  promptImageAssets,
  videoAssets,
  pendingFilesCount,
}: EstateStepperInput) {
  const uploadsReady = useMemo(
    () =>
      promptImageAssets.length > 0 &&
      promptImageAssets.every(
        (a) => a.status === ProjectAssetStatuses.COMPLETED,
      ),
    [promptImageAssets],
  );

  const videosReady = useMemo(
    () =>
      videoAssets.length > 0 &&
      videoAssets.every((a) => a.status === ProjectAssetStatuses.COMPLETED),
    [videoAssets],
  );

  const canGoNextFromStep1 = uploadsReady || pendingFilesCount > 0;

  const canGoNextFromStep2 = videosReady;

  const canGoNext =
    activeStep === 1
      ? canGoNextFromStep1
      : activeStep === 2
        ? canGoNextFromStep2
        : false;

  const canGoBack = activeStep > 1;

  const stepReachable: Record<WorkflowStep, boolean> = useMemo(
    () => ({
      1: true,
      2: uploadsReady,
      3: uploadsReady && videosReady,
    }),
    [uploadsReady, videosReady],
  );

  return {
    stepLabels: STEP_LABELS,
    canGoNext,
    canGoBack,
    stepReachable,
  };
}

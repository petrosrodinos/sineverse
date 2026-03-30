"use client";

import { useMemo } from "react";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import { useEstateWorkflowStore } from "../stores/estate-workflow.store";
import { canNavigateToStep } from "../utils/estate-workflow.utils";

const STEP_LABELS: readonly { step: WorkflowStep; title: string; subtitle: string }[] = [
  { step: 1, title: "Upload Photos", subtitle: "Add listing images" },
  { step: 2, title: "Generate & Edit Clips", subtitle: "AI clips from your photos" },
  { step: 3, title: "Generate Final Video", subtitle: "Review and render" },
];

export function useEstateStepper() {
  const activeStep = useEstateWorkflowStore((s) => s.activeStep);
  const promptImageAssets = useEstateWorkflowStore((s) => s.promptImageAssets);
  const videoAssetsByUuid = useEstateWorkflowStore((s) => s.videoAssetsByUuid);
  const videoOrder = useEstateWorkflowStore((s) => s.videoOrder);
  const goNext = useEstateWorkflowStore((s) => s.goNext);
  const goBack = useEstateWorkflowStore((s) => s.goBack);
  const goToStep = useEstateWorkflowStore((s) => s.goToStep);

  const navSlice = useMemo(
    () => ({
      promptImageAssets,
      videoAssetsByUuid,
      videoOrder,
    }),
    [promptImageAssets, videoAssetsByUuid, videoOrder],
  );

  const canGoNextFromStep1 = useMemo(
    () =>
      promptImageAssets.length > 0 &&
      promptImageAssets.every((a) => a.status === ProjectAssetStatuses.COMPLETED),
    [promptImageAssets],
  );

  const canGoNextFromStep2 = useMemo(
    () =>
      videoOrder.length > 0 &&
      videoOrder.every((id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED),
    [videoOrder, videoAssetsByUuid],
  );

  const canGoNext =
    activeStep === 1 ? canGoNextFromStep1 : activeStep === 2 ? canGoNextFromStep2 : false;

  const canGoBack = activeStep > 1;

  const stepReachable = useMemo(
    () => ({
      1: canNavigateToStep(navSlice, 1),
      2: canNavigateToStep(navSlice, 2),
      3: canNavigateToStep(navSlice, 3),
    }),
    [navSlice],
  );

  return {
    activeStep,
    stepLabels: STEP_LABELS,
    canGoNext,
    canGoBack,
    goNext,
    goBack,
    goToStep,
    stepReachable,
  };
}

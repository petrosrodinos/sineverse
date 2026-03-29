"use client";

import { useEffect } from "react";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useEstateWorkflowStore } from "../stores/estate-workflow.store";

export function useMockVideoGeneration(): void {
  const activeStep = useEstateWorkflowStore((s) => s.activeStep);
  const step2Skipped = useEstateWorkflowStore((s) => s.step2Skipped);
  const videoOrder = useEstateWorkflowStore((s) => s.videoOrder);
  const videoAssetsByUuid = useEstateWorkflowStore((s) => s.videoAssetsByUuid);
  const setVideoAssetStatus = useEstateWorkflowStore((s) => s.setVideoAssetStatus);

  useEffect(() => {
    if (activeStep !== 2 || step2Skipped) {
      return;
    }
    const hasProcessing = videoOrder.some(
      (id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.PROCESSING,
    );
    if (hasProcessing) {
      return;
    }
    const nextPending = videoOrder.find(
      (id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.PENDING,
    );
    if (!nextPending) {
      return;
    }
    setVideoAssetStatus(nextPending, ProjectAssetStatuses.PROCESSING);
    const delay = 800 + Math.floor(Math.random() * 500);
    const timer = window.setTimeout(() => {
      setVideoAssetStatus(nextPending, ProjectAssetStatuses.COMPLETED);
    }, delay);
    return () => {
      window.clearTimeout(timer);
    };
  }, [activeStep, step2Skipped, videoOrder, videoAssetsByUuid, setVideoAssetStatus]);
}

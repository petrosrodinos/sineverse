import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { WorkflowStep } from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";

export function moveIdInOrder(order: readonly string[], fromIndex: number, toIndex: number): string[] {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
    return [...order];
  }
  const next = [...order];
  const [removed] = next.splice(fromIndex, 1);
  if (removed === undefined) {
    return [...order];
  }
  next.splice(toIndex, 0, removed);
  return next;
}

type NavigateSlice = {
  promptImageAssets: ProjectAsset[];
  videoAssetsByUuid: Record<string, ProjectAsset | undefined>;
  videoOrder: string[];
};

export function canNavigateToStep(state: NavigateSlice, target: WorkflowStep): boolean {
  const uploadsReady =
    state.promptImageAssets.length > 0 &&
    state.promptImageAssets.every((a) => a.status === ProjectAssetStatuses.COMPLETED);
  if (target === 1) {
    return true;
  }
  if (target === 2) {
    return uploadsReady;
  }
  if (target === 3) {
    if (!uploadsReady) {
      return false;
    }
    const allDone = state.videoOrder.every(
      (id) => state.videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED,
    );
    return allDone;
  }
  return false;
}

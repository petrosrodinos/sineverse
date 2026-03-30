import { create } from "zustand";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { AssetRoles, ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import {
  ESTATE_DEFAULT_AUDIO_TRACK_ID,
  ESTATE_DEFAULT_TRANSITION_ID,
  ESTATE_MOCK_FINAL_VIDEO_URL,
  ESTATE_TRIM_SEC_MAX,
  type WorkflowStep,
} from "../../../../../../../../config/dropdowns/project/estate-workflow.constants";
import {
  createFinalListingVideoAsset,
  createMockDocument,
  createMockEstateProject,
  createMockScene,
  createMockSceneVariation,
  createPromptImageProjectAsset,
} from "../utils/estate-workflow-mock.factory";
import { canNavigateToStep, moveIdInOrder } from "../utils/estate-workflow.utils";

type VideoTrimRange = { start: number; end: number };

type EstateWorkflowState = {
  activeStep: WorkflowStep;
  mockProject: Project;
  promptImageAssets: ProjectAsset[];
  videoAssetsByUuid: Record<string, ProjectAsset>;
  videoOrder: string[];
  trimRangeByVideoUuid: Record<string, VideoTrimRange>;
  transitionByVideoUuid: Record<string, string>;
  estateAudioTrackByVideoUuid: Record<string, string>;
  finalVideoAsset: ProjectAsset | null;
  objectUrlsToRevoke: string[];
  uploadedFilesByPromptAssetUuid: Record<string, File>;
};

type EstateWorkflowActions = {
  reset: () => void;
  setMockProject: (project: Project) => void;
  queueRevokeUrl: (url: string) => void;
  addUploadingPlaceholders: (files: File[]) => void;
  removePromptImageAsset: (promptAssetUuid: string) => void;
  getUploadedFiles: () => File[];
  hydratePromptImageAssetsFromScenes: (scenes: Scene[]) => void;
  mergePromptImageAssetsFromScenes: (scenes: Scene[]) => void;
  hydrateEstateVideoAssetsFromApi: (assets: ProjectAsset[]) => void;
  mergeEstateVideoAsset: (uuid: string, patch: Partial<ProjectAsset>) => void;
  setStep: (step: WorkflowStep) => void;
  goToStep: (step: WorkflowStep) => void;
  goNext: () => void;
  goBack: () => void;
  setTrimRange: (videoAssetUuid: string, start: number, end: number) => void;
  setTransition: (videoAssetUuid: string, transitionId: string) => void;
  setEstateAudioTrack: (videoAssetUuid: string, audioTrackId: string) => void;
  setVideoAssetStatus: (videoAssetUuid: string, status: ProjectAsset["status"]) => void;
  reorderVideoAssets: (fromIndex: number, toIndex: number) => void;
  startFinalRender: () => void;
  completeFinalRender: (mockPreviewUrl: string) => void;
};

function buildInitialState(): EstateWorkflowState {
  return {
    activeStep: 1,
    mockProject: createMockEstateProject(crypto.randomUUID()),
    promptImageAssets: [],
    videoAssetsByUuid: {},
    videoOrder: [],
    trimRangeByVideoUuid: {},
    transitionByVideoUuid: {},
    estateAudioTrackByVideoUuid: {},
    finalVideoAsset: null,
    objectUrlsToRevoke: [],
    uploadedFilesByPromptAssetUuid: {},
  };
}

function estatePromptAssetsFromScenes(scenes: Scene[], project: Project): ProjectAsset[] {
  return [...scenes]
    .sort((a, b) => a.order - b.order)
    .flatMap((scene) =>
      (scene.scene_variations ?? []).flatMap((variation) =>
        (variation.project_assets ?? [])
          .filter((asset) => asset.role === AssetRoles.PROMPT_IMAGE)
          .map((asset) => ({
            ...asset,
            scene_uuid: asset.scene_uuid ?? scene.uuid,
            project,
            scene,
            scene_variation: { ...variation, scene },
          })),
      ),
    );
}

export const useEstateWorkflowStore = create<EstateWorkflowState & EstateWorkflowActions>((set, get) => ({
  ...buildInitialState(),
  reset: () => {
    const { objectUrlsToRevoke } = get();
    objectUrlsToRevoke.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    set(buildInitialState());
  },
  setMockProject: (project) => set({ mockProject: project }),
  queueRevokeUrl: (url) =>
    set((state) => ({
      objectUrlsToRevoke: state.objectUrlsToRevoke.includes(url)
        ? state.objectUrlsToRevoke
        : [...state.objectUrlsToRevoke, url],
    })),
  addUploadingPlaceholders: (files) => {
    const project = get().mockProject;
    const orderStart = get().promptImageAssets.length;
    files.forEach((file, i) => {
      const previewUrl = URL.createObjectURL(file);
      get().queueRevokeUrl(previewUrl);
      const scene = createMockScene({
        projectUuid: project.uuid,
        order: orderStart + i,
        title: file.name,
      });
      const variation = createMockSceneVariation({
        sceneUuid: scene.uuid,
        title: "",
      });
      const document = createMockDocument({
        filename: file.name,
        mimetype: file.type,
        size: file.size,
        url: previewUrl,
      });
      const promptAsset = createPromptImageProjectAsset({
        project,
        scene,
        sceneVariation: variation,
        document,
        status: ProjectAssetStatuses.PROCESSING,
        metadata: {},
      });
      set((state) => ({
        promptImageAssets: [...state.promptImageAssets, promptAsset],
        uploadedFilesByPromptAssetUuid: {
          ...state.uploadedFilesByPromptAssetUuid,
          [promptAsset.uuid]: file,
        },
      }));
      window.setTimeout(() => {
        set((state) => ({
          promptImageAssets: state.promptImageAssets.map((a) =>
            a.uuid === promptAsset.uuid
              ? {
                ...a,
                status: ProjectAssetStatuses.COMPLETED,
                updated_at: new Date().toISOString(),
              }
              : a,
          ),
        }));
      }, 600 + Math.random() * 600);
    });
  },
  removePromptImageAsset: (promptAssetUuid) => {
    set((state) => {
      const target = state.promptImageAssets.find((a) => a.uuid === promptAssetUuid);
      if (target?.document.url.startsWith("blob:")) {
        URL.revokeObjectURL(target.document.url);
      }
      const variationUuid = target?.scene_variation.uuid;
      const nextPrompts = state.promptImageAssets.filter((a) => a.uuid !== promptAssetUuid);
      const nextVideos: Record<string, ProjectAsset> = { ...state.videoAssetsByUuid };
      const removeIds = state.videoOrder.filter((vid) => {
        const v = nextVideos[vid];
        return variationUuid !== undefined && v?.scene_variation.uuid === variationUuid;
      });
      removeIds.forEach((id) => {
        delete nextVideos[id];
      });
      const nextOrder = state.videoOrder.filter((id) => !removeIds.includes(id));
      const trimRangeByVideoUuid = { ...state.trimRangeByVideoUuid };
      const transitionByVideoUuid = { ...state.transitionByVideoUuid };
      const estateAudioTrackByVideoUuid = { ...state.estateAudioTrackByVideoUuid };
      removeIds.forEach((id) => {
        delete trimRangeByVideoUuid[id];
        delete transitionByVideoUuid[id];
        delete estateAudioTrackByVideoUuid[id];
      });
      return {
        promptImageAssets: nextPrompts,
        uploadedFilesByPromptAssetUuid: Object.fromEntries(
          Object.entries(state.uploadedFilesByPromptAssetUuid).filter(([assetUuid]) => assetUuid !== promptAssetUuid),
        ),
        videoAssetsByUuid: nextVideos,
        videoOrder: nextOrder,
        trimRangeByVideoUuid,
        transitionByVideoUuid,
        estateAudioTrackByVideoUuid,
      };
    });
  },
  getUploadedFiles: () => Object.values(get().uploadedFilesByPromptAssetUuid),
  hydratePromptImageAssetsFromScenes: (scenes) =>
    set((state) => {
      const promptImageAssets = estatePromptAssetsFromScenes(scenes, state.mockProject);

      return {
        promptImageAssets,
        uploadedFilesByPromptAssetUuid: {},
        videoAssetsByUuid: {},
        videoOrder: [],
        trimRangeByVideoUuid: {},
        transitionByVideoUuid: {},
        estateAudioTrackByVideoUuid: {},
        finalVideoAsset: state.finalVideoAsset,
      };
    }),
  mergePromptImageAssetsFromScenes: (scenes) =>
    set((state) => {
      const fromApi = estatePromptAssetsFromScenes(scenes, state.mockProject);
      const localOnly = state.promptImageAssets.filter((a) => a.document.url.startsWith("blob:"));
      return {
        promptImageAssets: [...fromApi, ...localOnly],
      };
    }),
  hydrateEstateVideoAssetsFromApi: (assets) =>
    set((state) => {
      const sorted = [...assets].sort((a, b) => (a.scene?.order ?? 0) - (b.scene?.order ?? 0));
      const videoAssetsByUuid: Record<string, ProjectAsset> = {};
      const videoOrder: string[] = [];
      sorted.forEach((a) => {
        const merged: ProjectAsset = {
          ...a,
          project: state.mockProject,
        };
        videoAssetsByUuid[a.uuid] = merged;
        videoOrder.push(a.uuid);
      });
      const trimRangeByVideoUuid: Record<string, VideoTrimRange> = {};
      const transitionByVideoUuid: Record<string, string> = {};
      const estateAudioTrackByVideoUuid: Record<string, string> = {};
      videoOrder.forEach((id) => {
        trimRangeByVideoUuid[id] = { start: 0, end: 5 };
        transitionByVideoUuid[id] = ESTATE_DEFAULT_TRANSITION_ID;
        estateAudioTrackByVideoUuid[id] = ESTATE_DEFAULT_AUDIO_TRACK_ID;
      });
      return {
        videoAssetsByUuid,
        videoOrder,
        trimRangeByVideoUuid,
        transitionByVideoUuid,
        estateAudioTrackByVideoUuid,
      };
    }),
  mergeEstateVideoAsset: (uuid, patch) =>
    set((state) => {
      const a = state.videoAssetsByUuid[uuid];
      if (!a) {
        return state;
      }
      return {
        videoAssetsByUuid: {
          ...state.videoAssetsByUuid,
          [uuid]: { ...a, ...patch },
        },
      };
    }),
  setStep: (step) => set({ activeStep: step }),
  goToStep: (step) => {
    const state = get();
    if (
      !canNavigateToStep(
        {
          promptImageAssets: state.promptImageAssets,
          videoAssetsByUuid: state.videoAssetsByUuid,
          videoOrder: state.videoOrder,
        },
        step,
      )
    ) {
      return;
    }
    set({ activeStep: step });
  },
  goNext: () => {
    const { activeStep, promptImageAssets, videoAssetsByUuid, videoOrder } = get();
    if (activeStep === 1) {
      const hasReady =
        promptImageAssets.length > 0 &&
        promptImageAssets.every((a) => a.status === ProjectAssetStatuses.COMPLETED);
      if (!hasReady) {
        return;
      }
      set({ activeStep: 2 });
      return;
    }
    if (activeStep === 2) {
      const allDone = videoOrder.every(
        (id) => videoAssetsByUuid[id]?.status === ProjectAssetStatuses.COMPLETED,
      );
      if (!allDone) {
        return;
      }
      set({ activeStep: 3 });
    }
  },
  goBack: () => {
    const { activeStep } = get();
    if (activeStep === 2) {
      set({ activeStep: 1 });
      return;
    }
    if (activeStep === 3) {
      set({ activeStep: 2 });
    }
  },
  setTrimRange: (videoAssetUuid, start, end) =>
    set((state) => {
      if (!state.videoAssetsByUuid[videoAssetUuid]) {
        return state;
      }
      const lo = Math.max(0, Math.min(start, end));
      const hi = Math.min(ESTATE_TRIM_SEC_MAX, Math.max(start, end));
      if (hi - lo < 0.1) {
        return state;
      }
      return {
        trimRangeByVideoUuid: {
          ...state.trimRangeByVideoUuid,
          [videoAssetUuid]: { start: lo, end: hi },
        },
      };
    }),
  setTransition: (videoAssetUuid, transitionId) =>
    set((state) => {
      if (!state.videoAssetsByUuid[videoAssetUuid]) {
        return state;
      }
      return {
        transitionByVideoUuid: {
          ...state.transitionByVideoUuid,
          [videoAssetUuid]: transitionId,
        },
      };
    }),
  setEstateAudioTrack: (videoAssetUuid, audioTrackId) =>
    set((state) => {
      if (!state.videoAssetsByUuid[videoAssetUuid]) {
        return state;
      }
      return {
        estateAudioTrackByVideoUuid: {
          ...state.estateAudioTrackByVideoUuid,
          [videoAssetUuid]: audioTrackId,
        },
      };
    }),
  setVideoAssetStatus: (videoAssetUuid, status) =>
    set((state) => {
      const a = state.videoAssetsByUuid[videoAssetUuid];
      if (!a) {
        return state;
      }
      return {
        videoAssetsByUuid: {
          ...state.videoAssetsByUuid,
          [videoAssetUuid]: {
            ...a,
            status,
            updated_at: new Date().toISOString(),
          },
        },
      };
    }),
  reorderVideoAssets: (fromIndex, toIndex) =>
    set((state) => {
      const nextOrder = moveIdInOrder(state.videoOrder, fromIndex, toIndex);
      const nextVideos: Record<string, ProjectAsset> = { ...state.videoAssetsByUuid };
      nextOrder.forEach((id, i) => {
        const a = nextVideos[id];
        if (!a) {
          return;
        }
        nextVideos[id] = {
          ...a,
          scene: { ...a.scene, order: i },
          updated_at: new Date().toISOString(),
        };
      });
      return { videoOrder: nextOrder, videoAssetsByUuid: nextVideos };
    }),
  startFinalRender: () => {
    const project = get().mockProject;
    const asset = createFinalListingVideoAsset(project, {
      status: ProjectAssetStatuses.PROCESSING,
      documentUrl: "",
    });
    set({ finalVideoAsset: asset });
    window.setTimeout(() => {
      get().completeFinalRender(ESTATE_MOCK_FINAL_VIDEO_URL);
    }, 2200);
  },
  completeFinalRender: (mockPreviewUrl) =>
    set((state) => {
      if (!state.finalVideoAsset) {
        return state;
      }
      return {
        finalVideoAsset: {
          ...state.finalVideoAsset,
          status: ProjectAssetStatuses.COMPLETED,
          document: {
            ...state.finalVideoAsset.document,
            url: mockPreviewUrl,
          },
          updated_at: new Date().toISOString(),
        },
      };
    }),
}));

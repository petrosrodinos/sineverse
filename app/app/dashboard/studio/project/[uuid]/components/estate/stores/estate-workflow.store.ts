import { create } from "zustand";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import {
  ESTATE_DEFAULT_AUDIO_TRACK_ID,
  ESTATE_DEFAULT_TRANSITION_ID,
  ESTATE_MOCK_FINAL_VIDEO_URL,
  ESTATE_TRIM_SEC_MAX,
  type WorkflowStep,
} from "../constants/estate-workflow.constants";
import {
  createFinalListingVideoAsset,
  createMockDocument,
  createMockEstateProject,
  createMockScene,
  createMockSceneVariation,
  createPromptImageProjectAsset,
  createVideoProjectAsset,
  defaultVideoMetadata,
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
  step2Skipped: boolean;
  finalVideoAsset: ProjectAsset | null;
  objectUrlsToRevoke: string[];
};

type EstateWorkflowActions = {
  reset: () => void;
  queueRevokeUrl: (url: string) => void;
  addUploadingPlaceholders: (files: File[]) => void;
  removePromptImageAsset: (promptAssetUuid: string) => void;
  setStep: (step: WorkflowStep) => void;
  goToStep: (step: WorkflowStep) => void;
  goNext: () => void;
  goBack: () => void;
  skipStep2: () => void;
  initVideoAssetsFromPrompts: () => void;
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
    step2Skipped: false,
    finalVideoAsset: null,
    objectUrlsToRevoke: [],
  };
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
        videoAssetsByUuid: nextVideos,
        videoOrder: nextOrder,
        trimRangeByVideoUuid,
        transitionByVideoUuid,
        estateAudioTrackByVideoUuid,
      };
    });
  },
  setStep: (step) => set({ activeStep: step }),
  goToStep: (step) => {
    const state = get();
    if (
      !canNavigateToStep(
        {
          promptImageAssets: state.promptImageAssets,
          videoAssetsByUuid: state.videoAssetsByUuid,
          videoOrder: state.videoOrder,
          step2Skipped: state.step2Skipped,
        },
        step,
      )
    ) {
      return;
    }
    if (step === 2 && state.activeStep === 1) {
      get().initVideoAssetsFromPrompts();
    }
    set({ activeStep: step });
  },
  initVideoAssetsFromPrompts: () => {
    const { mockProject, promptImageAssets } = get();
    const completed = promptImageAssets.filter(
      (a) => a.status === ProjectAssetStatuses.COMPLETED,
    );
    const videoAssetsByUuid: Record<string, ProjectAsset> = {};
    const videoOrder: string[] = [];
    completed.forEach((prompt) => {
      const videoDoc = createMockDocument({
        filename: `generated-${prompt.document.filename}`,
        mimetype: "video/mp4",
        size: 0,
        url: "",
      });
      const video = createVideoProjectAsset({
        project: mockProject,
        scene: prompt.scene,
        sceneVariation: prompt.scene_variation,
        document: videoDoc,
        status: ProjectAssetStatuses.PENDING,
        metadata: defaultVideoMetadata(),
        promptImages: [prompt],
      });
      videoAssetsByUuid[video.uuid] = video;
      videoOrder.push(video.uuid);
    });
    const trimRangeByVideoUuid: Record<string, VideoTrimRange> = {};
    const transitionByVideoUuid: Record<string, string> = {};
    const estateAudioTrackByVideoUuid: Record<string, string> = {};
    videoOrder.forEach((id) => {
      trimRangeByVideoUuid[id] = { start: 0, end: 5 };
      transitionByVideoUuid[id] = ESTATE_DEFAULT_TRANSITION_ID;
      estateAudioTrackByVideoUuid[id] = ESTATE_DEFAULT_AUDIO_TRACK_ID;
    });
    set({
      videoAssetsByUuid,
      videoOrder,
      trimRangeByVideoUuid,
      transitionByVideoUuid,
      estateAudioTrackByVideoUuid,
      step2Skipped: false,
    });
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
      get().initVideoAssetsFromPrompts();
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
  skipStep2: () => {
    const { videoOrder } = get();
    if (videoOrder.length === 0) {
      get().initVideoAssetsFromPrompts();
    }
    const state = get();
    const nextVideos: Record<string, ProjectAsset> = { ...state.videoAssetsByUuid };
    state.videoOrder.forEach((id) => {
      const v = nextVideos[id];
      if (!v) {
        return;
      }
      const thumb = v.prompt_images?.[0]?.document.url ?? "";
      nextVideos[id] = {
        ...v,
        status: ProjectAssetStatuses.COMPLETED,
        document: { ...v.document, url: thumb },
        updated_at: new Date().toISOString(),
      };
    });
    set({
      videoAssetsByUuid: nextVideos,
      step2Skipped: true,
      activeStep: 3,
    });
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

import type { Scene, SceneAISettings, PromptVariation, SceneVideo } from "@/types/studio";
import { SceneStatus, VideoStatus } from "@/types/studio";
import { globalStyles, durations, aspectRatios, videoModels, promptStyleLabels, tones, cameraStyles, lightingOptions } from "@/config/studio";

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getSceneStatusLabel(status: SceneStatus): string {
  switch (status) {
    case SceneStatus.Draft:
      return "Draft";
    case SceneStatus.PromptsGenerated:
      return "Prompts Generated";
    case SceneStatus.VideosGenerated:
      return "Videos Generated";
    default:
      return "Draft";
  }
}

export function getVideoStatusLabel(status: VideoStatus): string {
  switch (status) {
    case VideoStatus.Processing:
      return "Processing";
    case VideoStatus.Completed:
      return "Completed";
    case VideoStatus.Failed:
      return "Failed";
    default:
      return "Processing";
  }
}

export function getVariationVersionLabel(index: number): string {
  return `V${index + 1}`;
}

export function getDefaultAISettings(): SceneAISettings {
  return {
    globalStyle: globalStyles[0].value,
    tone: tones[0].value,
    cameraStyle: cameraStyles[0].value,
    lighting: lightingOptions[0].value,
    temperature: 0.7,
  };
}

export function createDefaultScene(order: number): Scene {
  return {
    id: generateId(),
    order,
    title: `Scene ${order}`,
    description: "",
    status: SceneStatus.Draft,
    variations: [createDefaultVariation(0)],
    selectedVideoId: null,
    aiSettings: getDefaultAISettings(),
  };
}

export function createVariation(index: number): PromptVariation {
  return {
    id: generateId(),
    versionLabel: getVariationVersionLabel(index),
    styleLabel: promptStyleLabels[index % promptStyleLabels.length],
    prompt: "",
    negativePrompt: "",
    model: videoModels[0].id,
    aspectRatio: aspectRatios[0].value,
    durationSeconds: durations[0].value,
    referenceImageUrls: [],
    videos: [],
  };
}

function createDefaultVariation(index: number): PromptVariation {
  return createVariation(index);
}

export function createDefaultSceneVideo(variationId: string): SceneVideo {
  return {
    id: generateId(),
    variationId,
    thumbnailUrl: null,
    videoUrl: null,
    duration: 5,
    resolution: "1920x1080",
    status: VideoStatus.Processing,
    isFinal: false,
  };
}

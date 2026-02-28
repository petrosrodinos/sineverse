import type { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import type { SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";
import { globalStyles, durations, aspectRatios, videoModels, promptStyleLabels, tones, cameraStyles, lightingOptions } from "@/config/studio";

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getSceneStatusLabel(status: any): string {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "PROMPTS_GENERATED":
      return "Prompts Generated";
    case "VIDEOS_GENERATED":
      return "Videos Generated";
    default:
      return "Draft";
  }
}

export function getVideoStatusLabel(status: any): string {
  switch (status) {
    case "PROCESSING":
      return "Processing";
    case "COMPLETED":
      return "Completed";
    case "FAILED":
      return "Failed";
    default:
      return "Processing";
  }
}

export function getVariationVersionLabel(index: number): string {
  return `V${index + 1}`;
}

export function getDefaultAISettings(): any {
  return {
    globalStyle: globalStyles[0].value,
    tone: tones[0].value,
    cameraStyle: cameraStyles[0].value,
    lighting: lightingOptions[0].value,
    temperature: 0.7,
  };
}

export function createDefaultScene(order: number): any {
  return {
    id: generateId(),
    uuid: generateId(),
    project_uuid: "",
    order,
    title: `Scene ${order}`,
    description: "",
    status: "DRAFT",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    scene_variations: [createDefaultVariation(0)],
    selectedVideoId: null,
    aiSettings: getDefaultAISettings(),
  };
}

export function createVariation(index: number): any {
  return {
    id: generateId(),
    uuid: generateId(),
    scene_uuid: "",
    versionLabel: getVariationVersionLabel(index),
    styleLabel: promptStyleLabels[index % promptStyleLabels.length],
    prompt_text: "",
    negative_prompt: "",
    ai_model: "VEO3",
    aspect_ratio: aspectRatios[0].value,
    duration_sec: durations[0].value,
    referenceImageUrls: [],
    videos: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Partial<SceneVariation> & Record<string, any>;
}

function createDefaultVariation(index: number) {
  return createVariation(index);
}

export function createDefaultSceneVideo(variationId: string): any {
  return {
    id: generateId(),
    uuid: generateId(),
    prompt_variation_uuid: variationId,
    provider: "VEO3",
    thumbnailUrl: null,
    videoUrl: null,
    duration: 5,
    resolution: "1920x1080",
    status: "PROCESSING",
    selected: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Partial<SceneVideo> & Record<string, any>;
}

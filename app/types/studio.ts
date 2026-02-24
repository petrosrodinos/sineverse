export enum SceneStatus {
  Draft = "draft",
  PromptsGenerated = "prompts_generated",
  VideosGenerated = "videos_generated",
}

export enum VideoStatus {
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
}

export enum AIModel {
  Veo3 = "veo3",
  Runway = "runway",
  Pika = "pika",
  Stability = "stability",
}

export interface VideoModelOption {
  id: AIModel;
  label: string;
}

export interface MovieIdea {
  raw: string;
  enriched: string | null;
}

export interface SceneVideo {
  id: string;
  variationId: string;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  duration: number;
  resolution: string;
  status: VideoStatus;
  isFinal: boolean;
}

export interface PromptVariation {
  id: string;
  versionLabel: string;
  styleLabel: string;
  prompt: string;
  negativePrompt: string;
  model: AIModel;
  aspectRatio: string;
  durationSeconds: number;
  referenceImageUrls: string[];
  videos: SceneVideo[];
}

export interface Scene {
  id: string;
  order: number;
  title: string;
  description: string;
  status: SceneStatus;
  variations: PromptVariation[];
  selectedVideoId: string | null;
  aiSettings: SceneAISettings;
}

export interface SceneAISettings {
  globalStyle: string;
  tone: string;
  cameraStyle: string;
  lighting: string;
  temperature: number;
}

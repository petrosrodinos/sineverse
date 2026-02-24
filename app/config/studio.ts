import type { VideoModelOption } from "@/types/studio";
import { AIModel } from "@/types/studio";

export const videoModels: VideoModelOption[] = [
  { id: AIModel.Veo3, label: "Veo 3" },
  { id: AIModel.Runway, label: "Runway" },
  { id: AIModel.Pika, label: "Pika" },
  { id: AIModel.Stability, label: "Stability" },
];

export const aspectRatios = [
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "1:1", label: "1:1" },
];

export const durations = [
  { value: 5, label: "5s" },
  { value: 8, label: "8s" },
  { value: 12, label: "12s" },
  { value: 20, label: "20s" },
];

export const globalStyles = [
  { value: "cinematic", label: "Cinematic" },
  { value: "documentary", label: "Documentary" },
  { value: "anime", label: "Anime" },
  { value: "realistic", label: "Realistic" },
  { value: "dark_thriller", label: "Dark Thriller" },
];

export const tones = [
  { value: "emotional", label: "Emotional" },
  { value: "fast_paced", label: "Fast-paced" },
  { value: "dramatic", label: "Dramatic" },
  { value: "epic", label: "Epic" },
];

export const cameraStyles = [
  { value: "handheld", label: "Handheld" },
  { value: "drone", label: "Drone" },
  { value: "close_up", label: "Close-up" },
  { value: "wide_shot", label: "Wide Shot" },
];

export const lightingOptions = [
  { value: "golden_hour", label: "Golden Hour" },
  { value: "neon", label: "Neon" },
  { value: "dark", label: "Dark" },
  { value: "natural", label: "Natural" },
];

export const promptStyleLabels = [
  "Cinematic",
  "Anime",
  "Noir",
  "Documentary",
  "Realistic",
  "Fantasy",
];

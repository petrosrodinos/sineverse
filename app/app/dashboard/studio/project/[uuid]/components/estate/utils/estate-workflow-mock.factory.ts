import type { Document } from "@/features/documents/interfaces/document.interfaces";
import {
  AssetRoles,
  ProjectAssetStatuses,
  ProjectAssetTypes,
  type ProjectAsset,
} from "@/features/project-assets/interfaces/project-assets.interfaces";
import {
  CameraMovements,
  AudioStyles,
  Durations,
  type VideoGenerationConfig,
} from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import { ProjectStatuses, ProjectTypes, type Project } from "@/features/projects/interfaces/projects.interfaces";
import type { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

const MOCK_USER_UUID = "00000000-0000-4000-8000-000000000001";

export function createMockEstateProject(projectUuid: string): Project {
  const now = new Date().toISOString();
  return {
    id: projectUuid,
    uuid: projectUuid,
    title: "Estate listing",
    type: ProjectTypes.ESTATE,
    status: ProjectStatuses.DRAFT,
    created_at: now,
    updated_at: now,
  };
}

export function createMockScene(params: {
  projectUuid: string;
  order: number;
  title: string;
}): Scene {
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id: uuid,
    uuid,
    user_uuid: MOCK_USER_UUID,
    project_uuid: params.projectUuid,
    title: params.title,
    order: params.order,
    created_at: now,
    updated_at: now,
  };
}

export function createMockSceneVariation(params: { sceneUuid: string; title: string }): SceneVariation {
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id: uuid,
    uuid,
    user_uuid: MOCK_USER_UUID,
    scene_uuid: params.sceneUuid,
    title: params.title,
    selected: true,
    created_at: now,
    updated_at: now,
  };
}

export function createMockDocument(params: {
  filename: string;
  mimetype: string;
  size: number;
  url: string;
}): Document {
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id: 0,
    uuid,
    filename: params.filename,
    mimetype: params.mimetype,
    size: params.size,
    url: params.url,
    path: "",
    order: 0,
    created_at: now,
    updated_at: now,
  };
}

export function createPromptImageProjectAsset(ctx: {
  project: Project;
  scene: Scene;
  sceneVariation: SceneVariation;
  document: Document;
  status: ProjectAsset["status"];
  metadata: VideoGenerationConfig;
}): ProjectAsset {
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id: uuid,
    uuid,
    user_uuid: MOCK_USER_UUID,
    project_uuid: ctx.project.uuid,
    scene_uuid: ctx.scene.uuid,
    scene_variation_uuid: ctx.sceneVariation.uuid,
    provider_job_id: "",
    document_uuid: ctx.document.uuid,
    selected: true,
    status: ctx.status,
    type: ProjectAssetTypes.IMAGE,
    role: AssetRoles.PROMPT_IMAGE,
    error_message: "",
    metadata: ctx.metadata,
    created_at: now,
    updated_at: now,
    project: ctx.project,
    scene: ctx.scene,
    scene_variation: ctx.sceneVariation,
    document: ctx.document,
  };
}

export function createVideoProjectAsset(ctx: {
  project: Project;
  scene: Scene;
  sceneVariation: SceneVariation;
  document: Document;
  status: ProjectAsset["status"];
  metadata: VideoGenerationConfig;
  promptImages: ProjectAsset[];
}): ProjectAsset {
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();
  return {
    id: uuid,
    uuid,
    user_uuid: MOCK_USER_UUID,
    project_uuid: ctx.project.uuid,
    scene_uuid: ctx.scene.uuid,
    scene_variation_uuid: ctx.sceneVariation.uuid,
    provider_job_id: "",
    document_uuid: ctx.document.uuid,
    selected: true,
    status: ctx.status,
    type: ProjectAssetTypes.VIDEO,
    role: AssetRoles.GENERATED_VIDEO,
    error_message: "",
    metadata: ctx.metadata,
    created_at: now,
    updated_at: now,
    project: ctx.project,
    scene: ctx.scene,
    scene_variation: ctx.sceneVariation,
    document: ctx.document,
    prompt_images: ctx.promptImages,
  };
}

export function defaultVideoMetadata(): VideoGenerationConfig {
  return {
    prompt_text: "",
    duration_sec: Durations.SEC_5,
    camera_movement: CameraMovements.static,
    audio_style: AudioStyles.ambient,
  };
}

export function createFinalListingVideoAsset(
  project: Project,
  params: { status: ProjectAsset["status"]; documentUrl: string },
): ProjectAsset {
  const scene = createMockScene({
    projectUuid: project.uuid,
    order: 0,
    title: "Final output",
  });
  const variation = createMockSceneVariation({
    sceneUuid: scene.uuid,
    title: "Final output",
  });
  const document = createMockDocument({
    filename: "listing-tour.mp4",
    mimetype: "video/mp4",
    size: 0,
    url: params.documentUrl,
  });
  return createVideoProjectAsset({
    project,
    scene,
    sceneVariation: variation,
    document,
    status: params.status,
    metadata: defaultVideoMetadata(),
    promptImages: [],
  });
}

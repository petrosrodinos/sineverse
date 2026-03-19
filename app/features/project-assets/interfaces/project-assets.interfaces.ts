import { Document } from "@/features/documents/interfaces/document.interfaces";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import { VideoGenerationConfig } from "./project-assets-metadata.interfaces";

export interface ProjectAsset {
    id: string;
    uuid: string;
    user_uuid: string;
    project_uuid: string;
    scene_uuid: string;
    scene_variation_uuid: string;
    provider_job_id: string;
    document_uuid: string;
    selected: boolean;
    status: ProjectAssetStatus;
    type: ProjectAssetType;
    role: AssetRole;
    error_message: string;
    metadata: VideoGenerationConfig;
    created_at: string;
    updated_at: string;
    project: Project;
    scene: Scene;
    scene_variation: SceneVariation;
    document: Document;
    prompt_images?: ProjectAsset[];
}

export interface CreateProjectAssetDto {
    project_uuid: string;
    scene_uuid?: string;
    scene_variation_uuid?: string;
    type: ProjectAssetType;
    role: AssetRole;
    metadata: any;
}

export interface ProjectAssetsResponse {
    data: ProjectAsset[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface ProjectAssetsQueryDto {
    project_uuid?: string;
    scene_uuid?: string;
    scene_variation_uuid?: string;
    type?: string; // ProjectAssetType separated by comma
    status?: string; // ProjectAssetStatus separated by comma
    role?: string; // AssetRole separated by comma
    selected?: boolean;
    page?: number;
    limit?: number;
}

export interface CreateSceneVideoDto extends Partial<VideoGenerationConfig> {
    scene_uuid: string;
    scene_variation_uuid: string;
    prompt_image_uuids?: string[];
}

export interface GenerateSceneVariationImageDto {
    ai_model: string;
    prompt_text: string;
    image?: File;
    enrich_prompt?: boolean;
}


export interface ProjectAssetVideoEnrichDto {
    directions?: string;
    include_prompt: boolean;
    include_negative_prompt: boolean;
    include_video_generation_options: boolean;
}


export const ProjectAssetTypes = {
    VIDEO: 'VIDEO',
    IMAGE: 'IMAGE',
    AUDIO: 'AUDIO',
    THUMBNAIL: 'THUMBNAIL',
    CAPTION: 'CAPTION',
    VOICEOVER: 'VOICEOVER',
    MUSIC: 'MUSIC',
    DOCUMENT: 'DOCUMENT',
} as const;

export const AssetRoles = {
    PROMPT_IMAGE: 'PROMPT_IMAGE',
    GENERATED_IMAGE: 'GENERATED_IMAGE',
    GENERATED_VIDEO: 'GENERATED_VIDEO',
    UPSCALED_VIDEO: 'UPSCALED_VIDEO',
    GENERATED_THUMBNAIL: 'GENERATED_THUMBNAIL',
    GENERATED_VOICEOVER: 'GENERATED_VOICEOVER',
    GENERATED_MUSIC: 'GENERATED_MUSIC',
    GENERATED_CAPTION: 'GENERATED_CAPTION',
} as const;


export const ProjectAssetStatuses = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
} as const;

export type ProjectAssetType = typeof ProjectAssetTypes[keyof typeof ProjectAssetTypes];
export type ProjectAssetStatus = typeof ProjectAssetStatuses[keyof typeof ProjectAssetStatuses];
export type AssetRole = typeof AssetRoles[keyof typeof AssetRoles];


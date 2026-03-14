import { Document } from "@/features/documents/interfaces/document.interfaces";

export interface ProjectAsset {
    id: string;
    uuid: string;
    user_uuid: string;
    project_uuid: string;
    scene_uuid: string;
    scene_variation_uuid: string;
    provider_job_id: string;
    document_uuid: string;
    status: ProjectAssetStatus;
    type: ProjectAssetType;
    error_message: string;
    created_at: string;
    updated_at: string;
    document: Document;
}

export interface CreateProjectAssetDto {
    project_uuid: string;
    scene_uuid?: string;
    scene_variation_uuid?: string;
    type: ProjectAssetType;
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
    type?: ProjectAssetType;
    status?: ProjectAssetStatus;
    page?: number;
    limit?: number;
}

export interface CreateSceneVideoDto {
    scene_uuid: string;
    scene_variation_uuid: string;
}

export interface GenerateSceneVariationImageDto {
    ai_model: string;
    prompt_text: string;
    image?: File;
    enrich_prompt?: boolean;
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

export const ProjectAssetStatuses = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
} as const;

export type ProjectAssetType = typeof ProjectAssetTypes[keyof typeof ProjectAssetTypes];
export type ProjectAssetStatus = typeof ProjectAssetStatuses[keyof typeof ProjectAssetStatuses];



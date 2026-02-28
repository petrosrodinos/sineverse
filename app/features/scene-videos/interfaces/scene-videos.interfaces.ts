import { Document } from "@/features/documents/interfaces/document.interfaces";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

export interface SceneVideo {
    id: string;
    uuid: string;
    user_uuid: string;
    scene_uuid: string;
    prompt_variation_uuid: string;
    provider: string;
    selected: boolean;
    provider_job_id?: string;
    video_uuid?: string;
    duration_sec?: number;
    resolution?: string;
    status: VideoStatus;
    error_message?: string;
    created_at: string;
    updated_at: string;
    video?: Document;
    scene?: Scene;
    scene_variation?: SceneVariation;
}

export interface CreateSceneVideoDto {
    scene_uuid: string;
    prompt_variation_uuid: string;
    provider: string;
    selected?: boolean;
    duration_sec?: number;
    resolution?: string;
}

export interface UpdateSceneVideoDto {
    selected?: boolean;
    duration_sec?: number;
    resolution?: string;
    status?: string;
}

export const VideoStatuses = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
} as const;

export type VideoStatus = typeof VideoStatuses[keyof typeof VideoStatuses];

import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export interface Scene {
    id: string;
    uuid: string;
    user_uuid: string;
    project_uuid: string;
    title?: string;
    description: string;
    order: number;
    duration_sec?: number;
    created_at: string;
    updated_at: string;
    scene_variations?: SceneVariation[];
    videos?: SceneVideo[];

}

export interface CreateSceneDto {
    project_uuid: string;
    title?: string;
    description: string;
    order: number;
    duration_sec?: number;
}

export interface UpdateSceneDto {
    title?: string;
    description?: string;
    order?: number;
    duration_sec?: number;
}
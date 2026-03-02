import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export interface Scene {
    id: string;
    uuid: string;
    user_uuid: string;
    project_uuid: string;
    title: string;
    description?: string;
    order: number;
    created_at: string;
    updated_at: string;
    scene_variations?: SceneVariation[];
    scene_videos?: SceneVideo[];

}

export interface CreateSceneDto {
    project_uuid: string;
    title: string;
    description?: string;
    order?: number;
}

export interface UpdateSceneDto {
    title?: string;
    description?: string;
    order?: number;
}

export interface SceneQueryDto {
    project_uuid: string;
}

export interface GenerateAiScenesDto {
    project_uuid: string;
    number_of_scenes: number;
    scene_variations: number[];
    continue_scenes: boolean;
    enrich_prompt: boolean;
    instructions?: string;
}
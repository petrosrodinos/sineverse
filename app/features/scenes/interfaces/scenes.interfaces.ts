import { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

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
    project_assets?: ProjectAsset[];

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
    enrich_concept: boolean;
    directions?: string;
}

export interface ReorderScenesDto {
    scenes: { uuid: string; order: number }[];
}
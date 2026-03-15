import { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectTone, ProjectGenre } from "@/features/projects/interfaces/projects.interfaces";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

export interface SceneVariation {
    id: string;
    uuid: string;
    user_uuid: string;
    scene_uuid: string;
    title: string;
    selected?: boolean;
    created_at: string;
    updated_at: string;
    scene?: Scene;
    project_assets?: ProjectAsset[];
}

export interface CreateSceneVariationDto {
    scene_uuid: string;
    title: string;
    selected?: boolean;
}

export interface UpdateSceneVariationDto {
    title?: string;
    prompt_text?: string;
    selected?: boolean;
}

export interface SceneVariationsQueryDto {
    scene_uuid?: string;
}

export interface SceneVariationEnrichDto {
    directions?: string;
    include_prompt: boolean;
    include_negative_prompt: boolean;
    include_video_generation_options: boolean;
}





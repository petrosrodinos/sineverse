import { FinalProject } from "@/features/final-projects/interfaces/final-projects.interfaces";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

export interface Document {
    id: number;
    uuid: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
    path: string;
    order: number;
    created_at: string;
    updated_at: string;
    prompt_images?: SceneVariation[];
    final_project_videos?: FinalProject[];
    final_project_thumbnails?: FinalProject[];
}

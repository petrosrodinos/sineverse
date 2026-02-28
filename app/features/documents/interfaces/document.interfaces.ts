import { FinalProject } from "@/features/final-projects/interfaces/final-projects.interfaces";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { SceneVideo } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export interface Document {
    id: number;
    uuid: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
    path: string;
    type: DocumentType;
    order: number;
    created_at: string;
    updated_at: string;
    scene_videos?: SceneVideo[];
    prompt_images?: SceneVariation[];
    final_project_videos?: FinalProject[];
    final_project_thumbnails?: FinalProject[];
}

export const DocumentTypes = {
    VIDEO: "video",
    IMAGE: "image",
    AUDIO: "audio",
    DOCUMENT: "document",
    THUMBNAIL: "thumbnail",
} as const;

export type DocumentType = (typeof DocumentTypes)[keyof typeof DocumentTypes];
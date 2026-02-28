import { Document } from "@/features/documents/interfaces/document.interfaces";

export interface FinalProject {
    id: string;
    uuid: string;
    user_uuid: string;
    project_uuid: string;
    title: string;
    duration_sec: number;
    video_uuid: string;
    thumbnail_uuid: string;
    created_at: string;
    updated_at: string;
    video?: Document;
    thumbnail?: Document;
}

export interface CreateFinalProjectDto {
    project_uuid: string;
    title: string;
    duration_sec: number;
    video_uuid: string;
    thumbnail_uuid: string;
}

export interface UpdateFinalProjectDto {
    title?: string;
    duration_sec?: number;
    video_uuid?: string;
    thumbnail_uuid?: string;
}
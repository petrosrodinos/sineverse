export interface Scene {
    id: string;
    uuid: string;
    project_uuid: string;
    title?: string;
    description: string;
    order: number;
    duration_sec?: number;
    created_at: string;
    updated_at: string;
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
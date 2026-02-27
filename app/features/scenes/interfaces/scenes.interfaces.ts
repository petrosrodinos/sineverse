export interface Scene {
    id: string;
    uuid: string;
    project_uuid: string;
    title?: string;
    description: string;
    order: number;
    duration_sec?: number;
    createdAt: string;
    updatedAt: string;
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
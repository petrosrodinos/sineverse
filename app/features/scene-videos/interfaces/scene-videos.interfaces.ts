export interface SceneVideo {
    id: string;
    uuid: string;
    prompt_variation_uuid: string;
    provider: string;
    selected: boolean;
    provider_job_id?: string;
    duration_sec?: number;
    resolution?: string;
    status: VideoStatus;
    error_message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSceneVideoDto {
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

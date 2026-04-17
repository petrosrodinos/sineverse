export interface TimelineCaption {
    uuid: string;
    clip_uuid: string;
    text: string;
    start_sec: number;
    end_sec: number;
    position: string | null;
    style: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateTimelineCaptionDto {
    clip_uuid: string;
    text: string;
    start_sec: number;
    end_sec: number;
    position?: string;
    style?: string;
}

export interface UpdateTimelineCaptionDto {
    text?: string;
    start_sec?: number;
    end_sec?: number;
    position?: string;
    style?: string;
}

export interface TimelineCaptionQueryDto {
    clip_uuid: string;
}

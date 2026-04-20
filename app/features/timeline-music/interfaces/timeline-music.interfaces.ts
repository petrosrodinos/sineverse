import { Document } from "@/features/documents/interfaces/document.interfaces";

export interface TimelineMusic {
  uuid: string;
  final_project_uuid: string;
  audio_uuid: string;
  start_sec: number;
  end_sec: number;
  volume: number | null;
  created_at: string;
  updated_at: string;
  audio?: Document;
}

export interface TimelineMusicQueryDto {
  final_project_uuid: string;
}

export interface UpsertTimelineMusicDto {
  track_id: string;
  start_sec?: number;
  end_sec?: number;
  volume?: number;
}

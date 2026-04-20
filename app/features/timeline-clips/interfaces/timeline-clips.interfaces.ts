import {
  TimelineTransition,
  TimelineTransitionType,
} from "@/features/timeline-transitions/interfaces/timeline-transitions.interfaces";
import { TimelineCaption } from "@/features/timeline-captions/interfaces/timeline-captions.interfaces";

export interface TimelineClip {
  uuid: string;
  project_uuid: string;
  final_project_uuid: string;
  project_asset_uuid: string;
  start_sec: number;
  end_sec: number;
  trim_start: number | null;
  trim_end: number | null;
  volume: number | null;
  speed: number | null;
  transition_in_uuid: string | null;
  transition_out_uuid: string | null;
  created_at: string;
  updated_at: string;
  transition_in?: TimelineTransition | null;
  transition_out?: TimelineTransition | null;
  captions?: TimelineCaption[];
}

export interface CreateTimelineClipDto {
  project_uuid: string;
  final_project_uuid: string;
  project_asset_uuid: string;
  start_sec: number;
  end_sec: number;
  trim_start?: number;
  trim_end?: number;
  volume?: number;
  speed?: number;
}

export interface UpdateTimelineClipDto {
  start_sec?: number;
  end_sec?: number;
  trim_start?: number;
  trim_end?: number;
  volume?: number;
  speed?: number;
  transition_out_type?: TimelineTransitionType;
  transition_out_duration?: number;
}

export interface TimelineClipQueryDto {
  final_project_uuid: string;
  project_asset_uuid?: string;
}

export type TimelineTransitionType =
  | "FADE"
  | "CROSSFADE"
  | "DISSOLVE"
  | "SLIDE_LEFT"
  | "SLIDE_RIGHT"
  | "ZOOM";

export interface TimelineTransition {
  uuid: string;
  type: TimelineTransitionType;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTimelineTransitionDto {
  type: TimelineTransitionType;
  duration: number;
}

export interface UpdateTimelineTransitionDto {
  type?: TimelineTransitionType;
  duration?: number;
}

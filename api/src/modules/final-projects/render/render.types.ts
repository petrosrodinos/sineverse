export const COMPOSITION_ID = 'FinalProject';

export const COMPOSITION_FPS = 30;

export const COMPOSITION_WIDTH = 1280;

export const COMPOSITION_HEIGHT = 720;

export interface CaptionData {
  text: string;
  start_frame: number;
  end_frame: number;
  position: string;
  style: string;
}

export interface TransitionData {
  type: string;
  duration_frames: number;
}

export interface ClipData {
  video_url: string;
  trim_start_frames: number;
  trim_end_frames: number;
  volume: number;
  speed: number;
  start_frame: number;
  duration_frames: number;
  transition: TransitionData;
  captions: CaptionData[];
}

export interface MusicData {
  audio_url: string;
  volume: number;
}

export interface FinalProjectCompositionProps {
  clips: ClipData[];
  music: MusicData | null;
}

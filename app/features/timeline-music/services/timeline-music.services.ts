import {
  TimelineMusic,
  TimelineMusicQueryDto,
  UpsertTimelineMusicDto,
} from "../interfaces/timeline-music.interfaces";

import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";

export const getTimelineMusic = async (
  query: TimelineMusicQueryDto,
): Promise<TimelineMusic[]> => {
  try {
    const response = await axiosInstance.get<TimelineMusic[]>(
      ApiRoutes.timeline_music.prefix,
      { params: query },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message || "Failed to fetch timeline music",
    );

    throw error;
  }
};

export const upsertTimelineMusic = async (
  finalProjectUuid: string,
  dto: UpsertTimelineMusicDto,
): Promise<TimelineMusic | null> => {
  try {
    const response = await axiosInstance.put<TimelineMusic | null>(
      ApiRoutes.timeline_music.final_project_music(finalProjectUuid),
      dto,
    );

    return response.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message || "Failed to save timeline music",
    );

    throw error;
  }
};

import {
  TimelineCaption,
  CreateTimelineCaptionDto,
  UpdateTimelineCaptionDto,
  TimelineCaptionQueryDto,
} from "../interfaces/timeline-captions.interfaces";

import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";

export const getTimelineCaptions = async (
  query: TimelineCaptionQueryDto,
): Promise<TimelineCaption[]> => {
  try {
    const response = await axiosInstance.get<TimelineCaption[]>(
      ApiRoutes.timeline_captions.prefix,
      { params: query },
    );

    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.message || "Failed to fetch captions");

    throw error;
  }
};

export const createTimelineCaption = async (
  dto: CreateTimelineCaptionDto,
): Promise<TimelineCaption> => {
  try {
    const response = await axiosInstance.post<TimelineCaption>(
      ApiRoutes.timeline_captions.prefix,
      dto,
    );

    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.message || "Failed to create caption");

    throw error;
  }
};

export const updateTimelineCaption = async (
  uuid: string,
  dto: UpdateTimelineCaptionDto,
): Promise<TimelineCaption> => {
  try {
    const response = await axiosInstance.patch<TimelineCaption>(
      ApiRoutes.timeline_captions.timeline_caption(uuid),
      dto,
    );

    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.message || "Failed to update caption");

    throw error;
  }
};

export const deleteTimelineCaption = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(
      ApiRoutes.timeline_captions.timeline_caption(uuid),
    );
  } catch (error: any) {
    console.error(error?.response?.data?.message || "Failed to delete caption");

    throw error;
  }
};

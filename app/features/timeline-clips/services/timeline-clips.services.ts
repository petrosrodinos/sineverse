import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import {
    TimelineClip,
    CreateTimelineClipDto,
    UpdateTimelineClipDto,
    TimelineClipQueryDto,
} from "../interfaces/timeline-clips.interfaces";

export const getTimelineClips = async (query: TimelineClipQueryDto): Promise<TimelineClip[]> => {
    try {
        const response = await axiosInstance.get<TimelineClip[]>(ApiRoutes.timeline_clips.prefix, { params: query });
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch timeline clips");
        throw error;
    }
};

export const getTimelineClip = async (uuid: string): Promise<TimelineClip> => {
    try {
        const response = await axiosInstance.get<TimelineClip>(ApiRoutes.timeline_clips.timeline_clip(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch timeline clip");
        throw error;
    }
};

export const createTimelineClip = async (dto: CreateTimelineClipDto): Promise<TimelineClip> => {
    try {
        const response = await axiosInstance.post<TimelineClip>(ApiRoutes.timeline_clips.prefix, dto);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create timeline clip");
        throw error;
    }
};

export const updateTimelineClip = async (uuid: string, dto: UpdateTimelineClipDto): Promise<TimelineClip> => {
    try {
        const response = await axiosInstance.patch<TimelineClip>(ApiRoutes.timeline_clips.timeline_clip(uuid), dto);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update timeline clip");
        throw error;
    }
};

export const deleteTimelineClip = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.timeline_clips.timeline_clip(uuid));
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete timeline clip");
        throw error;
    }
};

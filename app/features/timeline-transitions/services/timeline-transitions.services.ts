import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { TimelineTransition, CreateTimelineTransitionDto, UpdateTimelineTransitionDto } from "../interfaces/timeline-transitions.interfaces";

export const getTimelineTransition = async (uuid: string): Promise<TimelineTransition> => {
    try {
        const response = await axiosInstance.get<TimelineTransition>(ApiRoutes.timeline_transitions.timeline_transition(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch transition");
        throw error;
    }
};

export const createTimelineTransition = async (dto: CreateTimelineTransitionDto): Promise<TimelineTransition> => {
    try {
        const response = await axiosInstance.post<TimelineTransition>(ApiRoutes.timeline_transitions.prefix, dto);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create transition");
        throw error;
    }
};

export const updateTimelineTransition = async (uuid: string, dto: UpdateTimelineTransitionDto): Promise<TimelineTransition> => {
    try {
        const response = await axiosInstance.patch<TimelineTransition>(ApiRoutes.timeline_transitions.timeline_transition(uuid), dto);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update transition");
        throw error;
    }
};

export const deleteTimelineTransition = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.delete(ApiRoutes.timeline_transitions.timeline_transition(uuid));
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete transition");
        throw error;
    }
};

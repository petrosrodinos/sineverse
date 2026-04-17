import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import {
    getTimelineClips,
    getTimelineClip,
    createTimelineClip,
    updateTimelineClip,
    deleteTimelineClip,
} from "../services/timeline-clips.services";
import {
    TimelineClip,
    CreateTimelineClipDto,
    UpdateTimelineClipDto,
    TimelineClipQueryDto,
} from "../interfaces/timeline-clips.interfaces";

const QueryKeys = {
    timelineClips: (query: TimelineClipQueryDto) => ['timeline-clips', query],
    timelineClip: (uuid: string) => `timeline-clip-${uuid}`,
};

export const useTimelineClips = (
    query: TimelineClipQueryDto,
    options?: Omit<UseQueryOptions<TimelineClip[], Error, TimelineClip[], any>, 'queryKey' | 'queryFn'>,
) => {
    return useQuery<TimelineClip[]>({
        queryKey: QueryKeys.timelineClips(query),
        queryFn: () => getTimelineClips(query),
        ...options,
    });
};

export const useTimelineClip = (uuid: string) => {
    return useQuery<TimelineClip>({
        queryKey: [QueryKeys.timelineClip(uuid)],
        queryFn: () => getTimelineClip(uuid),
        enabled: !!uuid,
    });
};

export const useCreateTimelineClip = () => {
    const queryClient = useQueryClient();
    return useMutation<TimelineClip, Error, CreateTimelineClipDto>({
        mutationFn: createTimelineClip,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['timeline-clips', { final_project_uuid: data.final_project_uuid }],
            });
        },
        onError: (error) => {
            addToast({ title: "Failed to create clip", description: error.message, severity: "danger" });
        },
    });
};

export const useUpdateTimelineClip = () => {
    const queryClient = useQueryClient();
    return useMutation<TimelineClip, Error, { uuid: string; dto: UpdateTimelineClipDto }>({
        mutationFn: ({ uuid, dto }) => updateTimelineClip(uuid, dto),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['timeline-clips', { final_project_uuid: data.final_project_uuid }],
            });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.timelineClip(data.uuid)] });
        },
        onError: (error) => {
            addToast({ title: "Failed to save clip settings", description: error.message, severity: "danger" });
        },
    });
};

export const useDeleteTimelineClip = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { uuid: string; final_project_uuid: string }>({
        mutationFn: ({ uuid }) => deleteTimelineClip(uuid),
        onSuccess: (_, { final_project_uuid }) => {
            queryClient.invalidateQueries({
                queryKey: ['timeline-clips', { final_project_uuid }],
            });
            addToast({ title: "Clip removed", severity: "success" });
        },
        onError: (error) => {
            addToast({ title: "Failed to delete clip", description: error.message, severity: "danger" });
        },
    });
};

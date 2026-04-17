import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import {
    getTimelineCaptions,
    createTimelineCaption,
    updateTimelineCaption,
    deleteTimelineCaption,
} from "../services/timeline-captions.services";
import {
    TimelineCaption,
    CreateTimelineCaptionDto,
    UpdateTimelineCaptionDto,
    TimelineCaptionQueryDto,
} from "../interfaces/timeline-captions.interfaces";

const QueryKeys = {
    timelineCaptions: (query: TimelineCaptionQueryDto) => ['timeline-captions', query],
};

export const useTimelineCaptions = (
    query: TimelineCaptionQueryDto,
    options?: Omit<UseQueryOptions<TimelineCaption[], Error, TimelineCaption[], any>, 'queryKey' | 'queryFn'>,
) => {
    return useQuery<TimelineCaption[]>({
        queryKey: QueryKeys.timelineCaptions(query),
        queryFn: () => getTimelineCaptions(query),
        enabled: !!query.clip_uuid,
        ...options,
    });
};

export const useCreateTimelineCaption = () => {
    const queryClient = useQueryClient();
    return useMutation<TimelineCaption, Error, CreateTimelineCaptionDto>({
        mutationFn: createTimelineCaption,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['timeline-captions', { clip_uuid: data.clip_uuid }] });
        },
        onError: (error) => {
            addToast({ title: "Failed to create caption", description: error.message, severity: "danger" });
        },
    });
};

export const useUpdateTimelineCaption = () => {
    const queryClient = useQueryClient();
    return useMutation<TimelineCaption, Error, { uuid: string; dto: UpdateTimelineCaptionDto; clip_uuid: string }>({
        mutationFn: ({ uuid, dto }) => updateTimelineCaption(uuid, dto),
        onSuccess: (_, { clip_uuid }) => {
            queryClient.invalidateQueries({ queryKey: ['timeline-captions', { clip_uuid }] });
        },
        onError: (error) => {
            addToast({ title: "Failed to update caption", description: error.message, severity: "danger" });
        },
    });
};

export const useDeleteTimelineCaption = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { uuid: string; clip_uuid: string }>({
        mutationFn: ({ uuid }) => deleteTimelineCaption(uuid),
        onSuccess: (_, { clip_uuid }) => {
            queryClient.invalidateQueries({ queryKey: ['timeline-captions', { clip_uuid }] });
            addToast({ title: "Caption removed", severity: "success" });
        },
        onError: (error) => {
            addToast({ title: "Failed to delete caption", description: error.message, severity: "danger" });
        },
    });
};

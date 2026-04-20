import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import {
  getTimelineTransition,
  createTimelineTransition,
  updateTimelineTransition,
  deleteTimelineTransition,
} from "../services/timeline-transitions.services";
import {
  TimelineTransition,
  CreateTimelineTransitionDto,
  UpdateTimelineTransitionDto,
} from "../interfaces/timeline-transitions.interfaces";

const QueryKeys = {
  timelineTransition: (uuid: string) => `timeline-transition-${uuid}`,
};

export const useTimelineTransition = (uuid: string) => {
  return useQuery<TimelineTransition>({
    queryKey: [QueryKeys.timelineTransition(uuid)],
    queryFn: () => getTimelineTransition(uuid),
    enabled: !!uuid,
  });
};

export const useCreateTimelineTransition = () => {
  return useMutation<TimelineTransition, Error, CreateTimelineTransitionDto>({
    mutationFn: createTimelineTransition,
  });
};

export const useUpdateTimelineTransition = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TimelineTransition,
    Error,
    { uuid: string; dto: UpdateTimelineTransitionDto }
  >({
    mutationFn: ({ uuid, dto }) => updateTimelineTransition(uuid, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.timelineTransition(data.uuid)],
      });
    },
  });
};

export const useDeleteTimelineTransition = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteTimelineTransition,
    onError: (error) => {
      addToast({
        title: "Failed to delete transition",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

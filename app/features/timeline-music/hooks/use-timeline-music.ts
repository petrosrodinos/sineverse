import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import {
  TimelineMusic,
  UpsertTimelineMusicDto,
} from "../interfaces/timeline-music.interfaces";
import {
  getTimelineMusic,
  upsertTimelineMusic,
} from "../services/timeline-music.services";

const QueryKeys = {
  timelineMusic: (finalProjectUuid: string) => [
    "timeline-music",
    finalProjectUuid,
  ],
};

export const useTimelineMusic = (finalProjectUuid: string) => {
  return useQuery<TimelineMusic[]>({
    queryKey: QueryKeys.timelineMusic(finalProjectUuid),
    queryFn: () => getTimelineMusic({ final_project_uuid: finalProjectUuid }),
    enabled: !!finalProjectUuid,
  });
};

export const useUpsertTimelineMusic = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TimelineMusic | null,
    Error,
    { finalProjectUuid: string; dto: UpsertTimelineMusicDto }
  >({
    mutationFn: ({ finalProjectUuid, dto }) =>
      upsertTimelineMusic(finalProjectUuid, dto),
    onSuccess: (_, { finalProjectUuid }) => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.timelineMusic(finalProjectUuid),
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to save timeline music",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

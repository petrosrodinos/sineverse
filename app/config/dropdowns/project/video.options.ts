import { VideoStatuses } from "@/features/scene-videos/interfaces/scene-videos.interfaces";

export const VideoStatusLabels = {
    [VideoStatuses.PENDING]: "Pending",
    [VideoStatuses.PROCESSING]: "Processing",
    [VideoStatuses.COMPLETED]: "Completed",
    [VideoStatuses.FAILED]: "Failed",
}
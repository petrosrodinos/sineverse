import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSceneVideos, getSceneVideo, createSceneVideo, updateSceneVideo, deleteSceneVideo } from "../services/scene-videos.services";
import { SceneVideo, CreateSceneVideoDto } from "../interfaces/scene-videos.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    sceneVideos: 'scene-videos',
    sceneVideo: (uuid: string) => `scene-video-${uuid}`,
    sceneVariations: 'scene-variations',
}

export const useSceneVideos = () => {
    return useQuery<SceneVideo[]>({ queryKey: [QueryKeys.sceneVideos], queryFn: getSceneVideos });
}

export const useSceneVideo = (uuid: string, options?: any) => {
    return useQuery<SceneVideo>({
        queryKey: [QueryKeys.sceneVideo(uuid)],
        queryFn: () => getSceneVideo(uuid),
        ...options
    });
}

export const useCreateSceneVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVideo, Error, CreateSceneVideoDto>({
        mutationFn: createSceneVideo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVideos] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Video generation started",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to create scene video",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useUpdateSceneVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVideo, Error, { uuid: string, sceneVideo: any }>({
        mutationFn: ({ uuid, sceneVideo }) => updateSceneVideo(uuid, sceneVideo),
        onSuccess: (_, { uuid }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVideos] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVideo(uuid)] });
            addToast({
                title: "Scene video updated successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to update scene video",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDeleteSceneVideo = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteSceneVideo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVideos] });
            addToast({
                title: "Scene video deleted successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to delete scene video",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

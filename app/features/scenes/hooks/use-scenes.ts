import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScenes, getScene, createScene, updateScene, deleteScene } from "../services/scenes.services";
import { Scene, CreateSceneDto, UpdateSceneDto, SceneQueryDto } from "../interfaces/scenes.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    scenes: 'scenes',
    scene: (uuid: string) => `scene-${uuid}`,
}

export const useScenes = (query?: SceneQueryDto) => {
    return useQuery<Scene[]>({ queryKey: [QueryKeys.scenes, query], queryFn: () => getScenes(query) });
}

export const useScene = (uuid: string) => {
    return useQuery<Scene>({ queryKey: [QueryKeys.scene(uuid)], queryFn: () => getScene(uuid) });
}

export const useCreateScene = () => {
    const queryClient = useQueryClient();
    return useMutation<Scene, Error, CreateSceneDto>({
        mutationFn: createScene,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.scenes] });
            addToast({
                title: "Scene created successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to create scene",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useUpdateScene = () => {
    const queryClient = useQueryClient();
    return useMutation<Scene, Error, { uuid: string, scene: UpdateSceneDto }>({
        mutationFn: ({ uuid, scene }) => updateScene(uuid, scene),
        onSuccess: (_, { uuid }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.scenes] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.scene(uuid)] });
            addToast({
                title: "Scene updated successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to update scene",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDeleteScene = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteScene,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.scenes] });
            addToast({
                title: "Scene deleted successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to delete scene",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

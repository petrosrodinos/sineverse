import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSceneVariations, getSceneVariation, createSceneVariation, updateSceneVariation, deleteSceneVariation, duplicateSceneVariation } from "../services/scene-variations.services";
import { SceneVariation, UpdateSceneVariationDto, SceneVariationsQueryDto } from "../interfaces/scene-variations.interfaces";

import { addToast } from "@heroui/toast";

const QueryKeys = {
    sceneVariations: 'scene-variations',
    sceneVariation: (uuid: string) => `scene-variation-${uuid}`,
}

export const useSceneVariations = (query: SceneVariationsQueryDto, options?: any) => {
    return useQuery<SceneVariation[]>({ queryKey: [QueryKeys.sceneVariations, query], queryFn: () => getSceneVariations(query), ...options });
}

export const useSceneVariation = (uuid: string, options?: any) => {
    return useQuery<SceneVariation>({ queryKey: [QueryKeys.sceneVariation(uuid)], queryFn: () => getSceneVariation(uuid), ...options });
}


export const useCreateSceneVariation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSceneVariation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Scene variation created successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to create scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useUpdateSceneVariation = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVariation, Error, { uuid: string, sceneVariation: UpdateSceneVariationDto }>({
        mutationFn: ({ uuid, sceneVariation }) => updateSceneVariation(uuid, sceneVariation),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Scene variation updated successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to update scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDeleteSceneVariation = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteSceneVariation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Scene variation deleted successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to delete scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDuplicateSceneVariation = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVariation, Error, string>({
        mutationFn: duplicateSceneVariation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Scene variation duplicated successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to duplicate scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}




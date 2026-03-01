import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSceneVariations, getSceneVariation, createSceneVariation, updateSceneVariation, deleteSceneVariation } from "../services/scene-variations.services";
import { SceneVariation, CreateSceneVariationDto, UpdateSceneVariationDto, SceneVariationsQueryDto } from "../interfaces/scene-variations.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    sceneVariations: 'scene-variations',
    sceneVariation: (uuid: string) => `scene-variation-${uuid}`,
}

export const useSceneVariations = (query: SceneVariationsQueryDto) => {
    return useQuery<SceneVariation[]>({ queryKey: [QueryKeys.sceneVariations, query], queryFn: () => getSceneVariations(query) });
}

export const useSceneVariation = (uuid: string) => {
    return useQuery<SceneVariation>({ queryKey: [QueryKeys.sceneVariation(uuid)], queryFn: () => getSceneVariation(uuid) });
}

export const useCreateSceneVariation = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVariation, Error, CreateSceneVariationDto>({
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

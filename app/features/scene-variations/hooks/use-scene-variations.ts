import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSceneVariations, getSceneVariation, createSceneVariation, updateSceneVariation, deleteSceneVariation, duplicateSceneVariation, enrichSceneVariation, uploadSceneVariationPromptImage, deleteSceneVariationPromptImage, generateSceneVariationImage } from "../services/scene-variations.services";
import { SceneVariation, CreateSceneVariationDto, UpdateSceneVariationDto, SceneVariationsQueryDto, SceneVariationEnrichDto, GenerateSceneVariationImageDto } from "../interfaces/scene-variations.interfaces";

import { addToast } from "@heroui/toast";

const QueryKeys = {
    sceneVariations: 'scene-variations',
    sceneVariation: (uuid: string) => `scene-variation-${uuid}`,
}

export const useSceneVariations = (query: SceneVariationsQueryDto) => {
    return useQuery<SceneVariation[]>({ queryKey: [QueryKeys.sceneVariations, query], queryFn: () => getSceneVariations(query) });
}

export const useSceneVariation = (uuid: string, options?: any) => {
    return useQuery<SceneVariation>({ queryKey: [QueryKeys.sceneVariation(uuid)], queryFn: () => getSceneVariation(uuid), ...options });
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

export const useEnrichSceneVariation = (uuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, enrichDto }: { uuid: string, enrichDto: SceneVariationEnrichDto }) => enrichSceneVariation(uuid, enrichDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            addToast({
                title: "Scene variation enriched successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to enrich scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useUploadSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVariation, Error, { uuid: string, file: File }>({
        mutationFn: ({ uuid, file }) => uploadSceneVariationPromptImage(uuid, file),
        onSuccess: (_, { uuid }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariation(uuid)] });
            addToast({
                title: "Prompt image uploaded successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to upload prompt image",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDeleteSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation<SceneVariation, Error, string>({
        mutationFn: deleteSceneVariationPromptImage,
        onSuccess: (_, uuid) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariation(uuid)] });
            addToast({
                title: "Prompt image removed successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to remove prompt image",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useGenerateSceneVariationImage = () => {
    const queryClient = useQueryClient();
    return useMutation<{ status: 'generating' }, Error, { uuid: string, generateDto: GenerateSceneVariationImageDto }>({
        mutationFn: ({ uuid, generateDto }) => generateSceneVariationImage(uuid, generateDto),
        onSuccess: (_, { uuid }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariation(uuid)] });
            addToast({
                title: "Image generation started",
                description: "The AI is working on your image. It will appear shortly.",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to generate image",
                description: error.message,
                severity: "danger",
            });
        }
    });
}



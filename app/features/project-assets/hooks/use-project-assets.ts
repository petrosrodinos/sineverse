import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { ProjectAsset, ProjectAssetsQueryDto, CreateProjectAssetDto, CreateSceneVideoDto, GenerateSceneVariationImageDto, ProjectAssetsResponse } from "../interfaces/project-assets.interfaces";
import { getProjectAssets, getProjectAsset, createSceneVideo, createProjectAsset, createSceneVariationImage, deleteProjectAsset, deleteSceneVariationPromptImage, uploadSceneVariationPromptImage } from "../services/project-assets.services";

export const useProjectAssets = (query: ProjectAssetsQueryDto, options?: Omit<UseQueryOptions<ProjectAssetsResponse, Error, ProjectAssetsResponse, any>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ProjectAssetsResponse>({
        queryKey: ['project-assets', query],
        queryFn: () => getProjectAssets(query),
        ...options
    });
}

export const useProjectAssetByUuid = (uuid: string) => {
    return useQuery<ProjectAsset>({
        queryKey: ['project-asset', uuid],
        queryFn: () => getProjectAsset(uuid),
        enabled: !!uuid
    });
}

export const useCreateProjectAsset = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateProjectAssetDto) => createProjectAsset(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project-assets'] });
        }
    });
}

export const useDeleteProjectAsset = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteProjectAsset(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project-assets'] });
        }
    });
}

export const useCreateSceneVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateSceneVideoDto) => createSceneVideo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project-assets'] });
        }
    });
}

export const useUploadSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, file }: { uuid: string; file: File }) => uploadSceneVariationPromptImage(uuid, file),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['project-assets'] });
            queryClient.invalidateQueries({ queryKey: ['scene-variations'] });
            queryClient.invalidateQueries({ queryKey: ['scene-variation', variables.uuid] });
        }
    });
}

export const useDeleteSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteSceneVariationPromptImage(uuid),
        onSuccess: (data, uuid) => {
            queryClient.invalidateQueries({ queryKey: ['project-assets'] });
            queryClient.invalidateQueries({ queryKey: ['scene-variations'] });
            queryClient.invalidateQueries({ queryKey: ['scene-variation', uuid] });
        }
    });
}

export const useCreateSceneVariationImage = () => {
    return useMutation({
        mutationFn: ({ uuid, payload }: { uuid: string; payload: GenerateSceneVariationImageDto }) => createSceneVariationImage(uuid, payload),
        // onSuccess can be handled at component level or invalidate variations if needed
    });
}
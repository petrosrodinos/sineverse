import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { ProjectAsset, ProjectAssetsQueryDto, CreateProjectAssetDto, CreateSceneVideoDto, GenerateSceneVariationImageDto, ProjectAssetsResponse, ProjectAssetVideoEnrichDto, CreateEstateWalkthroughVideosDto } from "../interfaces/project-assets.interfaces";
import { getProjectAssets, getProjectAsset, createSceneVideo, createProjectAsset, createSceneVariationImage, deleteProjectAsset, deleteSceneVariationPromptImage, uploadSceneVariationPromptImage, selectProjectAsset, enrichProjectAssetVideo, createEstateWalkthroughVideos } from "../services/project-assets.services";
import { addToast } from "@heroui/toast";


const QueryKeys = {
    projectAssets: 'project-assets',
    projectAsset: (uuid: string) => `project-asset-${uuid}`,
    sceneVariations: 'scene-variations',
}

export const useProjectAssets = (query: ProjectAssetsQueryDto, options?: Omit<UseQueryOptions<ProjectAssetsResponse, Error, ProjectAssetsResponse, any>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ProjectAssetsResponse>({
        queryKey: [QueryKeys.projectAssets, query],
        queryFn: () => getProjectAssets(query),
        ...options
    });
}

export const useProjectAsset = (uuid: string, options?: Omit<UseQueryOptions<ProjectAsset, Error, ProjectAsset, any>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ProjectAsset>({
        queryKey: [QueryKeys.projectAsset(uuid)],
        queryFn: () => getProjectAsset(uuid),
        enabled: !!uuid,
        ...options
    });
}

export const useCreateProjectAsset = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateProjectAssetDto) => createProjectAsset(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
        }
    });
}

export const useDeleteProjectAsset = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteProjectAsset(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
        }
    });
}

export const useSelectProjectAsset = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => selectProjectAsset(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
        }
    });
}

export const useCreateSceneVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateSceneVideoDto) => createSceneVideo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
        }
    });
}

export const useCreateEstateWalkthroughVideos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateEstateWalkthroughVideosDto) => createEstateWalkthroughVideos(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
        }
    });
}

export const useUploadSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, file }: { uuid: string; file: File }) => uploadSceneVariationPromptImage(uuid, file),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAsset(variables.uuid)] });
        }
    });
}

export const useDeleteSceneVariationPromptImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteSceneVariationPromptImage(uuid),
        onSuccess: (data, uuid) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAssets] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.sceneVariations] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAsset(uuid)] });
        }
    });
}

export const useCreateSceneVariationImage = () => {
    return useMutation({
        mutationFn: ({ uuid, payload }: { uuid: string; payload: GenerateSceneVariationImageDto }) => createSceneVariationImage(uuid, payload),
        // onSuccess can be handled at component level or invalidate variations if needed
    });
}


export const useEnrichProjectAssetVideo = (uuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, enrichDto }: { uuid: string, enrichDto: ProjectAssetVideoEnrichDto }) => enrichProjectAssetVideo(uuid, enrichDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.projectAsset(uuid)] });
            addToast({
                title: "Scene variation enriched successfully",
                severity: "success",
            });
        },
        onError: (error: any) => {
            addToast({
                title: "Failed to enrich scene variation",
                description: error.message,
                severity: "danger",
            });
        }
    });
}
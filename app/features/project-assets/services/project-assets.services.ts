import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { ProjectAsset, GenerateSceneVariationImageDto, ProjectAssetsQueryDto, CreateSceneVideoDto, CreateProjectAssetDto, ProjectAssetsResponse } from "../interfaces/project-assets.interfaces";

export const createProjectAsset = async (payload: CreateProjectAssetDto): Promise<ProjectAsset> => {
    try {
        const response = await axiosInstance.post<ProjectAsset>(ApiRoutes.project_assets.prefix, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create project asset")
    }
}

export const getProjectAssets = async (query: ProjectAssetsQueryDto): Promise<ProjectAssetsResponse> => {
    try {
        const response = await axiosInstance.get<ProjectAssetsResponse>(ApiRoutes.project_assets.prefix, { params: query });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch project assets")
    }
}

export const getProjectAsset = async (uuid: string): Promise<ProjectAsset> => {
    try {
        const response = await axiosInstance.get<ProjectAsset>(ApiRoutes.project_assets.project_asset(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch project asset")
    }
}

export const deleteProjectAsset = async (uuid: string): Promise<ProjectAsset> => {
    try {
        const response = await axiosInstance.delete<ProjectAsset>(ApiRoutes.project_assets.project_asset(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to delete project asset")
    }
}

export const createSceneVideo = async (payload: CreateSceneVideoDto): Promise<ProjectAsset> => {
    try {
        const response = await axiosInstance.post<ProjectAsset>(ApiRoutes.project_assets.create_video(payload.scene_variation_uuid), payload);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create scene video");
        throw error;
    }
}

export const uploadSceneVariationPromptImage = async (uuid: string, file: File): Promise<ProjectAsset> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post<ProjectAsset>(ApiRoutes.project_assets.prompt_image(uuid), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to upload prompt image")
    }
}

export const deleteSceneVariationPromptImage = async (uuid: string): Promise<ProjectAsset> => {
    try {
        const response = await axiosInstance.delete<ProjectAsset>(ApiRoutes.project_assets.prompt_image(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to remove prompt image")
    }
}

export const createSceneVariationImage = async (uuid: string, payload: GenerateSceneVariationImageDto): Promise<{ status: 'generating' }> => {
    try {
        const formData = new FormData();

        // Add all fields from DTO to FormData
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'image' && value instanceof File) {
                    formData.append('file', value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        const response = await axiosInstance.post<{ status: 'generating' }>(
            ApiRoutes.project_assets.create_image(uuid),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to generate image")
    }
}
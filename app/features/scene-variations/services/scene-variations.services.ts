import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { SceneVariation, CreateSceneVariationDto, UpdateSceneVariationDto, SceneVariationsQueryDto, SceneVariationEnrichDto, GenerateSceneVariationImageDto } from "../interfaces/scene-variations.interfaces";


export const getSceneVariations = async (query: SceneVariationsQueryDto): Promise<SceneVariation[]> => {
    try {
        const response = await axiosInstance.get<SceneVariation[]>(ApiRoutes.scene_variations.prefix, { params: query });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch scene variations")
    }
}

export const getSceneVariation = async (uuid: string): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.get<SceneVariation>(ApiRoutes.scene_variations.scene_variation(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch scene variation")
    }
}

export const createSceneVariation = async (sceneVariation: CreateSceneVariationDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.prefix, sceneVariation);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create scene variation")
    }
}

export const updateSceneVariation = async (uuid: string, sceneVariation: UpdateSceneVariationDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.patch<SceneVariation>(ApiRoutes.scene_variations.scene_variation(uuid), sceneVariation);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to update scene variation")
    }
}

export const deleteSceneVariation = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.scene_variations.scene_variation(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to delete scene variation")
    }
}

export const duplicateSceneVariation = async (uuid: string): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.duplicate(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to duplicate scene variation")
    }
}

export const enrichSceneVariation = async (uuid: string, enrichDto: SceneVariationEnrichDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.enrich(uuid), enrichDto);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to enrich scene variation")
    }
}

export const uploadSceneVariationPromptImage = async (uuid: string, file: File): Promise<SceneVariation> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.prompt_image(uuid), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to upload prompt image")
    }
}

export const deleteSceneVariationPromptImage = async (uuid: string): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.delete<SceneVariation>(ApiRoutes.scene_variations.prompt_image(uuid));
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to remove prompt image")
    }
}

export const generateSceneVariationImage = async (uuid: string, generateDto: GenerateSceneVariationImageDto): Promise<{ status: 'generating' }> => {
    try {
        const formData = new FormData();

        // Add all fields from DTO to FormData
        Object.entries(generateDto).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'image' && value instanceof File) {
                    formData.append('file', value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        const response = await axiosInstance.post<{ status: 'generating' }>(
            ApiRoutes.scene_variations.create_image(uuid),
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






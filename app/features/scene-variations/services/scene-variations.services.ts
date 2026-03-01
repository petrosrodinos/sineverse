import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { SceneVariation, CreateSceneVariationDto, UpdateSceneVariationDto, SceneVariationsQueryDto, SceneVariationEnrichDto } from "../interfaces/scene-variations.interfaces";

export const getSceneVariations = async (query: SceneVariationsQueryDto): Promise<SceneVariation[]> => {
    try {
        const response = await axiosInstance.get<SceneVariation[]>(ApiRoutes.scene_variations.prefix, { params: query });
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scene variations");
        throw error;
    }
}

export const getSceneVariation = async (uuid: string): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.get<SceneVariation>(ApiRoutes.scene_variations.scene_variation(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scene variation");
        throw error;
    }
}

export const createSceneVariation = async (sceneVariation: CreateSceneVariationDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.prefix, sceneVariation);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create scene variation");
        throw error;
    }
}

export const updateSceneVariation = async (uuid: string, sceneVariation: UpdateSceneVariationDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.patch<SceneVariation>(ApiRoutes.scene_variations.scene_variation(uuid), sceneVariation);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update scene variation");
        throw error;
    }
}

export const deleteSceneVariation = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.scene_variations.scene_variation(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete scene variation");
        throw error;
    }
}

export const duplicateSceneVariation = async (uuid: string): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.duplicate(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to duplicate scene variation");
        throw error;
    }
}

export const enrichSceneVariation = async (uuid: string, enrichDto: SceneVariationEnrichDto): Promise<SceneVariation> => {
    try {
        const response = await axiosInstance.post<SceneVariation>(ApiRoutes.scene_variations.enrich(uuid), enrichDto);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to enrich scene variation");
        throw error;
    }
}


import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { Scene, CreateSceneDto, UpdateSceneDto, SceneQueryDto, GenerateAiScenesDto, ReorderScenesDto } from "../interfaces/scenes.interfaces";

export const getScenes = async (query?: SceneQueryDto): Promise<Scene[]> => {
    try {
        const response = await axiosInstance.get<Scene[]>(ApiRoutes.scenes.prefix, { params: query });
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scenes");
        throw error;
    }
}

export const getScene = async (uuid: string): Promise<Scene> => {
    try {
        const response = await axiosInstance.get<Scene>(ApiRoutes.scenes.scene(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scene");
        throw error;
    }
}

export const createScene = async (scene: CreateSceneDto): Promise<Scene> => {
    try {
        const response = await axiosInstance.post<Scene>(ApiRoutes.scenes.prefix, scene);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create scene");
        throw error;
    }
}

export const updateScene = async (uuid: string, scene: UpdateSceneDto): Promise<Scene> => {
    try {
        const response = await axiosInstance.patch<Scene>(ApiRoutes.scenes.scene(uuid), scene);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update scene");
        throw error;
    }
}

export const deleteScene = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.scenes.scene(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete scene");
        throw error;
    }
}

export const generateAiScenes = async (scene: GenerateAiScenesDto): Promise<Scene[]> => {
    try {
        const response = await axiosInstance.post<Scene[]>(ApiRoutes.scenes.generate_ai_scenes, scene);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to generate scenes");
        throw error;
    }
}

export const reorderScenes = async (reorder: ReorderScenesDto): Promise<void> => {
    try {
        await axiosInstance.post(ApiRoutes.scenes.reorder, reorder);
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to reorder scenes");
        throw error;
    }
}

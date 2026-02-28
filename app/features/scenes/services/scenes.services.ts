import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { Scene, CreateSceneDto, UpdateSceneDto } from "../interfaces/scenes.interfaces";

export const getScenes = async (): Promise<Scene[]> => {
    try {
        const response = await axiosInstance.get<Scene[]>(ApiRoutes.scenes.prefix);
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
        const response = await axiosInstance.put<Scene>(ApiRoutes.scenes.scene(uuid), scene);
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

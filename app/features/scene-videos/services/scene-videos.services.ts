import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { SceneVideo, CreateSceneVideoDto, UpdateSceneVideoDto } from "../interfaces/scene-videos.interfaces";

export const getSceneVideos = async (): Promise<SceneVideo[]> => {
    try {
        const response = await axiosInstance.get<SceneVideo[]>(ApiRoutes.scene_videos.prefix);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scene videos");
        throw error;
    }
}

export const getSceneVideo = async (uuid: string): Promise<SceneVideo> => {
    try {
        const response = await axiosInstance.get<SceneVideo>(ApiRoutes.scene_videos.scene_video(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch scene video");
        throw error;
    }
}

export const createSceneVideo = async (sceneVideo: CreateSceneVideoDto): Promise<SceneVideo> => {
    try {
        const response = await axiosInstance.post<SceneVideo>(ApiRoutes.scene_videos.prefix, sceneVideo);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create scene video");
        throw error;
    }
}

export const updateSceneVideo = async (uuid: string, sceneVideo: UpdateSceneVideoDto): Promise<SceneVideo> => {
    try {
        const response = await axiosInstance.patch<SceneVideo>(ApiRoutes.scene_videos.scene_video(uuid), sceneVideo);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update scene video");
        throw error;
    }
}

export const deleteSceneVideo = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.scene_videos.scene_video(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete scene video");
        throw error;
    }
}

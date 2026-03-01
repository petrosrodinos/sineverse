import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { FinalProject, CreateFinalProjectDto, UpdateFinalProjectDto } from "../interfaces/final-projects.interfaces";

export const getFinalProjects = async (): Promise<FinalProject[]> => {
    try {
        const response = await axiosInstance.get<FinalProject[]>(ApiRoutes.final_projects.prefix);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch final projects");
        throw error;
    }
}

export const getFinalProject = async (uuid: string): Promise<FinalProject> => {
    try {
        const response = await axiosInstance.get<FinalProject>(ApiRoutes.final_projects.final_project(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch final project");
        throw error;
    }
}

export const createFinalProject = async (finalProject: CreateFinalProjectDto): Promise<FinalProject> => {
    try {
        const response = await axiosInstance.post<FinalProject>(ApiRoutes.final_projects.prefix, finalProject);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create final project");
        throw error;
    }
}

export const updateFinalProject = async (uuid: string, finalProject: UpdateFinalProjectDto): Promise<FinalProject> => {
    try {
        const response = await axiosInstance.patch<FinalProject>(ApiRoutes.final_projects.final_project(uuid), finalProject);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update final project");
        throw error;
    }
}

export const deleteFinalProject = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.final_projects.final_project(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete final project");
        throw error;
    }
}

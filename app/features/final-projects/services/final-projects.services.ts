import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { FinalProject, CreateFinalProjectDto, UpdateFinalProjectDto, FinalProjectQueryDto } from "../interfaces/final-projects.interfaces";

export const getFinalProjects = async (query?: FinalProjectQueryDto): Promise<FinalProject[]> => {
    try {
        const response = await axiosInstance.get<FinalProject[]>(ApiRoutes.final_projects.prefix, { params: query });
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

export const renderFinalProject = async (uuid: string): Promise<void> => {
    try {
        await axiosInstance.post(ApiRoutes.final_projects.render(uuid));
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to start render");
        throw error;
    }
}

export const downloadFinalProjectVideo = async (uuid: string): Promise<Blob> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.final_projects.download(uuid), {
            responseType: "blob",
        });
        return response.data as Blob;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to download rendered video");
        throw error;
    }
}

export const downloadFinalProjectVideoByDocument = async (
    finalProjectUuid: string,
    documentUuid: string,
): Promise<Blob> => {
    try {
        const response = await axiosInstance.get(
            ApiRoutes.final_projects.download_document(finalProjectUuid, documentUuid),
            {
                responseType: "blob",
            },
        );
        return response.data as Blob;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to download rendered video");
        throw error;
    }
}

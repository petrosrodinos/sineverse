import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { Project, CreateProjectDto, UpdateProjectDto } from "../interfaces/projects.interfaces";

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await axiosInstance.get<Project[]>(ApiRoutes.projects.prefix);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch projects");
        throw error;
    }
}

export const getProject = async (uuid: string): Promise<Project> => {
    try {
        const response = await axiosInstance.get<Project>(ApiRoutes.projects.project(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to fetch project");
        throw error;
    }
}

export const createProject = async (project: CreateProjectDto): Promise<Project> => {
    try {
        const response = await axiosInstance.post<Project>(ApiRoutes.projects.prefix, project);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to create project");
        throw error;
    }
}

export const updateProject = async (uuid: string, project: UpdateProjectDto): Promise<Project> => {
    try {
        const response = await axiosInstance.put<Project>(ApiRoutes.projects.project(uuid), project);
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to update project");
        throw error;
    }
}

export const deleteProject = async (uuid: string) => {
    try {
        const response = await axiosInstance.delete(ApiRoutes.projects.project(uuid));
        return response.data;
    } catch (error: any) {
        console.error(error?.response?.data?.message || "Failed to delete project");
        throw error;
    }
}
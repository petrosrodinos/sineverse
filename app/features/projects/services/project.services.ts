import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  EnrichProjectDto,
  ProjectsListQuery,
} from "../interfaces/projects.interfaces";

import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";

export const getProjects = async (
  query?: ProjectsListQuery,
): Promise<Project[]> => {
  try {
    const response = await axiosInstance.get<Project[]>(
      ApiRoutes.projects.prefix,
      { params: query },
    );

    return response.data;
  } catch (error: any) {
    console.error(error);

    throw new Error(
      error?.response?.data?.message || "Failed to fetch projects",
    );
  }
};

export const getProject = async (uuid: string): Promise<Project> => {
  try {
    const response = await axiosInstance.get<Project>(
      ApiRoutes.projects.project(uuid),
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch project",
    );
  }
};

export const createProject = async (
  project: CreateProjectDto,
): Promise<Project> => {
  try {
    const response = await axiosInstance.post<Project>(
      ApiRoutes.projects.prefix,
      project,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to create project",
    );
  }
};

export const updateProject = async (
  uuid: string,
  project: UpdateProjectDto,
): Promise<Project> => {
  try {
    const response = await axiosInstance.patch<Project>(
      ApiRoutes.projects.project(uuid),
      project,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update project",
    );
  }
};

export const deleteProject = async (uuid: string) => {
  try {
    const response = await axiosInstance.delete(
      ApiRoutes.projects.project(uuid),
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete project",
    );
  }
};

export const enrichProject = async (
  payload: EnrichProjectDto,
): Promise<Project> => {
  try {
    const response = await axiosInstance.post<Project>(
      ApiRoutes.projects.enrich(payload.project_uuid),
      { directions: payload.directions },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to enrich project",
    );
  }
};

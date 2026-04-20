import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  enrichProject,
} from "../services/project.services";
import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectsListQuery,
} from "../interfaces/projects.interfaces";

const QueryKeys = {
  projects: "projects",
  project: (uuid: string) => `project-${uuid}`,
};

export const useProjects = (query?: ProjectsListQuery) => {
  return useQuery<Project[]>({
    queryKey: [QueryKeys.projects, query],
    queryFn: () => getProjects(query),
    retry: false,
  });
};

export const useProject = (uuid: string) => {
  return useQuery<Project>({
    queryKey: [QueryKeys.project(uuid)],
    queryFn: () => getProject(uuid),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectDto>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.projects] });

      addToast({
        title: "Project created successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to create project",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Project,
    Error,
    { uuid: string; project: UpdateProjectDto }
  >({
    mutationFn: ({ uuid, project }) => updateProject(uuid, project),
    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.projects] });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.project(uuid)] });

      addToast({
        title: "Project updated successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to update project",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.projects] });

      addToast({
        title: "Project deleted successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to delete project",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

export const useEnrichProject = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrichProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.project(uuid)] });

      addToast({
        title: "Concept enriched successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Failed to enrich concept",
        description: error.message,
        severity: "danger",
      });
    },
  });
};

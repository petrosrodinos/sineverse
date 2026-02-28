import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../services/project.services";
import { Project, CreateProjectDto, UpdateProjectDto } from "../interfaces/projects.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    projects: 'projects',
    project: (uuid: string) => `project-${uuid}`,
}

export const useProjects = () => {
    return useQuery<Project[]>({ queryKey: [QueryKeys.projects], queryFn: getProjects });
}

export const useProject = (uuid: string) => {
    return useQuery<Project>({ queryKey: [QueryKeys.project(uuid)], queryFn: () => getProject(uuid) });
}

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
        }
    });
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation<Project, Error, { uuid: string, project: UpdateProjectDto }>({
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
        }
    });
}

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
        }
    });
}
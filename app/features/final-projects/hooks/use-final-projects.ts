import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinalProjects, getFinalProject, createFinalProject, updateFinalProject, deleteFinalProject } from "../services/final-projects.services";
import { FinalProject, CreateFinalProjectDto, UpdateFinalProjectDto } from "../interfaces/final-projects.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    finalProjects: 'final-projects',
    finalProject: (uuid: string) => `final-project-${uuid}`,
}

export const useFinalProjects = () => {
    return useQuery<FinalProject[]>({ queryKey: [QueryKeys.finalProjects], queryFn: getFinalProjects });
}

export const useFinalProject = (uuid: string) => {
    return useQuery<FinalProject>({ queryKey: [QueryKeys.finalProject(uuid)], queryFn: () => getFinalProject(uuid) });
}

export const useCreateFinalProject = () => {
    const queryClient = useQueryClient();
    return useMutation<FinalProject, Error, CreateFinalProjectDto>({
        mutationFn: createFinalProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.finalProjects] });
            addToast({
                title: "Final project created successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to create final project",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useUpdateFinalProject = () => {
    const queryClient = useQueryClient();
    return useMutation<FinalProject, Error, { uuid: string, finalProject: UpdateFinalProjectDto }>({
        mutationFn: ({ uuid, finalProject }) => updateFinalProject(uuid, finalProject),
        onSuccess: (_, { uuid }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.finalProjects] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.finalProject(uuid)] });
            addToast({
                title: "Final project updated successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to update final project",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

export const useDeleteFinalProject = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteFinalProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.finalProjects] });
            addToast({
                title: "Final project deleted successfully",
                severity: "success",
            });
        },
        onError: (error) => {
            addToast({
                title: "Failed to delete final project",
                description: error.message,
                severity: "danger",
            });
        }
    });
}

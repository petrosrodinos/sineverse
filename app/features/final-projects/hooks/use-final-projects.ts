import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinalProjects, getFinalProject, createFinalProject, updateFinalProject, deleteFinalProject, renderFinalProject } from "../services/final-projects.services";
import { FinalProject, CreateFinalProjectDto, UpdateFinalProjectDto, FinalProjectQueryDto } from "../interfaces/final-projects.interfaces";
import { addToast } from "@heroui/toast";

const QueryKeys = {
    finalProjects: (query?: FinalProjectQueryDto) => ['final-projects', query],
    finalProject: (uuid: string) => `final-project-${uuid}`,
}

export const useFinalProjects = (query?: FinalProjectQueryDto) => {
    return useQuery<FinalProject[]>({
        queryKey: QueryKeys.finalProjects(query),
        queryFn: () => getFinalProjects(query),
    });
}

export const useFinalProjectByProject = (projectUuid: string) => {
    const queryClient = useQueryClient();
    const creatingRef = useRef(false);
    const query: FinalProjectQueryDto = { project_uuid: projectUuid };
    const result = useQuery<FinalProject[]>({
        queryKey: QueryKeys.finalProjects(query),
        queryFn: () => getFinalProjects(query),
        enabled: !!projectUuid,
    });

    const { mutate: create } = useMutation<FinalProject, Error, CreateFinalProjectDto>({
        mutationFn: createFinalProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['final-projects'] });
            creatingRef.current = false;
        },
        onError: () => {
            creatingRef.current = false;
        },
    });

    useEffect(() => {
        if (!projectUuid || result.isLoading || result.data === undefined) return;
        if (result.data.length === 0 && !creatingRef.current) {
            creatingRef.current = true;
            create({ project_uuid: projectUuid });
        }
    }, [projectUuid, result.isLoading, result.data, create]);

    return { finalProject: result.data?.[0] ?? null, isLoading: result.isLoading };
}

export const useFinalProject = (uuid: string) => {
    return useQuery<FinalProject>({
        queryKey: [QueryKeys.finalProject(uuid)],
        queryFn: () => getFinalProject(uuid),
        enabled: !!uuid,
        refetchInterval: (query) => {
            if (query.state.data?.render_status === 'RENDERING') return 3000;
            return false;
        },
    });
}

export const useCreateFinalProject = () => {
    const queryClient = useQueryClient();
    return useMutation<FinalProject, Error, CreateFinalProjectDto>({
        mutationFn: createFinalProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['final-projects'] });
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
            queryClient.invalidateQueries({ queryKey: ['final-projects'] });
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
            queryClient.invalidateQueries({ queryKey: ['final-projects'] });
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

export const useRenderFinalProject = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: renderFinalProject,
        onSuccess: (_, uuid) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.finalProject(uuid)] });
            queryClient.invalidateQueries({ queryKey: ['final-projects'] });
        },
        onError: (error) => {
            addToast({
                title: "Failed to start video render",
                description: error.message,
                severity: "danger",
            });
        },
    });
}

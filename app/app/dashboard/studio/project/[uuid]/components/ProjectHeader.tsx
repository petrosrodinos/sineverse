"use client";

import { Skeleton } from "@heroui/skeleton";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { Button } from "@heroui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useDisclosure } from "@heroui/modal";
import { CreateProjectModal } from "@/app/dashboard/studio/components/CreateProjectModal";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useDeleteProject } from "@/features/projects/hooks/use-projects";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";

interface ProjectHeaderProps {
    project?: Project;
    isLoading: boolean;
}

export function ProjectHeader({ project, isLoading }: ProjectHeaderProps) {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    const router = useRouter();

    const handleDelete = () => {
        if (!project) return;
        deleteProject(project.uuid, {
            onSuccess: () => {
                onDeleteClose();
                router.push(Routes.studio);
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <Skeleton className="h-8 w-3/5 rounded-lg" />
                    <Skeleton className="h-5 w-4/5 rounded-lg mt-1" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
                <h1 className="text-2xl font-bold tracking-tight truncate">
                    {project?.title || "Project Not Found"}
                </h1>
                {project?.original_concept && (
                    <p className="text-default-500 mt-1 truncate max-w-2xl">{project.original_concept}</p>
                )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <Button isIconOnly variant="flat" onPress={onEditOpen}>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button isIconOnly variant="flat" color="danger" onPress={onDeleteOpen}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <CreateProjectModal 
                isOpen={isEditOpen} 
                onOpenChange={onEditOpenChange} 
                onClose={onEditClose} 
                project={project} 
            />
            
            <ConfirmationModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onConfirm={handleDelete}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}

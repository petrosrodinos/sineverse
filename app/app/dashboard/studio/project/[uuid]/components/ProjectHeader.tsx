"use client";

import { Skeleton } from "@heroui/skeleton";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { Button } from "@heroui/button";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
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
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full min-w-0">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-1 flex-1 min-w-0">
                    <Button className="col-start-1 row-start-1 shrink-0 mt-0.5" isIconOnly variant="flat" onPress={() => router.push(Routes.studio)}>
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Skeleton className="col-start-2 row-start-1 h-7 sm:h-8 w-3/4 sm:w-3/5 rounded-lg self-center sm:self-start mt-0.5" />
                    <Skeleton className="col-start-1 col-span-2 sm:col-start-2 sm:col-span-1 row-start-2 h-4 sm:h-5 w-full sm:w-4/5 rounded-lg mt-1" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full min-w-0">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-1 flex-1 min-w-0 sm:pr-4">
                <Button className="col-start-1 row-start-1 mt-0.5 shrink-0" isIconOnly variant="flat" onPress={() => router.push(Routes.studio)}>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <h1 className="col-start-2 row-start-1 text-xl sm:text-2xl font-bold tracking-tight truncate self-center sm:self-start mt-0.5">
                    {project?.title || "Project Not Found"}
                </h1>
                {project?.original_concept && (
                    <p className="col-start-1 col-span-2 sm:col-start-2 sm:col-span-1 row-start-2 text-sm sm:text-base text-default-500 line-clamp-2 sm:line-clamp-3 break-words">
                        {project.original_concept}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
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

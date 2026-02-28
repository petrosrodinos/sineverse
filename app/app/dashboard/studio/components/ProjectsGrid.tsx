"use client"
import { useProjects } from "@/features/projects/hooks/use-projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectSkeleton } from "./ProjectSkeleton";

export function ProjectsGrid() {
    const { data: projects, isLoading, error } = useProjects();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProjectSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-danger flex justify-center py-10">Failed to load projects.</div>;
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-20 text-default-500">
                No projects found. Create one to get started.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project: any) => (
                <ProjectCard key={project.uuid || project.id} project={project} />
            ))}
        </div>
    );
}

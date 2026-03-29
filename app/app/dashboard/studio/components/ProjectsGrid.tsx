"use client";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { ProjectCard } from "./ProjectCard";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { Button, Card, CardBody } from "@heroui/react";
import { FolderOpen, Plus } from "lucide-react";
import { useDisclosure } from "@heroui/react";
import { CreateProjectModal } from "./create-project-modal/CreateProjectModal";

export function ProjectsGrid() {
  const { data: projects, isLoading, error } = useProjects();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
      <>
        <Card className="w-full border-dashed border-2 bg-transparent shadow-none border-default-200 mt-2">
          <CardBody className="py-24 flex flex-col items-center justify-center text-center gap-4">
            <div className="bg-default-100 p-4 rounded-full">
              <FolderOpen className="w-10 h-10 text-default-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">No Projects found</h3>
              <p className="text-default-500 text-sm max-w-[300px]">Get started by creating your first project. All your amazing work will be organized here.</p>
            </div>
            <Button color="primary" startContent={<Plus className="w-4 h-4" />} className="mt-2" onPress={onOpen}>
              Create Project
            </Button>
          </CardBody>
        </Card>
        <CreateProjectModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project: Project) => (
        <ProjectCard key={project.uuid || project.id} project={project} />
      ))}
    </div>
  );
}

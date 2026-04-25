"use client";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/config/routes";
import {
  GenreOptionsLabels,
  TypeOptionsLabels,
} from "@/config/dropdowns/project/project.options";
import { useDeleteProject } from "@/features/projects/hooks/use-projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    e.preventDefault();

    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProject(project.uuid, {
      onSuccess: () => setIsConfirmOpen(false),
    });
  };

  return (
    <>
      <div className="group relative hover:scale-[1.02] transition-transform">
        <button
          aria-label="Delete project"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-default-100/80 backdrop-blur-sm text-danger opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 hover:bg-danger hover:text-white"
          onClick={handleDeleteClick}
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <Card className="cursor-pointer w-full h-full">
          <CardHeader className="flex gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-md font-bold">{project.title}</p>
              <p className="text-small text-default-500">
                {new Date(project.created_at).toLocaleDateString()}
              </p>
              <Chip color="primary" size="sm" variant="flat">
                {TypeOptionsLabels[project.type]}
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            {project.genres && project.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.genres.map((genre, idx) => (
                  <Chip key={idx} color="secondary" size="sm" variant="flat">
                    {GenreOptionsLabels[genre] || genre}
                  </Chip>
                ))}
              </div>
            )}
            {project.original_concept ? (
              <p className="text-default-600 line-clamp-3">
                {project.original_concept}
              </p>
            ) : null}
          </CardBody>
          <CardFooter>
            <Button
              className="w-full"
              color="primary"
              variant="flat"
              onPress={() =>
                router.push(
                  Routes.project(project.uuid, { type: project.type }),
                )
              }
            >
              Open Project
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Modal isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <ModalContent>
          <ModalHeader>Delete Project</ModalHeader>
          <ModalBody>
            <p className="text-default-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {project.title}
              </span>
              ? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              color="danger"
              isLoading={isPending}
              onPress={handleConfirmDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { useDisclosure } from "@heroui/modal";

import { CreateProjectModal } from "./create-project-modal/CreateProjectModal";

export function ProjectsHeader() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Studio Projects</h1>
          <p className="text-default-500 mt-2">
            Manage your creative projects and generate new videos.
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={onOpen}
        >
          New Project
        </Button>
      </div>
      <CreateProjectModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

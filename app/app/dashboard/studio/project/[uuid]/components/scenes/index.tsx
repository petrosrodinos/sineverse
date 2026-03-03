"use client";

import { useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Plus, Pencil, PencilOff } from "lucide-react";
import { useScenes, useDeleteScene } from "@/features/scenes/hooks/use-scenes";
import { CreateSceneModal } from "./create-scene";
import { NoScenes } from "./states/NoScenes";
import { ScenesLoadingSkeleton } from "./states/ScenesLoadingSkeleton";
import { SceneCard } from "./SceneCard";
import { useState } from "react";
import { EditSceneModal } from "./create-scene/edit-scene-modal";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

export function ScenesSidebar() {

  const params = useParams();
  const projectUuid = params.uuid as string;

  const { data: scenes, isLoading } = useScenes({ project_uuid: projectUuid });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalOpenChange, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

  const { mutate: deleteScene, isPending: isDeleting } = useDeleteScene();

  const handleEdit = (scene: Scene) => {
    setSelectedScene(scene);
    onEditModalOpen();
  };

  const handleDelete = (scene: Scene) => {
    setSelectedScene(scene);
    onDeleteModalOpen();
  };

  const confirmDelete = () => {
    if (selectedScene) {
      deleteScene(selectedScene.uuid, {
        onSuccess: () => {
          onDeleteModalClose();
          setSelectedScene(null);
        }
      });
    }
  };

  if (isLoading) {
    return <ScenesLoadingSkeleton />;
  }

  if (!scenes || scenes.length === 0) {
    return (
      <>
        <NoScenes onOpen={onOpen} />
        <CreateSceneModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} projectUuid={projectUuid} scenes={[]}/>
      </>
    );
  }

  return (
    <>
      {/* Mobile Accordion View */}
      <div className="block lg:hidden w-full rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 overflow-hidden">
        <Accordion showDivider={false} defaultExpandedKeys={[]}>
          <AccordionItem
            key="scenes"
            aria-label="Scenes"
            title={<span className="font-semibold text-foreground px-2">Scenes</span>}
          >
            <div className="flex flex-col gap-2 px-4 pb-4">
              <div className="flex gap-2 mb-2">
                <Button size="sm" variant="flat" onPress={onOpen} startContent={<Plus className="size-4" />} className="flex-1 justify-start">
                  Create New Scene
                </Button>
                <Button isIconOnly size="sm" variant={isEditMode ? "solid" : "flat"} color={isEditMode ? "primary" : "default"} onPress={() => setIsEditMode(!isEditMode)}>
                  {isEditMode ? <PencilOff className="size-4" /> : <Pencil className="size-4" />}
                </Button>
              </div>
              {scenes.map((scene) => (
                <SceneCard 
                  key={scene.uuid} 
                  scene={scene} 
                  isEditMode={isEditMode} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Desktop View */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Scenes</h2>
          <div className="flex gap-2">
            <Button isIconOnly size="sm" variant={isEditMode ? "solid" : "flat"} color={isEditMode ? "primary" : "default"} onPress={() => setIsEditMode(!isEditMode)}>
               {isEditMode ? <PencilOff className="size-4" /> : <Pencil className="size-4" />}
            </Button>
            <Button isIconOnly size="sm" variant="flat" onPress={onOpen}>
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto space-y-2">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.uuid}
              scene={scene}
              isEditMode={isEditMode}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </aside>
      <CreateSceneModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} projectUuid={projectUuid} scenes={scenes}/>
      <EditSceneModal isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange} onClose={onEditModalClose} scene={selectedScene} />
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={onDeleteModalClose} 
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Scene"
        description={`Are you sure you want to delete scene "${selectedScene?.title || "Untitled"}"? This action cannot be undone.`}
      />
    </>
  );
}

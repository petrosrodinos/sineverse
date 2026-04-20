"use client";

import { useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Plus, Pencil, PencilOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";

import { CreateSceneModal } from "./create-scene";
import { NoScenes } from "./states/NoScenes";
import { ScenesLoadingSkeleton } from "./states/ScenesLoadingSkeleton";
import { SceneCard } from "./SceneCard";
import { EditSceneModal } from "./create-scene/edit-scene-modal";

import {
  useScenes,
  useDeleteScene,
  useReorderScenes,
} from "@/features/scenes/hooks/use-scenes";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

export function ScenesSidebar() {
  const params = useParams();

  const projectUuid = params.uuid as string;

  const { data: scenesData, isLoading } = useScenes({
    project_uuid: projectUuid,
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

  const [orderedScenes, setOrderedScenes] = useState<Scene[]>([]);

  useEffect(() => {
    if (scenesData) {
      setOrderedScenes(scenesData);
    }
  }, [scenesData]);

  const { mutate: deleteScene, isPending: isDeleting } = useDeleteScene();

  const { mutate: reorderScenes } = useReorderScenes();

  const handleReorder = (newOrder: Scene[]) => {
    setOrderedScenes(newOrder);

    const reorderDto = {
      scenes: newOrder.map((s, index) => ({
        uuid: s.uuid,
        order: index + 1,
      })),
    };

    reorderScenes(reorderDto);
  };

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
        },
      });
    }
  };

  if (isLoading) {
    return <ScenesLoadingSkeleton />;
  }

  if (!scenesData || scenesData.length === 0) {
    return (
      <>
        <NoScenes onOpen={onOpen} />
        <CreateSceneModal
          isOpen={isOpen}
          projectUuid={projectUuid}
          scenes={[]}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </>
    );
  }

  return (
    <>
      {/* Mobile Accordion View */}
      <div className="block lg:hidden w-full rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 overflow-hidden">
        <Accordion defaultExpandedKeys={[]} showDivider={false}>
          <AccordionItem
            key="scenes"
            aria-label="Scenes"
            title={
              <span className="font-semibold text-foreground px-2">Scenes</span>
            }
          >
            <div className="flex flex-col gap-2 px-4 pb-4">
              <div className="flex gap-2 mb-2">
                <Button
                  className="flex-1 justify-start"
                  size="sm"
                  startContent={<Plus className="size-4" />}
                  variant="flat"
                  onPress={onOpen}
                >
                  Create New Scene
                </Button>
                <Button
                  isIconOnly
                  color={isEditMode ? "primary" : "default"}
                  size="sm"
                  variant={isEditMode ? "solid" : "flat"}
                  onPress={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? (
                    <PencilOff className="size-4" />
                  ) : (
                    <Pencil className="size-4" />
                  )}
                </Button>
              </div>
              <Reorder.Group
                axis="y"
                className="space-y-2"
                values={orderedScenes}
                onReorder={handleReorder}
              >
                {orderedScenes.map((scene) => (
                  <Reorder.Item
                    key={scene.uuid}
                    dragListener={isEditMode}
                    value={scene}
                  >
                    <SceneCard
                      isEditMode={isEditMode}
                      scene={scene}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Desktop View */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Scenes</h2>
          <div className="flex gap-2">
            <Button
              isIconOnly
              color={isEditMode ? "primary" : "default"}
              size="sm"
              variant={isEditMode ? "solid" : "flat"}
              onPress={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? (
                <PencilOff className="size-4" />
              ) : (
                <Pencil className="size-4" />
              )}
            </Button>
            <Button isIconOnly size="sm" variant="flat" onPress={onOpen}>
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <Reorder.Group
            axis="y"
            className="space-y-2"
            values={orderedScenes}
            onReorder={handleReorder}
          >
            {orderedScenes.map((scene) => (
              <Reorder.Item
                key={scene.uuid}
                dragListener={isEditMode}
                value={scene}
              >
                <SceneCard
                  isEditMode={isEditMode}
                  scene={scene}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </aside>
      <CreateSceneModal
        isOpen={isOpen}
        projectUuid={projectUuid}
        scenes={orderedScenes}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <EditSceneModal
        isOpen={isEditModalOpen}
        scene={selectedScene}
        onClose={onEditModalClose}
        onOpenChange={onEditModalOpenChange}
      />
      <ConfirmationModal
        description={`Are you sure you want to delete scene "${selectedScene?.title || "Untitled"}"? This action cannot be undone.`}
        isLoading={isDeleting}
        isOpen={isDeleteModalOpen}
        title="Delete Scene"
        onClose={onDeleteModalClose}
        onConfirm={confirmDelete}
      />
    </>
  );
}

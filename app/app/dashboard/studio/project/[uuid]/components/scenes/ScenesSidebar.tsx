"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Plus } from "lucide-react";
import { useScenes } from "@/features/scenes/hooks/use-scenes";
import { CreateSceneModal } from "./CreateSceneModal";
import { NoScenes } from "./NoScenes";
import { ScenesLoadingSkeleton } from "./ScenesLoadingSkeleton";
import { SceneCard } from "./SceneCard";

export function ScenesSidebar() {

  const params = useParams();
  const projectUuid = params.uuid as string;

  const { data: scenes, isLoading } = useScenes({ project_uuid: projectUuid });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  if (isLoading) {
    return <ScenesLoadingSkeleton />;
  }

  if (!scenes || scenes.length === 0) {
    return (
      <>
        <NoScenes onOpen={onOpen} />
        <CreateSceneModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} projectUuid={projectUuid} />
      </>
    );
  }

  return (
    <>
      <aside className="w-72 shrink-0 flex flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Scenes</h2>
          <Button isIconOnly size="sm" variant="flat" onPress={onOpen}>
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto space-y-2">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.uuid}
              scene={scene}
            />
          ))}
        </div>
      </aside>
      <CreateSceneModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} projectUuid={projectUuid} />
    </>
  );
}

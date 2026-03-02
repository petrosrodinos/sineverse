"use client";

import { useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Plus } from "lucide-react";
import { useScenes } from "@/features/scenes/hooks/use-scenes";
import { CreateSceneModal } from "./create-scene";
import { NoScenes } from "./states/NoScenes";
import { ScenesLoadingSkeleton } from "./states/ScenesLoadingSkeleton";
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
              <Button size="sm" variant="flat" onPress={onOpen} startContent={<Plus className="size-4" />} className="w-full justify-start mb-2">
                Create New Scene
              </Button>
              {scenes.map((scene) => (
                <SceneCard key={scene.uuid} scene={scene} />
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Desktop View */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
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
      <CreateSceneModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} projectUuid={projectUuid} scenes={scenes}/>
    </>
  );
}

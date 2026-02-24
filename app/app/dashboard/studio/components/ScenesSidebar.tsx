"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Film, RefreshCw } from "lucide-react";
import type { Scene } from "@/types/studio";
import { getSceneStatusLabel } from "@/utils/studio";
import { SceneStatus } from "@/types/studio";

interface ScenesSidebarProps {
  scenes: Scene[];
  selectedSceneId: string | null;
  onSelectScene: (id: string) => void;
  onGenerateScenes: () => void;
  onRegenerateDescription: (sceneId: string) => void;
  isGeneratingScenes?: boolean;
  canGenerateScenes: boolean;
}

export function ScenesSidebar({ scenes, selectedSceneId, onSelectScene, onGenerateScenes, onRegenerateDescription, isGeneratingScenes, canGenerateScenes }: ScenesSidebarProps) {
  return (
    <aside className="w-72 shrink-0 flex flex-col gap-4 rounded-2xl border border-default-200/80 bg-default-50/50 dark:border-default-100/20 dark:bg-default-100/5 p-4">
      <Button color="primary" onPress={onGenerateScenes} isDisabled={!canGenerateScenes || isGeneratingScenes} isLoading={isGeneratingScenes} startContent={!isGeneratingScenes ? <Film className="size-4" /> : undefined} className="w-full rounded-xl font-medium">
        Generate Scenes
      </Button>
      <div className="flex-1 overflow-auto space-y-2">
        {scenes.map((scene) => {
          const isSelected = selectedSceneId === scene.id;
          const statusColor = scene.status === SceneStatus.VideosGenerated ? "success" : scene.status === SceneStatus.PromptsGenerated ? "warning" : "default";
          return (
            <Card
              key={scene.id}
              isPressable
              onPress={() => onSelectScene(scene.id)}
              className={`
                rounded-2xl border transition-all duration-200 hover:scale-[1.02]
                ${isSelected ? "ring-2 ring-primary border-primary/50 bg-primary/5" : "border-default-200/80 bg-default-50/50 dark:border-default-100/20 dark:bg-default-100/5"}
              `}
            >
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-default-500">Scene {scene.order}</span>
                  <Chip size="sm" variant="flat" color={statusColor}>
                    {getSceneStatusLabel(scene.status)}
                  </Chip>
                </div>
                <p className="text-sm font-medium text-foreground line-clamp-1">{scene.title || "Untitled"}</p>
                <p className="text-xs text-default-500 line-clamp-2">{scene.description || "No description"}</p>
                <div onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" variant="flat" className="w-full" onPress={() => onRegenerateDescription(scene.id)} startContent={<RefreshCw className="size-4" />}>
                    Regenerate Description
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </aside>
  );
}

import { Card } from "@heroui/card";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "@heroui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface SceneCardProps {
  scene: Scene;
  isEditMode?: boolean;
  onEdit?: (scene: Scene) => void;
  onDelete?: (scene: Scene) => void;
}

export function SceneCard({ scene, isEditMode, onEdit, onDelete }: SceneCardProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSelectScene = useCallback((uuid: string) => {
    if (isEditMode) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("scene_uuid", uuid);
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams, isEditMode]);

  const isSelected = useMemo(() => {
    return searchParams.get("scene_uuid") === scene.uuid;
  }, [searchParams, scene.uuid]);

  return (
    <Card
      isPressable={!isEditMode}
      onPress={() => onSelectScene(scene.uuid)}
      className={`
        w-full rounded-2xl border transition-all duration-200 shadow-none
        ${isSelected && !isEditMode ? "ring-primary border-primary/50 bg-primary/5" : "bg-transparent border-default-200 dark:border-default-100/20 hover:bg-default-100/50 dark:hover:bg-default-100/10"}
        ${isEditMode ? "cursor-default" : ""}
      `}
    >
      <div className="p-3 space-y-2 text-left w-full flex flex-col items-start min-w-0">
        <div className="flex items-center justify-between gap-1 w-full">
          <div className="flex items-center gap-2">
            {isEditMode && <GripVertical className="size-4 text-default-400 cursor-grab active:cursor-grabbing" />}
            <span className="text-xs font-semibold text-default-500">Scene {scene.order}</span>
          </div>
          {!isEditMode ? (
            scene.scene_variations !== undefined && (
              <span className="text-[10px] font-medium text-default-500 border border-default-200 bg-default-50 px-2 py-0.5 rounded-full dark:border-default-100 dark:bg-default-200">
                {scene.scene_variations.length} {scene.scene_variations.length === 1 ? "variation" : "variations"}
              </span>
            )
          ) : (
            <div className="flex gap-1">
              <Button isIconOnly size="sm" variant="light" className="size-6 min-w-6" onPress={() => onEdit?.(scene)}>
                <Pencil className="size-3" />
              </Button>
              <Button isIconOnly size="sm" variant="light" color="danger" className="size-6 min-w-6" onPress={() => onDelete?.(scene)}>
                <Trash2 className="size-3" />
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-foreground line-clamp-1 w-full text-left">{scene.title || "Untitled"}</p>
        {scene.description && (<p className="text-xs text-default-500 line-clamp-2 w-full text-left">{scene.description}</p>)}
      </div>
    </Card>
  );
}

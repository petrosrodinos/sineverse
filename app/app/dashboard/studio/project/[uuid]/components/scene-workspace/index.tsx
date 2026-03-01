"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScene } from "@/features/scenes/hooks/use-scenes";
import { NoSceneSelected } from "./states/NoSceneSelected";
import { SceneLoading } from "./states/SceneLoading";
import { SceneNotFound } from "./states/SceneNotFound";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { SceneVariationCard } from "./SceneVariationCard";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useDeleteSceneVariation, useSceneVariations } from "@/features/scene-variations/hooks/use-scene-variations";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { CreateVariationPopover } from "./CreateVariationPopover";

interface SceneWorkspaceProps {}

export function SceneWorkspace({}: SceneWorkspaceProps) {
  const searchParams = useSearchParams();
  const sceneUuid = searchParams.get("scene_uuid");
  const { data: scene_variations, isLoading } = useSceneVariations({scene_uuid: sceneUuid || ""});
  const [variationToDelete, setVariationToDelete] = useState<SceneVariation | null>(null);
  const deleteMutation = useDeleteSceneVariation();

  const handleDelete = async () => {
    if (!variationToDelete?.uuid) return;
    await deleteMutation.mutateAsync(variationToDelete.uuid);
    setVariationToDelete(null);
  };

  if (!sceneUuid) {
    return <NoSceneSelected />;
  }

  if (isLoading) {
    return <SceneLoading />;
  }

  if (!scene_variations) {
    return <SceneNotFound />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">Scene Variations</h3>
          <p className="text-sm text-default-500 mt-1">
            Configure the specific settings for these video variations to tune the scene generation exactly as needed.
          </p>
        </div>
        <CreateVariationPopover sceneUuid={sceneUuid} />
      </div>
      
      <Accordion variant="splitted" className="px-0 gap-4">
        {[
          ...(scene_variations || []).map((variation: SceneVariation, index: number) => (
            <AccordionItem
              key={variation.id || index}
              classNames={{
                trigger: "relative"
              }}
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{variation.title}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-danger hover:bg-danger/20 rounded-medium transition-colors cursor-pointer flex items-center justify-center"
                    onClick={(e: any) => {
                      // Prevent accordion from toggling
                      e.stopPropagation();
                      e.preventDefault();
                      setVariationToDelete(variation);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </span>
                </div>
              }
              subtitle={<span className="text-xs text-default-400">{variation.style || "No Style Selected"}</span>}
              aria-label={variation.title}
            >
              <SceneVariationCard variation={variation} />
            </AccordionItem>
          ))
        ]}
      </Accordion>

      <ConfirmationModal
        isOpen={!!variationToDelete}
        onClose={() => setVariationToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Scene Variation"
        description={`Are you sure you want to delete "${variationToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

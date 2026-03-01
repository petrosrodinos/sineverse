"use client";
import { useSearchParams } from "next/navigation";
import { useScene } from "@/features/scenes/hooks/use-scenes";
import { SceneVariationCard } from "./SceneVariationCard";
import { NoSceneSelected } from "./states/NoSceneSelected";
import { SceneLoading } from "./states/SceneLoading";
import { SceneNotFound } from "./states/SceneNotFound";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { CreateVariationPopover } from "./CreateVariationPopover";

interface SceneWorkspaceProps {}

export function SceneWorkspace({}: SceneWorkspaceProps) {
  const searchParams = useSearchParams();
  const sceneUuid = searchParams.get("scene_uuid");
  const { data: scene, isLoading } = useScene(sceneUuid || "");

  if (!sceneUuid) {
    return <NoSceneSelected />;
  }

  if (isLoading) {
    return <SceneLoading />;
  }

  if (!scene) {
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
          ...(scene.scene_variations || []).map((variation: SceneVariation, index: number) => (
            <AccordionItem
              key={variation.id || index}
              title={
                  <div className="flex items-center gap-2">
                      <span className="font-semibold">{variation.title}</span>
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
    </div>
  );
}

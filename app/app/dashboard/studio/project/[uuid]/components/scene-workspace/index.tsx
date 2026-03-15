"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NoSceneSelected } from "./states/NoSceneSelected";
import { SceneLoading } from "./states/SceneLoading";
import { SceneNotFound } from "./states/SceneNotFound";
import { NoVariations } from "./states/NoVariations";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Trash2, Copy } from "lucide-react";
import { SceneVariationCard } from "./SceneVariationCard";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useDeleteSceneVariation, useSceneVariations, useDuplicateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Style } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import { AssetRoles } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { CreateVariationPopover } from "./CreateVariationPopover";
import { StylesOptionsLabels } from "@/config/dropdowns/project/scene-variations.options";

interface SceneWorkspaceProps {}

export function SceneWorkspace({}: SceneWorkspaceProps) {
  const searchParams = useSearchParams();
  const sceneUuid = searchParams.get("scene_uuid");
  const { data: scene_variations, isLoading } = useSceneVariations({scene_uuid: sceneUuid || ""});
  const [variationToDelete, setVariationToDelete] = useState<SceneVariation | null>(null);
  const [variationToDuplicate, setVariationToDuplicate] = useState<SceneVariation | null>(null);
  const deleteMutation = useDeleteSceneVariation();
  const duplicateMutation = useDuplicateSceneVariation();
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  const handleDelete = async () => {
    if (!variationToDelete?.uuid) return;
    await deleteMutation.mutateAsync(variationToDelete.uuid);
    setVariationToDelete(null);
  };

  const handleDuplicate = async () => {
    if (!variationToDuplicate?.uuid) return;
    await duplicateMutation.mutateAsync(variationToDuplicate.uuid);
    setVariationToDuplicate(null);
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

  if (scene_variations.length === 0) {
    return <NoVariations sceneUuid={sceneUuid} />;
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
      
      <Accordion variant="splitted" className="px-0 gap-4" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
        {[
          ...(scene_variations || []).map((variation: SceneVariation, index: number) => (
            <AccordionItem
              key={`variation-${variation.uuid}`}
              classNames={{
                trigger: "relative"
              }}
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{variation.title}</span>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1">
                    <span
                      role="button"
                      tabIndex={0}
                      className="p-2 text-default-500 hover:text-primary hover:bg-primary/20 rounded-medium transition-colors cursor-pointer flex items-center justify-center"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setVariationToDuplicate(variation);
                      }}
                    >
                      <Copy className="size-4" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      className="p-2 text-danger hover:bg-danger/20 rounded-medium transition-colors cursor-pointer flex items-center justify-center"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setVariationToDelete(variation);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </span>
                  </div>
                </div>
              }
              subtitle={<span className="text-xs text-default-400">{StylesOptionsLabels[variation.project_assets?.find((a: any) => a.role === AssetRoles.GENERATED_VIDEO)?.metadata?.style as Style] || "No Style Selected"}</span>}
              aria-label={variation.title}
            >
              <SceneVariationCard variation={variation} isExpanded={selectedKeys === "all" || selectedKeys.has(`variation-${variation.uuid}`)} />
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

      <ConfirmationModal
        isOpen={!!variationToDuplicate}
        onClose={() => setVariationToDuplicate(null)}
        onConfirm={handleDuplicate}
        title="Duplicate Scene Variation"
        description={`Are you sure you want to duplicate "${variationToDuplicate?.title}"?`}
        confirmText="Duplicate"
        confirmColor="primary"
        isLoading={duplicateMutation.isPending}
      />
    </div>
  );
}

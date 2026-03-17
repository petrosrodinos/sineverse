import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useProjectAssets } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles, ProjectAssetTypes } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { EnrichProjectAssetVideoPopover } from "./EnrichProjectAssetVideoPopover";
import { ProjectAssetVideoIteration } from "./ProjectAssetVideoIteration";
import { Video } from "lucide-react";

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
  isEnriched?: boolean;
  handleClose?: () => void;
  isExpanded?: boolean;
}

export function SceneVariationCard({ variation, isEnriched, handleClose, isExpanded }: SceneVariationCardProps) {
  const { data: videoAssetsResponse } = useProjectAssets(
    { scene_variation_uuid: variation?.uuid, type: ProjectAssetTypes.VIDEO },
    { enabled: !!variation?.uuid && !!isExpanded }
  );

  const videoAssets = videoAssetsResponse?.data || [];
  const promptImageAsset = variation?.project_assets?.find((a: any) => a.role === AssetRoles.PROMPT_IMAGE);

  const defaultKey = (videoAssets.find((a: any) => a.selected) || videoAssets[0])?.uuid;

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h4 className="text-base font-medium">Prompt & Configuration</h4>
          <p className="text-xs text-default-500">Edit prompt and generation settings.</p>
        </div>
        {!isEnriched && <div className="flex items-center gap-2">
          {variation?.uuid && <EnrichProjectAssetVideoPopover sceneVariationUuid={variation.uuid} />}
        </div>}
      </div>

      {videoAssets.length > 0 ? (
        <Accordion variant="splitted" selectionMode="single" defaultSelectedKeys={defaultKey ? [defaultKey] : []}>
            {videoAssets.map((asset: any, index: number) => (
            <AccordionItem 
                key={asset.uuid} 
                value={asset.uuid} 
                title={
                    <div className="flex items-center gap-2">
                        <Video className="size-4" />
                        <span className="text-sm font-medium">Iteration {videoAssets.length - index}</span>
                        {asset.selected && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Selected</span>}
                    </div>
                }
            >
                <div className="py-2">
                    <ProjectAssetVideoIteration 
                        asset={asset} 
                        variation={variation as any} 
                        promptImageAsset={promptImageAsset as any} 
                    />
                </div>
            </AccordionItem>
            ))}
        </Accordion>
       ) : (
          <div className="flex items-center justify-center p-8 bg-default-100 dark:bg-default-50 rounded-xl border border-dashed border-default-200">
             <p className="text-sm text-default-500">No video iterations generated yet.</p>
          </div>
       )}
    </div>
  );
}

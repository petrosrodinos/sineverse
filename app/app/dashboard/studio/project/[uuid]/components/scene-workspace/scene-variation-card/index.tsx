"use client";
import { useState, useMemo } from "react";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Accordion, AccordionItem, Button, Chip, Spinner, Skeleton } from "@heroui/react";
import { useProjectAssets } from "@/features/project-assets/hooks/use-project-assets";
import { ProjectAssetTypes, ProjectAssetStatuses, AssetRoles } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { Video, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import dynamic from 'next/dynamic';

const ProjectAssetVideo = dynamic(() => import("./ProjectAssetVideo"), {
  loading: () => (
    <div className="flex flex-col gap-6 w-full animate-pulse">
        <Skeleton className="w-full aspect-video rounded-xl" />
        <div className="flex flex-col gap-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-default-200 dark:border-default-100/10">
            <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
        </div>
    </div>
  ),
  ssr: false
});

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
  isExpanded?: boolean;
}

export function SceneVariationCard({ variation, isExpanded }: SceneVariationCardProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const projectAssetsQuery = useMemo(() => ({ 
    scene_variation_uuid: variation?.uuid,
  }), [variation?.uuid]);

  const { data: allAssetsResponse } = useProjectAssets(
    projectAssetsQuery,
    { 
      enabled: !!variation?.uuid && !!isExpanded,
      refetchInterval: (query: any) => {
        const hasProcessing = query.state?.data?.data?.some((a: any) => 
          a.status === ProjectAssetStatuses.PROCESSING || a.status === ProjectAssetStatuses.PENDING
        );
        return hasProcessing ? 3000 : false;
      }
    }
  );

  const allAssets = allAssetsResponse?.data || [];
  const videoAssets = allAssets.filter((a: any) => a.type === ProjectAssetTypes.VIDEO);
  const promptImageAssets = allAssets.filter((a: any) => a.role === AssetRoles.PROMPT_IMAGE);

  const defaultKey = (videoAssets.find((a: any) => a.selected) || videoAssets[0])?.uuid;

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h4 className="text-base font-medium">Prompt & Configuration</h4>
          <p className="text-xs text-default-500">Edit prompt and generation settings.</p>
        </div>
        <div>
           <Button color="primary" variant="flat" size="sm" startContent={<Plus className="size-4" />} onPress={() => setIsCreateModalOpen(true)}>
             Create Video
           </Button>
        </div>
      </div>

      {videoAssets.length > 0 ? (
        <Accordion variant="splitted" selectionMode="single" defaultSelectedKeys={defaultKey ? [defaultKey] : []}>
            {videoAssets.map((asset: any, index: number) => (
            <AccordionItem 
                key={asset.uuid} 
                value={asset.uuid} 
                title={
                    <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-2">
                            <Video className="size-4 text-default-500" />
                            <span className="text-sm font-semibold">Iteration {videoAssets.length - index}</span>
                            {asset.selected && (
                                <Chip size="sm" color="primary" variant="flat" className="h-5 px-1 text-[10px]">
                                    Selected
                                </Chip>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {(asset.status === ProjectAssetStatuses.PROCESSING || asset.status === ProjectAssetStatuses.PENDING) && (
                                <Chip size="sm" variant="dot" color="primary" className="h-5 border-none bg-transparent">
                                    Processing
                                </Chip>
                            )}
                            {asset.status === ProjectAssetStatuses.FAILED && (
                                <Chip size="sm" variant="flat" color="danger" className="h-5 px-2">
                                    Failed
                                </Chip>
                            )}
                            {asset.status === ProjectAssetStatuses.COMPLETED && (
                                <Chip size="sm" variant="flat" color="success" className="h-5 px-2 shadow-sm">
                                    Ready
                                </Chip>
                            )}
                        </div>
                    </div>
                }
            >
                <div className="py-2">
                    <ProjectAssetVideo 
                        asset={asset} 
                        variation={variation as any} 
                        promptImageAssets={promptImageAssets}
                    />
                </div>
            </AccordionItem>
            ))}
        </Accordion>
       ) : (
           <div className="flex flex-col items-center justify-center p-12 bg-default-50/50 dark:bg-default-100/10 rounded-3xl border-2 border-dashed border-default-200/50 gap-4 text-center">
             <div className="p-4 bg-primary/10 rounded-full">
               <Video className="size-8 text-primary animate-pulse" />
             </div>
             <div className="space-y-1">
               <h5 className="text-base font-semibold">No videos yet</h5>
               <p className="text-sm text-default-500 max-w-[240px]">
                 Start by creating your first video for this scene.
               </p>
             </div>
             <Button 
               color="primary" 
               variant="shadow" 
               startContent={<Plus className="size-4" />} 
               onPress={() => setIsCreateModalOpen(true)}
               className="mt-2"
             >
               Create Video
             </Button>
           </div>
       )}

      <Modal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title={<h3 className="text-lg font-semibold">Create Video</h3>}
        size="2xl"
        scrollBehavior="inside"
      >
        <div className="max-h-[70vh] overflow-y-auto no-scrollbar pb-6 px-1">
          <ProjectAssetVideo 
              variation={variation as any} 
              isEnriched={true}
              promptImageAssets={promptImageAssets}
              handleClose={() => setIsCreateModalOpen(false)}
          />
        </div>
      </Modal>

    </div>
  );
}

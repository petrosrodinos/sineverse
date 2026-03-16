"use client";
import type { SceneVariation, UpdateSceneVariationDto } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import {Textarea } from "@heroui/input";
import { Save, Info, Video, AlertCircle, CheckCircle } from "lucide-react";
import { VideoGenerationOptions } from "../VideoGenerationOptions";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { useCreateSceneVideo, useProjectAssetByUuid, useProjectAssets, useSelectProjectAsset } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles, ProjectAssetStatuses, ProjectAssetTypes } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { VideoGenerationConfig } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import { SceneVariationImageUpload } from "../SceneVariationImageUpload";
import { EnrichVariationPopover } from "../EnrichVariationPopover";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";
import { Spinner } from "@heroui/spinner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
  isEnriched?: boolean;
  handleClose?: () => void;
  isExpanded?: boolean;
}

export function SceneVariationCard({ variation, isEnriched, handleClose, isExpanded }: SceneVariationCardProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const updateMutation = useUpdateSceneVariation();
  const createVideoMutation = useCreateSceneVideo();
  const selectVideoMutation = useSelectProjectAsset();
  const queryClient = useQueryClient();

  const { data: videoAssetsResponse } = useProjectAssets(
    { scene_variation_uuid: variation?.uuid, type: ProjectAssetTypes.VIDEO },
    { enabled: !!variation?.uuid && !!isExpanded }
  );

  const videoAssets = videoAssetsResponse?.data || [];
  
  const pendingVideo = videoAssets.find((a: any) => a.status === ProjectAssetStatuses.PROCESSING || a.status === ProjectAssetStatuses.PENDING);
  const activeVideoAsset = pendingVideo || videoAssets.find((a: any) => a.selected) || videoAssets[0];
  const promptImageAsset = variation?.project_assets?.find((a: any) => a.role === AssetRoles.PROMPT_IMAGE);

  const videoUuid = activeVideoAsset?.uuid;

  const { data: polledVideo } = useProjectAssetByUuid(videoUuid || "");

  useEffect(() => {
    if (polledVideo?.status === ProjectAssetStatuses.COMPLETED || polledVideo?.status === ProjectAssetStatuses.FAILED) {
      queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
      queryClient.invalidateQueries({ queryKey: ["project-assets"] });
    }
  }, [polledVideo?.status, queryClient]);

  const displayVideoStatus = polledVideo?.status || activeVideoAsset?.status;
  const displayVideo = polledVideo || activeVideoAsset;

  const [editedConfig, setEditedConfig] = useState<Partial<VideoGenerationConfig>>(() => {
    return variation?.project_assets?.find((a: any) => a.role === AssetRoles.GENERATED_VIDEO)?.metadata || {};
  });

  useEffect(() => {
    if (videoAssetsResponse?.data) {
      const va = activeVideoAsset;
      if (va?.metadata) {
         setEditedConfig(prev => ({ ...va.metadata, ...prev }));
      }
    }
  }, [videoAssetsResponse?.data, activeVideoAsset]);


  const handleConfigChange = (field: string, value: any) => {
    setEditedConfig(prev => ({ ...prev, [field]: value }));
  };

  const isImageToVideoModel = editedConfig.ai_model?.includes("image-to-video") || editedConfig.ai_model?.includes("i2v");

  const validateVariation = () => {
    if (!editedConfig.ai_model) {
      addToast({
        title: "Model Selection Required",
        description: "Please select an AI model for video generation.",
        severity: "danger",
      });
      return false;
    }

    if (isImageToVideoModel && !promptImageAsset?.document?.url) {
      addToast({
        title: "Image Selection Required",
        description: "Please upload an image for image-to-video models.",
        severity: "danger",
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!variation?.uuid) return false;
    
    if (!validateVariation()) return false;
    const dto: UpdateSceneVariationDto = {};
    
    // Clean up undefined properties
    Object.keys(dto).forEach(key => dto[key as keyof UpdateSceneVariationDto] === undefined && delete dto[key as keyof UpdateSceneVariationDto]);

    await updateMutation.mutateAsync({
      uuid: variation.uuid,
      sceneVariation: dto,
    });

    if(isEnriched) {
      handleClose?.();
    }
    return true;
  };

  const handleGenerateVideo = async () => {
    if (!variation?.uuid || !variation?.scene_uuid) return;
    
    if (!validateVariation()) return;

    if (activeVideoAsset && activeVideoAsset.status === ProjectAssetStatuses.COMPLETED) {
      setIsConfirmOpen(true);
      return;
    }

    await executeGeneration();
  };

  const executeGeneration = async () => {
    if (!variation?.uuid || !variation?.scene_uuid) return;

    const saved = await handleSave();
    if (!saved) return;
    
    await createVideoMutation.mutateAsync({
      scene_uuid: variation.scene_uuid,
      scene_variation_uuid: variation.uuid,
      ...editedConfig,
    } as any);
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h4 className="text-base font-medium">Prompt & Configuration</h4>
          <p className="text-xs text-default-500">Edit prompt and generation settings.</p>
        </div>
        {!isEnriched &&<div className="flex items-center gap-2">
          {variation?.uuid && <EnrichVariationPopover sceneVariationUuid={variation.uuid} />}
        </div>}
      </div>

      {/* Video Display */}
      {displayVideoStatus === ProjectAssetStatuses.PROCESSING && (
        <div className="w-full aspect-video rounded-xl bg-default-100 dark:bg-default-50 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-default-200">
          <Spinner size="lg" color="primary" />
          <div className="text-center">
            <p className="text-sm font-medium">Generating Video...</p>
            <p className="text-xs text-default-500">This may take a few minutes</p>
          </div>
        </div>
      )}

      {displayVideoStatus === ProjectAssetStatuses.COMPLETED && displayVideo?.document?.url && (
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-default-200">
          <video 
            src={displayVideo.document.url} 
            controls 
            className="w-full h-full object-contain"
            poster={displayVideo?.document?.url ? undefined : promptImageAsset?.document?.url}
          />
        </div>
      )}

      {displayVideoStatus === ProjectAssetStatuses.FAILED && (
        <div className="w-full p-4 rounded-xl bg-danger-50 dark:bg-danger-900/10 border border-danger-200 flex items-start gap-3">
          <AlertCircle className="size-5 text-danger" />
          <div>
            <p className="text-sm font-semibold text-danger">Generation Failed</p>
            <p className="text-xs text-danger-500">{displayVideo?.error_message || "An unexpected error occurred during generation."}</p>
          </div>
        </div>
      )}

      {videoAssets.length > 0 && (
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium">Video Iterations</h5>
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {videoAssets.map((asset: any, index: number) => {
               const isSelected = activeVideoAsset?.uuid === asset.uuid;
               const isCompleted = asset.status === ProjectAssetStatuses.COMPLETED;
               
               return (
                 <div 
                   key={asset.uuid} 
                   onClick={() => {
                      if(isCompleted) selectVideoMutation.mutate(asset.uuid);
                   }}
                   className={`relative flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${isSelected ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' : 'border-transparent hover:border-default-300'} ${!isCompleted ? 'opacity-60 cursor-not-allowed' : ''}`}
                 >
                    {isCompleted && asset.document?.url ? (
                       <video src={asset.document.url} className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full bg-default-100 flex items-center justify-center">
                          {asset.status === ProjectAssetStatuses.PROCESSING || asset.status === ProjectAssetStatuses.PENDING ? (
                             <Spinner size="sm" />
                          ) : (
                             <Video className="size-4 text-default-400" />
                          )}
                       </div>
                    )}
                    
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
                        <CheckCircle className="size-3" />
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 backdrop-blur-sm">
                      <p className="text-[10px] text-white font-medium truncate text-center">
                        Iteration {videoAssets.length - index}
                      </p>
                    </div>
                 </div>
               );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        
        <ExpandableTextarea 
            label="Prompt" 
            variant="bordered" 
            value={editedConfig.prompt_text || ""}
            onValueChange={(val: string) => handleConfigChange("prompt_text", val)}
            classNames={{ input: "min-h-[80px]", inputWrapper: "rounded-xl" }} 
            minRows={3} 
        />
        <SceneVariationImageUpload 
            variationUuid={variation?.uuid || ""} 
            promptImageUrl={promptImageAsset?.document?.url} 
            isImageToVideoModel={!!isImageToVideoModel} 
        />
         
        <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden" selectedKeys={negativeOpen ? ["negative"] : []} onSelectionChange={(k) => setNegativeOpen(Array.from(k).includes("negative"))}>
          <AccordionItem key="negative" aria-label="Negative prompt" title={<span className="text-sm font-medium">Negative Prompt</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
            <Textarea 
                variant="bordered" 
                value={editedConfig.negative_prompt || ""}
                onValueChange={(val) => handleConfigChange("negative_prompt", val)}
                classNames={{ inputWrapper: "rounded-xl" }} 
                minRows={2} 
                placeholder="Terms you want to avoid..." 
            />
          </AccordionItem>
        </Accordion>
      </div>



      <div className="dark:border-default-100/10">
        <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
          <AccordionItem key="video-options" aria-label="Video Generation Options" title={<span className="text-sm font-medium">Video Generation Options</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
            <VideoGenerationOptions config={editedConfig} onChange={handleConfigChange} />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex justify-end pt-2 border-t border-default-200 dark:border-default-100/10">
        
        {isEnriched && (
          <Button
          color="danger"
          className="mr-2"
          onPress={handleClose}
          >Cancel</Button>
        )}
        <Button 
            variant="flat"
            color="primary"
            startContent={<Video className="size-4" />}
            onPress={handleGenerateVideo}
            isLoading={createVideoMutation.isPending}
            isDisabled={!variation?.uuid || !variation?.scene_uuid || !editedConfig.ai_model || displayVideoStatus === ProjectAssetStatuses.PROCESSING}
            className="mr-2"
        >
            {displayVideoStatus === ProjectAssetStatuses.COMPLETED ? "Regenerate Video" : "Generate Video"}
        </Button>
        <Button 
            color="primary" 
            startContent={<Save className="size-4" />} 
            onPress={handleSave}
            isLoading={updateMutation.isPending}
        >
            Save
        </Button>
      </div>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeGeneration}
        title="Regenerate Video"
        description="Are you sure you want to regenerate this video? The previous video will be lost."
        confirmText="Regenerate"
        confirmColor="primary"
        isLoading={createVideoMutation.isPending}
      />
    </div>
  );
}

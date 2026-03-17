"use client";
import type { SceneVariation, UpdateSceneVariationDto } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Save, Video, AlertCircle, CheckCircle } from "lucide-react";
import { VideoGenerationOptions } from "./VideoGenerationOptions";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { useCreateSceneVideo, useSelectProjectAsset, useProjectAsset } from "@/features/project-assets/hooks/use-project-assets";
import { AssetRoles, ProjectAssetStatuses, ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { VideoGenerationConfig } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import { SceneVariationImageUpload } from "./SceneVariationImageUpload";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";
import { Spinner } from "@heroui/spinner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

interface ProjectAssetVideoIterationProps {
  asset: ProjectAsset;
  variation: Partial<SceneVariation>;
  promptImageAsset?: ProjectAsset;
}

export function ProjectAssetVideoIteration({ asset, variation, promptImageAsset }: ProjectAssetVideoIterationProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  const updateMutation = useUpdateSceneVariation();
  const createVideoMutation = useCreateSceneVideo();
  const selectVideoMutation = useSelectProjectAsset();
  const queryClient = useQueryClient();

  const { data: polledVideo } = useProjectAsset(asset?.uuid || "");

  useEffect(() => {
    if (polledVideo?.status === ProjectAssetStatuses.COMPLETED || polledVideo?.status === ProjectAssetStatuses.FAILED) {
      queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
      queryClient.invalidateQueries({ queryKey: ["project-assets"] });
    }
  }, [polledVideo?.status, queryClient]);

  const displayVideoStatus = polledVideo?.status || asset?.status;
  const displayVideo = polledVideo || asset;

  const [editedConfig, setEditedConfig] = useState<Partial<VideoGenerationConfig>>(() => {
    return asset?.metadata || {};
  });

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

    return true;
  };

  const handleGenerateVideo = async () => {
    if (!variation?.uuid || !variation?.scene_uuid) return;
    
    if (!validateVariation()) return;

    if (displayVideoStatus === ProjectAssetStatuses.COMPLETED) {
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

  const isSelected = displayVideo?.selected;

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
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
        <div className={`w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg ring-1 transition-all ${isSelected ? 'ring-primary border border-primary/50' : 'ring-default-200'}`}>
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
      
      <div className="flex justify-between items-center pt-2 border-t border-default-200 dark:border-default-100/10">
        <div>
           {displayVideoStatus === ProjectAssetStatuses.COMPLETED && (
              <Button 
                variant={isSelected ? "solid" : "flat"} 
                color={isSelected ? "success" : "default"} 
                startContent={<CheckCircle className="size-4" />} 
                onPress={() => selectVideoMutation.mutate(asset.uuid)}
                isLoading={selectVideoMutation.isPending}
                isDisabled={isSelected}
              >
                  {isSelected ? "Selected" : "Select Video"}
              </Button>
           )}
        </div>
        <div className="flex gap-2">
            <Button 
                variant="flat"
                color="primary"
                startContent={<Video className="size-4" />}
                onPress={handleGenerateVideo}
                isLoading={createVideoMutation.isPending}
                isDisabled={!variation?.uuid || !variation?.scene_uuid || !editedConfig.ai_model || displayVideoStatus === ProjectAssetStatuses.PROCESSING}
            >
                {displayVideoStatus === ProjectAssetStatuses.COMPLETED ? "Regenerate" : "Generate"}
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
      </div>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeGeneration}
        title="Regenerate Video"
        description="Are you sure you want to regenerate this video? This will spawn a new iteration."
        confirmText="Regenerate"
        confirmColor="primary"
        isLoading={createVideoMutation.isPending}
      />
    </div>
  );
}

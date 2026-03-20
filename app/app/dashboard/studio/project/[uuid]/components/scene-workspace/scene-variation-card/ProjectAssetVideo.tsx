"use client";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem, Button, Textarea, Spinner } from "@heroui/react";
import { Save, Video, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import { VideoGenerationOptions } from "./VideoGenerationOptions";
import { useCreateSceneVideo, useSelectProjectAsset, useProjectAsset, useDeleteProjectAsset, useUploadSceneVariationPromptImage, useCreateSceneVariationImage } from "@/features/project-assets/hooks/use-project-assets";
import { ProjectAssetStatuses, ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { VideoGenerationConfig } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import { SceneVariationImageUpload } from "./SceneVariationImageUpload";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { EnrichProjectAssetVideoPopover } from "./EnrichProjectAssetVideoPopover";
import { Modal } from "@/components/ui/modal";

interface ProjectAssetVideoProps {
  asset?: Partial<ProjectAsset>;
  variation: Partial<SceneVariation>;
  promptImageAssets?: ProjectAsset[];
  config?: VideoGenerationConfig;
  isEnriched?: boolean;
  handleClose?: () => void;
}

export default function ProjectAssetVideo({ asset, variation, promptImageAssets, config, isEnriched, handleClose }: ProjectAssetVideoProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [enrichedVariation, setEnrichedVariation] = useState<VideoGenerationConfig | null>(null);
  const [isEnrichModalOpen, setIsEnrichModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  const [pendingUploadFile, setPendingUploadFile] = useState<File | null>(null);
  const [pendingGenerateConfig, setPendingGenerateConfig] = useState<any | null>(null);

  const createVideoMutation = useCreateSceneVideo();
  const selectVideoMutation = useSelectProjectAsset();
  const deleteAssetMutation = useDeleteProjectAsset();
  const uploadImageMutation = useUploadSceneVariationPromptImage();
  const createImageMutation = useCreateSceneVariationImage();
  const queryClient = useQueryClient();

  const { data: polledVideo } = useProjectAsset(asset?.uuid || "", {
    refetchInterval: (query: any) => {
      const status = query.state?.data?.status || (asset as any)?.status;
      return (status === ProjectAssetStatuses.PROCESSING || status === ProjectAssetStatuses.PENDING) ? 3000 : false;
    }
  });

  useEffect(() => {
    if (polledVideo?.status === ProjectAssetStatuses.COMPLETED || polledVideo?.status === ProjectAssetStatuses.FAILED) {
      queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
      queryClient.invalidateQueries({ queryKey: ["project-assets"] });
    }
  }, [polledVideo?.status, queryClient]);

  const displayVideoStatus = polledVideo?.status || asset?.status;
  const displayVideo = polledVideo || asset;

  const [editedConfig, setEditedConfig] = useState<Partial<VideoGenerationConfig>>(() => {
    return config || asset?.metadata || {};
  });

  const handleConfigChange = (field: string, value: any) => {
    setEditedConfig(prev => ({ ...prev, [field]: value }));
  };

  const isImageToVideoModel = editedConfig.ai_model?.includes("image-to-video") || editedConfig.ai_model?.includes("i2v");

  const latestPromptImageUuid = promptImageAssets && promptImageAssets.length > 0 ? promptImageAssets[0].uuid : undefined;

  const validateVariation = () => {
    if (!editedConfig.ai_model) {
      addToast({
        title: "Model Selection Required",
        description: "Please select an AI model for video generation.",
        severity: "danger",
      });
      return false;
    }

    if (isImageToVideoModel && (!promptImageAssets || promptImageAssets.length === 0) && !pendingUploadFile && !pendingGenerateConfig) {
      addToast({
        title: "Image Selection Required",
        description: "Please upload or configure an image for image-to-video models.",
        severity: "danger",
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!variation?.uuid || !variation?.scene_uuid) return false;
    
    if (!validateVariation()) return false;

    let finalPromptImageUuids: string[] = latestPromptImageUuid ? [latestPromptImageUuid] : [];

    try {
      if (isEnriched) {
        // Execute deferred image actions if in modal create mode
        if (pendingUploadFile) {
          const asset = await uploadImageMutation.mutateAsync({ uuid: variation.uuid, file: pendingUploadFile });
          finalPromptImageUuids = [asset.uuid];
        } else if (pendingGenerateConfig) {
          const result = await createImageMutation.mutateAsync({ uuid: variation.uuid, payload: pendingGenerateConfig }) as any;
          if (result?.asset?.uuid) {
            finalPromptImageUuids = [result.asset.uuid];
          }
        }
      }

      await createVideoMutation.mutateAsync({
        scene_uuid: variation.scene_uuid,
        scene_variation_uuid: variation.uuid,
        prompt_image_uuids: finalPromptImageUuids,
        ...editedConfig,
      } as any);

      handleClose?.();
      return true;
    } catch (error: any) {
      addToast({
        title: "Creation Failed",
        description: error.message || "An error occurred while creating the video iteration.",
        severity: "danger",
      });
      return false;
    }
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

    await handleSave();
    setIsConfirmOpen(false);
  };

  const handleDeleteAsset = async () => {
    if (!asset?.uuid) return;
    await deleteAssetMutation.mutateAsync(asset.uuid);
    setIsDeleteConfirmOpen(false);
  };

  const isSelected = displayVideo?.selected;

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      {/* Video Display */}
      {!isEnriched && (displayVideoStatus === ProjectAssetStatuses.PROCESSING || displayVideoStatus === ProjectAssetStatuses.PENDING) && (
        <div className="w-full aspect-video rounded-xl bg-default-100 dark:bg-default-50 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-default-200">
          <Spinner size="lg" color="primary" />
          <div className="text-center">
            <p className="text-sm font-medium">Generating Video...</p>
            <p className="text-xs text-default-500">This may take a few minutes</p>
          </div>
        </div>
      )}

      {!isEnriched && displayVideoStatus === ProjectAssetStatuses.COMPLETED && displayVideo?.document?.url && (
        <div className="flex flex-col gap-3">
          <div className={`w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg ring-1 transition-all ${isSelected ? 'ring-primary border border-primary/50' : 'ring-default-200'}`}>
            <video 
              src={displayVideo.document.url} 
              controls 
              className="w-full h-full object-contain"
              poster={displayVideo?.document?.url ? undefined : (displayVideo as any).prompt_images?.[0]?.document?.url || promptImageAssets?.[0]?.document?.url}
            />
          </div>
          {(displayVideo as any).prompt_images?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-default-500">Prompt Images Used:</p>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {(displayVideo as any).prompt_images.map((imgAsset: any) => (
                  <div key={imgAsset.uuid} className="size-16 rounded-lg overflow-hidden flex-shrink-0 border border-default-200">
                    <img src={imgAsset.document.url} className="w-full h-full object-cover" alt="Prompt reference" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isEnriched && displayVideoStatus === ProjectAssetStatuses.FAILED && (
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
            promptImageAssets={promptImageAssets} 
            isImageToVideoModel={!!isImageToVideoModel}
            mode={isEnriched ? "deferred" : "immediate"}
            onPendingFileChange={setPendingUploadFile}
            onPendingConfigChange={setPendingGenerateConfig}
            pendingFile={pendingUploadFile}
            pendingConfig={pendingGenerateConfig}
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
        <div className="flex gap-2">
           {!isEnriched && displayVideoStatus === ProjectAssetStatuses.COMPLETED && asset?.uuid && (
              <Button 
                variant={isSelected ? "solid" : "flat"} 
                color={isSelected ? "success" : "default"} 
                startContent={<CheckCircle className="size-4" />} 
                onPress={() => selectVideoMutation.mutate(asset.uuid as string)}
                isLoading={selectVideoMutation.isPending}
                isDisabled={isSelected}
              >
                  {isSelected ? "Selected" : "Select Video"}
              </Button>
           )}
           {!isEnriched && asset?.uuid && (
              <Button 
                isIconOnly 
                variant="flat" 
                color="danger" 
                className="rounded-xl"
                onPress={() => setIsDeleteConfirmOpen(true)}
              >
                <Trash2 className="size-4" />
              </Button>
           )}
        </div>
        <div className="flex gap-2">
            {!isEnriched && variation?.uuid && asset?.uuid && (
              <EnrichProjectAssetVideoPopover 
                project_asset_uuid={asset.uuid} 
                onEnriched={(data) => {
                  setEnrichedVariation(data);
                  setIsEnrichModalOpen(true);
                }}
              />
            )}
            {isEnriched ? (
                <>
                    {handleClose && <Button variant="flat" onPress={handleClose}>Cancel</Button>}
                    <Button 
                        color="primary" 
                        startContent={<Save className="size-4" />} 
                        onPress={handleSave}
                        isLoading={createVideoMutation.isPending || uploadImageMutation.isPending || createImageMutation.isPending}
                    >
                        Create
                    </Button>
                </>
            ) : (
                <>
                    <Button 
                        variant="flat"
                        color="primary"
                        startContent={<Video className="size-4" />}
                        onPress={handleGenerateVideo}
                        isLoading={createVideoMutation.isPending}
                        isDisabled={!variation?.uuid || !variation?.scene_uuid || !editedConfig.ai_model || displayVideoStatus === ProjectAssetStatuses.PROCESSING || displayVideoStatus === ProjectAssetStatuses.PENDING}
                    >
                        {displayVideoStatus === ProjectAssetStatuses.COMPLETED ? "Regenerate" : "Generate"}
                    </Button>
                </>
            )}
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

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteAsset}
        title="Delete Video"
        description="Are you sure you want to delete this video? This action cannot be undone."
        confirmText="Delete"
        confirmColor="danger"
        isLoading={deleteAssetMutation.isPending}
      />

      <Modal
        isOpen={isEnrichModalOpen}
        onOpenChange={setIsEnrichModalOpen}
        title={<h3 className="text-lg font-semibold">Review</h3>}
        size="2xl"
        scrollBehavior="inside"
      >
        <div className="max-h-[70vh] overflow-y-auto no-scrollbar pb-6 px-1">
          {enrichedVariation && (
            <ProjectAssetVideo 
              asset={asset} 
              variation={variation} 
              promptImageAssets={promptImageAssets} 
              config={enrichedVariation} 
              isEnriched 
              handleClose={() => setIsEnrichModalOpen(false)} 
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

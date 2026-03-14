"use client";
import type { SceneVariation, UpdateSceneVariationDto } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Tooltip } from "@heroui/tooltip";
import { Save, Info, Video, AlertCircle } from "lucide-react";
import { VideoGenerationOptions } from "./VideoGenerationOptions";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { useCreateSceneVideo, useProjectAssetByUuid } from "@/features/project-assets/hooks/use-project-assets";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { SceneVariationImageUpload } from "./SceneVariationImageUpload";
import { EnrichVariationPopover } from "./EnrichVariationPopover";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";
import { Spinner } from "@heroui/spinner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
  isEnriched?: boolean;
  handleClose?: () => void;
}

export function SceneVariationCard({ variation, isEnriched, handleClose }: SceneVariationCardProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editedVariation, setEditedVariation] = useState<Partial<SceneVariation>>(variation || {});
  const updateMutation = useUpdateSceneVariation();
  const createVideoMutation = useCreateSceneVideo();
  const queryClient = useQueryClient();

  const videoUuid = variation?.video?.uuid;
  const isProcessing = variation?.video?.status === ProjectAssetStatuses.PROCESSING;

  const { data: polledVideo } = useProjectAssetByUuid(videoUuid || "");

  useEffect(() => {
    if (polledVideo?.status === ProjectAssetStatuses.COMPLETED || polledVideo?.status === ProjectAssetStatuses.FAILED) {
      queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
    }
  }, [polledVideo?.status, queryClient]);

  const displayVideoStatus = polledVideo?.status || variation?.video?.status;
  const displayVideo = polledVideo || variation?.video;

  useEffect(() => {
    if (variation) {
      setEditedVariation(variation);
    }
  }, [variation]);

  const handleOptionChange = (field: string, value: any) => {
    setEditedVariation(prev => ({ ...prev, [field]: value }));
  };

  const isImageToVideoModel = editedVariation.ai_model?.includes("image-to-video") || editedVariation.ai_model?.includes("i2v");

  const validateVariation = () => {
    if (!editedVariation.ai_model) {
      addToast({
        title: "Model Selection Required",
        description: "Please select an AI model for video generation.",
        severity: "danger",
      });
      return false;
    }

    if (isImageToVideoModel && !editedVariation.prompt_image?.document?.url && !editedVariation.prompt_image_uuid) {
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
    const dto: UpdateSceneVariationDto = {
        title: editedVariation.title,
        prompt_text: editedVariation.prompt_text,
        negative_prompt: editedVariation.negative_prompt,
        style: editedVariation.style,
        camera_style: editedVariation.camera_style,
        shot_type: editedVariation.shot_type,
        camera_movement: editedVariation.camera_movement,
        lens_type: editedVariation.lens_type,
        depth_of_field: editedVariation.depth_of_field,
        lighting: editedVariation.lighting,
        color_grade: editedVariation.color_grade,
        time_of_day: editedVariation.time_of_day,
        aspect_ratio: editedVariation.aspect_ratio,
        resolution: editedVariation.resolution,
        fps: editedVariation.fps,
        duration_sec: editedVariation.duration_sec,
        ai_model: editedVariation.ai_model,
        creativity: editedVariation.creativity,
        motion_strength: editedVariation.motion_strength,
        guidance_scale: editedVariation.guidance_scale,
        selected: editedVariation.selected,
        seed: editedVariation.seed,
        prompt_image_uuid: editedVariation.prompt_image_uuid,
    };
    
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

    if (variation?.video?.status === ProjectAssetStatuses.COMPLETED) {
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
    });
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
            poster={displayVideo?.document?.url ? undefined : variation?.prompt_image?.document?.url}
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
        
        <Input
            label="Title"
            value={editedVariation.title || ""}
            onValueChange={(val) => handleOptionChange("title", val)}
            variant="bordered"
            classNames={{ inputWrapper: "rounded-xl" }}
        />
        <ExpandableTextarea 
            label="Prompt" 
            variant="bordered" 
            value={editedVariation.prompt_text || ""}
            onValueChange={(val: string) => handleOptionChange("prompt_text", val)}
            classNames={{ input: "min-h-[80px]", inputWrapper: "rounded-xl" }} 
            minRows={3} 
        />
             <div className="flex items-center px-1">
          <Checkbox
              isSelected={editedVariation.selected ?? false}
              onValueChange={(val) => handleOptionChange("selected", val)}
              classNames={{
                  label: "w-full"
              }}
          >
              <div className="flex items-center gap-1.5 pointer-events-none">
                  <span className="pointer-events-auto text-sm font-medium">Selected</span>
                  <Tooltip content="Mark this variation as the selected one for the scene." placement="top" className="max-w-[250px]" delay={0} closeDelay={0}>
                      <span className="pointer-events-auto flex items-center">
                          <Info className="w-3.5 h-3.5 text-default-400 cursor-help" />
                      </span>
                  </Tooltip>
              </div>
          </Checkbox>
      </div>
        <SceneVariationImageUpload 
            variationUuid={variation?.uuid || ""} 
            promptImageUrl={editedVariation.prompt_image?.document?.url} 
            isImageToVideoModel={!!isImageToVideoModel} 
        />
         
        <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden" selectedKeys={negativeOpen ? ["negative"] : []} onSelectionChange={(k) => setNegativeOpen(Array.from(k).includes("negative"))}>
          <AccordionItem key="negative" aria-label="Negative prompt" title={<span className="text-sm font-medium">Negative Prompt</span>} classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}>
            <Textarea 
                variant="bordered" 
                value={editedVariation.negative_prompt || ""}
                onValueChange={(val) => handleOptionChange("negative_prompt", val)}
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
            <VideoGenerationOptions sceneVariation={editedVariation} onChange={handleOptionChange} />
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
            isDisabled={!variation?.uuid || !variation?.scene_uuid || !editedVariation.ai_model || displayVideoStatus === ProjectAssetStatuses.PROCESSING}
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

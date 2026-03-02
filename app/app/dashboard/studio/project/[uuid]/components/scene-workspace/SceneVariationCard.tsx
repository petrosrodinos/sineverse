"use client";
import type { SceneVariation, UpdateSceneVariationDto } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {Save } from "lucide-react";
import { VideoGenerationOptions } from "./VideoGenerationOptions";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { EnrichPromptPopover } from "./EnrichPromptPopover";

interface SceneVariationCardProps {
  variation?: Partial<SceneVariation>;
  isEnriched?: boolean;
  handleClose?: () => void;
}

export function SceneVariationCard({ variation, isEnriched, handleClose }: SceneVariationCardProps) {
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [editedVariation, setEditedVariation] = useState<Partial<SceneVariation>>(variation || {});
  const updateMutation = useUpdateSceneVariation();

  useEffect(() => {
    if (variation) {
      setEditedVariation(variation);
    }
  }, [variation]);

  const handleOptionChange = (field: string, value: any) => {
    setEditedVariation(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!variation?.uuid) return;
    
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
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h4 className="text-base font-medium">Prompt & Configuration</h4>
          <p className="text-xs text-default-500">Edit prompt and generation settings.</p>
        </div>
        {!isEnriched &&<div className="flex items-center gap-2">
          {variation?.uuid && <EnrichPromptPopover sceneVariationUuid={variation.uuid} />}
        </div>}
      </div>
      
      <div className="flex flex-col gap-4">
        <Input
            label="Title"
            value={editedVariation.title || ""}
            onValueChange={(val) => handleOptionChange("title", val)}
            variant="bordered"
            classNames={{ inputWrapper: "rounded-xl" }}
        />
        <Textarea 
            label="Prompt" 
            variant="bordered" 
            value={editedVariation.prompt_text || ""}
            onValueChange={(val) => handleOptionChange("prompt_text", val)}
            classNames={{ input: "min-h-[80px]", inputWrapper: "rounded-xl" }} 
            minRows={3} 
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
            color="primary" 
            startContent={<Save className="size-4" />} 
            onPress={handleSave}
            isLoading={updateMutation.isPending}
        >
            Save
        </Button>
      </div>
    </div>
  );
}

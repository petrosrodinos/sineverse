"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Sparkles } from "lucide-react";
import { useEnrichSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { SceneVariationEnrichDto, SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
import { Modal } from "@/components/ui/modal";
import { SceneVariationCard } from "./SceneVariationCard";

const enrichSchema = z.object({
  directions: z.string().optional(),
  include_prompt: z.boolean(),
  include_negative_prompt: z.boolean(),
  include_video_generation_options: z.boolean(),
});

type EnrichFormValues = z.infer<typeof enrichSchema>;

interface EnrichVariationPopoverProps {
  sceneVariationUuid: string;
}

export function EnrichVariationPopover({ sceneVariationUuid }: EnrichVariationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrichedVariation, setEnrichedVariation] = useState<SceneVariation | null>(null);
  const {mutate, isPending} = useEnrichSceneVariation(sceneVariationUuid);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<EnrichFormValues>({
    resolver: zodResolver(enrichSchema),
    defaultValues: {
      directions: "",
      include_prompt: true,
      include_negative_prompt: true,
      include_video_generation_options: true,
    },
  });

  const onSubmit = async (data: EnrichFormValues) => {
    mutate({
      uuid: sceneVariationUuid,
      enrichDto: data as SceneVariationEnrichDto,
    }, {
      onSuccess: (data) => {
        setEnrichedVariation(data);
        setIsOpen(false);
        reset();
        setIsModalOpen(true);
      },
    })
    
  };

  return (
    <>
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end" showArrow offset={10}>
      <PopoverTrigger>
        <Button
          color="primary"
          isDisabled={isPending}
          isLoading={isPending}
          startContent={!isPending ? <Sparkles className="size-4" /> : undefined}
          className="rounded-xl font-medium"
        >
          Enrich
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-4 text-left">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">AI Enrichment</h4>
            <p className="text-sm text-default-500">
              Provide optional instructions to guide the AI, and choose which parts to enrich.
            </p>
          </div>
          
          <Textarea
            {...register("directions")}
            placeholder="Directions (e.g., Make it darker, more cinematic...)"
            variant="bordered"
            minRows={3}
            classNames={{ inputWrapper: "rounded-xl" }}
          />

          <div className="flex flex-col gap-2">
            <Checkbox 
              isSelected={watch("include_prompt")} 
              onValueChange={(val) => setValue("include_prompt", val)}
              size="sm"
              classNames={{ label: "text-sm text-foreground" }}
            >
              Include Prompt
            </Checkbox>
            <Checkbox 
              isSelected={watch("include_negative_prompt")} 
              onValueChange={(val) => setValue("include_negative_prompt", val)}
              size="sm"
              classNames={{ label: "text-sm text-foreground" }}
            >
              Include Negative Prompt
            </Checkbox>
            <Checkbox 
              isSelected={watch("include_video_generation_options")} 
              onValueChange={(val) => setValue("include_video_generation_options", val)}
              size="sm"
              classNames={{ label: "text-sm text-foreground" }}
            >
              Include Video Options
            </Checkbox>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="flat" onPress={() => setIsOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button size="sm" color="primary" type="submit" isLoading={isSubmitting || isPending} className="rounded-lg">
              Enrich
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>

    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={<h3 className="text-lg font-semibold">Review Enriched Variation</h3>}
      size="2xl"
      scrollBehavior="inside"
    >
      <div className="max-h-[70vh] overflow-y-auto no-scrollbar pb-6 px-1">
        {enrichedVariation && <SceneVariationCard variation={enrichedVariation} isEnriched handleClose={() => setIsModalOpen(false)}/>}
      </div>
    </Modal>
    </>
  );
}

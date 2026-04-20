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

import { useEnrichProjectAssetVideo } from "@/features/project-assets/hooks/use-project-assets";
import { ProjectAssetVideoEnrichDto } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { VideoGenerationConfig } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";

const enrichSchema = z.object({
  directions: z.string().optional(),
  include_prompt: z.boolean(),
  include_negative_prompt: z.boolean(),
  include_video_generation_options: z.boolean(),
});

type EnrichFormValues = z.infer<typeof enrichSchema>;

interface EnrichVariationPopoverProps {
  project_asset_uuid: string;
  onEnriched: (data: VideoGenerationConfig) => void;
  className?: string;
}

export function EnrichProjectAssetVideoPopover({
  project_asset_uuid,
  onEnriched,
  className,
}: EnrichVariationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useEnrichProjectAssetVideo(project_asset_uuid);

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
    mutate(
      {
        uuid: project_asset_uuid,
        enrichDto: data as ProjectAssetVideoEnrichDto,
      },
      {
        onSuccess: (data) => {
          onEnriched(data);

          setIsOpen(false);

          reset();
        },
      },
    );
  };

  return (
    <>
      <Popover
        showArrow
        isOpen={isOpen}
        offset={10}
        placement="bottom-end"
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger>
          <Button
            className={`rounded-xl font-medium ${className || ""}`}
            color="primary"
            isDisabled={isPending}
            isLoading={isPending}
            startContent={
              !isPending ? <Sparkles className="size-4" /> : undefined
            }
          >
            Enrich
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-4 text-left">
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <h4 className="font-medium leading-none">AI Enrichment</h4>
              <p className="text-sm text-default-500">
                Provide optional instructions to guide the AI, and choose which
                parts to enrich.
              </p>
            </div>

            <Textarea
              {...register("directions")}
              classNames={{ inputWrapper: "rounded-xl" }}
              minRows={3}
              placeholder="Directions (e.g., Make it darker, more cinematic...)"
              variant="bordered"
            />

            <div className="flex flex-col gap-2">
              <Checkbox
                classNames={{ label: "text-sm text-foreground" }}
                isSelected={watch("include_prompt")}
                size="sm"
                onValueChange={(val) => setValue("include_prompt", val)}
              >
                Include Prompt
              </Checkbox>
              <Checkbox
                classNames={{ label: "text-sm text-foreground" }}
                isSelected={watch("include_negative_prompt")}
                size="sm"
                onValueChange={(val) =>
                  setValue("include_negative_prompt", val)
                }
              >
                Include Negative Prompt
              </Checkbox>
              <Checkbox
                classNames={{ label: "text-sm text-foreground" }}
                isSelected={watch("include_video_generation_options")}
                size="sm"
                onValueChange={(val) =>
                  setValue("include_video_generation_options", val)
                }
              >
                Include Video Options
              </Checkbox>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                className="rounded-lg"
                size="sm"
                variant="flat"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-lg"
                color="primary"
                isLoading={isSubmitting || isPending}
                size="sm"
                type="submit"
              >
                Enrich
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}

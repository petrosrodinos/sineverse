import React, { useEffect } from "react";
import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const aiFormSchema = z.object({
  directions: z.string().optional(),
  number_of_scenes: z.number().min(1, "Must be at least 1"),
  scene_variations: z.array(z.number().min(1, "Must be at least 1")),
  enrich_concept: z.boolean(),
});

export type AIFormValues = z.infer<typeof aiFormSchema>;

interface AISceneGenerationFormProps {
  startingIndex: number;
  onSubmit: (data: AIFormValues) => void;
}

export function AISceneGenerationForm({ startingIndex, onSubmit }: AISceneGenerationFormProps) {
  const { control, handleSubmit, watch, setValue } = useForm<AIFormValues>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      directions: "",
      number_of_scenes: 1,
      scene_variations: [1],
      enrich_concept: true,
    },
  });

  const number_of_scenes = watch("number_of_scenes");
  const scene_variations = watch("scene_variations");

  useEffect(() => {
    if (typeof number_of_scenes === "number" && number_of_scenes > 0) {
      if (scene_variations.length !== number_of_scenes) {
        const newVariations = [...scene_variations];
        if (newVariations.length < number_of_scenes) {
          while (newVariations.length < number_of_scenes) {
            newVariations.push(1);
          }
        } else {
          newVariations.length = number_of_scenes;
        }
        setValue("scene_variations", newVariations, { shouldValidate: true });
      }
    }
  }, [number_of_scenes, scene_variations, setValue]);

  return (
    <form id="ai-scene-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
      <Controller
        name="directions"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="Instructions (Optional)"
            placeholder="Enter generation directions..."
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      
      <Controller
        name="number_of_scenes"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString() || ""}
            type="number"
            min={1}
            label="Number of scenes to generate"
            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      
      <div className="flex flex-col gap-2 ml-2 pl-4 border-l-1 overflow-y-auto" style={{ maxHeight: "200px" }}>
        {scene_variations.map((_, idx) => (
          <Controller
            key={idx}
            name={`scene_variations.${idx}`}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                value={field.value?.toString() || ""}
                type="number"
                min={1}
                label={`Number of variations for Scene ${startingIndex + idx}`}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                size="sm"
              />
            )}
          />
        ))}
      </div>
      
      <Controller
        name="enrich_concept"
        control={control}
        render={({ field }) => (
          <Checkbox
            isSelected={field.value}
            onValueChange={field.onChange}
          >
            Enrich your concept using AI
          </Checkbox>
        )}
      />
    </form>
  );
}

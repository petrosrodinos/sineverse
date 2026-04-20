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

export function AISceneGenerationForm({
  startingIndex,
  onSubmit,
}: AISceneGenerationFormProps) {
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
    <form
      className="flex flex-col gap-4 py-2"
      id="ai-scene-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="directions"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Instructions (Optional)"
            placeholder="Enter generation directions..."
          />
        )}
      />

      <Controller
        control={control}
        name="number_of_scenes"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Number of scenes to generate"
            min={1}
            type="number"
            value={field.value?.toString() || ""}
            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
          />
        )}
      />

      <div
        className="flex flex-col gap-2 ml-2 pl-4 border-l-1 overflow-y-auto"
        style={{ maxHeight: "200px" }}
      >
        {scene_variations.map((_, idx) => (
          <Controller
            key={idx}
            control={control}
            name={`scene_variations.${idx}`}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={`Number of variations for Scene ${startingIndex + idx}`}
                min={1}
                size="sm"
                type="number"
                value={field.value?.toString() || ""}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            )}
          />
        ))}
      </div>

      <Controller
        control={control}
        name="enrich_concept"
        render={({ field }) => (
          <Checkbox isSelected={field.value} onValueChange={field.onChange}>
            Enrich your concept using AI
          </Checkbox>
        )}
      />
    </form>
  );
}

import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Controller, Control } from "react-hook-form";
import * as z from "zod";

export const manualFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type ManualFormValues = z.infer<typeof manualFormSchema>;

interface ManualSceneFormProps {
  control: Control<ManualFormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function ManualSceneForm({ control, onSubmit }: ManualSceneFormProps) {
  return (
    <form
      className="flex flex-col gap-4 py-4"
      id="manual-form"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Scene Title"
            placeholder="Enter scene title"
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Description (Optional)"
            placeholder="Enter scene description..."
          />
        )}
      />
    </form>
  );
}

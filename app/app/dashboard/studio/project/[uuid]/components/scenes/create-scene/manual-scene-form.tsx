import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Controller, Control, FieldErrors } from "react-hook-form";
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
    <form id="manual-form" onSubmit={onSubmit} className="flex flex-col gap-4 py-4">
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Scene Title"
            placeholder="Enter scene title"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="Description (Optional)"
            placeholder="Enter scene description..."
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
          />
        )}
      />
    </form>
  );
}

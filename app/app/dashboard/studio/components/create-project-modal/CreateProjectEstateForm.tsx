import { Input } from "@heroui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import { Project } from "@/features/projects/interfaces/projects.interfaces";

const estateProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type EstateProjectFormValues = z.infer<typeof estateProjectSchema>;

export function CreateProjectEstateForm({
  project,
  isPending,
  onSubmit,
  formId,
}: {
  project?: Project;
  isPending: boolean;
  onSubmit: (data: EstateProjectFormValues) => void;
  formId: string;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EstateProjectFormValues>({
    resolver: zodResolver(estateProjectSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    reset({
      title: project?.title ?? "",
    });
  }, [project, reset]);

  return (
    <form
      className="flex flex-col gap-4"
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            errorMessage={errors.title?.message}
            isDisabled={isPending}
            isInvalid={!!errors.title}
            label="Title"
            placeholder="Enter listing title"
            variant="bordered"
          />
        )}
      />
    </form>
  );
}

import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import {
  GenreOptions,
  ToneOptions,
} from "@/config/dropdowns/project/project.options";
import { Project } from "@/features/projects/interfaces/projects.interfaces";

const filmProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  concept: z.string().optional(),
  genres: z.array(z.string()).max(3, "Maximum 3 genres allowed").optional(),
  tones: z.array(z.string()).max(3, "Maximum 3 tones allowed").optional(),
});

export type FilmProjectFormValues = z.infer<typeof filmProjectSchema>;

export function CreateProjectFilmForm({
  project,
  isPending,
  onSubmit,
  formId,
}: {
  project?: Project;
  isPending: boolean;
  onSubmit: (data: FilmProjectFormValues) => void;
  formId: string;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilmProjectFormValues>({
    resolver: zodResolver(filmProjectSchema),
    defaultValues: {
      title: "",
      concept: "",
      genres: [],
      tones: [],
    },
  });

  useEffect(() => {
    reset({
      title: project?.title ?? "",
      concept: project?.original_concept ?? "",
      genres: project?.genres ?? [],
      tones: project?.tones ?? [],
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
            placeholder="Enter project title"
            variant="bordered"
          />
        )}
      />
      <Controller
        control={control}
        name="concept"
        render={({ field }) => (
          <Textarea
            {...field}
            errorMessage={errors.concept?.message}
            isDisabled={isPending}
            isInvalid={!!errors.concept}
            label="Concept"
            minRows={4}
            placeholder="Describe your creative vision (optional)"
            variant="bordered"
          />
        )}
      />
      <Controller
        control={control}
        name="genres"
        render={({ field }) => (
          <Select
            className="w-full"
            classNames={{
              value: "truncate",
            }}
            errorMessage={errors.genres?.message}
            isDisabled={isPending}
            isInvalid={!!errors.genres}
            label="Genres"
            placeholder="Select up to 3 genres"
            renderValue={(items) => (
              <span className="truncate block w-full text-left">
                {items.map((item) => item.textValue).join(", ")}
              </span>
            )}
            selectedKeys={new Set(field.value || [])}
            selectionMode="multiple"
            variant="bordered"
            onSelectionChange={(keys) => {
              if (Array.from(keys).length <= 3) {
                field.onChange(Array.from(keys));
              }
            }}
          >
            {GenreOptions.map((genre) => (
              <SelectItem key={genre.value} textValue={genre.label}>
                {genre.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="tones"
        render={({ field }) => (
          <Select
            className="w-full"
            classNames={{
              value: "truncate",
            }}
            errorMessage={errors.tones?.message}
            isDisabled={isPending}
            isInvalid={!!errors.tones}
            label="Tones"
            placeholder="Select up to 3 tones"
            renderValue={(items) => (
              <span className="truncate block w-full text-left">
                {items.map((item) => item.textValue).join(", ")}
              </span>
            )}
            selectedKeys={new Set(field.value || [])}
            selectionMode="multiple"
            variant="bordered"
            onSelectionChange={(keys) => {
              if (Array.from(keys).length <= 3) {
                field.onChange(Array.from(keys));
              }
            }}
          >
            {ToneOptions.map((tone) => (
              <SelectItem key={tone.value} textValue={tone.label}>
                {tone.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </form>
  );
}

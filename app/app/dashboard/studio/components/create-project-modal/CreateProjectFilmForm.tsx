import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { GenreOptions, ToneOptions } from "@/config/dropdowns/project/project.options";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

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
        <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Title"
                        placeholder="Enter project title"
                        variant="bordered"
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        isDisabled={isPending}
                    />
                )}
            />
            <Controller
                name="concept"
                control={control}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        label="Concept"
                        placeholder="Describe your creative vision (optional)"
                        variant="bordered"
                        minRows={4}
                        isInvalid={!!errors.concept}
                        errorMessage={errors.concept?.message}
                        isDisabled={isPending}
                    />
                )}
            />
            <Controller
                name="genres"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-full"
                        label="Genres"
                        variant="bordered"
                        placeholder="Select up to 3 genres"
                        selectionMode="multiple"
                        selectedKeys={new Set(field.value || [])}
                        onSelectionChange={(keys) => {
                            if (Array.from(keys).length <= 3) {
                                field.onChange(Array.from(keys));
                            }
                        }}
                        isInvalid={!!errors.genres}
                        errorMessage={errors.genres?.message}
                        isDisabled={isPending}
                        classNames={{
                            value: "truncate",
                        }}
                        renderValue={(items) => (
                            <span className="truncate block w-full text-left">
                                {items.map((item) => item.textValue).join(", ")}
                            </span>
                        )}
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
                name="tones"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-full"
                        label="Tones"
                        variant="bordered"
                        placeholder="Select up to 3 tones"
                        selectionMode="multiple"
                        selectedKeys={new Set(field.value || [])}
                        onSelectionChange={(keys) => {
                            if (Array.from(keys).length <= 3) {
                                field.onChange(Array.from(keys));
                            }
                        }}
                        isInvalid={!!errors.tones}
                        errorMessage={errors.tones?.message}
                        isDisabled={isPending}
                        classNames={{
                            value: "truncate",
                        }}
                        renderValue={(items) => (
                            <span className="truncate block w-full text-left">
                                {items.map((item) => item.textValue).join(", ")}
                            </span>
                        )}
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

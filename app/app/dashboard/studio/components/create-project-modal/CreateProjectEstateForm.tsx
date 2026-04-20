import { Input } from "@heroui/input";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

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
        <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Title"
                        placeholder="Enter listing title"
                        variant="bordered"
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        isDisabled={isPending}
                    />
                )}
            />
        </form>
    );
}

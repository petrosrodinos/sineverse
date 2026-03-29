import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/use-projects";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { Project, ProjectGenre, ProjectTone, ProjectTypes } from "@/features/projects/interfaces/projects.interfaces";
import { GenreOptions, ToneOptions, TypeOptions } from "@/config/dropdowns/project/project.options";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    concept: z.string().min(1, "Concept is required"),
    type: z.enum([ProjectTypes.FILM, ProjectTypes.ESTATE]),
    genres: z.array(z.string()).max(3, "Maximum 3 genres allowed").optional(),
    tones: z.array(z.string()).max(3, "Maximum 3 tones allowed").optional(),
});

type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

export function CreateProjectModal({ 
    isOpen, 
    onOpenChange, 
    onClose,
    project 
}: { 
    isOpen: boolean, 
    onOpenChange: (open: boolean) => void, 
    onClose: () => void,
    project?: Project
}) {
    const { mutate: createProject, isPending: isCreating } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const router = useRouter();

    const isPending = isCreating || isUpdating;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            title: "",
            concept: "",
            type: ProjectTypes.FILM,
            genres: [],
            tones: [],
        }
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                title: project?.title || "",
                concept: project?.original_concept || "",
                type: project?.type ?? ProjectTypes.FILM,
                genres: project?.genres || [],
                tones: project?.tones || [],
            });
        }
    }, [isOpen, project, reset]);

    const onSubmit = (data: CreateProjectFormValues) => {
        if (project) {
            updateProject(
                { uuid: project.uuid, project: { 
                    title: data.title,
                    type: data.type,
                    original_concept: data.concept,
                    genres: data.genres as ProjectGenre[],
                    tones: data.tones as ProjectTone[]
                } },
                {
                    onSuccess: () => {
                        onClose();
                    }
                }
            );
        } else {
            createProject(
                { 
                    title: data.title,
                    type: data.type,
                    original_concept: data.concept,
                    genres: data.genres as ProjectGenre[],
                    tones: data.tones as ProjectTone[]
                }, 
                {
                    onSuccess: (newProject) => {
                        onClose();
                        router.push(Routes.project(newProject.uuid));
                    }
                }
            );
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">{project ? "Edit Project" : "Create New Project"}</ModalHeader>
                        <ModalBody>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        className="w-full"
                                        label="Type"
                                        variant="bordered"
                                        placeholder="Select project type"
                                        selectedKeys={new Set([field.value])}
                                        onSelectionChange={(keys) => {
                                            const v = Array.from(keys)[0];
                                            if (v === ProjectTypes.FILM || v === ProjectTypes.ESTATE) {
                                                field.onChange(v);
                                            }
                                        }}
                                        isInvalid={!!errors.type}
                                        errorMessage={errors.type?.message}
                                    >
                                        {TypeOptions.map((opt) => (
                                            <SelectItem key={opt.value} textValue={opt.label}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        label="Title"
                                        placeholder="Enter project title"
                                        variant="bordered"
                                        isInvalid={!!errors.title}
                                        errorMessage={errors.title?.message}
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
                                        placeholder="Describe your creative vision"
                                        variant="bordered"
                                        minRows={4}
                                        isInvalid={!!errors.concept}
                                        errorMessage={errors.concept?.message}
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
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" isLoading={isPending}>
                                {project ? "Save Changes" : "Create Project"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

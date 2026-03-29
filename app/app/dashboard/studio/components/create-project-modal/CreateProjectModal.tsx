import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/use-projects";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { Project, ProjectGenre, ProjectTone, ProjectTypes, ProjectType } from "@/features/projects/interfaces/projects.interfaces";
import { useEffect, useState } from "react";
import { CreateProjectTypeStep } from "./CreateProjectTypeStep";
import { CreateProjectFilmForm, FilmProjectFormValues } from "./CreateProjectFilmForm";
import { CreateProjectEstateForm, EstateProjectFormValues } from "./CreateProjectEstateForm";

const FORM_FILM = "create-project-film-form";
const FORM_ESTATE = "create-project-estate-form";

export function CreateProjectModal({
    isOpen,
    onOpenChange,
    onClose,
    project,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
    project?: Project;
}) {
    const { mutate: createProject, isPending: isCreating } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const router = useRouter();

    const isEdit = !!project;
    const isPending = isCreating || isUpdating;

    const [step, setStep] = useState<1 | 2>(1);
    const [selectedType, setSelectedType] = useState<ProjectType | null>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        if (isEdit && project) {
            setStep(2);
            setSelectedType(project.type);
        } else {
            setStep(1);
            setSelectedType(null);
        }
    }, [isOpen, isEdit, project]);

    const activeType = isEdit ? project?.type : selectedType;

    const handleFilmSubmit = (data: FilmProjectFormValues) => {
        const genres = (data.genres ?? []) as ProjectGenre[];
        const tones = (data.tones ?? []) as ProjectTone[];
        const conceptTrimmed = data.concept?.trim();
        if (isEdit && project) {
            updateProject(
                {
                    uuid: project.uuid,
                    project: {
                        title: data.title,
                        type: ProjectTypes.FILM,
                        original_concept: conceptTrimmed ? conceptTrimmed : null,
                        genres,
                        tones,
                    },
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                }
            );
        } else {
            createProject(
                {
                    title: data.title,
                    type: ProjectTypes.FILM,
                    ...(conceptTrimmed ? { original_concept: conceptTrimmed } : {}),
                    genres,
                    tones,
                },
                {
                    onSuccess: (newProject) => {
                        onClose();
                        router.push(Routes.project(newProject.uuid));
                    },
                }
            );
        }
    };

    const handleEstateSubmit = (data: EstateProjectFormValues) => {
        if (isEdit && project) {
            updateProject(
                {
                    uuid: project.uuid,
                    project: {
                        title: data.title,
                        type: ProjectTypes.ESTATE,
                    },
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                }
            );
        } else {
            createProject(
                {
                    title: data.title,
                    type: ProjectTypes.ESTATE,
                },
                {
                    onSuccess: (newProject) => {
                        onClose();
                        router.push(Routes.project(newProject.uuid));
                    },
                }
            );
        }
    };

    const modalTitle = () => {
        if (isEdit) {
            return "Edit project";
        }
        if (step === 1) {
            return "What are you creating?";
        }
        if (activeType === ProjectTypes.ESTATE) {
            return "Estate project";
        }
        return "Film project";
    };

    const showTypeStep = !isEdit && step === 1;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">{modalTitle()}</ModalHeader>
                    <ModalBody className="pb-2">
                        {showTypeStep && (
                            <CreateProjectTypeStep selected={selectedType} onSelect={setSelectedType} />
                        )}
                        {!showTypeStep && activeType === ProjectTypes.FILM && (
                            <CreateProjectFilmForm
                                project={project}
                                isPending={isPending}
                                onSubmit={handleFilmSubmit}
                                formId={FORM_FILM}
                            />
                        )}
                        {!showTypeStep && activeType === ProjectTypes.ESTATE && (
                            <CreateProjectEstateForm
                                project={project}
                                isPending={isPending}
                                onSubmit={handleEstateSubmit}
                                formId={FORM_ESTATE}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                            {showTypeStep && (
                                <>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => setStep(2)}
                                        isDisabled={!selectedType}
                                    >
                                        Continue
                                    </Button>
                                </>
                            )}
                            {!showTypeStep && activeType === ProjectTypes.FILM && (
                                <>
                                    {!isEdit && (
                                        <Button variant="flat" onPress={() => setStep(1)}>
                                            Back
                                        </Button>
                                    )}
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit" form={FORM_FILM} isLoading={isPending}>
                                        {isEdit ? "Save changes" : "Create project"}
                                    </Button>
                                </>
                            )}
                            {!showTypeStep && activeType === ProjectTypes.ESTATE && (
                                <>
                                    {!isEdit && (
                                        <Button variant="flat" onPress={() => setStep(1)}>
                                            Back
                                        </Button>
                                    )}
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit" form={FORM_ESTATE} isLoading={isPending}>
                                        {isEdit ? "Save changes" : "Create project"}
                                    </Button>
                                </>
                            )}
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

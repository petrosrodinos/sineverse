import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CreateProjectTypeStep } from "./CreateProjectTypeStep";
import { CreateProjectFilmForm, FilmProjectFormValues } from "./CreateProjectFilmForm";
import { CreateProjectEstateForm, EstateProjectFormValues } from "./CreateProjectEstateForm";

import { Project, ProjectGenre, ProjectTone, ProjectTypes, ProjectType } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/config/routes";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/use-projects";
import { enabledProjectTypes, isProjectTypeEnabled } from "@/features/projects/utils/project-feature.utils";

const FORM_FILM = "create-project-film-form";

const FORM_ESTATE = "create-project-estate-form";

export function CreateProjectModal({ isOpen, onOpenChange, onClose, project }: { isOpen: boolean; onOpenChange: (open: boolean) => void; onClose: () => void; project?: Project }) {
  const { mutate: createProject, isPending: isCreating } = useCreateProject();

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const router = useRouter();

  const isEdit = !!project;

  const isPending = isCreating || isUpdating;

  const [step, setStep] = useState<1 | 2>(1);

  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);

  const availableProjectTypes = useMemo(() => enabledProjectTypes(), []);

  const requiresTypeSelection = availableProjectTypes.length > 1;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!isEdit && availableProjectTypes.length === 0) {
      onClose();

      return;
    }

    if (isEdit && project) {
      setStep(2);

      setSelectedType(project.type);
    } else {
      if (requiresTypeSelection) {
        setStep(1);

        setSelectedType(null);
      } else {
        setStep(2);

        setSelectedType(availableProjectTypes[0] ?? null);
      }
    }
  }, [isOpen, isEdit, project, requiresTypeSelection, availableProjectTypes, onClose]);

  const activeType = isEdit ? project?.type : selectedType;

  const canRenderType = !!activeType && isProjectTypeEnabled(activeType);

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
        },
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

            router.push(Routes.project(newProject.uuid, { type: newProject.type }));
          },
        },
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
        },
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

            router.push(Routes.project(newProject.uuid, { type: newProject.type }));
          },
        },
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
      return "Estate lift";
    }

    return "Film project";
  };

  const showTypeStep = !isEdit && requiresTypeSelection && step === 1;

  return (
    <Modal backdrop="blur" isOpen={isOpen} scrollBehavior="inside" size="3xl" onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{modalTitle()}</ModalHeader>
          <ModalBody className="pb-2">
            {showTypeStep && <CreateProjectTypeStep selected={selectedType} onSelect={setSelectedType} />}
            {!showTypeStep && canRenderType && activeType === ProjectTypes.FILM && <CreateProjectFilmForm formId={FORM_FILM} isPending={isPending} project={project} onSubmit={handleFilmSubmit} />}
            {!showTypeStep && canRenderType && activeType === ProjectTypes.ESTATE && <CreateProjectEstateForm formId={FORM_ESTATE} isPending={isPending} project={project} onSubmit={handleEstateSubmit} />}
          </ModalBody>
          <ModalFooter>
            {showTypeStep && (
              <>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" isDisabled={!selectedType} onPress={() => setStep(2)}>
                  Continue
                </Button>
              </>
            )}
            {!showTypeStep && canRenderType && activeType === ProjectTypes.FILM && (
              <>
                {!isEdit && requiresTypeSelection && (
                  <Button variant="flat" onPress={() => setStep(1)}>
                    Back
                  </Button>
                )}
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" form={FORM_FILM} isLoading={isPending} type="submit">
                  {isEdit ? "Save changes" : "Create project"}
                </Button>
              </>
            )}
            {!showTypeStep && canRenderType && activeType === ProjectTypes.ESTATE && (
              <>
                {!isEdit && requiresTypeSelection && (
                  <Button variant="flat" onPress={() => setStep(1)}>
                    Back
                  </Button>
                )}
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" form={FORM_ESTATE} isLoading={isPending} type="submit">
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

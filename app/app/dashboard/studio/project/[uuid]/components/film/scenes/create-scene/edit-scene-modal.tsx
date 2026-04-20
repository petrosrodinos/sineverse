import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ManualSceneForm,
  manualFormSchema,
  ManualFormValues,
} from "./manual-scene-form";

import { useUpdateScene } from "@/features/scenes/hooks/use-scenes";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

interface EditSceneModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  scene: Scene | null;
}

export function EditSceneModal({
  isOpen,
  onOpenChange,
  onClose,
  scene,
}: EditSceneModalProps) {
  const { control, handleSubmit, reset } = useForm<ManualFormValues>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (scene) {
      reset({
        title: scene.title || "",
        description: scene.description || "",
      });
    }
  }, [scene, reset]);

  const { mutate: updateScene, isPending } = useUpdateScene();

  const onSubmitForm = (data: ManualFormValues) => {
    if (!scene) return;

    updateScene(
      {
        uuid: scene.uuid,
        scene: {
          title: data.title,
          description: data.description,
          order: scene.order,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Edit Scene</ModalHeader>
            <ModalBody>
              <ManualSceneForm
                control={control}
                onSubmit={handleSubmit(onSubmitForm)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                form="manual-form"
                isLoading={isPending}
                type="submit"
              >
                Update Scene
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

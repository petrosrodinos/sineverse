"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { Modal } from "@/components/ui/modal";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

interface EditVariationModalProps {
  variation: SceneVariation | null;
  onClose: () => void;
}

export function EditVariationModal({
  variation,
  onClose,
}: EditVariationModalProps) {
  const [title, setTitle] = useState("");

  const updateMutation = useUpdateSceneVariation();

  useEffect(() => {
    if (variation) {
      setTitle(variation.title || "");
    }
  }, [variation]);

  const handleSave = async () => {
    if (!variation?.uuid || !title.trim()) return;

    await updateMutation.mutateAsync({
      uuid: variation.uuid,
      sceneVariation: { title },
    });

    onClose();
  };

  return (
    <Modal
      footer={
        <>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            isLoading={updateMutation.isPending}
            onPress={handleSave}
          >
            Save Changes
          </Button>
        </>
      }
      isOpen={!!variation}
      title="Edit Variation Title"
      onOpenChange={(isOpen) => !isOpen && onClose()}
    >
      <Input
        classNames={{ inputWrapper: "rounded-xl" }}
        label="Title"
        value={title}
        variant="bordered"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        }}
        onValueChange={setTitle}
      />
    </Modal>
  );
}

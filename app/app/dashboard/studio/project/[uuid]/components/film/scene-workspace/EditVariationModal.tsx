"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useUpdateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

interface EditVariationModalProps {
  variation: SceneVariation | null;
  onClose: () => void;
}

export function EditVariationModal({ variation, onClose }: EditVariationModalProps) {
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
      sceneVariation: { title }
    });
    onClose();
  };

  return (
    <Modal
      isOpen={!!variation}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title="Edit Variation Title"
      footer={
        <>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} isLoading={updateMutation.isPending}>
            Save Changes
          </Button>
        </>
      }
    >
      <Input
        label="Title"
        value={title}
        onValueChange={setTitle}
        variant="bordered"
        classNames={{ inputWrapper: "rounded-xl" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        }}
      />
    </Modal>
  );
}

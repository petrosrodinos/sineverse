"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

import { useCreateSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";

interface CreateVariationPopoverProps {
  sceneUuid: string;
}

export function CreateVariationPopover({
  sceneUuid,
}: CreateVariationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");

  const createMutation = useCreateSceneVariation();

  const handleCreate = async () => {
    if (!newTitle.trim() || !sceneUuid) return;

    await createMutation.mutateAsync({
      scene_uuid: sceneUuid,
      title: newTitle.trim(),
    });

    setNewTitle("");

    setIsOpen(false);
  };

  return (
    <Popover
      showArrow
      isOpen={isOpen}
      placement="bottom-end"
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <Button
          color="primary"
          startContent={<Plus className="size-4" />}
          variant="flat"
        >
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4">
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-semibold">Create Variation</p>
          <Input
            label="Variation Title"
            placeholder="e.g. Director's Cut"
            size="sm"
            value={newTitle}
            variant="bordered"
            onValueChange={setNewTitle}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="flat" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              isDisabled={!newTitle.trim()}
              isLoading={createMutation.isPending}
              size="sm"
              onPress={handleCreate}
            >
              Create
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

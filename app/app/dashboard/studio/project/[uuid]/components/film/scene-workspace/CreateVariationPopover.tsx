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

export function CreateVariationPopover({ sceneUuid }: CreateVariationPopoverProps) {
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
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button color="primary" variant="flat" startContent={<Plus className="size-4" />}>
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4">
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-semibold">Create Variation</p>
          <Input
            label="Variation Title"
            placeholder="e.g. Director's Cut"
            value={newTitle}
            onValueChange={setNewTitle}
            variant="bordered"
            size="sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="flat" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onPress={handleCreate} isLoading={createMutation.isPending} isDisabled={!newTitle.trim()}>
              Create
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

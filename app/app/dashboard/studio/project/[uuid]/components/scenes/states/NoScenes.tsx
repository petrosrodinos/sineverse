import { Button } from "@heroui/button";
import { Film, Plus } from "lucide-react";

interface NoScenesProps {
  onOpen: () => void;
}

export function NoScenes({ onOpen }: NoScenesProps) {
  return (
    <aside className="w-72 shrink-0 flex flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4 items-center justify-center text-center">
      <Film className="size-12 text-default-300" />
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">No Scenes Yet</h3>
        <p className="text-sm text-default-500">Create your first scene to get started.</p>
      </div>
      <Button color="primary" onPress={onOpen} startContent={<Plus className="size-4" />} className="w-full mt-2 rounded-xl font-medium">
        Add Scene
      </Button>
    </aside>
  );
}

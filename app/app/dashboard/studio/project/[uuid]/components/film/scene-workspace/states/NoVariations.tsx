import { Clapperboard } from "lucide-react";

import { CreateVariationPopover } from "../CreateVariationPopover";

interface NoVariationsProps {
  sceneUuid: string;
}

export function NoVariations({ sceneUuid }: NoVariationsProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-default-200 bg-default-50/50 dark:bg-default-100/5 min-h-[400px]">
      <div className="bg-primary/10 p-5 rounded-full mb-4 shadow-sm">
        <Clapperboard className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Variations Yet
      </h3>
      <p className="text-default-500 max-w-sm text-base mb-6">
        Create a variation to start configuring stylistic options and prompt
        settings for your video scene.
      </p>
      <div className="scale-125">
        <CreateVariationPopover sceneUuid={sceneUuid} />
      </div>
    </div>
  );
}

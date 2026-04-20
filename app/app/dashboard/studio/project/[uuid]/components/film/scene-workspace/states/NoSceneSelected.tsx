import { MousePointerClick } from "lucide-react";

export function NoSceneSelected() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-default-200 bg-default-50/50 dark:bg-default-100/5 min-h-[400px]">
      <div className="bg-primary/10 p-5 rounded-full mb-4 shadow-sm">
        <MousePointerClick className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Scene Selected
      </h3>
      <p className="text-default-500 max-w-sm text-base">
        Select a scene from the sidebar on the left to view its details,
        generate prompt variations, and create videos.
      </p>
    </div>
  );
}

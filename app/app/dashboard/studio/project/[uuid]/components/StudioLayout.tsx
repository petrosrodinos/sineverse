"use client";
import { IdeaSection } from "./IdeaSection";
import { ScenesSidebar } from "./scenes";
import { SceneWorkspace } from "./scene-workspace";

export function StudioLayout() {

  return (
    <div className="flex flex-col lg:flex-row lg:h-full lg:min-h-0 gap-4 p-4">
      <ScenesSidebar />
      <div className="flex-1 min-w-0 flex flex-col gap-6 lg:overflow-auto rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4 lg:p-6">
        <IdeaSection />
        <SceneWorkspace />
      </div>
    </div>
  );
}

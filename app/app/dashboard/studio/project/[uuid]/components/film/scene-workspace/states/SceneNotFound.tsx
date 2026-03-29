import { FileQuestion } from "lucide-react";

export function SceneNotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-default-200 bg-default-50/50 dark:bg-default-100/5 min-h-[400px]">
      <div className="bg-default-100 p-5 rounded-full mb-4 dark:bg-default-200/50 shadow-sm">
        <FileQuestion className="w-8 h-8 text-default-500" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Scene Not Found</h3>
      <p className="text-default-500 max-w-sm text-base">
        The scene you are looking for does not exist or could not be loaded. Please select a different scene from the sidebar.
      </p>
    </div>
  );
}

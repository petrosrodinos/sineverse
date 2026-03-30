"use client";

import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Trash2, Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useDeleteScene, useScenes } from "@/features/scenes/hooks/use-scenes";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";

export function UploadPhotosStep() {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";
  const mockProject = useEstateWorkflowStore((s) => s.mockProject);
  const promptImageAssets = useEstateWorkflowStore((s) => s.promptImageAssets);
  const addUploadingPlaceholders = useEstateWorkflowStore((s) => s.addUploadingPlaceholders);
  const removePromptImageAsset = useEstateWorkflowStore((s) => s.removePromptImageAsset);
  const mergePromptImageAssetsFromScenes = useEstateWorkflowStore((s) => s.mergePromptImageAssetsFromScenes);

  const { data: scenes, isLoading, isSuccess } = useScenes(
    projectUuid ? { project_uuid: projectUuid } : undefined,
    { enabled: !!projectUuid && mockProject.uuid === projectUuid },
  );

  useEffect(() => {
    if (isSuccess && scenes !== undefined) {
      mergePromptImageAssetsFromScenes(scenes);
    }
  }, [isSuccess, scenes, mergePromptImageAssetsFromScenes]);

  const { mutateAsync: deleteScene, isPending: isDeletingScene } = useDeleteScene();

  const [pendingRemove, setPendingRemove] = useState<ProjectAsset | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;
      if (!list || list.length === 0) {
        return;
      }
      addUploadingPlaceholders(Array.from(list));
      event.target.value = "";
    },
    [addUploadingPlaceholders],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const list = event.dataTransfer.files;
      if (!list || list.length === 0) {
        return;
      }
      const images = Array.from(list).filter((f) => f.type.startsWith("image/"));
      if (images.length === 0) {
        return;
      }
      addUploadingPlaceholders(images);
    },
    [addUploadingPlaceholders],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const handleRemove = useCallback(
    (asset: ProjectAsset) => () => {
      setPendingRemove(asset);
    },
    [],
  );

  const handleCloseRemoveModal = useCallback(() => {
    if (!isDeletingScene) {
      setPendingRemove(null);
    }
  }, [isDeletingScene]);

  const handleConfirmRemove = useCallback(async () => {
    if (!pendingRemove) {
      return;
    }
    const isLocal = pendingRemove.document.url.startsWith("blob:");
    if (isLocal) {
      removePromptImageAsset(pendingRemove.uuid);
      setPendingRemove(null);
      return;
    }
    try {
      await deleteScene(pendingRemove.scene_uuid);
      removePromptImageAsset(pendingRemove.uuid);
    } finally {
      setPendingRemove(null);
    }
  }, [pendingRemove, deleteScene, removePromptImageAsset]);

  const showLoadingGrid = isLoading && promptImageAssets.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="group flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-default-300 bg-default-100/30 px-6 py-10 text-center transition-colors duration-200 hover:border-secondary-400 hover:bg-default-100/50 dark:border-default-100/30 dark:bg-default-100/5 dark:hover:border-secondary-500"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-500 transition-transform duration-200 group-hover:scale-[1.03]">
          <Upload className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">Drop photos here</p>
          <p className="text-small text-default-500">or browse to upload multiple images</p>
        </div>
        <Button color="secondary" variant="flat" onPress={openPicker}>
          Choose files
        </Button>
      </div>
      {showLoadingGrid && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
          ))}
        </div>
      )}
      {promptImageAssets.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {promptImageAssets.map((asset) => (
            <div
              key={asset.uuid}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-default-200 bg-default-200/30 dark:border-default-100/20"
            >
              {asset.status === ProjectAssetStatuses.PROCESSING ? (
                <Skeleton className="h-full w-full rounded-xl" />
              ) : (
                <img alt="" src={asset.document.url} className="h-full w-full object-cover" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="truncate text-tiny text-white/90">{asset.document.filename}</p>
                <p className="truncate text-tiny text-white/60">{asset.status}</p>
              </div>
              <button
                type="button"
                onClick={handleRemove(asset)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur-sm md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100"
                aria-label="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={pendingRemove !== null}
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
        title="Remove photo"
        description={
          pendingRemove?.document.url.startsWith("blob:")
            ? "Remove this photo from the list?"
            : "Delete this scene and its image from the project? This cannot be undone."
        }
        confirmText="Remove"
        isLoading={isDeletingScene}
      />
    </div>
  );
}

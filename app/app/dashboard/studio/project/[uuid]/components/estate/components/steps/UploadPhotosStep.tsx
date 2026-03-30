"use client";

import { Skeleton } from "@heroui/skeleton";
import { ImagePlus, Plus, Trash2, Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { addToast } from "@heroui/toast";
import { useDeleteScene, useScenes } from "@/features/scenes/hooks/use-scenes";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";

export function UploadPhotosStep() {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";
  const promptImageAssets = useEstateWorkflowStore((s) => s.promptImageAssets);
  const addUploadingPlaceholders = useEstateWorkflowStore((s) => s.addUploadingPlaceholders);
  const removePromptImageAsset = useEstateWorkflowStore((s) => s.removePromptImageAsset);

  const { isLoading } = useScenes(
    projectUuid ? { project_uuid: projectUuid } : undefined,
    { enabled: !!projectUuid },
  );

  const { mutateAsync: deleteScene, isPending: isDeletingScene } = useDeleteScene();

  const [pendingRemove, setPendingRemove] = useState<ProjectAsset | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragDepth = useRef(0);

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
      dragDepth.current = 0;
      setIsDragOver(false);
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

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    dragDepth.current += 1;
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setIsDragOver(false);
    }
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
    const sceneId = pendingRemove.scene_uuid ?? pendingRemove.scene?.uuid;
    if (!sceneId) {
      addToast({
        title: "Cannot remove photo",
        description: "Missing scene reference for this image.",
        severity: "danger",
      });
      setPendingRemove(null);
      return;
    }
    try {
      await deleteScene(sceneId);
      removePromptImageAsset(pendingRemove.uuid);
    } finally {
      setPendingRemove(null);
    }
  }, [pendingRemove, deleteScene, removePromptImageAsset]);

  const showLoadingGrid = isLoading && promptImageAssets.length === 0;
  const hasPhotos = promptImageAssets.length > 0;

  const pickerClassName = [
    "relative w-full overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300",
    "bg-gradient-to-br from-default-100/50 via-default-50/30 to-secondary-500/[0.07]",
    "dark:from-default-100/10 dark:via-default-100/5 dark:to-secondary-500/10",
    isDragOver
      ? "border-secondary-500 ring-4 ring-secondary-500/20"
      : "border-default-300/90 dark:border-default-100/25",
    "hover:border-secondary-400/70 dark:hover:border-secondary-500/40",
  ].join(" ");

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
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={pickerClassName}
      >
        <div className="p-4 sm:p-5">
          {showLoadingGrid ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
              ))}
            </div>
          ) : !hasPhotos ? (
            <button
              type="button"
              onClick={openPicker}
              className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-xl px-4 py-10 text-center transition-colors duration-200 hover:bg-secondary-500/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-500/12 text-secondary-600 shadow-inner ring-1 ring-secondary-500/20 dark:text-secondary-400">
                <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <div className="max-w-sm space-y-1.5">
                <p className="text-lg font-semibold tracking-tight text-foreground">Add listing photos</p>
                <p className="text-small leading-relaxed text-default-500">
                  Drop images here or click to browse. You can add more anytime with the + tile.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary-500/10 px-4 py-2 text-small font-medium text-secondary-700 dark:text-secondary-300">
                <Upload className="h-4 w-4" />
                Choose images
              </span>
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3 border-b border-default-200/80 pb-3 dark:border-default-100/15">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-500/15 text-secondary-600 dark:text-secondary-400">
                    <ImagePlus className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Your photos</p>
                    <p className="text-tiny text-default-500">
                      {promptImageAssets.length} selected · drop to add more
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {promptImageAssets.map((asset) => (
                  <div
                    key={asset.uuid}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-default-200/40 shadow-sm ring-1 ring-black/[0.06] transition duration-200 hover:ring-secondary-500/35 dark:bg-default-100/10 dark:ring-white/10"
                  >
                    {asset.status === ProjectAssetStatuses.PROCESSING ? (
                      <Skeleton className="h-full w-full rounded-xl" />
                    ) : (
                      <img alt="" src={asset.document.url} className="h-full w-full object-cover" />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-2 pt-8">
                      <p className="truncate text-tiny font-medium text-white/95">{asset.document.filename}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemove(asset)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-danger/90 hover:text-white md:opacity-0 md:group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={openPicker}
                  className="group/add flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-secondary-400/45 bg-gradient-to-br from-secondary-500/[0.08] to-transparent text-secondary-600 transition duration-200 hover:border-secondary-500 hover:bg-secondary-500/12 hover:shadow-md dark:border-secondary-500/35 dark:text-secondary-400 dark:hover:border-secondary-400"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500/15 ring-1 ring-secondary-500/25 transition group-hover/add:scale-105 group-hover/add:bg-secondary-500/25">
                    <Plus className="h-6 w-6" strokeWidth={2.25} />
                  </span>
                  <span className="text-tiny font-semibold tracking-wide">Add more</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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

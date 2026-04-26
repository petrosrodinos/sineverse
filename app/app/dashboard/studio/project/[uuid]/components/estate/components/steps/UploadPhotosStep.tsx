"use client";

import type { Key } from "react";
import type { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";

import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Skeleton } from "@heroui/skeleton";
import { ImagePlus, Plus, Trash2, Upload } from "lucide-react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { addToast } from "@heroui/toast";

import {
  ESTATE_VIDEO_MODEL_OPTIONS,
  ESTATE_VISITOR_MAX_PROMPT_IMAGES,
} from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Routes } from "@/config/routes";
import { getStoredVisitorAuth } from "@/features/auth/utils/visitor-auth.utils";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { RoleTypes } from "@/features/user/interfaces/user.interfaces";
import { useDeleteScene, useScenes } from "@/features/scenes/hooks/use-scenes";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

const ACCEPTED_IMAGE_INPUT = ".jpg,.jpeg,.png";

type PendingFile = { id: string; file: File; previewUrl: string };

type UploadPhotosStepProps = {
  pendingFiles: PendingFile[];
  setPendingFiles: React.Dispatch<React.SetStateAction<PendingFile[]>>;
  selectedVideoModelId: string;
  onVideoModelChange: (id: string) => void;
};

export function UploadPhotosStep({
  pendingFiles,
  setPendingFiles,
  selectedVideoModelId,
  onVideoModelChange,
}: UploadPhotosStepProps) {
  const params = useParams<{ uuid: string }>();

  const projectUuid = params?.uuid ?? "";

  const { data: session, status } = useSession();

  const isSessionLoading = status === "loading";

  const isAdmin =
    !isSessionLoading &&
    (session?.role === RoleTypes.ADMIN ||
      session?.role === RoleTypes.SUPER_ADMIN);

  const visitorAuth = useMemo(() => getStoredVisitorAuth(), [status]);

  const isVisitor =
    status === "unauthenticated" &&
    visitorAuth?.role === RoleTypes.VISITOR;

  const { data: scenes, isLoading } = useScenes(
    projectUuid ? { project_uuid: projectUuid } : undefined,
    { enabled: !!projectUuid },
  );

  const promptImageAssets: ProjectAsset[] = (scenes ?? []).flatMap((scene) =>
    (scene.scene_variations ?? []).flatMap((sv) =>
      (sv.project_assets ?? []).filter((a) => a.role === "PROMPT_IMAGE"),
    ),
  );

  const { mutateAsync: deleteScene, isPending: isDeletingScene } =
    useDeleteScene();

  const [pendingRemoveAsset, setPendingRemoveAsset] =
    useState<ProjectAsset | null>(null);

  const [pendingRemoveFileId, setPendingRemoveFileId] = useState<string | null>(
    null,
  );

  const [isDragOver, setIsDragOver] = useState(false);

  const [visitorPhotoLimitModal, setVisitorPhotoLimitModal] = useState<{
    open: boolean;
    title: string;
    body: string;
  }>({ open: false, title: "", body: "" });

  const dragDepth = useRef(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const totalPhotoCount = promptImageAssets.length + pendingFiles.length;

  const visitorPhotoCapReached =
    isVisitor && totalPhotoCount >= ESTATE_VISITOR_MAX_PROMPT_IMAGES;

  const openPicker = useCallback(() => {
    if (visitorPhotoCapReached) {
      setVisitorPhotoLimitModal({
        open: true,
        title: "Photo limit reached",
        body: `Preview visits can include up to ${ESTATE_VISITOR_MAX_PROMPT_IMAGES} listing photos. Remove a photo to add a different one, or create a free account to upload more.`,
      });

      return;
    }

    inputRef.current?.click();
  }, [visitorPhotoCapReached]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const images = Array.from(files).filter((f) =>
        ACCEPTED_IMAGE_TYPES.includes(
          f.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        ),
      );

      if (images.length === 0) return;

      const currentTotal = promptImageAssets.length + pendingFiles.length;

      if (isVisitor) {
        const cap = ESTATE_VISITOR_MAX_PROMPT_IMAGES;

        const remaining = Math.max(0, cap - currentTotal);

        if (remaining === 0) {
          setVisitorPhotoLimitModal({
            open: true,
            title: "Photo limit reached",
            body: `Preview visits can include up to ${cap} listing photos. Remove a photo to replace it, or create a free account to work with larger projects.`,
          });

          return;
        }

        if (images.length > remaining) {
          const toAdd = images.slice(0, remaining);

          const skipped = images.length - toAdd.length;

          setPendingFiles((prev) => [
            ...prev,
            ...toAdd.map((file) => ({
              id: `${Date.now()}-${Math.random()}`,
              file,
              previewUrl: URL.createObjectURL(file),
            })),
          ]);

          setVisitorPhotoLimitModal({
            open: true,
            title: "Some photos were not added",
            body: `Preview visits can include up to ${cap} listing photos. We added the first ${toAdd.length} from your selection (${skipped} not added). Create a free account to upload more per project.`,
          });

          return;
        }
      }

      setPendingFiles((prev) => [
        ...prev,
        ...images.map((file) => ({
          id: `${Date.now()}-${Math.random()}`,
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ]);
    },
    [
      setPendingFiles,
      isVisitor,
      promptImageAssets.length,
      pendingFiles.length,
    ],
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;

      if (list && list.length > 0) addFiles(list);

      event.target.value = "";
    },
    [addFiles],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      dragDepth.current = 0;

      setIsDragOver(false);

      if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
    },
    [addFiles],
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

  const handleRemoveApiAsset = useCallback(
    (asset: ProjectAsset) => () => {
      setPendingRemoveAsset(asset);
    },
    [],
  );

  const handleRemovePendingFile = useCallback(
    (id: string) => () => {
      setPendingRemoveFileId(id);
    },
    [],
  );

  const handleCloseRemoveModal = useCallback(() => {
    if (!isDeletingScene) {
      setPendingRemoveAsset(null);

      setPendingRemoveFileId(null);
    }
  }, [isDeletingScene]);

  const handleConfirmRemove = useCallback(async () => {
    if (pendingRemoveFileId !== null) {
      setPendingFiles((prev) => {
        const item = prev.find((f) => f.id === pendingRemoveFileId);

        if (item) URL.revokeObjectURL(item.previewUrl);

        return prev.filter((f) => f.id !== pendingRemoveFileId);
      });

      setPendingRemoveFileId(null);

      return;
    }

    if (!pendingRemoveAsset) return;

    const sceneId =
      pendingRemoveAsset.scene_uuid ?? pendingRemoveAsset.scene?.uuid;

    if (!sceneId) {
      addToast({
        title: "Cannot remove photo",
        description: "Missing scene reference.",
        severity: "danger",
      });

      setPendingRemoveAsset(null);

      return;
    }

    try {
      await deleteScene(sceneId);
    } finally {
      setPendingRemoveAsset(null);
    }
  }, [pendingRemoveFileId, pendingRemoveAsset, setPendingFiles, deleteScene]);

  const showLoadingGrid =
    isLoading && promptImageAssets.length === 0 && pendingFiles.length === 0;

  const hasPhotos = promptImageAssets.length > 0 || pendingFiles.length > 0;

  const pickerClassName = [
    "relative w-full overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300",
    "bg-gradient-to-br from-default-100/50 via-default-50/30 to-secondary-500/[0.07]",
    "dark:from-default-100/10 dark:via-default-100/5 dark:to-secondary-500/10",
    isDragOver
      ? "border-secondary-500 ring-4 ring-secondary-500/20"
      : "border-default-300/90 dark:border-default-100/25",
    "hover:border-secondary-400/70 dark:hover:border-secondary-500/40",
    !hasPhotos ? "cursor-pointer" : "",
  ].join(" ");

  const isConfirmModalOpen =
    pendingRemoveAsset !== null || pendingRemoveFileId !== null;

  const confirmModalDescription =
    pendingRemoveFileId !== null
      ? "Remove this photo from the list?"
      : "Delete this scene and its image from the project? This cannot be undone.";

  const handleVideoModelChange = useCallback(
    (keys: "all" | Iterable<Key>) => {
      if (keys === "all") return;

      const first = Array.from(keys)[0];

      if (typeof first === "string") {
        onVideoModelChange(first);
      }
    },
    [onVideoModelChange],
  );

  return (
    <div className="flex flex-col gap-6">
      <input
        ref={inputRef}
        multiple
        accept={ACCEPTED_IMAGE_INPUT}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />

      <div
        className={pickerClassName}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
              className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl px-4 py-10 text-center transition-colors duration-200 hover:bg-secondary-500/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="button"
              onClick={openPicker}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-500/12 text-secondary-600 shadow-inner ring-1 ring-secondary-500/20 dark:text-secondary-400">
                <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <div className="max-w-sm space-y-1.5">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  Add listing photos
                </p>
                <p className="text-small leading-relaxed text-default-500">
                  {isVisitor
                    ? `Drop images here or click to browse. You can add up to ${ESTATE_VISITOR_MAX_PROMPT_IMAGES} photos on a preview visit.`
                    : "Drop images here or click to browse. You can add more anytime."}
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
                    <p className="text-sm font-semibold text-foreground">
                      Your photos
                    </p>
                    <p className="text-tiny text-default-500">
                      {totalPhotoCount} selected
                      {isVisitor
                        ? visitorPhotoCapReached
                          ? ` · ${ESTATE_VISITOR_MAX_PROMPT_IMAGES} of ${ESTATE_VISITOR_MAX_PROMPT_IMAGES} (preview limit)`
                          : ` · up to ${ESTATE_VISITOR_MAX_PROMPT_IMAGES} on preview · drop to add more`
                        : " · drop to add more"}
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
                      <img
                        alt=""
                        className="h-full w-full object-cover"
                        src={asset.document.url}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-2 pt-8">
                      <p className="truncate text-tiny font-medium text-white/95">
                        {asset.document.filename}
                      </p>
                    </div>
                    <button
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-danger/90 hover:text-white md:opacity-0 md:group-hover:opacity-100"
                      type="button"
                      onClick={handleRemoveApiAsset(asset)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {pendingFiles.map((pf) => (
                  <div
                    key={pf.id}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-default-200/40 shadow-sm ring-1 ring-secondary-400/40 transition duration-200 dark:bg-default-100/10"
                  >
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={pf.previewUrl}
                    />
                    <button
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-danger/90 hover:text-white md:opacity-0 md:group-hover:opacity-100"
                      type="button"
                      onClick={handleRemovePendingFile(pf.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {!visitorPhotoCapReached && (
                  <button
                    className="group/add flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-secondary-400/45 bg-gradient-to-br from-secondary-500/[0.08] to-transparent text-secondary-600 transition duration-200 hover:border-secondary-500 hover:bg-secondary-500/12 hover:shadow-md dark:border-secondary-500/35 dark:text-secondary-400 dark:hover:border-secondary-400 sm:gap-2"
                    type="button"
                    onClick={openPicker}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-500/15 ring-1 ring-secondary-500/25 transition group-hover/add:scale-105 group-hover/add:bg-secondary-500/25 sm:h-12 sm:w-12">
                      <Plus
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        strokeWidth={2.25}
                      />
                    </span>
                    <span className="text-[11px] font-semibold tracking-wide sm:text-tiny">
                      Add more
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isAdmin && hasPhotos && (
        <Select
          classNames={{ trigger: "min-h-10" }}
          label="Walkthrough model"
          selectedKeys={new Set([selectedVideoModelId])}
          size="sm"
          onSelectionChange={handleVideoModelChange}
        >
          {ESTATE_VIDEO_MODEL_OPTIONS.map((option) => (
            <SelectItem key={option.id}>
              {`${option.label} - $${option.price.toFixed(3)}/sec`}
            </SelectItem>
          ))}
        </Select>
      )}

      <ConfirmationModal
        confirmText="Remove"
        description={confirmModalDescription}
        isLoading={isDeletingScene}
        isOpen={isConfirmModalOpen}
        title="Remove photo"
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
      />

      <Modal
        isOpen={visitorPhotoLimitModal.open}
        placement="center"
        onOpenChange={(open) =>
          setVisitorPhotoLimitModal((prev) => ({ ...prev, open }))
        }
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {visitorPhotoLimitModal.title}
          </ModalHeader>
          <ModalBody>
            <p className="text-sm leading-relaxed text-default-600">
              {visitorPhotoLimitModal.body}
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-wrap gap-2">
            <Button
              variant="flat"
              onPress={() =>
                setVisitorPhotoLimitModal((prev) => ({ ...prev, open: false }))
              }
            >
              Got it
            </Button>
            <Button
              as={NextLink}
              className="font-semibold"
              color="primary"
              href={Routes.auth.sign_up}
            >
              Create free account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

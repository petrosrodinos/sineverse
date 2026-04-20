"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem, SelectSection } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { useState, useEffect, useMemo } from "react";
import { Wand2, Upload, Sparkles, CheckCircle, XCircle } from "lucide-react";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ImageModels } from "@/config/dropdowns/project/image.options";
import {
  useUploadSceneVariationPromptImage,
  useDeleteProjectAsset,
  useCreateSceneVariationImage,
  useProjectAssets,
} from "@/features/project-assets/hooks/use-project-assets";
import { ImageUpload } from "@/components/ui/ImageUpload";
import {
  AssetRoles,
  ProjectAssetStatuses,
} from "@/features/project-assets/interfaces/project-assets.interfaces";
import { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";

interface SceneVariationImageUploadProps {
  variationUuid: string;
  promptImageAssets?: ProjectAsset[];
  isImageToVideoModel: boolean;
  mode?: "immediate" | "deferred";
  onPendingFileChange?: (file: File | null) => void;
  onPendingConfigChange?: (config: any | null) => void;
  pendingFile?: File | null;
  pendingConfig?: any | null;
  isLocked?: boolean;
}

export function SceneVariationImageUpload({
  variationUuid,
  promptImageAssets: initialPromptImageAssets,
  isImageToVideoModel,
  mode = "immediate",
  onPendingFileChange,
  onPendingConfigChange,
  pendingFile,
  pendingConfig,
  isLocked,
}: SceneVariationImageUploadProps) {
  const [activeTab, setActiveTab] = useState<string>("create");

  const [prompt, setPrompt] = useState(pendingConfig?.prompt_text || "");

  const [selectedModel, setSelectedModel] = useState(
    pendingConfig?.ai_model || "",
  );

  const [referenceImage, setReferenceImage] = useState<File | null>(
    pendingConfig?.image || null,
  );

  const [enrichPrompt, setEnrichPrompt] = useState(
    pendingConfig?.enrich_prompt ?? true,
  );

  const [isPolling, setIsPolling] = useState(false);

  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const uploadImageMutation = useUploadSceneVariationPromptImage();

  const deleteImageMutation = useDeleteProjectAsset(); // Use generic delete instead

  const createImageMutation = useCreateSceneVariationImage();

  const queryClient = useQueryClient();

  const projectAssetsQuery = useMemo(
    () => ({ scene_variation_uuid: variationUuid }),
    [variationUuid],
  );

  const { data: assetsResponse } = useProjectAssets(projectAssetsQuery, {
    enabled: isPolling,
    refetchInterval: (query: any) => {
      const asset =
        query.state?.data?.data?.find(
          (a: any) => a.role === AssetRoles.PROMPT_IMAGE,
        ) ||
        query?.data?.data?.find((a: any) => a.role === AssetRoles.PROMPT_IMAGE);

      return asset?.status === ProjectAssetStatuses.COMPLETED ? false : 3000;
    },
  });

  const promptImageAssets =
    assetsResponse?.data?.filter(
      (a: any) => a.role === AssetRoles.PROMPT_IMAGE,
    ) ||
    initialPromptImageAssets ||
    [];

  const latestPromptImage =
    promptImageAssets && promptImageAssets.length > 0
      ? promptImageAssets[0]
      : null;

  useEffect(() => {
    if (isPolling) {
      if (latestPromptImage?.status === ProjectAssetStatuses.COMPLETED) {
        setIsPolling(false);

        queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
      } else if (latestPromptImage?.status === ProjectAssetStatuses.FAILED) {
        setIsPolling(false);
      }
    }
  }, [latestPromptImage?.status, isPolling, queryClient]);

  if (!isImageToVideoModel) return null;

  const handleGenerateImage = () => {
    if (!selectedModel || !prompt.trim()) return;

    if (mode === "deferred") {
      onPendingConfigChange?.({
        ai_model: selectedModel,
        prompt_text: prompt,
        image: referenceImage || undefined,
        enrich_prompt: enrichPrompt,
      });

      onPendingFileChange?.(null); // Clear pending upload if generating

      return;
    }

    createImageMutation.mutate(
      {
        uuid: variationUuid,
        payload: {
          ai_model: selectedModel,
          prompt_text: prompt,
          image: referenceImage || undefined,
          enrich_prompt: enrichPrompt,
        },
      },
      {
        onSuccess: () => {
          setIsPolling(true);

          setReferenceImage(null);
        },
      },
    );
  };

  const handleDeleteImage = async () => {
    if (latestPromptImage?.uuid) {
      await deleteImageMutation.mutateAsync(latestPromptImage.uuid);
    }

    setIsDeleteModalOpen(false);
  };

  const providers = Array.from(new Set(ImageModels.map((m) => m.provider)));

  const isGenerating = createImageMutation.isPending || isPolling;

  const selectedModelConfig = ImageModels.find((m) => m.name === selectedModel);

  const supportsImageToImage =
    (selectedModelConfig as any)?.image_to_image === true;

  const currentDisplayImage = pendingFile
    ? URL.createObjectURL(pendingFile)
    : latestPromptImage?.document?.url;

  return (
    <>
      <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
        <AccordionItem
          key="image-upload"
          aria-label="Reference Image"
          classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}
          title={
            <span className="text-sm font-medium">
              Reference Image{" "}
              {(pendingFile || pendingConfig) && (
                <span className="text-primary text-[10px] ml-2">
                  (Pending Action)
                </span>
              )}{" "}
            </span>
          }
        >
          {isLocked ? (
            <div className="flex flex-col gap-4 pt-1">
              <Alert
                className="rounded-xl border-primary/20 bg-primary/5 dark:bg-primary/10"
                color="primary"
                description="This reference image is part of a completed video iteration. To use a different image or prompt, please start a new iteration using the 'Regenerate' or 'Create Video' button."
                title="Iteration Locked"
                variant="faded"
              />

              {latestPromptImage?.document?.url && (
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest self-start">
                    Used Reference
                  </p>
                  <div className="relative group w-full aspect-video rounded-xl overflow-hidden border-2 border-default-200 hover:border-primary transition-all">
                    <img
                      alt="Reference used"
                      className="w-full h-full object-cover"
                      src={latestPromptImage.document.url}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Sparkles className="size-5 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {!latestPromptImage && (
                <div className="p-6 border-2 border-dashed border-default-200 rounded-xl text-center">
                  <p className="text-xs text-default-400">
                    No reference image was used for this iteration.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Tabs
                classNames={{
                  tabList: "bg-default-100/50 p-1 rounded-lg",
                  cursor: "rounded-md shadow-sm",
                  tab: "h-8",
                }}
                selectedKey={activeTab}
                size="sm"
                variant="underlined"
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab
                  key="create"
                  title={
                    <div className="flex items-center gap-2">
                      <Wand2 className="size-3.5" />
                      <span>Create</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-3 pt-2">
                    {isPolling ? (
                      <div className="flex flex-col items-center justify-center p-8 gap-3 border-2 border-dashed border-default-200 rounded-xl bg-default-50/50">
                        <Spinner color="primary" size="lg" />
                        <div className="text-center">
                          <p className="text-sm font-bold">
                            Generating Image...
                          </p>
                          <p className="text-xs text-default-400">
                            Please wait, AI is creating your image.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {pendingConfig && (
                          <Alert
                            className="rounded-xl mb-1 py-1 px-2 text-xs"
                            color="primary"
                            description="Image will be generated when video is created."
                            variant="flat"
                          />
                        )}
                        <Textarea
                          isRequired
                          classNames={{ inputWrapper: "rounded-xl" }}
                          label="Generation Prompt"
                          placeholder="Describe the image you want to create..."
                          value={prompt}
                          variant="bordered"
                          onValueChange={setPrompt}
                        />

                        <Select
                          isRequired
                          classNames={{ trigger: "rounded-xl" }}
                          label="AI Model"
                          placeholder="Select a model"
                          selectedKeys={selectedModel ? [selectedModel] : []}
                          variant="bordered"
                          onSelectionChange={(keys) => {
                            const newModel = Array.from(keys)[0] as string;

                            setSelectedModel(newModel);

                            // Clear reference image if new model doesn't support it
                            const config = ImageModels.find(
                              (m) => m.name === newModel,
                            );

                            if (!(config as any)?.image_to_image) {
                              setReferenceImage(null);
                            }
                          }}
                        >
                          {providers.map((provider) => (
                            <SelectSection key={provider} title={provider}>
                              {ImageModels.filter(
                                (m) => m.provider === provider,
                              ).map((model) => (
                                <SelectItem
                                  key={model.name}
                                  textValue={model.label}
                                >
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectSection>
                          ))}
                        </Select>

                        <div className="flex items-center px-1">
                          <Checkbox
                            classNames={{
                              label: "text-xs font-medium text-default-600",
                            }}
                            isSelected={enrichPrompt}
                            size="sm"
                            onValueChange={setEnrichPrompt}
                          >
                            Enrich Prompt
                          </Checkbox>
                        </div>

                        {supportsImageToImage && (
                          <div className="flex flex-col gap-2">
                            <p className="text-xs font-medium text-default-600">
                              Guidance Image (Optional)
                            </p>
                            <ImageUpload
                              description="Optional image to guide the generation."
                              height="min-h-[100px]"
                              value={
                                referenceImage
                                  ? URL.createObjectURL(referenceImage)
                                  : undefined
                              }
                              onChange={(file: File) => setReferenceImage(file)}
                              onRemove={() => setReferenceImage(null)}
                            />
                          </div>
                        )}

                        <Button
                          className="rounded-xl w-full"
                          color={pendingConfig ? "success" : "primary"}
                          isDisabled={
                            !selectedModel || !prompt.trim() || isGenerating
                          }
                          isLoading={createImageMutation.isPending}
                          startContent={
                            pendingConfig ? (
                              <CheckCircle className="size-4" />
                            ) : (
                              <Sparkles className="size-4" />
                            )
                          }
                          variant="flat"
                          onPress={handleGenerateImage}
                        >
                          {mode === "deferred"
                            ? pendingConfig
                              ? "Configured"
                              : "Generate Image (Deferred)"
                            : "Generate Image"}
                        </Button>
                      </>
                    )}

                    {latestPromptImage?.status ===
                      ProjectAssetStatuses.FAILED &&
                      !isPolling && (
                        <Alert
                          className="mt-2 rounded-xl"
                          color="danger"
                          description={
                            latestPromptImage.error_message ||
                            "An unexpected error occurred during image generation."
                          }
                          startContent={<XCircle className="size-4" />}
                          title="Generation Failed"
                          variant="flat"
                        />
                      )}

                    {latestPromptImage?.document?.url &&
                      !isPolling &&
                      !pendingConfig &&
                      !pendingFile &&
                      mode !== "deferred" && (
                        <div className="mt-4 pt-4 border-t border-default-100 text-center">
                          <p className="text-xs text-default-400 mb-2 italic">
                            Current Reference Image
                          </p>
                          <ImageUpload
                            height="min-h-[100px]"
                            value={latestPromptImage.document.url}
                            onRemove={() => setIsDeleteModalOpen(true)}
                          />
                        </div>
                      )}
                  </div>
                </Tab>
                <Tab
                  key="upload"
                  title={
                    <div className="flex items-center gap-2">
                      <Upload className="size-3.5" />
                      <span>Upload</span>
                    </div>
                  }
                >
                  <div className="pt-2">
                    <ImageUpload
                      description={
                        pendingFile
                          ? "New image will be uploaded with the video."
                          : "Upload an image to guide the style and composition of the video."
                      }
                      height="min-h-[120px]"
                      isLoading={uploadImageMutation.isPending}
                      label=""
                      value={currentDisplayImage}
                      onChange={(file: File) => {
                        if (mode === "deferred") {
                          onPendingFileChange?.(file);

                          onPendingConfigChange?.(null);
                        } else {
                          uploadImageMutation.mutate({
                            uuid: variationUuid,
                            file,
                          });
                        }
                      }}
                      onRemove={() => {
                        if (mode === "deferred" && pendingFile) {
                          onPendingFileChange?.(null);
                        } else {
                          setIsDeleteModalOpen(true);
                        }
                      }}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          )}
        </AccordionItem>
      </Accordion>

      <ConfirmationModal
        confirmColor="danger"
        confirmText="Remove"
        description="Are you sure you want to remove the reference image? This action cannot be undone."
        isLoading={deleteImageMutation.isPending}
        isOpen={isDeleteModalOpen}
        title="Remove Reference Image"
        onClose={() => {
          setIsDeleteModalOpen(false);

          setAssetToDelete(null);
        }}
        onConfirm={handleDeleteImage}
      />
    </>
  );
}

"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { useUploadSceneVariationPromptImage, useDeleteSceneVariationPromptImage, useGenerateSceneVariationImage, useSceneVariation } from "@/features/scene-variations/hooks/use-scene-variations";
import { useQueryClient } from "@tanstack/react-query";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem, SelectSection } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ImageModels } from "@/config/dropdowns/project/image.options";
import { useState, useEffect } from "react";
import { Wand2, Upload, Sparkles } from "lucide-react";
import { Spinner } from "@heroui/spinner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Alert } from "@heroui/alert";
import { XCircle } from "lucide-react";
import { MediaStatuses } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

interface SceneVariationImageUploadProps {
  variationUuid: string;
  promptImageUrl?: string;
  isImageToVideoModel: boolean;
}

export function SceneVariationImageUpload({ variationUuid, promptImageUrl, isImageToVideoModel }: SceneVariationImageUploadProps) {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const uploadImageMutation = useUploadSceneVariationPromptImage();
  const deleteImageMutation = useDeleteSceneVariationPromptImage();
  const generateImageMutation = useGenerateSceneVariationImage();

  const queryClient = useQueryClient();

  const { data: latestVariation } = useSceneVariation(variationUuid, {
    enabled: isPolling,
    refetchInterval: (data: any) => (data?.prompt_image?.url ? false : 3000),
  });

  useEffect(() => {
    if (isPolling) {
      if (latestVariation?.prompt_image?.url) {
        setIsPolling(false);
        queryClient.invalidateQueries({ queryKey: ["scene-variations"] });
      } else if (latestVariation?.image_generation_status === MediaStatuses.FAILED) {
        setIsPolling(false);
      }
    }
  }, [latestVariation?.prompt_image?.url, latestVariation?.image_generation_status, isPolling, queryClient]);


  if (!isImageToVideoModel) return null;

  const handleGenerateImage = () => {
    if (!selectedModel || !prompt.trim()) return;
    
    generateImageMutation.mutate({
      uuid: variationUuid,
      generateDto: {
        model: selectedModel,
        prompt: prompt,
        image: referenceImage || undefined,
      }
    }, {
      onSuccess: () => {
        setIsPolling(true);
        setReferenceImage(null);
      }
    });
  };

  const handleDeleteImage = async () => {
    await deleteImageMutation.mutateAsync(variationUuid);
    setIsDeleteModalOpen(false);
  };

  const providers = Array.from(new Set(ImageModels.map(m => m.provider)));
  const isGenerating = generateImageMutation.isPending || isPolling;
  const selectedModelConfig = ImageModels.find(m => m.name === selectedModel);
  const supportsImageToImage = (selectedModelConfig as any)?.image_to_image === true;

  return (
    <>
      <Accordion className="px-0 gap-0 border border-default-200 dark:border-default-100/20 rounded-xl overflow-hidden">
        <AccordionItem 
          key="image-upload" 
          aria-label="Reference Image" 
          title={<span className="text-sm font-medium">Reference Image</span>} 
          classNames={{ trigger: "py-3 px-4", content: "px-4 pb-4" }}
        >
          <div className="flex flex-col gap-4">
            <Tabs 
              selectedKey={activeTab} 
              onSelectionChange={(key) => setActiveTab(key as string)}
              variant="underlined"
              size="sm"
              classNames={{
                tabList: "bg-default-100/50 p-1 rounded-lg",
                cursor: "rounded-md shadow-sm",
                tab: "h-8"
              }}
            >
                <Tab key="create" title={
                <div className="flex items-center gap-2">
                  <Wand2 className="size-3.5" />
                  <span>Create</span>
                </div>
              }>
                <div className="flex flex-col gap-3 pt-2">
                  {isPolling ? (
                    <div className="flex flex-col items-center justify-center p-8 gap-3 border-2 border-dashed border-default-200 rounded-xl bg-default-50/50">
                      <Spinner size="lg" color="primary" />
                      <div className="text-center">
                        <p className="text-sm font-bold">Generating Image...</p>
                        <p className="text-xs text-default-400">Please wait, AI is creating your image.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Textarea
                        label="Generation Prompt"
                        placeholder="Describe the image you want to create..."
                        variant="bordered"
                        value={prompt}
                        onValueChange={setPrompt}
                        isRequired
                        classNames={{ inputWrapper: "rounded-xl" }}
                      />
                      
                      <Select
                        label="AI Model"
                        placeholder="Select a model"
                        variant="bordered"
                        isRequired
                        selectedKeys={selectedModel ? [selectedModel] : []}
                        onSelectionChange={(keys) => {
                          const newModel = Array.from(keys)[0] as string;
                          setSelectedModel(newModel);
                          // Clear reference image if new model doesn't support it
                          const config = ImageModels.find(m => m.name === newModel);
                          if (!(config as any)?.image_to_image) {
                            setReferenceImage(null);
                          }
                        }}
                        classNames={{ trigger: "rounded-xl" }}
                      >
                        {providers.map((provider) => (
                          <SelectSection key={provider} title={provider}>
                            {ImageModels.filter(m => m.provider === provider).map((model) => (
                              <SelectItem key={model.name} textValue={model.label}>
                                {model.label}
                              </SelectItem>
                            ))}
                          </SelectSection>
                        ))}
                      </Select>

                      {supportsImageToImage && (
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-medium text-default-600">Guidance Image (Optional)</label>
                          <ImageUpload
                              height="min-h-[100px]"
                              description="Optional image to guide the generation."
                              value={referenceImage ? URL.createObjectURL(referenceImage) : undefined}
                              onChange={(file: File) => setReferenceImage(file)}
                              onRemove={() => setReferenceImage(null)}
                          />
                        </div>
                      )}
                      
                      <Button 
                        color="primary" 
                        variant="flat" 
                        startContent={<Sparkles className="size-4" />}
                        isDisabled={!selectedModel || !prompt.trim() || isGenerating}
                        isLoading={generateImageMutation.isPending}
                        onPress={handleGenerateImage}
                        className="rounded-xl w-full"
                      >
                        Generate Image
                      </Button>
                  </>
                )}

                {latestVariation?.image_generation_status === MediaStatuses.FAILED && !isPolling && (
                  <Alert
                    color="danger"
                    variant="flat"
                    title="Generation Failed"
                    description={latestVariation.image_generation_error || "An unexpected error occurred during image generation."}
                    startContent={<XCircle className="size-4" />}
                    className="mt-2 rounded-xl"
                  />
                )}

                {promptImageUrl && !isPolling && (
                    <div className="mt-4 pt-4 border-t border-default-100 text-center">
                      <p className="text-xs text-default-400 mb-2 italic">Current Variation Image</p>
                      <ImageUpload
                          value={promptImageUrl}
                          height="min-h-[100px]"
                          onRemove={() => setIsDeleteModalOpen(true)}
                      />
                    </div>
                  )}
                </div>
              </Tab>
              <Tab key="upload" title={
                <div className="flex items-center gap-2">
                  <Upload className="size-3.5" />
                  <span>Upload</span>
                </div>
              }>
                <div className="pt-2">
                  <ImageUpload
                      label=""
                      description="Upload an image to guide the style and composition of the video."
                      value={promptImageUrl}
                      isLoading={uploadImageMutation.isPending}
                      height="min-h-[120px]"
                      onChange={(file: File) => {
                        uploadImageMutation.mutate({ uuid: variationUuid, file });
                      }}
                      onRemove={() => {
                        setIsDeleteModalOpen(true);
                      }}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </AccordionItem>
      </Accordion>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteImage}
        title="Remove Reference Image"
        description="Are you sure you want to remove the reference image? This action cannot be undone."
        confirmText="Remove"
        confirmColor="danger"
        isLoading={deleteImageMutation.isPending}
      />
    </>
  );

}






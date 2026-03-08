"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { useUploadSceneVariationPromptImage, useDeleteSceneVariationPromptImage } from "@/features/scene-variations/hooks/use-scene-variations";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem, SelectSection } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ImageModels } from "@/config/dropdowns/project/image.options";
import { useState } from "react";
import { Wand2, Upload, Sparkles } from "lucide-react";

interface SceneVariationImageUploadProps {
  variationUuid: string;
  promptImageUrl?: string;
  isImageToVideoModel: boolean;
}

export function SceneVariationImageUpload({ variationUuid, promptImageUrl, isImageToVideoModel }: SceneVariationImageUploadProps) {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  
  const uploadImageMutation = useUploadSceneVariationPromptImage();
  const deleteImageMutation = useDeleteSceneVariationPromptImage();

  if (!isImageToVideoModel) return null;

  const providers = Array.from(new Set(ImageModels.map(m => m.provider)));

  return (
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
                <Textarea
                  label="Generation Prompt"
                  placeholder="Describe the image you want to create..."
                  variant="bordered"
                  value={prompt}
                  onValueChange={setPrompt}
                  isRequired
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
                
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-medium text-default-600">Guidance Image (Optional)</label>
                   <ImageUpload
                      height="min-h-[100px]"
                      description="Optional image to guide the generation."
                      // We can use local state for this temporary upload or just show a simplified version
                   />
                </div>

                <Select
                  label="AI Model"
                  placeholder="Select a model"
                  variant="bordered"
                  isRequired
                  selectedKeys={selectedModel ? [selectedModel] : []}
                  onSelectionChange={(keys) => setSelectedModel(Array.from(keys)[0] as string)}
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
                <Button 
                  color="primary" 
                  variant="flat" 
                  startContent={<Sparkles className="size-4" />}
                  isDisabled={!selectedModel || !prompt.trim()}
                  className="rounded-xl w-full"
                >
                  Generate Image
                </Button>
                {promptImageUrl && (
                   <div className="mt-4 pt-4 border-t border-default-100 text-center">
                     <p className="text-xs text-default-400 mb-2 italic">Current Variation Image</p>
                     <ImageUpload
                        value={promptImageUrl}
                        height="min-h-[100px]"
                        onRemove={() => deleteImageMutation.mutate(variationUuid)}
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
                    onChange={(file) => {
                      uploadImageMutation.mutate({ uuid: variationUuid, file });
                    }}
                    onRemove={() => {
                      deleteImageMutation.mutate(variationUuid);
                    }}
                />
              </div>
            </Tab>
         
          </Tabs>
        </div>
      </AccordionItem>
    </Accordion>
  );
}


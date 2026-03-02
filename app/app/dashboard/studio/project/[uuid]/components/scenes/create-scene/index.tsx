import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { RadioGroup, Radio } from "@heroui/radio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateScene, useGenerateAiScenes } from "@/features/scenes/hooks/use-scenes";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import { AISceneGenerationForm, AIFormValues } from "./ai-scene-form";
import { ManualSceneForm, manualFormSchema, ManualFormValues } from "./manual-scene-form";

interface CreateSceneModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  projectUuid: string;
  scenes: Scene[];
}

export function CreateSceneModal({ isOpen, onOpenChange, onClose, projectUuid, scenes }: CreateSceneModalProps) {
  const [selectedTab, setSelectedTab] = useState<string>("ai");
  const [aiMode, setAiMode] = useState<string>("continue");

  const { control: manualControl, handleSubmit: handleManualSubmit, reset: resetManual } = useForm<ManualFormValues>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate: createScene, isPending: isManualPending } = useCreateScene();
  const { mutate: generateAiScenes, isPending: isAiPending } = useGenerateAiScenes();

  const onManualSubmitForm = (data: ManualFormValues) => {
    createScene(
      {
        project_uuid: projectUuid,
        title: data.title,
        description: data.description,
      },
      {
        onSuccess: () => {
          resetManual();
          onClose();
        },
      }
    );
  };

  const onAISubmitForm = (data: AIFormValues) => {
    generateAiScenes({
      project_uuid: projectUuid,
      number_of_scenes: data.number_of_scenes,
      scene_variations: data.scene_variations,
      continue_scenes: aiMode === "continue",
      enrich_prompt: data.enrich_prompt,
      instructions: data.instructions,
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  let startingIndex = 1;
  const existingScenesLength = scenes?.length || 0;
  
  if (existingScenesLength > 0 && aiMode === "continue") {
    startingIndex = existingScenesLength + 1;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} size="lg">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Create New Scene</ModalHeader>
            <ModalBody>
              <Tabs selectedKey={selectedTab} onSelectionChange={(k) => setSelectedTab(k as string)} fullWidth>
                <Tab key="ai" title="Generate with AI">
                  {existingScenesLength > 0 && (
                    <div className="mb-4">
                      <RadioGroup 
                        value={aiMode} 
                        onValueChange={setAiMode} 
                        orientation="horizontal"
                        className="mb-4"
                      >
                        <Radio value="continue">Continue existing scenes</Radio>
                        <Radio value="scratch">Create scenes from scratch</Radio>
                      </RadioGroup>
                    </div>
                  )}
                  <AISceneGenerationForm startingIndex={startingIndex} onSubmit={onAISubmitForm} />
                </Tab>

                <Tab key="manual" title="Manual Entry">
                  <ManualSceneForm 
                    control={manualControl} 
                    onSubmit={handleManualSubmit(onManualSubmitForm)} 
                  />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              {selectedTab === "ai" ? (
                <Button color="primary" type="submit" form="ai-scene-form" isLoading={isAiPending}>
                  Generate Scenes
                </Button>
              ) : (
                <Button color="primary" type="submit" form="manual-form" isLoading={isManualPending}>
                  Create Scene
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

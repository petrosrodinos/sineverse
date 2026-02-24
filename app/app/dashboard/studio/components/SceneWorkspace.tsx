"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { RefreshCw } from "lucide-react";
import type { Scene } from "@/types/studio";
import { PromptVariationCard } from "./PromptVariationCard";
import { AIModel } from "@/types/studio";

interface SceneWorkspaceProps {
  scene: Scene;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onRegenerateScene: () => void;
  onVariationPromptChange: (variationId: string, prompt: string) => void;
  onVariationNegativeChange: (variationId: string, negative: string) => void;
  onVariationModelChange: (variationId: string, model: AIModel) => void;
  onVariationAspectRatioChange: (variationId: string, value: string) => void;
  onVariationDurationChange: (variationId: string, seconds: number) => void;
  onVariationReferenceImagesChange: (variationId: string, urls: string[]) => void;
  onGenerateVideos: (variationId: string) => void;
  onSelectFinalVideo: (variationId: string, videoId: string) => void;
  onRegenerateVideo: (variationId: string, videoId: string) => void;
  onRegenerateVariation: (variationId: string) => void;
  onAddVariation: () => void;
  isRegeneratingScene?: boolean;
  generatingVariationId: string | null;
  generatingVideosVariationId: string | null;
  progressText?: string;
}

export function SceneWorkspace({ scene, onTitleChange, onDescriptionChange, onRegenerateScene, onVariationPromptChange, onVariationNegativeChange, onVariationModelChange, onVariationAspectRatioChange, onVariationDurationChange, onVariationReferenceImagesChange, onGenerateVideos, onSelectFinalVideo, onRegenerateVideo, onRegenerateVariation, onAddVariation, isRegeneratingScene, generatingVariationId, generatingVideosVariationId, progressText }: SceneWorkspaceProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input label="Scene title" value={scene.title} onValueChange={onTitleChange} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
        <Textarea label="Scene description" value={scene.description} onValueChange={onDescriptionChange} variant="bordered" classNames={{ input: "min-h-[120px]", inputWrapper: "rounded-xl" }} minRows={4} />
        <Button variant="flat" onPress={onRegenerateScene} isDisabled={isRegeneratingScene} isLoading={isRegeneratingScene} startContent={!isRegeneratingScene ? <RefreshCw className="size-4" /> : undefined} className="rounded-xl">
          Regenerate Scene with AI
        </Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Prompt variations</h3>
        {scene.variations.map((variation, idx) => (
          <PromptVariationCard
            key={variation.id}
            variation={variation}
            onPromptChange={(p) => onVariationPromptChange(variation.id, p)}
            onNegativePromptChange={(n) => onVariationNegativeChange(variation.id, n)}
            onModelChange={(m) => onVariationModelChange(variation.id, m)}
            onAspectRatioChange={(v) => onVariationAspectRatioChange(variation.id, v)}
            onDurationChange={(s) => onVariationDurationChange(variation.id, s)}
            onReferenceImagesChange={(urls) => onVariationReferenceImagesChange(variation.id, urls)}
            onGenerateVideos={() => onGenerateVideos(variation.id)}
            onSelectFinalVideo={(videoId) => onSelectFinalVideo(variation.id, videoId)}
            onRegenerateVideo={(videoId) => onRegenerateVideo(variation.id, videoId)}
            onRegenerateThisVariation={() => onRegenerateVariation(variation.id)}
            onAddVariation={onAddVariation}
            isRegenerating={generatingVariationId === variation.id}
            isGeneratingVideos={generatingVideosVariationId === variation.id}
            progressText={progressText}
          />
        ))}
      </div>
    </div>
  );
}

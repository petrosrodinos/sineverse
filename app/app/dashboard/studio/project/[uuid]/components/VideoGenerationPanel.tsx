"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Upload } from "lucide-react";
import { videoModels, aspectRatios, durations } from "@/config/studio";
import { VideoCard } from "./VideoCard";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

interface VideoGenerationPanelProps {
  variation: SceneVariation;
  onModelChange: (ai_model: string) => void;
  onAspectRatioChange: (value: string) => void;
  onDurationChange: (seconds: number) => void;
  onReferenceImagesChange: (urls: string[]) => void;
  onGenerateVideos: () => void;
  onSelectFinal: (videoId: string) => void;
  onRegenerateVideo: (videoId: string) => void;
  isGenerating?: boolean;
  progressText?: string;
}

export function VideoGenerationPanel({
  variation,
  onModelChange,
  onAspectRatioChange,
  onDurationChange,
  onReferenceImagesChange,
  onGenerateVideos,
  onSelectFinal,
  onRegenerateVideo,
  isGenerating,
  progressText,
}: VideoGenerationPanelProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onReferenceImagesChange([...(variation.prompt_image_uuid ? [variation.prompt_image_uuid] : []), ...urls]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onReferenceImagesChange([...(variation.prompt_image_uuid ? [variation.prompt_image_uuid] : []), ...urls]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Select
          label="Model"
          selectedKeys={variation.ai_model ? [variation.ai_model] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            if (v) onModelChange(v);
          }}
          variant="bordered"
          classNames={{ trigger: "rounded-xl" }}
        >
          {videoModels.map((m) => (
            <SelectItem key={m.id}>{m.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Aspect ratio"
          selectedKeys={variation.aspect_ratio ? [variation.aspect_ratio] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            if (v) onAspectRatioChange(v);
          }}
          variant="bordered"
          classNames={{ trigger: "rounded-xl" }}
        >
          {aspectRatios.map((a) => (
            <SelectItem key={a.value}>{a.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Duration"
          selectedKeys={variation.duration_sec ? [String(variation.duration_sec)] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            if (v) onDurationChange(Number(v));
          }}
          variant="bordered"
          classNames={{ trigger: "rounded-xl" }}
        >
          {durations.map((d) => (
            <SelectItem key={String(d.value)}>{d.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div
        className={`
          rounded-2xl border-2 border-dashed p-6 text-center transition-colors duration-200
          ${dragOver ? "border-primary bg-primary/10" : "border-default-300 dark:border-default-200"}
        `}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id={`ref-${variation.id}`}
          onChange={handleFileChange}
        />
        <label htmlFor={`ref-${variation.id}`} className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="size-8 text-default-400" />
          <span className="text-sm text-default-500">Drop reference images or click to upload</span>
          {variation.prompt_image_uuid && (
            <span className="text-xs text-default-400">1 file(s)</span>
          )}
        </label>
      </div>
      <Button
        color="primary"
        onPress={onGenerateVideos}
        isDisabled={isGenerating}
        isLoading={isGenerating}
        className="w-full rounded-xl font-medium"
      >
        Generate Videos
      </Button>
      {variation.videos && variation.videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Generated videos</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {variation.videos.map((v: any) => (
              <VideoCard
                key={v.id}
                video={v}
                onSelectFinal={() => onSelectFinal(v.id)}
                onRegenerate={() => onRegenerateVideo(v.id)}
                isDisabled={isGenerating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

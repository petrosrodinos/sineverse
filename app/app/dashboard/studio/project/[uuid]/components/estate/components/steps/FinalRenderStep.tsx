"use client";

import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Download, ExternalLink } from "lucide-react";
import { useCallback } from "react";
import { ProjectAssetStatuses } from "@/features/project-assets/interfaces/project-assets.interfaces";
import { useEstateWorkflowStore } from "../../stores/estate-workflow.store";

export function FinalRenderStep() {
  const finalVideoAsset = useEstateWorkflowStore((s) => s.finalVideoAsset);
  const startFinalRender = useEstateWorkflowStore((s) => s.startFinalRender);

  const handleGenerate = useCallback(() => {
    startFinalRender();
  }, [startFinalRender]);

  const isRendering = finalVideoAsset?.status === ProjectAssetStatuses.PROCESSING;
  const isDone = finalVideoAsset?.status === ProjectAssetStatuses.COMPLETED;

  const videoUrl = finalVideoAsset?.document.url ?? "";
  const fileName = finalVideoAsset?.document.filename ?? "video.mp4";

  return (
    <div className="flex flex-col items-stretch gap-6">
      {!isRendering && !isDone && (
        <Button
          color="secondary"
          size="lg"
          className="font-semibold"
          onPress={handleGenerate}
        >
          Generate Final Video
        </Button>
      )}
      {isRendering === true && (
        <div className="flex min-h-[200px] items-center justify-center gap-3 rounded-2xl border border-default-200 bg-default-100/40 dark:border-default-100/20">
          <Spinner color="secondary" size="lg" />
          <span className="text-small text-default-500">Rendering</span>
        </div>
      )}
      {isDone === true && finalVideoAsset && videoUrl.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-default-200 bg-black/40 dark:border-default-100/20">
            <video
              className="aspect-video w-full max-w-4xl mx-auto"
              controls
              src={videoUrl}
              playsInline
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <Button
              as="a"
              href={videoUrl}
              download={fileName}
              color="secondary"
              className="font-semibold"
              startContent={<Download className="h-4 w-4" />}
            >
              Download
            </Button>
            <Button
              as="a"
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              startContent={<ExternalLink className="h-4 w-4" />}
            >
              Open in new tab
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

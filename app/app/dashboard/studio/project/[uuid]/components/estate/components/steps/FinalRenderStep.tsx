"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { CheckCircle2, Download, Sparkles, Wand2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFinalProject, useRenderFinalProject } from "@/features/final-projects/hooks/use-final-projects";
import { downloadFinalProjectVideoByDocument } from "@/features/final-projects/services/final-projects.services";

type FinalRenderStepProps = {
  finalProjectUuid: string | null;
};

export function FinalRenderStep({ finalProjectUuid }: FinalRenderStepProps) {
  const { data: finalProjectData } = useFinalProject(finalProjectUuid ?? "");
  const { mutate: startRender, isPending: isRenderPending } = useRenderFinalProject();
  const [playbackUrls, setPlaybackUrls] = useState<Record<string, string>>({});
  const playbackUrlsRef = useRef<Record<string, string>>({});

  const renderStatus = finalProjectData?.render_status ?? "IDLE";
  const renderedVideoUrl = finalProjectData?.video?.url ?? null;
  const isRendering = renderStatus === "RENDERING" || isRenderPending;
  const isCompleted = renderStatus === "COMPLETED" && !!renderedVideoUrl;
  const isFailed = renderStatus === "FAILED";
  const renderHistory = useMemo(
    () =>
      [...(finalProjectData?.render_history ?? [])].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [finalProjectData?.render_history],
  );
  const featuredVideoUrl = finalProjectData?.video?.url ?? renderHistory[0]?.url ?? null;
  const featuredDocumentUuid = finalProjectData?.video_uuid ?? renderHistory[0]?.uuid ?? null;
  const galleryRenders = renderHistory.filter((item) => item.uuid !== featuredDocumentUuid);

  const handleRender = useCallback(() => {
    if (!finalProjectUuid) return;
    startRender(finalProjectUuid);
  }, [finalProjectUuid, startRender]);

  const handleDownloadVideo = useCallback(async (documentUuid: string) => {
    if (!finalProjectUuid) {
      return;
    }
    try {
      const blob = await downloadFinalProjectVideoByDocument(finalProjectUuid, documentUuid);
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `estate-render-${Date.now()}.mp4`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      addToast({
        title: "Download unavailable",
        description: "Could not download the video. Please try again.",
        severity: "danger",
      });
    }
  }, [finalProjectUuid]);

  const ensurePlaybackUrl = useCallback(async (documentUuid: string) => {
    if (!finalProjectUuid) {
      return;
    }
    if (playbackUrls[documentUuid]) {
      return;
    }
    try {
      const blob = await downloadFinalProjectVideoByDocument(finalProjectUuid, documentUuid);
      const objectUrl = URL.createObjectURL(blob);
      setPlaybackUrls((prev) => ({ ...prev, [documentUuid]: objectUrl }));
    } catch {
      addToast({
        title: "Preview unavailable",
        description: "Could not load this video preview.",
        severity: "warning",
      });
    }
  }, [finalProjectUuid, playbackUrls]);

  useEffect(() => {
    playbackUrlsRef.current = playbackUrls;
  }, [playbackUrls]);

  useEffect(() => {
    return () => {
      Object.values(playbackUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="flex flex-col items-stretch gap-6">
      {isRendering && (
        <Card className="border border-default-200 bg-gradient-to-br from-default-100/70 via-default-100/40 to-secondary-500/10 dark:border-default-100/20 dark:from-default-100/10 dark:via-default-100/5 dark:to-secondary-500/15">
          <CardBody className="gap-4 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-500">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-default-700 dark:text-default-300">Rendering your final video</p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-default-200 dark:border-default-100/20">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-default-50/10 backdrop-blur-[1px] dark:bg-black/10">
                <Spinner size="sm" color="secondary" />
                <p className="text-xs text-default-600 dark:text-default-400">Applying clips, captions, transitions and audio...</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {featuredVideoUrl && (
        <Card className="border border-success-300/50 bg-gradient-to-br from-success-500/10 via-default-100/60 to-secondary-500/10 dark:from-success-500/20 dark:via-default-100/5 dark:to-secondary-500/20">
          <CardBody className="gap-4 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-500/15 text-success-500">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-foreground">
                {isCompleted ? "Your latest video is ready" : "Latest generated video"}
              </p>
            </div>
            <video
              src={featuredVideoUrl}
              controls
              className="w-full rounded-xl border border-default-200 dark:border-default-100/20"
              style={{ maxHeight: 380 }}
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                color="secondary"
                variant="solid"
                startContent={<Download className="h-4 w-4" />}
                onPress={() => {
                  if (!featuredDocumentUuid) return;
                  void handleDownloadVideo(featuredDocumentUuid);
                }}
              >
                Download Video
              </Button>
              <Button
                as="a"
                href={featuredVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
              >
                Open in New Tab
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {galleryRenders.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryRenders.map((renderItem) => (
            <Card key={renderItem.uuid} className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
              <CardBody className="gap-2 p-2">
                <video
                  src={playbackUrls[renderItem.uuid] ?? renderItem.url ?? ""}
                  controls
                  className="aspect-video w-full rounded-lg border border-default-200 dark:border-default-100/20"
                  onError={() => {
                    void ensurePlaybackUrl(renderItem.uuid);
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Download className="h-3.5 w-3.5" />}
                    onPress={() => {
                      void handleDownloadVideo(renderItem.uuid);
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    as="a"
                    href={renderItem.video?.url ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {isFailed && (
        <p className="text-sm text-danger text-center">
          Render failed. Please try again.
        </p>
      )}

      {!isRendering && (
        <Button
          color="secondary"
          size="lg"
          className="h-12 bg-gradient-to-r from-secondary-500 to-secondary-400 font-semibold text-white shadow-lg shadow-secondary-500/30 transition-transform duration-200 hover:scale-[1.01]"
          isDisabled={!finalProjectUuid}
          onPress={handleRender}
          startContent={<Wand2 className="h-4 w-4" />}
        >
          {isCompleted ? "Re-render Video" : "Generate Video"}
        </Button>
      )}
    </div>
  );
}

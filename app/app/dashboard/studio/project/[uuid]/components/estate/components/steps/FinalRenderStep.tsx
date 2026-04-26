"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { CheckCircle2, Download, ExternalLink, Lock, Sparkles, Trash2, Wand2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useFinalProject, useDeleteFinalProjectVideo, useDeleteFinalProjectVideoByDocument, useRenderFinalProject } from "@/features/final-projects/hooks/use-final-projects";
import { downloadFinalProjectVideoByDocument } from "@/features/final-projects/services/final-projects.services";
import { completeVisitorSession } from "@/features/auth/services/auth";
import { clearStoredVisitorAuth, getStoredVisitorAuth } from "@/features/auth/utils/visitor-auth.utils";
import { ProjectTypes } from "@/features/projects/interfaces/projects.interfaces";
import { RoleTypes } from "@/features/user/interfaces/user.interfaces";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Routes } from "@/config/routes";

type FinalRenderStepProps = {
  finalProjectUuid: string | null;
};

type PendingDelete = { type: "single"; documentUuid: string } | { type: "all" } | null;

export function FinalRenderStep({ finalProjectUuid }: FinalRenderStepProps) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const isSessionLoading = status === "loading";

  const isAdmin = !isSessionLoading && (session?.role === RoleTypes.ADMIN || session?.role === RoleTypes.SUPER_ADMIN);

  const { data: finalProjectData } = useFinalProject(finalProjectUuid ?? "");

  const { mutate: startRender, isPending: isRenderPending } = useRenderFinalProject();

  const { mutate: deleteAllRenderedVideos, isPending: isDeletingAllRenderedVideos } = useDeleteFinalProjectVideo();

  const { mutate: deleteRenderedVideoByDocument, isPending: isDeletingRenderedVideo } = useDeleteFinalProjectVideoByDocument();

  const [isRenderStarting, setIsRenderStarting] = useState(false);

  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);

  const [playbackUrls, setPlaybackUrls] = useState<Record<string, string>>({});

  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");

  const [signupPassword, setSignupPassword] = useState("");

  const [signupName, setSignupName] = useState("");

  const [isCompletingSignup, setIsCompletingSignup] = useState(false);

  const playbackUrlsRef = useRef<Record<string, string>>({});

  const hasAutoRenderAttemptedRef = useRef(false);

  const renderStatus = finalProjectData?.render_status ?? "IDLE";

  const renderedVideoUrl = finalProjectData?.video?.url ?? null;

  const isRendering = renderStatus === "RENDERING" || isRenderPending || isRenderStarting;

  const isCompleted = renderStatus === "COMPLETED" && !!renderedVideoUrl;

  const isFailed = renderStatus === "FAILED";

  const renderHistory = useMemo(() => [...(finalProjectData?.render_history ?? [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), [finalProjectData?.render_history]);

  const featuredVideoUrl = finalProjectData?.video?.url ?? renderHistory[0]?.url ?? null;

  const featuredDocumentUuid = finalProjectData?.video_uuid ?? renderHistory[0]?.uuid ?? null;

  const galleryRenders = renderHistory.filter((item) => item.uuid !== featuredDocumentUuid);

  const showEmptyState = !isRendering && !featuredVideoUrl && !isFailed;

  const previewImageUrl = finalProjectData?.thumbnail?.url ?? null;

  const isDeletePending = isDeletingAllRenderedVideos || isDeletingRenderedVideo;

  const visitorAuth = useMemo(() => getStoredVisitorAuth(), [status]);

  const isVisitor = status === "unauthenticated" && visitorAuth?.role === RoleTypes.VISITOR;

  const handleRender = useCallback(() => {
    if (!finalProjectUuid) return;

    setIsRenderStarting(true);

    startRender(finalProjectUuid, {
      onError: () => {
        setIsRenderStarting(false);
      },
    });
  }, [finalProjectUuid, startRender]);

  const handleDownloadVideo = useCallback(
    async (documentUuid: string) => {
      if (isVisitor) {
        setIsSignupOpen(true);

        return;
      }

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
    },
    [finalProjectUuid, isVisitor],
  );

  const handleCompleteSignup = useCallback(async () => {
    if (!signupEmail || !signupPassword || !signupName) {
      addToast({
        title: "Signup details missing",
        description: "Please fill in your name, email, and password.",
        severity: "warning",
      });

      return;
    }

    setIsCompletingSignup(true);

    try {
      await completeVisitorSession({
        full_name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      clearStoredVisitorAuth();

      const result = await signIn("credentials", {
        email: signupEmail,
        password: signupPassword,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      setIsSignupOpen(false);

      const projectUuid = finalProjectData?.project_uuid;

      if (!projectUuid) {
        router.push(Routes.dashboard);

        return;
      }

      router.push(`${Routes.project(projectUuid, { type: ProjectTypes.ESTATE })}&step=3`);
    } catch (error: unknown) {
      addToast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Could not complete signup right now.",
        severity: "danger",
      });
    } finally {
      setIsCompletingSignup(false);
    }
  }, [finalProjectData?.project_uuid, router, signupEmail, signupName, signupPassword]);

  const handleDeleteAllVideos = useCallback(() => {
    if (!finalProjectUuid) {
      return;
    }

    deleteAllRenderedVideos({ finalProjectUuid });
  }, [deleteAllRenderedVideos, finalProjectUuid]);

  const handleDeleteVideo = useCallback(
    (documentUuid: string) => {
      if (!finalProjectUuid) {
        return;
      }

      deleteRenderedVideoByDocument({ finalProjectUuid, documentUuid });
    },
    [deleteRenderedVideoByDocument, finalProjectUuid],
  );

  const requestDeleteAllVideos = useCallback(() => {
    setPendingDelete({ type: "all" });
  }, []);

  const requestDeleteVideo = useCallback((documentUuid: string) => {
    setPendingDelete({ type: "single", documentUuid });
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeletePending) {
      return;
    }

    setPendingDelete(null);
  }, [isDeletePending]);

  const handleConfirmDelete = useCallback(() => {
    if (!pendingDelete) {
      return;
    }

    if (pendingDelete.type === "all") {
      handleDeleteAllVideos();
    } else {
      handleDeleteVideo(pendingDelete.documentUuid);
    }

    setPendingDelete(null);
  }, [pendingDelete, handleDeleteAllVideos, handleDeleteVideo]);

  const ensurePlaybackUrl = useCallback(
    async (documentUuid: string) => {
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
    },
    [finalProjectUuid, playbackUrls],
  );

  useEffect(() => {
    playbackUrlsRef.current = playbackUrls;
  }, [playbackUrls]);

  useEffect(() => {
    return () => {
      Object.values(playbackUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (renderStatus === "RENDERING" || renderStatus === "COMPLETED" || renderStatus === "FAILED") {
      setIsRenderStarting(false);
    }
  }, [renderStatus]);

  useEffect(() => {
    if (!showEmptyState || !finalProjectUuid || isVisitor || hasAutoRenderAttemptedRef.current) {
      return;
    }

    hasAutoRenderAttemptedRef.current = true;

    handleRender();
  }, [finalProjectUuid, handleRender, isVisitor, showEmptyState]);

  return (
    <div className="flex flex-col items-stretch gap-6">
      {isRendering && (
        <Card className="border border-default-200 bg-gradient-to-br from-default-100/70 via-default-100/40 to-secondary-500/10 dark:border-default-100/20 dark:from-default-100/10 dark:via-default-100/5 dark:to-secondary-500/15">
          <CardBody className="gap-4 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-500">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-default-700 dark:text-default-300">Rendering your awesome video</p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-default-200 dark:border-default-100/20">
              {previewImageUrl ? <img alt="Final video preview" className="aspect-video w-full object-cover" src={previewImageUrl} /> : <Skeleton className="aspect-video w-full rounded-none" />}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-default-50/10 backdrop-blur-[1px] dark:bg-black/10">
                <Spinner color="secondary" size="sm" />
                <p className="text-xs text-default-600 dark:text-default-400">Applying clips, captions, transitions and audio...</p>
                {isAdmin && (
                  <Button
                    color="danger"
                    isDisabled={!featuredDocumentUuid}
                    isLoading={isDeletingRenderedVideo}
                    size="sm"
                    startContent={<Trash2 className="h-3.5 w-3.5" />}
                    variant="solid"
                    onPress={() => {
                      if (!featuredDocumentUuid) return;

                      requestDeleteVideo(featuredDocumentUuid);
                    }}
                  >
                    Delete current video
                  </Button>
                )}
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
              <p className="text-sm font-semibold text-foreground">{isCompleted ? "Your video is ready" : "Latest generated video"}</p>
            </div>
            <div className="relative">
              <video className={`w-full rounded-xl border border-default-200 dark:border-default-100/20 ${isVisitor ? "blur-sm" : ""}`} controls={!isVisitor} src={featuredVideoUrl} style={{ maxHeight: 380 }}>
                <track kind="captions" label="English captions" srcLang="en" />
              </video>
              {isVisitor && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-black/45">
                  <Lock className="h-8 w-8 text-white" />
                  <p className="text-center text-sm font-semibold text-white">Sign up to get your video</p>
                  <Button color="primary" onPress={() => setIsSignupOpen(true)}>
                    Download
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                color="secondary"
                isDisabled={isVisitor}
                startContent={<Download className="h-4 w-4" />}
                variant="solid"
                onPress={() => {
                  if (!featuredDocumentUuid) return;

                  void handleDownloadVideo(featuredDocumentUuid);
                }}
              >
                Download Video
              </Button>
              <Button
                isDisabled={isVisitor}
                startContent={<ExternalLink className="h-5 w-5" />}
                variant="bordered"
                onPress={() => {
                  if (isVisitor) {
                    setIsSignupOpen(true);

                    return;
                  }

                  window.open(featuredVideoUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Open in New Tab
              </Button>
            </div>
            {isAdmin && featuredDocumentUuid && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button color="danger" isLoading={isDeletingRenderedVideo} startContent={<Trash2 className="h-4 w-4" />} variant="flat" onPress={() => requestDeleteVideo(featuredDocumentUuid)}>
                  Delete This Video
                </Button>
                <Button color="danger" isLoading={isDeletingAllRenderedVideos} variant="bordered" onPress={requestDeleteAllVideos}>
                  Delete All Final Videos
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {galleryRenders.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryRenders.map((renderItem) => (
            <Card key={renderItem.uuid} className="border border-default-200 bg-default-100/40 dark:border-default-100/20 dark:bg-default-100/5">
              <CardBody className="gap-2 p-2">
                <video
                  controls
                  className="aspect-video w-full rounded-lg border border-default-200 dark:border-default-100/20"
                  src={playbackUrls[renderItem.uuid] ?? renderItem.url ?? ""}
                  onError={() => {
                    void ensurePlaybackUrl(renderItem.uuid);
                  }}
                >
                  <track kind="captions" label="English captions" srcLang="en" />
                </video>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    startContent={<Download className="h-3.5 w-3.5" />}
                    variant="flat"
                    onPress={() => {
                      void handleDownloadVideo(renderItem.uuid);
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    isDisabled={isVisitor}
                    size="sm"
                    startContent={<ExternalLink className="h-5 w-5" />}
                    variant="light"
                    onPress={() => {
                      if (isVisitor) {
                        setIsSignupOpen(true);

                        return;
                      }

                      window.open(renderItem.url ?? "", "_blank", "noopener,noreferrer");
                    }}
                  >
                    Open
                  </Button>
                  {isAdmin && (
                    <Button color="danger" isLoading={isDeletingRenderedVideo} size="sm" startContent={<Trash2 className="h-5 w-5" />} variant="light" onPress={() => requestDeleteVideo(renderItem.uuid)}>
                      Delete
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {isFailed && <p className="text-sm text-danger text-center">Render failed. Please try again.</p>}

      {showEmptyState && (
        <Card className="border border-default-200 bg-gradient-to-br from-default-100/60 to-secondary-500/[0.08] dark:border-default-100/20 dark:from-default-100/10 dark:to-secondary-500/10">
          <CardBody className="gap-3 p-4 sm:p-5">
            {previewImageUrl && (
              <div className="overflow-hidden rounded-xl border border-default-200 dark:border-default-100/20">
                <img alt="Final video preview" className="aspect-video w-full object-cover" src={previewImageUrl} />
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-500">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-foreground">Click Generate to start creating your video</p>
            </div>
            <p className="text-sm text-default-600 dark:text-default-400">Your clips, captions, transitions, and selected audio are ready to be stitched into one final video.</p>
            <p className="text-xs text-default-500">Click generate to create your first render. When complete, it will appear here.</p>
          </CardBody>
        </Card>
      )}

      {!isRendering && (!isVisitor || !isCompleted) && (
        <Button className="h-12 bg-gradient-to-r from-secondary-500 to-secondary-400 font-semibold text-white shadow-lg shadow-secondary-500/30 transition-transform duration-200 hover:scale-[1.01]" color="secondary" isDisabled={!finalProjectUuid} size="lg" startContent={<Wand2 className="h-4 w-4" />} onPress={handleRender}>
          {isCompleted ? "Re-render Video" : "Generate Video"}
        </Button>
      )}
      <Modal isOpen={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalBody>
            <Input label="Full name" value={signupName} variant="bordered" onValueChange={setSignupName} />
            <Input label="Email" type="email" value={signupEmail} variant="bordered" onValueChange={setSignupEmail} />
            <Input label="Password" type="password" value={signupPassword} variant="bordered" onValueChange={setSignupPassword} />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsSignupOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" isLoading={isCompletingSignup} onPress={handleCompleteSignup}>
              Sign up and download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationModal confirmColor="danger" confirmText="Delete" description={pendingDelete?.type === "all" ? "Delete all rendered videos for this final project? This will remove them from history and cloud storage." : "Delete this rendered video from history and cloud storage?"} isLoading={isDeletePending} isOpen={pendingDelete !== null} title={pendingDelete?.type === "all" ? "Delete all final videos" : "Delete final video"} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
    </div>
  );
}

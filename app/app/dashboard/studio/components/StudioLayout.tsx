"use client";

import { useState, useCallback } from "react";
import type { MovieIdea, Scene, SceneAISettings } from "@/types/studio";
import { SceneStatus, VideoStatus, AIModel } from "@/types/studio";
import { getDefaultAISettings, createDefaultScene, createVariation, createDefaultSceneVideo } from "@/utils/studio";
import { IdeaSection } from "./IdeaSection";
import { ScenesSidebar } from "./ScenesSidebar";
import { SceneWorkspace } from "./SceneWorkspace";
import { AIControlsPanel } from "./AIControlsPanel";

const MOCK_DELAY_MS = 1500;

export function StudioLayout() {
  const [idea, setIdea] = useState<MovieIdea>({ raw: "", enriched: null });
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [isGeneratingScenes, setIsGeneratingScenes] = useState(false);
  const [regeneratingSceneId, setRegeneratingSceneId] = useState<string | null>(null);
  const [regeneratingVariationId, setRegeneratingVariationId] = useState<string | null>(null);
  const [generatingVideosVariationId, setGeneratingVideosVariationId] = useState<string | null>(null);
  const [progressText, setProgressText] = useState<string>("");

  const selectedScene = selectedSceneId ? (scenes.find((s) => s.id === selectedSceneId) ?? null) : null;

  const updateScene = useCallback((sceneId: string, updater: (s: Scene) => Scene) => {
    setScenes((prev) => prev.map((s) => (s.id === sceneId ? updater(s) : s)));
  }, []);

  type PromptVariation = import("@/types/studio").PromptVariation;
  const updateVariationTyped = useCallback(
    (sceneId: string, variationId: string, updater: (v: PromptVariation) => PromptVariation) => {
      updateScene(sceneId, (s) => ({
        ...s,
        variations: s.variations.map((v) => (v.id === variationId ? updater(v) : v)),
      }));
    },
    [updateScene],
  );

  const handleEnrich = useCallback(() => {
    if (!idea.raw.trim()) return;
    setIsEnriching(true);
    setTimeout(() => {
      setIdea((prev) => ({ ...prev, enriched: `${prev.raw}\n\nExpanded with mood, stakes, and visual tone.` }));
      setIsEnriching(false);
    }, MOCK_DELAY_MS);
  }, [idea.raw]);

  const handleRegenerateEnriched = useCallback(() => {
    setIsEnriching(true);
    setTimeout(() => {
      setIdea((prev) => ({ ...prev, enriched: (prev.enriched || prev.raw) + "\n\n[Regenerated pass.]" }));
      setIsEnriching(false);
    }, MOCK_DELAY_MS);
  }, []);

  const handleGenerateScenes = useCallback(() => {
    setIsGeneratingScenes(true);
    setProgressText("Generating scenes…");
    setTimeout(() => {
      const count = 3;
      const newScenes = Array.from({ length: count }, (_, i) => createDefaultScene(i + 1));
      setScenes(newScenes);
      if (newScenes.length > 0) setSelectedSceneId(newScenes[0].id);
      setIsGeneratingScenes(false);
      setProgressText("");
    }, MOCK_DELAY_MS);
  }, []);

  const handleRegenerateDescription = useCallback(
    (sceneId: string) => {
      setRegeneratingSceneId(sceneId);
      setTimeout(() => {
        updateScene(sceneId, (s) => ({ ...s, description: (s.description || "") + " [AI regenerated.]" }));
        setRegeneratingSceneId(null);
      }, MOCK_DELAY_MS);
    },
    [updateScene],
  );

  const handleSceneTitleChange = useCallback((sceneId: string, title: string) => updateScene(sceneId, (s) => ({ ...s, title })), [updateScene]);
  const handleSceneDescriptionChange = useCallback((sceneId: string, description: string) => updateScene(sceneId, (s) => ({ ...s, description })), [updateScene]);

  const handleRegenerateScene = useCallback(() => {
    if (!selectedSceneId) return;
    setRegeneratingSceneId(selectedSceneId);
    setTimeout(() => {
      updateScene(selectedSceneId, (s) => ({ ...s, description: (s.description || "") + " [Scene AI regenerated.]" }));
      setRegeneratingSceneId(null);
    }, MOCK_DELAY_MS);
  }, [selectedSceneId, updateScene]);

  const handleAISettingsChange = useCallback(
    (sceneId: string, settings: Partial<SceneAISettings>) => {
      updateScene(sceneId, (s) => ({ ...s, aiSettings: { ...s.aiSettings, ...settings } }));
    },
    [updateScene],
  );

  const handleVariationPromptChange = useCallback(
    (sceneId: string, variationId: string, prompt: string) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, prompt }));
    },
    [updateVariationTyped],
  );
  const handleVariationNegativeChange = useCallback(
    (sceneId: string, variationId: string, negative: string) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, negativePrompt: negative }));
    },
    [updateVariationTyped],
  );
  const handleVariationModelChange = useCallback(
    (sceneId: string, variationId: string, model: AIModel) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, model }));
    },
    [updateVariationTyped],
  );
  const handleVariationAspectRatioChange = useCallback(
    (sceneId: string, variationId: string, value: string) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, aspectRatio: value }));
    },
    [updateVariationTyped],
  );
  const handleVariationDurationChange = useCallback(
    (sceneId: string, variationId: string, seconds: number) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, durationSeconds: seconds }));
    },
    [updateVariationTyped],
  );
  const handleVariationReferenceImagesChange = useCallback(
    (sceneId: string, variationId: string, urls: string[]) => {
      updateVariationTyped(sceneId, variationId, (v) => ({ ...v, referenceImageUrls: urls }));
    },
    [updateVariationTyped],
  );

  const handleGenerateVideos = useCallback(
    (sceneId: string, variationId: string) => {
      setGeneratingVideosVariationId(variationId);
      setProgressText("Rendering video 1 of 2…");
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v) => {
          const video1 = createDefaultSceneVideo(variationId);
          const video2 = createDefaultSceneVideo(variationId);
          video2.status = VideoStatus.Completed;
          video2.thumbnailUrl = "https://placehold.co/320x180?text=Preview";
          return { ...v, videos: [...v.videos, video1, video2] };
        });
        updateScene(sceneId, (s) => ({ ...s, status: SceneStatus.VideosGenerated }));
        setGeneratingVideosVariationId(null);
        setProgressText("");
      }, MOCK_DELAY_MS);
    },
    [updateScene, updateVariationTyped],
  );

  const handleSelectFinalVideo = useCallback(
    (sceneId: string, variationId: string, videoId: string) => {
      updateScene(sceneId, (s) => {
        const nextVariations = s.variations.map((v) => {
          if (v.id !== variationId) {
            return { ...v, videos: v.videos.map((videos) => ({ ...videos, isFinal: false })) };
          }
          return {
            ...v,
            videos: v.videos.map((vid) => ({ ...vid, isFinal: vid.id === videoId })),
          };
        });
        return { ...s, variations: nextVariations, selectedVideoId: videoId };
      });
    },
    [updateScene],
  );

  const handleRegenerateVideo = useCallback(
    (sceneId: string, variationId: string, videoId: string) => {
      updateVariationTyped(sceneId, variationId, (v) => ({
        ...v,
        videos: v.videos.map((vid) => (vid.id === videoId ? { ...vid, status: VideoStatus.Processing as const } : vid)),
      }));
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v) => ({
          ...v,
          videos: v.videos.map((vid) => (vid.id === videoId ? { ...vid, status: VideoStatus.Completed as const } : vid)),
        }));
      }, MOCK_DELAY_MS);
    },
    [updateVariationTyped],
  );

  const handleRegenerateVariation = useCallback(
    (sceneId: string, variationId: string) => {
      setRegeneratingVariationId(variationId);
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v) => ({ ...v, prompt: (v.prompt || "") + " [Regenerated.]" }));
        setRegeneratingVariationId(null);
      }, MOCK_DELAY_MS);
    },
    [updateVariationTyped],
  );

  const handleAddVariation = useCallback(() => {
    if (!selectedSceneId) return;
    updateScene(selectedSceneId, (s) => ({
      ...s,
      variations: [...s.variations, createVariation(s.variations.length)],
      status: SceneStatus.PromptsGenerated,
    }));
  }, [selectedSceneId, updateScene]);

  return (
    <div className="flex h-full min-h-0 gap-4 p-4">
      <ScenesSidebar scenes={scenes} selectedSceneId={selectedSceneId} onSelectScene={setSelectedSceneId} onGenerateScenes={handleGenerateScenes} onRegenerateDescription={handleRegenerateDescription} isGeneratingScenes={isGeneratingScenes} canGenerateScenes={!!idea.enriched} />
      <div className="flex-1 min-w-0 flex flex-col gap-6 overflow-auto rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-6">
        <IdeaSection idea={idea} onIdeaChange={(raw) => setIdea((prev) => ({ ...prev, raw }))} onEnrich={handleEnrich} onRegenerateEnriched={handleRegenerateEnriched} isEnriching={isEnriching} />
        {selectedScene ? (
          <SceneWorkspace
            scene={selectedScene}
            onTitleChange={(title) => handleSceneTitleChange(selectedScene.id, title)}
            onDescriptionChange={(description) => handleSceneDescriptionChange(selectedScene.id, description)}
            onRegenerateScene={handleRegenerateScene}
            onVariationPromptChange={(vid, p) => handleVariationPromptChange(selectedScene.id, vid, p)}
            onVariationNegativeChange={(vid, n) => handleVariationNegativeChange(selectedScene.id, vid, n)}
            onVariationModelChange={(vid, m) => handleVariationModelChange(selectedScene.id, vid, m)}
            onVariationAspectRatioChange={(vid, v) => handleVariationAspectRatioChange(selectedScene.id, vid, v)}
            onVariationDurationChange={(vid, s) => handleVariationDurationChange(selectedScene.id, vid, s)}
            onVariationReferenceImagesChange={(vid, urls) => handleVariationReferenceImagesChange(selectedScene.id, vid, urls)}
            onGenerateVideos={(vid) => handleGenerateVideos(selectedScene.id, vid)}
            onSelectFinalVideo={(vid, videoId) => handleSelectFinalVideo(selectedScene.id, vid, videoId)}
            onRegenerateVideo={(vid, videoId) => handleRegenerateVideo(selectedScene.id, vid, videoId)}
            onRegenerateVariation={(vid) => handleRegenerateVariation(selectedScene.id, vid)}
            onAddVariation={handleAddVariation}
            isRegeneratingScene={regeneratingSceneId === selectedScene.id}
            generatingVariationId={regeneratingVariationId}
            generatingVideosVariationId={generatingVideosVariationId}
            progressText={progressText}
          />
        ) : scenes.length > 0 ? (
          <p className="text-default-500 text-sm">Select a scene from the sidebar.</p>
        ) : null}
      </div>
      <div className="w-64 shrink-0">
        <AIControlsPanel settings={selectedScene?.aiSettings ?? getDefaultAISettings()} onChange={(s) => (selectedSceneId ? handleAISettingsChange(selectedSceneId, s) : undefined)} onSave={() => {}} hasScene={!!selectedScene} />
      </div>
    </div>
  );
}

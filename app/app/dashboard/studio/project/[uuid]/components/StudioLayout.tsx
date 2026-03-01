"use client";
import type { Scene } from "@/features/scenes/interfaces/scenes.interfaces";
import { useState, useCallback } from "react";
import { getDefaultAISettings, createDefaultScene, createVariation, createDefaultSceneVideo } from "@/utils/studio";
import { IdeaSection } from "./IdeaSection";
import { ScenesSidebar } from "./scenes/ScenesSidebar";
import { SceneWorkspace } from "./SceneWorkspace";

const MOCK_DELAY_MS = 1500;

export function StudioLayout() {
  const [idea, setIdea] = useState<{ raw: string; enriched: string | null }>({ raw: "", enriched: null });
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

  type SceneVariation = any;
  const updateVariationTyped = useCallback(
    (sceneId: string, variationId: string, updater: (v: SceneVariation) => SceneVariation) => {
      updateScene(sceneId, (s: any) => ({
        ...s,
        scene_variations: s.scene_variations.map((v: any) => (v.id === variationId ? updater(v) : v)),
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


  const handleSceneTitleChange = useCallback((sceneId: string, title: string) => updateScene(sceneId, (s: any) => ({ ...s, title })), [updateScene]);
  const handleSceneDescriptionChange = useCallback((sceneId: string, description: string) => updateScene(sceneId, (s: any) => ({ ...s, description })), [updateScene]);

  const handleRegenerateScene = useCallback(() => {
    if (!selectedSceneId) return;
    setRegeneratingSceneId(selectedSceneId);
    setTimeout(() => {
      updateScene(selectedSceneId, (s: any) => ({ ...s, description: (s.description || "") + " [Scene AI regenerated.]" }));
      setRegeneratingSceneId(null);
    }, MOCK_DELAY_MS);
  }, [selectedSceneId, updateScene]);

  const handleVariationPromptChange = useCallback(
    (sceneId: string, variationId: string, prompt_text: string) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, prompt_text }));
    },
    [updateVariationTyped],
  );
  const handleVariationNegativeChange = useCallback(
    (sceneId: string, variationId: string, negative: string) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, negative_prompt: negative }));
    },
    [updateVariationTyped],
  );
  const handleVariationModelChange = useCallback(
    (sceneId: string, variationId: string, ai_model: string) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, ai_model }));
    },
    [updateVariationTyped],
  );
  const handleVariationAspectRatioChange = useCallback(
    (sceneId: string, variationId: string, value: string) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, aspect_ratio: value }));
    },
    [updateVariationTyped],
  );
  const handleVariationDurationChange = useCallback(
    (sceneId: string, variationId: string, seconds: number) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, duration_sec: seconds }));
    },
    [updateVariationTyped],
  );
  const handleVariationReferenceImagesChange = useCallback(
    (sceneId: string, variationId: string, urls: string[]) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, prompt_image_uuid: urls }));
    },
    [updateVariationTyped],
  );

  const handleGenerateVideos = useCallback(
    (sceneId: string, variationId: string) => {
      setGeneratingVideosVariationId(variationId);
      setProgressText("Rendering video 1 of 2…");
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v: any) => {
          const video1 = createDefaultSceneVideo(variationId);
          const video2 = createDefaultSceneVideo(variationId);
          video2.status = "COMPLETED";
          video2.thumbnailUrl = "https://placehold.co/320x180?text=Preview";
          return { ...v, videos: [...v.videos, video1, video2] };
        });
        updateScene(sceneId, (s: any) => ({ ...s, status: "VIDEOS_GENERATED" }));
        setGeneratingVideosVariationId(null);
        setProgressText("");
      }, MOCK_DELAY_MS);
    },
    [updateScene, updateVariationTyped],
  );

  const handleSelectFinalVideo = useCallback(
    (sceneId: string, variationId: string, videoId: string) => {
      updateScene(sceneId, (s: any) => {
        const nextVariations = s.scene_variations.map((v: any) => {
          if (v.id !== variationId) {
            return { ...v, videos: v.videos.map((videos: any) => ({ ...videos, selected: false })) };
          }
          return {
            ...v,
            videos: v.videos.map((vid: any) => ({ ...vid, selected: vid.id === videoId })),
          };
        });
        return { ...s, scene_variations: nextVariations, _mockSelectedVideoId: videoId };
      });
    },
    [updateScene],
  );

  const handleRegenerateVideo = useCallback(
    (sceneId: string, variationId: string, videoId: string) => {
      updateVariationTyped(sceneId, variationId, (v: any) => ({
        ...v,
        videos: v.videos.map((vid: any) => (vid.id === videoId ? { ...vid, status: "PROCESSING" as const } : vid)),
      }));
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v: any) => ({
          ...v,
          videos: v.videos.map((vid: any) => (vid.id === videoId ? { ...vid, status: "COMPLETED" as const } : vid)),
        }));
      }, MOCK_DELAY_MS);
    },
    [updateVariationTyped],
  );

  const handleRegenerateVariation = useCallback(
    (sceneId: string, variationId: string) => {
      setRegeneratingVariationId(variationId);
      setTimeout(() => {
        updateVariationTyped(sceneId, variationId, (v: any) => ({ ...v, prompt_text: (v.prompt_text || "") + " [Regenerated.]" }));
        setRegeneratingVariationId(null);
      }, MOCK_DELAY_MS);
    },
    [updateVariationTyped],
  );

  const handleAddVariation = useCallback(() => {
    if (!selectedSceneId) return;
    updateScene(selectedSceneId, (s: any) => ({
      ...s,
      scene_variations: [...s.scene_variations, createVariation(s.scene_variations.length)],
      status: "PROMPTS_GENERATED",
    }));
  }, [selectedSceneId, updateScene]);

  return (
    <div className="flex h-full min-h-0 gap-4 p-4">
      <ScenesSidebar />
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
            onGenerateVideos={(vid: any) => handleGenerateVideos(selectedScene.id, vid)}
            onSelectFinalVideo={(vid, videoId) => handleSelectFinalVideo(selectedScene.id, vid, videoId)}
            onRegenerateVideo={(vid, videoId) => handleRegenerateVideo(selectedScene.id, vid, videoId)}
            onRegenerateVariation={(vid: any) => handleRegenerateVariation(selectedScene.id, vid)}
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
    </div>
  );
}

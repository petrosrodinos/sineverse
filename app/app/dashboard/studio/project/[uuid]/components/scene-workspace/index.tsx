"use client";
import { useSearchParams } from "next/navigation";
import { useScene } from "@/features/scenes/hooks/use-scenes";
import { SceneVariationCard } from "./SceneVariationCard";
import { NoSceneSelected } from "./states/NoSceneSelected";
import { SceneLoading } from "./states/SceneLoading";
import { SceneNotFound } from "./states/SceneNotFound";

interface SceneWorkspaceProps {
}

export function SceneWorkspace({}: SceneWorkspaceProps) {
  const searchParams = useSearchParams();
  const sceneUuid = searchParams.get("scene_uuid");
  const { data: scene, isLoading } = useScene(sceneUuid || "");

  if (!sceneUuid) {
    return <NoSceneSelected />;
  }

  if (isLoading) {
    return <SceneLoading />;
  }

  if (!scene) {
    return <SceneNotFound />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Scene variations</h3>
        {(scene.scene_variations || []).map((variation: any) => (
          <SceneVariationCard
            key={variation.id}
            variation={variation}
          />
        ))}
      </div>
    </div>
  );
}

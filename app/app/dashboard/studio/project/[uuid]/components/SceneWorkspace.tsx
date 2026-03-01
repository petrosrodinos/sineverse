"use client";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { PromptVariationCard } from "./PromptVariationCard";
import { useSearchParams } from "next/navigation";
import { useScene } from "@/features/scenes/hooks/use-scenes";
import { Skeleton } from "@heroui/skeleton";

interface SceneWorkspaceProps {
}

export function SceneWorkspace({}: SceneWorkspaceProps) {
  const searchParams = useSearchParams();
  const sceneUuid = searchParams.get("scene_uuid");
  const { data: scene, isLoading } = useScene(sceneUuid || "");

  if (!sceneUuid) {
    return <p className="text-default-500 text-sm">Select a scene from the sidebar.</p>;
  }

  if (isLoading) {
    return <div className="space-y-6"><Skeleton className="h-[250px] w-full rounded-xl" /></div>;
  }

  if (!scene) {
    return <p className="text-default-500 text-sm">Scene not found or could not be loaded.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input label="Scene title" value={scene.title || ""} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
        <Textarea label="Scene description" value={scene.description || ""} variant="bordered" classNames={{ input: "min-h-[120px]", inputWrapper: "rounded-xl" }} minRows={4} />
        <Button variant="flat" className="rounded-xl">
          Regenerate Scene with AI
        </Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Prompt variations</h3>
        {(scene.scene_variations || []).map((variation: any) => (
          <PromptVariationCard
            key={variation.id}
            variation={variation}
          />
        ))}
      </div>
    </div>
  );
}

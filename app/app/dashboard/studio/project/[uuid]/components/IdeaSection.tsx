"use client";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Textarea } from "@heroui/input";
import { useParams } from "next/navigation";
import { useEnrichProject, useProject } from "@/features/projects/hooks/use-projects";
import { EnrichPromptPopover } from "@/components/ui/enrich-prompt-popover";
import { Chip } from "@heroui/chip";

interface IdeaSectionProps {
}

export function IdeaSection({}: IdeaSectionProps) {
  const params = useParams();
  const uuid = params.uuid as string;
  const { data: project, isLoading } = useProject(uuid);
  const {mutate, isPending} = useEnrichProject(uuid);

  if (isLoading) {
      return <Skeleton className="h-[100px] w-full rounded-xl" />;
  }

  const handleEnrich = (instructions: string) => {
    mutate({project_uuid: uuid, directions: instructions})
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Your original idea</label>
        {((project?.genres && project.genres.length > 0) || (project?.tones && project.tones.length > 0)) && (
          <div className="flex flex-wrap gap-2 py-1">
            {project.genres?.map((genre) => (
              <Chip key={genre} variant="flat" color="primary" size="sm" className="capitalize">
                {typeof genre === 'string' ? genre.replace(/_/g, ' ') : genre}
              </Chip>
            ))}
            {project.tones?.map((tone) => (
              <Chip key={tone} variant="flat" color="secondary" size="sm" className="capitalize">
                {typeof tone === 'string' ? tone.replace(/_/g, ' ') : tone}
              </Chip>
            ))}
          </div>
        )}
        <div className="p-4 rounded-xl border-2 border-default-200 min-h-[100px] text-default-700 bg-transparent">
          {project?.original_concept}
        </div>
        <EnrichPromptPopover 
          onEnrich={handleEnrich} 
          isLoading={isPending} 
          isDisabled={!project?.original_concept?.trim() || isPending} 
        />
      </div>
      {project?.enriched_concept && (
        <Card className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/10 p-4">
          {isPending ? (
            <Skeleton className="rounded-xl h-24 w-full" />
          ) : (
              <Textarea
                value={project.enriched_concept}
                variant="bordered"
                classNames={{ input: "min-h-[100px] text-foreground/90", inputWrapper: "rounded-xl bg-transparent border-none" }}
                minRows={7}
              />
          )}
        </Card>
      )}
    </div>
  );
}

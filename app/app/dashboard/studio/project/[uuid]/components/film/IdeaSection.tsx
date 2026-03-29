"use client";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useEnrichProject, useProject, useUpdateProject } from "@/features/projects/hooks/use-projects";
import { EnrichPromptPopover } from "@/components/ui/enrich-prompt-popover";
import { Chip } from "@heroui/chip";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Lightbulb } from "lucide-react";

interface IdeaSectionProps {
}

export function IdeaSection({}: IdeaSectionProps) {
  const params = useParams();
  const uuid = params.uuid as string;
  const { data: project, isLoading } = useProject(uuid);
  const {mutate, isPending} = useEnrichProject(uuid);
  const {mutate: updateProject, isPending: isUpdating} = useUpdateProject();

  const [localConcept, setLocalConcept] = useState("");

  useEffect(() => {
    if (project?.enriched_concept) {
      setLocalConcept(project.enriched_concept);
    }
  }, [project?.enriched_concept]);

  if (isLoading) {
      return <Skeleton className="h-[100px] w-full rounded-xl" />;
  }

  const handleEnrich = (instructions: string) => {
    mutate({project_uuid: uuid, directions: instructions})
  }

  return (
    <Accordion
      className="px-0 w-full"
      defaultSelectedKeys={["idea"]}
      itemClasses={{
        base: "px-0 w-full",
        trigger: "py-0 hover:bg-default-100 transition-colors rounded-lg",
        title: "text-base font-medium",
        content: "pb-2 pt-4"
      }}
    >
      <AccordionItem
        key="idea"
        aria-label="Idea Section"
        title={
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span>Project Idea & Concept</span>
          </div>
        }
      >
        <div className="space-y-6">
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
                <div className="flex flex-col gap-3">
                    <ExpandableTextarea
                      value={localConcept}
                      onChange={(e: any) => setLocalConcept(e.target.value)}
                      variant="bordered"
                      classNames={{ input: "min-h-[100px] text-foreground/90 pr-10", inputWrapper: "rounded-xl bg-transparent border-none" }}
                      minRows={7}
                      label="Enriched Concept"
                    />
                  <div className="flex justify-end">
                    <Button 
                      color="primary" 
                      size="sm"
                      isLoading={isUpdating} 
                      onPress={() => updateProject({ uuid, project: { enriched_concept: localConcept } })} 
                      isDisabled={localConcept === project?.enriched_concept || isUpdating}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </AccordionItem>
    </Accordion>
  );
}

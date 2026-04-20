"use client";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Lightbulb } from "lucide-react";

import {
  useEnrichProject,
  useProject,
  useUpdateProject,
} from "@/features/projects/hooks/use-projects";
import { EnrichPromptPopover } from "@/components/ui/enrich-prompt-popover";
import { ExpandableTextarea } from "@/components/ui/ExpandableTextarea";

interface IdeaSectionProps {}

export function IdeaSection({}: IdeaSectionProps) {
  const params = useParams();

  const uuid = params.uuid as string;

  const { data: project, isLoading } = useProject(uuid);

  const { mutate, isPending } = useEnrichProject(uuid);

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

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
    mutate({ project_uuid: uuid, directions: instructions });
  };

  return (
    <Accordion
      className="px-0 w-full"
      defaultSelectedKeys={["idea"]}
      itemClasses={{
        base: "px-0 w-full",
        trigger: "py-0 hover:bg-default-100 transition-colors rounded-lg",
        title: "text-base font-medium",
        content: "pb-2 pt-4",
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
            <p className="text-sm font-medium text-foreground">
              Your original idea
            </p>
            {((project?.genres && project.genres.length > 0) ||
              (project?.tones && project.tones.length > 0)) && (
              <div className="flex flex-wrap gap-2 py-1">
                {project.genres?.map((genre) => (
                  <Chip
                    key={genre}
                    className="capitalize"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    {typeof genre === "string"
                      ? genre.replace(/_/g, " ")
                      : genre}
                  </Chip>
                ))}
                {project.tones?.map((tone) => (
                  <Chip
                    key={tone}
                    className="capitalize"
                    color="secondary"
                    size="sm"
                    variant="flat"
                  >
                    {typeof tone === "string" ? tone.replace(/_/g, " ") : tone}
                  </Chip>
                ))}
              </div>
            )}
            <div className="p-4 rounded-xl border-2 border-default-200 min-h-[100px] text-default-700 bg-transparent">
              {project?.original_concept}
            </div>
            <EnrichPromptPopover
              isDisabled={!project?.original_concept?.trim() || isPending}
              isLoading={isPending}
              onEnrich={handleEnrich}
            />
          </div>
          {project?.enriched_concept && (
            <Card className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/10 p-4">
              {isPending ? (
                <Skeleton className="rounded-xl h-24 w-full" />
              ) : (
                <div className="flex flex-col gap-3">
                  <ExpandableTextarea
                    classNames={{
                      input: "min-h-[100px] text-foreground/90 pr-10",
                      inputWrapper: "rounded-xl bg-transparent border-none",
                    }}
                    label="Enriched Concept"
                    minRows={7}
                    value={localConcept}
                    variant="bordered"
                    onChange={(e: any) => setLocalConcept(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      color="primary"
                      isDisabled={
                        localConcept === project?.enriched_concept || isUpdating
                      }
                      isLoading={isUpdating}
                      size="sm"
                      onPress={() =>
                        updateProject({
                          uuid,
                          project: { enriched_concept: localConcept },
                        })
                      }
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

"use client";

import { Skeleton } from "@heroui/skeleton";
import { use } from "react";
import { StudioLayout } from "@/app/dashboard/studio/project/[uuid]/components/StudioLayout";
import { ProjectHeader } from "@/app/dashboard/studio/project/[uuid]/components/ProjectHeader";
import { useProject } from "@/features/projects/hooks/use-projects";

export default function ProjectPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: project, isLoading } = useProject(uuid);

  return (
    <div className="h-[calc(100vh-4rem)] min-h-0 flex flex-col">
      <div className="px-6 shrink-0 flex flex-col gap-2 pt-2 pb-2">
        <ProjectHeader project={project} isLoading={isLoading} />
      </div>
      <div className="flex-1 min-h-0">
        <StudioLayout />
      </div>
    </div>
  );
}

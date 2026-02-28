"use client";

import { Skeleton } from "@heroui/skeleton";
import { use } from "react";
import { StudioLayout } from "@/app/dashboard/studio/project/[uuid]/components/StudioLayout";
import { useProject } from "@/features/projects/hooks/use-projects";

export default function ProjectPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: project, isLoading } = useProject(uuid);

  return (
    <div className="h-[calc(100vh-4rem)] min-h-0 flex flex-col">
      <div className="px-6 shrink-0 flex flex-col gap-2 pt-2 pb-2">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/5 rounded-lg" />
            <Skeleton className="h-5 w-4/5 rounded-lg mt-1" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold tracking-tight">
              {project?.title || "Project Not Found"}
            </h1>
            {project?.original_concept && (
              <p className="text-default-500 mt-1 truncate">{project.original_concept}</p>
            )}
          </>
        )}
      </div>
      <div className="flex-1 min-h-0">
        <StudioLayout />
      </div>
    </div>
  );
}

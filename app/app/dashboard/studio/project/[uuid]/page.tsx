"use client";
import { use } from "react";
import { StudioLayout } from "@/app/dashboard/studio/project/[uuid]/components/film/StudioLayout";
import { EstateLift } from "@/app/dashboard/studio/project/[uuid]/components/estate";
import { ProjectPageContentSkeleton } from "@/app/dashboard/studio/project/[uuid]/components/ProjectPageContentSkeleton";
import { ProjectHeader } from "@/app/dashboard/studio/project/[uuid]/components/film/ProjectHeader";
import { useProject } from "@/features/projects/hooks/use-projects";
import { Project, ProjectTypes } from "@/features/projects/interfaces/projects.interfaces";

function ProjectMainContent({ isLoading, project }: { isLoading: boolean; project?: Project }) {
  if (isLoading) {
    return <ProjectPageContentSkeleton />;
  }
  if (project?.type === ProjectTypes.ESTATE) {
    return <EstateLift />;
  }
  return <StudioLayout />;
}

export default function ProjectPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: project, isLoading } = useProject(uuid);

  return (
    <div className="flex flex-col lg:h-full lg:min-h-0">
      <div className="px-6 shrink-0 flex flex-col gap-2 pt-2 pb-2">
        <ProjectHeader project={project} isLoading={isLoading} />
      </div>
      <div className="flex-1 min-h-0">
        <ProjectMainContent isLoading={isLoading} project={project} />
      </div>
    </div>
  );
}

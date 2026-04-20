"use client";

import { ProjectsGrid } from "./components/ProjectsGrid";
import { ProjectsHeader } from "./components/ProjectsHeader";

export default function ProjectPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <ProjectsHeader />
      <ProjectsGrid />
    </div>
  );
}

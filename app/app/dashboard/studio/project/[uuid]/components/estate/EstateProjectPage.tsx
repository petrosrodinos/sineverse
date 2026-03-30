"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useProject } from "@/features/projects/hooks/use-projects";
import { EstateStepper } from "./components/EstateStepper";
import { useMockVideoGeneration } from "./hooks/useMockVideoGeneration";
import { useEstateWorkflowStore } from "./stores/estate-workflow.store";

export function EstateProjectPage() {
  const params = useParams<{ uuid: string }>();
  const projectUuid = params?.uuid ?? "";
  const { data: project } = useProject(projectUuid);
  const reset = useEstateWorkflowStore((s) => s.reset);
  const setMockProject = useEstateWorkflowStore((s) => s.setMockProject);
  useMockVideoGeneration();

  useEffect(() => {
    reset();
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (project) {
      setMockProject(project);
    }
  }, [project, setMockProject]);

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-auto p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Estate video workflow
          </h2>
          <p className="text-small text-default-500 md:text-base">
            Upload photos, refine clips, and render a polished property tour — all in one flow.
          </p>
        </div>
        <EstateStepper />
      </div>
    </div>
  );
}

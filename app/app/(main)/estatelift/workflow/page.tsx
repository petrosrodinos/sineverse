"use client";

import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { createVisitorSession } from "@/features/auth/services/auth";
import {
  getStoredVisitorAuth,
  setStoredVisitorAuth,
} from "@/features/auth/utils/visitor-auth.utils";
import { useCreateProject } from "@/features/projects/hooks/use-projects";
import { ProjectTypes } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/config/routes";

export default function EstateLiftWorkflowBootstrapPage() {
  const router = useRouter();

  const { status } = useSession();

  const { mutateAsync: createProject } = useCreateProject();

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      router.replace(Routes.dashboard);

      return;
    }

    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    const bootstrap = async () => {
      try {
        const visitorAuth = getStoredVisitorAuth();

        if (!visitorAuth?.access_token) {
          const createdVisitorAuth = await createVisitorSession();

          setStoredVisitorAuth(createdVisitorAuth);
        }

        const project = await createProject({
          title: "EstateLift Property Tour",
          type: ProjectTypes.ESTATE,
        });

        router.replace(
          `${Routes.landing.estatelift_workflow_project(project.uuid)}?type=${ProjectTypes.ESTATE}`,
        );
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to start the EstateLift workflow";

        addToast({
          title: "Failed to start workflow",
          description: message,
          severity: "danger",
        });

        hasStartedRef.current = false;
      }
    };

    bootstrap();
  }, [createProject, router, status]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner color="primary" label="Starting EstateLift workflow..." />
    </div>
  );
}

import type { ProjectType } from "@/features/projects/interfaces/projects.interfaces";

export const Routes = {
    dashboard: "/dashboard",
    studio: "/dashboard/studio",
    admin: "/dashboard/admin",
    settings: "/dashboard/settings",
    billing: "/dashboard/credits",
    project: (uuid: string, options?: { type?: ProjectType }) => {
        const path = `/dashboard/studio/project/${uuid}`;
        if (!options?.type) {
            return path;
        }
        return `${path}?type=${options.type}`;
    },
    auth: {
        sign_in: "/auth/sign-in",
        sign_up: "/auth/sign-up",
    },
    landing: {
        sineverse: "/sineverse",
        estatelift: "/estatelift",
    },
} as const;
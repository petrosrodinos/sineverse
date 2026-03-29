export const Routes = {
    dashboard: "/dashboard",
    studio: "/dashboard/studio",
    project: (uuid: string) => `/dashboard/studio/project/${uuid}`,
    auth: {
        sign_in: "/auth/sign-in",
        sign_up: "/auth/sign-up",
    },
    landing: {
        sineverse: "/sineverse",
        estatelift: "/estatelift",
    },
} as const;
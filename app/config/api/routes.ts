export const ApiRoutes = {
    auth: {
        email: {
            login: "/auth/email/login",
            register: "/auth/email/register",
            refresh_token: "/auth/email/refresh-token",
            admin_login_to_account: (account_uuid: string) => `/auth/email/${account_uuid}/admin-login`,
            forgot_password: "/auth/forgot-password",
            reset_password: "/auth/reset-password",
            verify_email: "/auth/verify-email",
            resend_verification_email: "/auth/resend-verification-email",
        },
    },
    users: {
        prefix: "/users",
        me: "/users/me",
    },
    projects: {
        prefix: "/projects",
        project: (project_uuid: string) => `/projects/${project_uuid}`,
    },
    scenes: {
        prefix: "/scenes",
        scene: (scene_uuid: string) => `/scenes/${scene_uuid}`,
    },
    scene_variations: {
        prefix: "/scene-variations",
        scene_variation: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}`,
    },
    scene_videos: {
        prefix: "/scene-videos",
        scene_video: (scene_video_uuid: string) => `/scene-videos/${scene_video_uuid}`,
    },
    final_projects: {
        prefix: "/final-projects",
        final_project: (final_project_uuid: string) => `/final-projects/${final_project_uuid}`,
    },
    google_maps: {
        timezone: "/google-maps/timezone",
    },
}
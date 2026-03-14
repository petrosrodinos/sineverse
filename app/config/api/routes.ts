export const ApiRoutes = {
    auth: {
        email: {
            login: "auth/email/login",
            register: "auth/email/register",
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
        enrich: (project_uuid: string) => `/projects/${project_uuid}/enrich-concept`,
    },
    scenes: {
        prefix: "/scenes",
        scene: (scene_uuid: string) => `/scenes/${scene_uuid}`,
        generate_ai_scenes: "/scenes/generate-ai-scenes",
        reorder: "/scenes/reorder",
    },
    scene_variations: {
        prefix: "/scene-variations",
        scene_variation: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}`,
        duplicate: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}/duplicate`,
        enrich: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}/enrich`,
    },
    project_assets: {
        prefix: "/project-assets",
        project_asset: (project_asset_uuid: string) => `/project-assets/${project_asset_uuid}`,
        create_video: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}/create-video`,
        prompt_image: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}/prompt-image`,
        create_image: (scene_variation_uuid: string) => `/scene-variations/${scene_variation_uuid}/create-image`,
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
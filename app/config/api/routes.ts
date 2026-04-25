export const ApiRoutes = {
  auth: {
    email: {
      login: "auth/email/login",
      register: "auth/email/register",
      visitor: "auth/email/visitor",
      complete_visitor: "auth/email/complete-visitor",
      refresh_token: "/auth/email/refresh-token",
      admin_login_to_account: (account_uuid: string) =>
        `/auth/email/${account_uuid}/admin-login`,
      forgot_password: "/auth/forgot-password",
      reset_password: "/auth/reset-password",
      verify_email: "/auth/verify-email",
      resend_verification_email: "/auth/resend-verification-email",
    },
  },
  users: {
    prefix: "/users",
    me: "/users/me",
    update_me: "/users/me",
    update_password: "/users/me/password",
    list: "/users",
    record: (user_uuid: string) => `/users/${user_uuid}`,
  },
  projects: {
    prefix: "/projects",
    project: (project_uuid: string) => `/projects/${project_uuid}`,
    enrich: (project_uuid: string) =>
      `/projects/${project_uuid}/enrich-concept`,
  },
  scenes: {
    prefix: "/scenes",
    scene: (scene_uuid: string) => `/scenes/${scene_uuid}`,
    generate_ai_scenes: "/scenes/generate-ai-scenes",
    estate_from_images: "/scenes/estate/from-images",
    reorder: "/scenes/reorder",
  },
  scene_variations: {
    prefix: "/scene-variations",
    scene_variation: (scene_variation_uuid: string) =>
      `/scene-variations/${scene_variation_uuid}`,
    duplicate: (scene_variation_uuid: string) =>
      `/scene-variations/${scene_variation_uuid}/duplicate`,
  },
  project_assets: {
    prefix: "/project-assets",
    project_asset: (project_asset_uuid: string) =>
      `/project-assets/${project_asset_uuid}`,
    select_project_asset: (project_asset_uuid: string) =>
      `/project-assets/${project_asset_uuid}/select`,
    estate_walkthrough_videos: "/project-assets/estate/walkthrough-videos",
    create_video: (scene_variation_uuid: string) =>
      `/project-assets/scene-variations/${scene_variation_uuid}/create-video`,
    prompt_image: (scene_variation_uuid: string) =>
      `/project-assets/scene-variations/${scene_variation_uuid}/prompt-image`,
    create_image: (scene_variation_uuid: string) =>
      `/project-assets/scene-variations/${scene_variation_uuid}/create-image`,
    enrich_video: (project_asset_uuid: string) =>
      `/project-assets/${project_asset_uuid}/enrich-video`,
  },
  credits: {
    summary: "/credits/summary",
    usageStats: "/credits/usage-stats",
    packs: "/credits/packs",
    usage: "/credits/usage",
    usage_admin: "/credits/usage/admin",
    purchases: "/credits/purchases",
    checkout: "/credits/checkout",
  },
  admin: {
    overview: "/admin/dashboard/overview",
  },
  scene_videos: {
    prefix: "/scene-videos",
    scene_video: (scene_video_uuid: string) =>
      `/scene-videos/${scene_video_uuid}`,
  },
  final_projects: {
    prefix: "/final-projects",
    final_project: (final_project_uuid: string) =>
      `/final-projects/${final_project_uuid}`,
    render: (final_project_uuid: string) =>
      `/final-projects/${final_project_uuid}/render`,
    download: (final_project_uuid: string) =>
      `/final-projects/${final_project_uuid}/download`,
    download_document: (final_project_uuid: string, document_uuid: string) =>
      `/final-projects/${final_project_uuid}/download/${document_uuid}`,
    delete_all_videos: (final_project_uuid: string) =>
      `/final-projects/${final_project_uuid}/videos`,
    delete_document: (final_project_uuid: string, document_uuid: string) =>
      `/final-projects/${final_project_uuid}/videos/${document_uuid}`,
  },
  google_maps: {
    timezone: "/google-maps/timezone",
  },
  timeline_clips: {
    prefix: "/timeline-clips",
    timeline_clip: (uuid: string) => `/timeline-clips/${uuid}`,
  },
  timeline_captions: {
    prefix: "/timeline-captions",
    timeline_caption: (uuid: string) => `/timeline-captions/${uuid}`,
  },
  timeline_transitions: {
    prefix: "/timeline-transitions",
    timeline_transition: (uuid: string) => `/timeline-transitions/${uuid}`,
  },
  timeline_music: {
    prefix: "/timeline-music",
    final_project_music: (final_project_uuid: string) =>
      `/timeline-music/final-projects/${final_project_uuid}`,
  },
};

export interface ProjectAssetGenerationConfig {
    // Prompts
    prompt_text?: string;
    negative_prompt?: string;

    // Creative direction
    style?: string; // cinematic, anime, noir, hyperrealistic
    tone?: string; // dark, uplifting, tense, dreamy
    genre?: string; // sci-fi, western, horror, fantasy

    // Camera & composition
    camera_style?: string; // handheld, drone, steadicam
    shot_type?: string; // close-up, wide shot, over-the-shoulder
    camera_movement?: string; // slow pan, fast tracking, dolly in
    lens_type?: string; // 35mm, 50mm, anamorphic
    depth_of_field?: string; // shallow, deep

    // Lighting & color
    lighting?: string; // golden hour, neon, low-key
    color_grade?: string; // teal-orange, desaturated, vibrant
    time_of_day?: string; // sunrise, night, sunset

    // Output format
    aspect_ratio?: string; // 16:9, 9:16, 1:1, 2.35:1
    resolution?: string; // 720p, 1080p, 4K
    fps?: number;
    duration_sec?: number;

    // AI generation control
    ai_model?: string;
    seed?: string;
    creativity?: number; // temperature-like control
    motion_strength?: number; // how dynamic the scene is
    guidance_scale?: number; // prompt adherence

    // Audio style
    audio_style?: string; // orchestral, ambient, cinematic trailer
    include_sound?: boolean;
}
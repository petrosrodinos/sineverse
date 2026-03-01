export interface Project {
    id: string;
    uuid: string;
    title: string;
    original_concept: string;
    enriched_concept?: string;
    genres?: ProjectGenre[];
    tones?: ProjectTone[];
    status: ProjectStatus;
    created_at: string;
    updated_at: string;
}

export interface CreateProjectDto {
    title: string;
    original_concept: string;
    enriched_concept?: string;
    genres?: ProjectGenre[];
    tones?: ProjectTone[];
}

export interface UpdateProjectDto {
    title?: string;
    original_concept?: string;
    enriched_concept?: string;
    genres?: ProjectGenre[];
    tones?: ProjectTone[];
}

export const ProjectGenres = {
    ACTION: "action",
    ADVENTURE: "adventure",
    ANIMATION: "animation",
    COMEDY: "comedy",
    CRIME: "crime",
    DOCUMENTARY: "documentary",
    DRAMA: "drama",
    FANTASY: "fantasy",
    HISTORICAL: "historical",
    HORROR: "horror",
    MYSTERY: "mystery",
    ROMANCE: "romance",
    SCI_FI: "sci_fi",
    THRILLER: "thriller",
    WESTERN: "western",
    EXPERIMENTAL: "experimental",
} as const;

export const ProjectTones = {
    DARK: "dark",
    LIGHTHEARTED: "lighthearted",
    GRITTY: "gritty",
    EPIC: "epic",
    HOPEFUL: "hopeful",
    MELANCHOLIC: "melancholic",
    ROMANTIC: "romantic",
    SUSPENSEFUL: "suspenseful",
    MYSTERIOUS: "mysterious",
    INSPIRATIONAL: "inspirational",
    COMEDIC: "comedic",
    SERIOUS: "serious",
    SATIRICAL: "satirical",
    INTENSE: "intense",
    WHIMSICAL: "whimsical",
} as const;



export const ProjectStatuses = {
    DRAFT: 'DRAFT',
    ENRICHED: 'ENRICHED',
    SCENES_GENERATED: 'SCENES_GENERATED',
    PROMPTS_GENERATED: 'PROMPTS_GENERATED',
    VIDEOS_GENERATING: 'VIDEOS_GENERATING',
    COMPLETED: 'COMPLETED',
} as const;

export type ProjectStatus = typeof ProjectStatuses[keyof typeof ProjectStatuses];
export type ProjectTone = typeof ProjectTones[keyof typeof ProjectTones];
export type ProjectGenre = typeof ProjectGenres[keyof typeof ProjectGenres];
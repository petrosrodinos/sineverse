import { ProjectTypes, ProjectType } from "@/features/projects/interfaces/projects.interfaces";

export const ProjectTypeSelectionCards: {
    type: ProjectType;
    title: string;
    description: string;
}[] = [
    {
        type: ProjectTypes.FILM,
        title: "Film",
        description:
            "Develop a cinematic story with scenes, tone, and AI-assisted visuals. Built for narrative depth, pacing, and production-ready outputs.",
    },
    {
        type: ProjectTypes.ESTATE,
        title: "Estate",
        description:
            "Create a focused listing workspace for property storytelling—titles and structure without the full film pipeline.",
    },
];

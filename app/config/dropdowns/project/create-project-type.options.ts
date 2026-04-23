import {
  ProjectTypes,
  ProjectType,
} from "@/features/projects/interfaces/projects.interfaces";

export const FilmProjectTypeDescription =
  "Develop a cinematic story with scenes, tone, and AI-assisted visuals. Built for narrative depth, pacing, and production-ready outputs.";

export const EstateProjectTypeDescription =
  "Turn property photos into a polished video walkthrough with a streamlined workflow built for real estate listings.";

export const ProjectTypeSelectionCards: {
  type: ProjectType;
  title: string;
  description: string;
}[] = [
  {
    type: ProjectTypes.FILM,
    title: "Film",
    description: FilmProjectTypeDescription,
  },
  {
    type: ProjectTypes.ESTATE,
    title: "Estate",
    description: EstateProjectTypeDescription,
  },
];

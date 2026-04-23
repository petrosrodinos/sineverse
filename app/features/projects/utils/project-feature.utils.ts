import { ProjectConfig } from "@/config/features/project-features.config";
import {
  ProjectType,
  ProjectTypes,
} from "@/features/projects/interfaces/projects.interfaces";

type ProjectFeatureFlags = typeof ProjectConfig.features;

export const enabledProjectTypes = (
  features: ProjectFeatureFlags = ProjectConfig.features,
): ProjectType[] => {
  const types: ProjectType[] = [];

  if (features.movies) {
    types.push(ProjectTypes.FILM);
  }

  if (features.estate) {
    types.push(ProjectTypes.ESTATE);
  }

  return types;
};

export const isProjectTypeEnabled = (
  type: ProjectType,
  features: ProjectFeatureFlags = ProjectConfig.features,
): boolean => {
  if (type === ProjectTypes.FILM) {
    return features.movies;
  }

  return features.estate;
};

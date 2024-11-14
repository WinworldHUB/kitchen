
import {
  PROJECT_STATUS_STEPS_DATA,
} from "../constants";



export const filterProjects = (
  projects: Project[],
  filterText: string
): Project[] =>
  (projects ?? []).filter(
    (project) =>
      project.title.includes(filterText) ||
      project.address.includes(filterText) ||
      project.status.toString().includes(filterText)
  ) ?? [];

export const getProjectById = (projects: Project[], projectId: string) =>
  (projects ?? []).filter((project) => project.id === projectId)?.[0];

export const getProjectStatusSteps = (
  currentStatus: number
): ProjectStatusStep[] =>
  PROJECT_STATUS_STEPS_DATA.map((step) => {
    return {
      ...step,
      isDone: step.status <= currentStatus,
      isActive: step.status <= currentStatus,
    };
  });

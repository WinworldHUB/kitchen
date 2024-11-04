import { v4 as uuidv4 } from "uuid";
import {
  DEFAULT_KITCHEN_IMAGE,
  PROJECT_STATUS_STEPS_DATA,
  ProjectStatus,
} from "../constants";

export const createProject = (
  owner: string,
  title?: string,
  address?: string,
  status?: number
): Project => {
  return {
    id: uuidv4(),
    owner: owner,
    title: title ?? "",
    address: address ?? "",
    featuredImage: DEFAULT_KITCHEN_IMAGE,
    status: status ?? ProjectStatus.draft,
  };
};

export const dummyProjects = (status?: number): Project[] => {
  const projects: Project[] = [];

  for (let index = 0; index < 155; index++) {
    projects.push(
      createProject(
        `Owner ${index + 1}`,
        `Test Project ${index + 1}`,
        `19 Temple Fortune Parade, Finchley Rd, London NW11 0QS, United Kingdom`,
        status
      )
    );
  }

  return projects;
};

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

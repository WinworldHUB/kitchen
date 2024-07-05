import { v4 as uuidv4 } from "uuid";
import { DEFAULT_KITCHEN_IMAGE, ProjectStatus } from "../constants";

export const createProject = (
  title?: string,
  address?: string,
  status?: string
): Project => {
  return {
    id: uuidv4(),
    title: title ?? "",
    address: address ?? "",
    featuredImage: DEFAULT_KITCHEN_IMAGE,
    status: status ?? ProjectStatus.designBrief.toString(),
  };
};

export const dummyProjects = (status?: string): Project[] => {
  const projects: Project[] = [];

  for (let index = 0; index < 155; index++) {
    projects.push(
      createProject(
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

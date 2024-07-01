import { v4 as uuidv4 } from "uuid";
import { DEFAULT_KITCHEN_IMAGE, ProjectStatus } from "../constants";

export const createProject = (
  title?: string,
  description?: string,
  status?: string
): Project => {
  return {
    id: uuidv4(),
    title: title ?? "",
    description: description ?? "",
    featuredImage: DEFAULT_KITCHEN_IMAGE,
    status: status ?? ProjectStatus.draft.toString(),
  };
};

export const dummyProjects = (status?: string): Project[] => {
  const projects: Project[] = [];

  for (let index = 0; index < 155; index++) {
    projects.push(
      createProject(
        `Test Project ${index + 1}`,
        `This is Test Project ${index + 1}`,
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
      project.description.includes(filterText) ||
      project.status.toString().includes(filterText)
  ) ?? [];

export const getProjectById = (projects: Project[], projectId: string) =>
  (projects ?? []).filter((project) => project.id === projectId)?.[0];

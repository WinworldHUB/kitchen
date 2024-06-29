import { v4 as uuidv4 } from "uuid";
import { DEFAULT_KITCHEN_IMAGE } from "../constants";

export const createProject = (
  title?: string,
  description?: string
): Project => {
  return {
    id: uuidv4(),
    title: title ?? "",
    description: description ?? "",
    featuredImage: DEFAULT_KITCHEN_IMAGE,
  };
};

export const dummyProjects = (): Project[] => {
  const projects: Project[] = [];

  for (let index = 0; index < 155; index++) {
    projects.push(
      createProject(
        `Test Project ${index + 1}`,
        `This is Test Project ${index + 1}`
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
      project.description.includes(filterText)
  ) ?? [];

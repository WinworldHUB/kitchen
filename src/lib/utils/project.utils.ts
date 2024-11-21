



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



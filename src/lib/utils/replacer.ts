export const replaceProjectId = (route: string, projectId: string | undefined) => {
    return route.replace(":projectId", projectId || "");
  };
  
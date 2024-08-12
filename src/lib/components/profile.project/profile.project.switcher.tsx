import { FC } from "react";
import { ProjectStatus } from "../../constants";
import ProjectProfileBrief from "./profile.project.brief";
import ProjectProfileCreate from "./profile.project.create";

const ProjectProfileSwitcher: FC<ProjectProps> = (
  projectProps: ProjectProps
) => {
  const projectStatus = projectProps.project?.status ?? ProjectStatus.draft;

  if (projectStatus === ProjectStatus.draft) {
    return <ProjectProfileCreate {...projectProps} />;
  }

  if (projectStatus === ProjectStatus.designBrief) {
    return <ProjectProfileBrief {...projectProps} />;
  }

  return <>{projectStatus}</>;
};

export default ProjectProfileSwitcher;

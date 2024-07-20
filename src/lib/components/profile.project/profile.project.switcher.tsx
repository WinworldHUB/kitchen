import { FC } from "react";
import { ProjectStatus } from "../../constants";
import ProjectProfileBrief from "./profile.project.brief";

const ProjectProfileSwitcher: FC<ProjectProps> = (
  projectProps: ProjectProps
) => {
  const projectStatus =
    projectProps.project?.status ?? ProjectStatus.designBrief;

  if (projectStatus === ProjectStatus.designBrief) {
    return <ProjectProfileBrief {...projectProps} />;
  }

  return <>{projectStatus}</>;
};

export default ProjectProfileSwitcher;

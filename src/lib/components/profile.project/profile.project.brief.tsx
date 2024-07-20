import { FC } from "react";
import CreateProjectContainer from "../create.project/create.project.container";

const ProjectProfileBrief: FC<ProjectProps> = ({
  project,
  onProjectUpdate,
}) => {
  return (
    <CreateProjectContainer
      project={project}
      onCreate={() => onProjectUpdate(project)}
    />
  );
};

export default ProjectProfileBrief;

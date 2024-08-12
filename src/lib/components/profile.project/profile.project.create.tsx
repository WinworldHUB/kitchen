import { FC } from "react";
import CreateProjectContainer from "../create.project/create.project.container";

const ProjectProfileCreate: FC<ProjectProps> = ({
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

export default ProjectProfileCreate;

import { FC } from "react";

interface ProjectBriefProps {
  project: Project;
}

const ProjectBrief: FC<ProjectBriefProps> = ({
  project,
}: ProjectBriefProps) => {
  return <>{project.id}</>;
};

export default ProjectBrief;

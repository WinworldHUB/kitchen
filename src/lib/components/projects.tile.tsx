import { FC } from "react";
import { Container } from "react-bootstrap";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return <Container>{project.title}</Container>;
};
export default ProjectTile;

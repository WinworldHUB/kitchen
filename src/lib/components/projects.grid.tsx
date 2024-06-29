import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import ProjectTile from "./projects.tile";

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({ projects, onProjectClick }) => {
  return (
    <Row>
      {(projects ?? []).map((project) => (
        <Col sm="3" xs="6" key={project.id}>
          <ProjectTile
            project={project}
            onClick={() => onProjectClick(project.id)}
          />
        </Col>
      ))}
    </Row>
  );
};
export default ProjectsGrid;

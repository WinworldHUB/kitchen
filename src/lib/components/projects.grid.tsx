import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import ProjectTile from "./projects.tile";

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  emptyMessage: string;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
  projects,
  onProjectClick,
  emptyMessage,
}) => {
  return (
    <>
      {projects?.length > 0 ? (
        <Row className="g-4">
          {(projects ?? []).map((project) => (
            <Col sm="3" key={project.id}>
              <ProjectTile
                project={project}
                onClick={() => onProjectClick(project.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col className="text-center">
            <label className="text-label">{emptyMessage}</label>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ProjectsGrid;

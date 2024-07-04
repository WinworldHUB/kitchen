import { FC } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { ProjectStatus } from "../constants";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={project.featuredImage} />
      <Card.Body>
        <Card.Title className="text-truncate">{project.title} </Card.Title>
        <Card.Text className="text-truncate">{project.description}</Card.Text>
        <Button variant="outline-warning" onClick={onClick}>
          View details
        </Button>
      </Card.Body>
      <Card.Footer className="p-0">
        <ProgressBar style={{ height: "3px" }}>
          <ProgressBar
            variant={
              project.status === ProjectStatus.archived ? "secondary" : "blue"
            }
            now={100}
          />
        </ProgressBar>
      </Card.Footer>
    </Card>
  );
};
export default ProjectTile;

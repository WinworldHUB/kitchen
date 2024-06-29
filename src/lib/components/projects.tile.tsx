import { FC } from "react";
import { Button, Card } from "react-bootstrap";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={project.featuredImage} />
      <Card.Body>
        <Card.Title className="text-truncate">{project.title}</Card.Title>
        <Card.Text className="text-truncate">{project.description}</Card.Text>
        <Button variant="outline-warning" onClick={onClick}>
          View details
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ProjectTile;

import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import FlexBox from "./app.flex.box";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <Card style={{ height: 350, width: 350 }}>
      <Card.Img variant="top" height={200} src="assets/images/kitch.jpg" />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div>
          <Card.Text className="text-truncate m-0 fs-5 fw-semibold">{project.title}</Card.Text>
          <Card.Text className="text-truncate m-0 fs-5 fw-semibold">{project.address}</Card.Text>
        </div>
        <FlexBox className="mt-2">
          <Button style={{ backgroundColor: "#7F56D9", }} onClick={onClick}>
            View details
          </Button>
        </FlexBox>
      </Card.Body>
    </Card>
  );
};

export default ProjectTile;

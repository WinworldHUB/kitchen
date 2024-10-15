import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import FlexBox from "./app.flex.box";
import Steps from "react-steps";
import { getProjectStatusSteps } from "../utils/project.utils";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <Card style={{height:350, width:300}}>
      {/* <Card.Img variant="top" src={project.featuredImage} /> */}
      <Card.Body>
        <div className="py-3">
          <Steps
            items={getProjectStatusSteps(project.status)}
            type={"point"}
            flat={true}
          />
        </div>

        <Card.Title className="text-truncate p-0">{project.title} </Card.Title>
        <Card.Text className="text-truncate p-1">{project.address}</Card.Text>
        <FlexBox>
          <Button variant="outline-warning" onClick={onClick}>
            View details
          </Button>
        </FlexBox>
      </Card.Body>
    </Card>
  );
};
export default ProjectTile;

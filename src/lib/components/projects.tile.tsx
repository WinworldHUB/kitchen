import { FC } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { ProjectStatus } from "../constants";
import FlexBox from "./app.flex.box";
import Steps from "react-steps";
import { getProjectStatusSteps } from "../utils/project.utils";

interface ProjectTileProps {
  project: Project;
  onClick: VoidFunction;
}

const ProjectTile: FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <Card>
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

import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ProjectStatus } from "../../constants";
import FlexBox from "../app.flex.box";

interface ProjectOverviewProps {
  project: Project;
  user: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project,user }) => {
  return (
    <>
      <Row className="my-2 p-4">
        <img
          src="/assets/images/kitch.jpg"
          alt="Project"
          height={500}
          className="w-100 p-0 rounded"
        />
        <Card className="mt-4 p-2">
          <Card.Body>
            <FlexBox justifyContent="between">
              <Col>
                <Card.Title className="fw-bold fs-3">
                  {user ?? ""}
                </Card.Title>
                <Card.Text>{project?.title}</Card.Text>
                <Card.Text>{project?.address}</Card.Text>
              </Col>
              <Col className="d-flex justify-content-end">
              
                <Card.Text className="mb-2">
                  Project Status:
                  <span
                    className="bg-warning text-dark border rounded-pill p-2 ms-2"
                    style={{ backgroundColor: "#ffc000" }}
                  >
                    {project?.status}
                  </span>
                </Card.Text>
              </Col>
            </FlexBox>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default ProjectOverview;

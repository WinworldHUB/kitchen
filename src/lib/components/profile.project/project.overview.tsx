import React from "react";
import { Card, Col } from "react-bootstrap";

interface ProjectOverviewProps {
  project: Project;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  return (
    <>
      <Col>
        <img
          src="/assets/images/kitch.jpg"
          alt="Project"
          height={500}
          className="w-100"
        />
        <Card className="my-4">
          <Card.Body>
            <Card.Title className="fw-bold fs-3">{project.title}</Card.Title>
            <Card.Text>{project.title}</Card.Text>
            <Card.Text>{project.address}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ProjectOverview;

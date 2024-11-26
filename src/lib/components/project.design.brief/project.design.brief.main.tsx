import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { PageRoutes } from "../../constants";
import { replaceProjectId } from "../../utils/replacer";
import { useParams } from "react-router-dom";
import ProjectPlansModal from "./project.plans.modal";

const ProjectDesignBriefMain: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Row>
        <Col>
          <Card
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card.Img
              variant="top"
              src="/assets/images/plans.png"
              alt="Plans"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="text-center fw-semibold my-4">
                Plans
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img
              variant="top"
              src="/assets/images/kitchen_planner.jpg"
              alt="Kitchen Planner"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="text-center fw-semibold my-4">
                Kitchen Planner
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <a href={replaceProjectId(PageRoutes.Appliances, projectId)}>
            <Card>
              <Card.Img
                variant="top"
                src="/assets/images/appliances.jpeg"
                alt="Appliances"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-center fw-semibold my-4">
                  Appliances
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
      <ProjectPlansModal 
        projectid={projectId}
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default ProjectDesignBriefMain;

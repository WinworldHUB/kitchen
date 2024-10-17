import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const ProjectDesignBriefMain = () => {
  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src="/assets/images/plans.png" alt="Plans" style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title className="text-center fw-semibold my-4">Plans</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="/assets/images/kitchen_planner.jpg" alt="Kitchen Planner" style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title className="text-center fw-semibold my-4">Kitchen Planner</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="/assets/images/appliances.jpeg" alt="Appliances" style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title className="text-center fw-semibold my-4">Appliances</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDesignBriefMain;

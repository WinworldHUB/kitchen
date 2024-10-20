import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProjectReport = () => {
  const timelineData = [
    {
      date: "October 1, 2024",
      title: "Project Kickoff",
      description: "Initial project discussion and requirements gathering.",
    },
    {
      date: "October 5, 2024",
      title: "Design Phase",
      description: "Wireframes and prototypes were designed.",
    },
    {
      date: "October 10, 2024",
      title: "Development Started",
      description: "The development team began coding the core features.",
    },
    {
      date: "October 20, 2024",
      title: "Beta Testing",
      description: "Beta testing started with a selected group of users.",
    },
    {
      date: "October 22, 2024",
      title: "Beta Testing",
      description: "Beta testing started with a selected group of users.",
    },
    {
      date: "October 24, 2024",
      title: "Beta Testing",
      description: "Beta testing started with a selected group of users.",
    },
  ];

  return (
    <Container className="my-4 position-relative">
      {/* Vertical Line */}
      <div
        className="position-absolute bg-primary"
        style={{
          left: "18%", // Adjusted to ensure it sits between the columns
          top: "0",
          bottom: "0",
          width: "2px",
          zIndex: 0,
        }}
      />
      {timelineData.map((event, index) => (
        <Row key={index} className="d-flex align-items-start mb-4">
          <Col md={2} className="text-md-end text-center">
            <div className="fw-bold">{event.date}</div>
          </Col>

          <Col md={9} className="bg-light p-3 rounded shadow-sm mx-5">
            <h5>{event.title}</h5>
            <p className="mb-0">{event.description}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProjectReport;

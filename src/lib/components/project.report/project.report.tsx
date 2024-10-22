import React from "react";
import { Container, Row, Col } from "react-bootstrap";


interface TimelineData {
    date: string
    title: string
    description:string
}

const ProjectReport = () => {
  const timelineData:TimelineData[] = [
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
    <Container fluid className="my-4">
      {/* Vertical Line */}
      <div
        className="bg-primary mx-2 "
        style={{
          left: "calc(25% - 1px)",
          top: "0",
          bottom: "0",
          width: "2px",
          zIndex: 0,
        }}
      />
      {timelineData.map((event, index) => (
        <Row key={index} className="d-flex align-items-start mb-4">
          <Col xs={4} md={3} className="text-end">
            <div className="fw-bold">{event.date}</div>
          </Col>
          <Col xs={8} md={7} className="bg-light p-3 rounded shadow-sm position-relative mx-4">
            <h5>{event.title}</h5>
            <p className="mb-0">{event.description}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProjectReport;

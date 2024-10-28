import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface TimelineData {
  date: string;
  title: string;
}

const ProjectReport = () => {
  const activeIndex = 6; // Index of the active timeline item
  const timelineData: TimelineData[] = [
    {
      date: "October 1, 2024",
      title: "Site Survey",
    },
    {
      date: "October 3, 2024",
      title: "Services and annotated drawings being created",
    },
    {
      date: "October 7, 2024",
      title: "Client to approve annotated drawings",
    },
    {
      date: "October 10, 2024",
      title: "Kitchen is being ordered",
    },
    {
      date: "October 12, 2024",
      title: "Pre-installation site survey",
    },
    {
      date: "October 15, 2024",
      title: "Kitchen/Appliance delivery",
    },
    {
      date: "October 17, 2024",
      title: "Kitchen installation",
    },
    {
      date: "October 20, 2024",
      title: "1st fix sign off",
    },
    {
      date: "October 22, 2024",
      title: "Remaining installation",
    },
    {
      date: "October 24, 2024",
      title: "Remedial installation",
    },
    {
      date: "October 26, 2024",
      title: "Cleaning/Final sign off",
    },
    {
      date: "October 28, 2024",
      title: "Project Completed",
    },
  ];

  return (
    <Container fluid className="d-flex flex-column align-items-start" >
      <div className="my-4 position-relative">
        {/* Vertical Line */}
        <div
          className="position-absolute bg-primary"
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
            <Col
              xs={8}
              md={7}
              className="mx-4"
              style={activeIndex === index ? { color: "#ffc000" } : {}}
            >
              <h5 className="text-nowrap">{event.title}</h5>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default ProjectReport;

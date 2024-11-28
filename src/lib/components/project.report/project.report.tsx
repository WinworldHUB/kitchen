import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

interface ProjectReportProps {
  timelineData?: TimelineData[];
  setTriggerFetch: React.Dispatch<React.SetStateAction<number>>;
  activeLog: TimelineData;
}

const ProjectReport: React.FC<ProjectReportProps> = ({
  timelineData,
  activeLog,
  setTriggerFetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TimelineData>({
    date: "",
    title: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriggerFetch((prev) => prev + 1);
    console.log("Added report");

    setIsModalOpen(false);
  };

  console.log("timelineData", timelineData);

  return (
    <Container fluid className="d-flex flex-column align-items-start">
      <Row className="justify-content-between align-items-center w-100 mb-2">
        <Col xs={6} className="d-flex align-items-center">
          <h1 className="text-primary mb-0">Project Report</h1>
        </Col>
        <Col xs={6} className="text-end">
          <Button
            className="add-button py-2 px-3 fs-5 w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Add Report
          </Button>
        </Col>
      </Row>

      <div className="my-4 position-relative">
        {/* Vertical Line */}
        <div
          className="position-absolute bg-primary mx-2"
          style={{
            left: "calc(25% - 2px)",
            top: "0",
            bottom: "0",
            width: "2px",
            zIndex: 0,
          }}
        />
        {timelineData?.map((event, index) => (
          <Row key={index} className="d-flex align-items-start mb-4">
            <Col md={3} className="text-start">
              <div className="fw-bold text-nowrap">{event.date}</div>
            </Col>
            <Col
              xs={8}
              md={7}
              className="mx-4"
              style={activeLog ? { color: "#ffc000" } : {}}
            >
              <h5 className="text-nowrap">{event.title}</h5>
            </Col>
          </Row>
        ))}
      </div>

      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectReport;

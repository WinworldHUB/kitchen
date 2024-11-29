import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { AppContext } from "../../contexts/appcontext";
import useApi from "../../hooks/useApi";
import { LOG_APIS } from "../../constants/api-constants";
import { useParams } from "react-router-dom";

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
  const { projectId } = useParams();
  const { appState } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { postData: addReport } = useApi<GeneralAPIResponse>();
  const { putData: updateReport } = useApi<GeneralAPIResponse>();
  const { deleteData: deleteReport } = useApi<GeneralAPIResponse>();
  const [formData, setFormData] = useState<TimelineData>({
    date: "",
    title: "",
  });
  const [modalType, setModalType] = useState<"add" | "update">("add");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "add") {
      handleAdd();
    } else {
      handleUpdate(formData.id, formData);
    }


    setIsModalOpen(false);
  };

  const handleAdd = async () => {
    const request: AddTimelineRequest = {
      ...formData,
      isCustom: true,
    };
    const resp = await addReport(
      `${LOG_APIS.CREATE_LOG_API}/${projectId}/add`,
      request
    );
    if (resp?.error) {
      console.log("Error adding report");
    }
    setTriggerFetch((prev) => prev + 1);
  };

  const handleUpdate = async (id: string, data: TimelineData) => {
    const resp = await updateReport(
      `${LOG_APIS.UPDATE_LOG_API}/${id}/update`,
      data
    );
    if (resp?.error) {
      console.log("Error updating report");
    }
    setTriggerFetch((prev) => prev + 1);
  };

  const handleDelete = async (id: string) => {
    const resp = await deleteReport(
      `${LOG_APIS.DELETE_LOG_API}/${projectId}/${id}`
    );
    if (resp?.error) {
      console.log("Error deleting report");
    }
    setTriggerFetch((prev) => prev + 1);
  };

  const openAddModal = () => {
    setFormData({ date: "", title: "" });
    setModalType("add");
    setIsModalOpen(true);
  };

  const openUpdateModal = (event: TimelineData) => {
    setFormData(event); // Set the data for the report to be updated
    setModalType("update");
    setIsModalOpen(true);
  };

  return (
    <Container fluid className="d-flex flex-column align-items-start">
      <Row className="justify-content-between align-items-center w-100 mb-2">
        <Col xs={6} className="d-flex align-items-center">
          <h1 className="text-primary mb-0">Project Report</h1>
        </Col>
        {appState?.isAdmin && (
          <Col xs={6} className="text-end">
            <Button
              className="add-button py-2 px-3 fs-5 w-auto"
              onClick={openAddModal}
            >
              Add Report
            </Button>
          </Col>
        )}
      </Row>

      <div className="my-4 position-relative">
        {/* Vertical Line */}
        <div
          className="position-absolute bg-primary mx-2"
          style={{
            left: "calc(40% - 1px)",
            top: "0",
            bottom: "0",
            width: "2px",
            zIndex: 0,
          }}
        />
        {timelineData?.map((event, index) => (
          <Row key={index} className="d-flex align-items-start mb-4">
            <Col md={5} className="text-center">
              <div className="fw-bold text-nowrap">{event.date}</div>
            </Col>
            <Col
              md={4}
              className="mx-4 d-flex align-items-center justify-content-between"
              style={activeLog ? { color: "#ffc000" } : {}}
            >
              <h5 className="text-nowrap mb-0 mx-2 ">{event.title}</h5>
              {event.isCustom && (
                <div className="d-flex gap-2">
                  <Button
                    className="edit-button"
                    size="sm"
                    onClick={() => openUpdateModal(event)} // Pass the event to the update modal
                  >
                    Update
                  </Button>
                  <Button
                    className="delete-button"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
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
          <Modal.Title>{modalType === "add" ? "Add New Report" : "Update Report"}</Modal.Title>
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

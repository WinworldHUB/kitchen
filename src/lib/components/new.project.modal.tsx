import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createProject } from "../utils/project.utils";

interface NewProjectModalProps {
  isShow: boolean;
  onCreateClick: (project: Project) => void;
  onCloseClick: VoidFunction;
}

const NewProjectModal: FC<NewProjectModalProps> = ({
  isShow,
  onCreateClick,
  onCloseClick,
}) => {
  const [project, setProject] = useState<Project>(createProject());

  return (
    <Modal
      show={isShow}
      onHide={onCloseClick}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title>New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newProjectForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Test Project"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newProjectForm.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="This is test project"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onCloseClick}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onCreateClick(project)}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProjectModal;

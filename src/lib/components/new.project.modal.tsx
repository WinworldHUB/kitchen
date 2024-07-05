import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createProject } from "../utils/project.utils";
import { DEFAULT_PROJECT_ADDRESS } from "../constants";

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
                setProject({
                  ...project,
                  title: e.target.value,
                  address: DEFAULT_PROJECT_ADDRESS,
                })
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

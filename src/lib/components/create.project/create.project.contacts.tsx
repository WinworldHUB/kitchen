import { FC } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";

interface ProjectContactsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectContacts: FC<ProjectContactsProps> = ({ project, onSave }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="createProjectForm.Title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Test project 1" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createProjectForm.Description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="This is test project 1" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createProjectForm.PostCode">
        <Form.Label>Address</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Detailed address"
            aria-label="Detailed address"
            aria-describedby="basic-addon2"
            readOnly
            disabled
          />
          <Button variant="outline-info" id="btnSelectPostcode">
            <FaLocationDot />
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="createProjectForm.ContactNumber">
        <Form.Label>Contact number</Form.Label>
        <Form.Control type="text" placeholder="Contact number" />
      </Form.Group>
    </Form>
  );
};

export default ProjectContacts;

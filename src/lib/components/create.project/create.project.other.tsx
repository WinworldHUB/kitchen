import { FC } from "react";
import { Form } from "react-bootstrap";
import FlexBox from "../app.flex.box";

interface ProjectOtherDetailsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectOtherDetails: FC<ProjectOtherDetailsProps> = ({
  project,
  onSave,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="createProjectForm.Title">
        <FlexBox>
          <Form.Label htmlFor="appointedBuilder">
            Have you appointed a builder?
          </Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="appointedBuilder"
            label="No"
          />
        </FlexBox>

        <Form.Label htmlFor="architectName">Please enter the name</Form.Label>
        <Form.Control id="architectName" type="text" placeholder="" />
      </Form.Group>
      <Form.Group
        className="p-2 mb-3 bg-light rounded"
        controlId="createProjectForm.Title"
      >
        <FlexBox>
          <Form.Label htmlFor="appointedInteriorDesigner">
            Have you appointed an interior designer?
          </Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="appointedInteriorDesigner"
            label="No"
          />
        </FlexBox>

        <Form.Label htmlFor="architectName">Please enter the name</Form.Label>
        <Form.Control id="architectName" type="text" placeholder="" />
      </Form.Group>
      <Form.Group
        className="mb-3 mt-4"
        controlId="createProjectForm.kindOfProperty"
      >
        <Form.Label htmlFor="kindOfProperty">
          What kind of property is it?
        </Form.Label>
        <Form.Select id="kindOfProperty">
          <option disabled>Select the appropriate option</option>
          <option value="1">Cottage</option>
          <option value="2">Apartment</option>
          <option value="3">Loft mills</option>
          <option value="4">Modern</option>
          <option value="5">Period</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default ProjectOtherDetails;

import { FC } from "react";
import { Form } from "react-bootstrap";
import FlexBox from "../app.flex.box";
import SwitchCheck from "../app.switch";

interface ProjectLayoutDetailsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectLayoutDetails: FC<ProjectLayoutDetailsProps> = ({
  project,
  onSave,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="createProjectForm.Title">
        <FlexBox>
          <Form.Label htmlFor="ceilingType">
            What is your ceiling type?
          </Form.Label>
          <SwitchCheck
            id="ceilingType"
            onSwitch={() => {}}
            valueTitles={["Vaulted Ceiling", "Pitched Ceiling"]}
          />
        </FlexBox>

        <FlexBox className="py-2">
          <Form.Label htmlFor="ceilingHeight">
            What is the ceiling height?
          </Form.Label>
          <Form.Control
            id="ceilingHeight"
            type="text"
            placeholder=""
            className="w-sm-25"
          />
        </FlexBox>
      </Form.Group>
      <Form.Group
        className="p-2 mb-3 bg-light rounded"
        controlId="createProjectForm.Title"
      >
        <FlexBox>
          <Form.Label htmlFor="skylights">
            Are there any skylights in the kitchen area?
          </Form.Label>
          <SwitchCheck id="skylights" onSwitch={() => {}} />
        </FlexBox>

        <FlexBox className="py-2">
          <Form.Label htmlFor="numberOfSkylights">
            How many skylights do you have?
          </Form.Label>
          <Form.Control
            id="numberOfSkylights"
            type="text"
            placeholder=""
            className="w-sm-25"
          />
        </FlexBox>
        <FlexBox className="py-2">
          <Form.Label htmlFor="skylightsLocation">
            Describe where are these skylights located?
          </Form.Label>
          <Form.Control
            id="skylightsLocation"
            type="text"
            placeholder=""
            className="w-sm-25"
          />
        </FlexBox>
      </Form.Group>
      <Form.Group
        className="mb-3 mt-4"
        controlId="createProjectForm.kindOfProperty"
      >
        <FlexBox>
          <Form.Label htmlFor="anySteps">
            Are there any steps in the kitchen area?
          </Form.Label>
          <SwitchCheck id="anySteps" onSwitch={() => {}} />
        </FlexBox>
        <FlexBox className="py-2">
          <Form.Label htmlFor="stepsLocation">
            Describe where are these steps located?
          </Form.Label>
          <Form.Control
            id="stepsLocation"
            type="text"
            placeholder=""
            className="w-sm-25"
          />
        </FlexBox>
      </Form.Group>
    </Form>
  );
};

export default ProjectLayoutDetails;

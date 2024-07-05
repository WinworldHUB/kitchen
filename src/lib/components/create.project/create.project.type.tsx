import { FC } from "react";
import { Accordion, Form } from "react-bootstrap";
import FlexBox from "../app.flex.box";
import RadioGroup from "../app.radio.group";

interface ProjectTypesProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectTypes: FC<ProjectTypesProps> = ({ project, onSave }) => {
  return (
    <Form>
      <Accordion defaultActiveKey="0" className="pb-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Existing / Renovation Project</Accordion.Header>
          <Accordion.Body>
            <Form.Group
              className=""
              controlId="createProjectForm.knockAnyWalls"
            >
              <FlexBox>
                <Form.Label htmlFor="knockWalls">
                  Are you planning to knock down any walls?
                </Form.Label>
                {/* <SwitchCheck id="knockWalls" onSwitch={() => {}} /> */}
                <RadioGroup
                  id="knockWalls"
                  options={["Yes", "No"]}
                  onChange={console.log}
                />
              </FlexBox>

              <Form.Label>If yes let us know where?</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>New / Extension Project</Accordion.Header>
          <Accordion.Body>
            <Form.Group
              className=""
              controlId="createProjectForm.knockAnyWalls"
            >
              <FlexBox>
                <Form.Label htmlFor="appointedArchitect">
                  Have you appointed an architect?
                </Form.Label>
                {/* <SwitchCheck id="appointedArchitect" onSwitch={() => {}} /> */}
                <RadioGroup
                  id="appointedArchitect"
                  options={["Yes", "No"]}
                  onChange={console.log}
                />
              </FlexBox>

              <Form.Label htmlFor="architectName">
                Please enter the name
              </Form.Label>
              <Form.Control id="architectName" type="text" placeholder="" />

              <FlexBox className="pt-3">
                <Form.Label htmlFor="planningApplication">
                  Have your planning application been approved?
                </Form.Label>
                {/* <SwitchCheck id="planningApplication" onSwitch={() => {}} /> */}
                <RadioGroup
                  id="planningApplication"
                  options={["Yes", "No"]}
                  onChange={console.log}
                />
              </FlexBox>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Form>
  );
};

export default ProjectTypes;

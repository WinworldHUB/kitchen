import { FC, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import FlexBox from "../app.flex.box";
import RadioGroup from "../app.radio.group";
import CardSimple from "../card.simple";

interface ProjectTypesProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectTypes: FC<ProjectTypesProps> = ({ project, onSave }) => {
  const [isExistingProject, setIsExistingProject] = useState<boolean>(null);
  return (
    <Form>
      <FlexBox className="py-3">
        <Form.Label>What is the type of project?</Form.Label>
        <RadioGroup
          id="projectType"
          options={["Existing / Renovation Project", "New / Extension Project"]}
          onChange={(option) =>
            setIsExistingProject(option === "Existing / Renovation Project")
          }
        />
      </FlexBox>

      {isExistingProject === true && (
        <CardSimple>
          <Alert variant="secondary">Existing / Renovation Project</Alert>
          <Form.Group
            className="p-2"
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
        </CardSimple>
      )}
      {isExistingProject === false && (
        <CardSimple>
          <Alert variant="secondary">New / Extension Project</Alert>
          <Form.Group
            className="p-2"
            controlId="createProjectForm.appointedArchitect"
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
        </CardSimple>
      )}
    </Form>
  );
};

export default ProjectTypes;

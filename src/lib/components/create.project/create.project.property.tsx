import { FC } from "react";
import { Form } from "react-bootstrap";
import FlexBox from "../app.flex.box";
import RadioGroup from "../app.radio.group";

interface ProjectPropertyDetailsProps {
  project: Project;
  onPropertyTypeChange: (propertyType: string) => void;
}

const ProjectPropertyDetails: FC<ProjectPropertyDetailsProps> = ({
  project,
  onPropertyTypeChange,
}) => {
  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPropertyTypeChange(e.target.value);
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="createProjectForm.Title">
        <FlexBox>
          <Form.Label htmlFor="appointedBuilder">
            Have you appointed a builder?
          </Form.Label>
          {/* <SwitchCheck id="appointedBuilder" onSwitch={() => {}} /> */}
          <RadioGroup
            id="appointedBuilder"
            options={["Yes", "No"]}
            onChange={console.log}
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
          {/* <SwitchCheck id="appointedInteriorDesigner" onSwitch={() => {}} /
          > */}
          <RadioGroup
            id="appointedInteriorDesigner"
            options={["Yes", "No"]}
            onChange={console.log}
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
        <Form.Select id="kindOfProperty" onChange={handlePropertyTypeChange}>
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

export default ProjectPropertyDetails;

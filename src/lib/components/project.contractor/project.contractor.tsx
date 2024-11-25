import { Row, Container, Col, Button } from "react-bootstrap";
import ContractorForm from "./project.contractor.form";
import {
  architectFormControls,
  builderFormControls,
  interiorDesignerFormControls,
} from "../../constants";
import { useState } from "react";

const ProjectContractor = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  }

  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Col>
        <Row>
          <ContractorForm
            isEditable={isEditable}
            title="Architect"
            imageSrc="/assets/images/contractors/01.jpeg"
            formControlIds={architectFormControls}
          />
          <ContractorForm
            isEditable={isEditable}
            title="Builder"
            imageSrc="/assets/images/contractors/02.jpeg"
            formControlIds={builderFormControls}
          />
          <ContractorForm
            isEditable={isEditable}
            title="Interior Designer"
            imageSrc="/assets/images/contractors/03.jpeg"
            formControlIds={interiorDesignerFormControls}
          />
        </Row>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={toggleEditable}
          className="w-25"
        >
          {isEditable ? "Edit" : "Save"}
        </Button>
      </Col>
    </Container>
  );
};

export default ProjectContractor;

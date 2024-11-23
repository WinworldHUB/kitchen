import { Row, Container } from "react-bootstrap";
import ContractorForm from "./project.contractor.form";
import {
  architectFormControls,
  builderFormControls,
  interiorDesignerFormControls,
} from "../../constants";

const ProjectContractor = () => {
  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Row>
        <ContractorForm
          title="Architect"
          imageSrc="/assets/images/contractors/01.jpeg"
          formControlIds={architectFormControls}
        />
        <ContractorForm
          title="Builder"
          imageSrc="/assets/images/contractors/02.jpeg"
          formControlIds={builderFormControls}
        />
        <ContractorForm
          title="Interior Designer"
          imageSrc="/assets/images/contractors/03.jpeg"
          formControlIds={interiorDesignerFormControls}
        />
      </Row>
    </Container>
  );
};

export default ProjectContractor;

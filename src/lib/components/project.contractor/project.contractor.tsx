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
          imageSrc="/assets/images/arch.jpeg"
          formControlIds={architectFormControls}
        />
        <ContractorForm
          title="Builder"
          imageSrc="/assets/images/builder.jpeg"
          formControlIds={builderFormControls}
        />
        <ContractorForm
          title="Interior Designer"
          imageSrc="/assets/images/interior_designer.jpeg"
          formControlIds={interiorDesignerFormControls}
        />
      </Row>
    </Container>
  );
};

export default ProjectContractor;

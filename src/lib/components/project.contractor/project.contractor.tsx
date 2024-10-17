// ProjectContractor.jsx
import { Row, Container } from "react-bootstrap";
import ContractorForm from "./project.contractor.form";

const ProjectContractor = () => {
  const architectFormControls = [
    { controlId: "architectName", label: "Name", placeholder: "John Doe", type: "text" },
    { controlId: "architectCompany", label: "Company", placeholder: "Example XYZ", type: "text" },
    { controlId: "architectContact", label: "Contact", placeholder: "123456789", type: "text" },
    { controlId: "architectWebsite", label: "Website", placeholder: "www.example.com", type: "text" },
    { controlId: "architectEmail", label: "Email", placeholder: "john@example.com", type: "email" },
    { controlId: "architectAddress", label: "Address", placeholder: "XYZ street, XYZ area, 123456", type: "text" },
  ];

  const builderFormControls = [
    { controlId: "builderName", label: "Name", placeholder: "John Doe", type: "text" },
    { controlId: "builderCompany", label: "Company", placeholder: "Example XYZ", type: "text" },
    { controlId: "builderContact", label: "Contact", placeholder: "123456789", type: "text" },
    { controlId: "builderWebsite", label: "Website", placeholder: "www.example.com", type: "text" },
    { controlId: "builderEmail", label: "Email", placeholder: "john@example.com", type: "email" },
    { controlId: "builderAddress", label: "Address", placeholder: "XYZ street, XYZ area, 123456", type: "text" },
  ];

  const interiorDesignerFormControls = [
    { controlId: "interiorDesignerName", label: "Name", placeholder: "John Doe", type: "text" },
    { controlId: "interiorDesignerCompany", label: "Company", placeholder: "Example XYZ", type: "text" },
    { controlId: "interiorDesignerContact", label: "Contact", placeholder: "123456789", type: "text" },
    { controlId: "interiorDesignerWebsite", label: "Website", placeholder: "www.example.com", type: "text" },
    { controlId: "interiorDesignerEmail", label: "Email", placeholder: "john@example.com", type: "email" },
    { controlId: "interiorDesignerAddress", label: "Address", placeholder: "XYZ street, XYZ area, 123456", type: "text" },
  ];

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

// ContractorForm.jsx
import { Col, Form } from "react-bootstrap";

interface ContractorFormProps {
  title: string;
  imageSrc: string;
  formControlIds: {
    controlId: string;
    label: string;
    placeholder: string;
    type: string;
  }[];
}

const ContractorForm: React.FC<ContractorFormProps> = ({
  title,
  imageSrc,
  formControlIds,
}) => {
  return (
    <Col md={4}>
      <img src={imageSrc} alt={title} className="img-fluid mb-2" />
      <h4>{title}</h4>
      <Form>
        {formControlIds.map(({ controlId, label, placeholder, type }) => (
          <Form.Group controlId={controlId} key={controlId}>
            <Form.Label>{label}:</Form.Label>
            <Form.Control type={type} placeholder={placeholder} />
          </Form.Group>
        ))}
      </Form>
    </Col>
  );
};

export default ContractorForm;

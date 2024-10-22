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
    <Col md={4} className="text-center"> 
      <img src={imageSrc} alt={title} className="img-fluid mb-2 rounded" width={500} />
      <h4>{title}</h4>
      <Form className="my-4">
        {formControlIds.map(({ controlId, label, placeholder, type }) => (
          <Form.Group controlId={controlId} key={controlId} className="mb-3">
            <div className="d-flex align-items-baseline justify-content-center"> 
              <Form.Label className="mb-0 me-2" style={{ textAlign: 'right' }}>{label}:</Form.Label>
              <Form.Control type={type} placeholder={placeholder} className=""/>
            </div>
          </Form.Group>
        ))}
      </Form>
    </Col>
  );
};

export default ContractorForm;

import { Col, Form } from "react-bootstrap";

interface ContractorFormProps {
  title: string;
  isEditable: boolean;
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
  isEditable,
  formControlIds,
}) => {
  return (
    <Col md={4} className="text-center">
      <img
        src={imageSrc}
        alt={title}
        className="img-fluid mb-2 rounded"
        style={{ width: "500px", height: "300px", objectFit: "cover" }}
      />
      <h4>{title}</h4>
      <Form className="my-4">
        {formControlIds.map(({ controlId, label, placeholder, type }) => (
          <Form.Group controlId={controlId} key={controlId} className="mb-3">
            <div className="d-flex align-items-center justify-content-center">
              <Form.Label
                className="mb-0"
                style={{
                  textAlign: "left",
                  minWidth: "100px",
                  fontWeight: "500",
                }}
              >
                {label}:
              </Form.Label>
              <Form.Control
              disabled={isEditable}
                type={type}
                placeholder={placeholder}
                className="flex-grow-1"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </Form.Group>
        ))}
      </Form>
    </Col>
  );
};

export default ContractorForm;

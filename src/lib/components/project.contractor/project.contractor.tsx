import { Row, Container, Col, Button, Form } from "react-bootstrap";
import { DEFAULT_CONTRACTOR, formControls } from "../../constants";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import { CONTRACTOR_APIS } from "../../constants/api-constants";

interface ProjectContractorProps {
  contractors: Contractor[];
  projectId: string;
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
}

const ProjectContractor: React.FC<ProjectContractorProps> = ({
  contractors,
  projectId,
  setContractors,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { postData: addContractors } = useApi<GeneralAPIResponse>();
  const { putData: updateContractors } = useApi<GeneralAPIResponse>();

  const toggleEditable = () => setIsEditable(!isEditable);

  const handleFieldChange = (
    type: string,
    field: keyof Contractor,
    value: string
  ) => {
    setContractors((prevContractors) => {
      const contractorIndex = prevContractors.findIndex(
        (contractor) => contractor.contractorType === type
      );

      if (contractorIndex === -1) {
        return [
          ...prevContractors,
          { ...DEFAULT_CONTRACTOR, contractorType: type, [field]: value },
        ];
      }

      return prevContractors.map((contractor, index) =>
        index === contractorIndex
          ? { ...contractor, [field]: value }
          : contractor
      );
    });
  };

  const handleSave = async () => {
    const contractorsToAdd = contractors.filter(
      (contractor) => !contractor.id && contractor.contractorType
    );
    const contractorsToUpdate = contractors.filter(
      (contractor) => contractor.id
    );

    try {
      if (contractorsToAdd.length > 0) {
        const addPayload: AddContractorRequest = {
          contractors: contractorsToAdd,
        };
        await addContractors(
          `${CONTRACTOR_APIS.CREATE_CONTRACTOR_API}/${projectId}/add`,
          addPayload
        );
      }

      if (contractorsToUpdate.length > 0) {
        const updatePayload: UpdateContractorRequest = {
          contractors: contractorsToUpdate.map(
            ({ id, name, email, website, company, contact, address }) => ({
              id,
              name,
              email,
              website,
              company,
              contact,
              address,
            })
          ),
        };
        await updateContractors(
          `${CONTRACTOR_APIS.UPDATE_CONTRACTOR_API}/${projectId}/update`,
          updatePayload
        );
      }

      toggleEditable();
    } catch (error) {
      console.error("Error saving contractors:", error);
    }
  };

  const contractorTypes = [
    { type: "Architect", image: "/assets/images/contractors/01.jpeg" },
    { type: "Builder", image: "/assets/images/contractors/02.jpeg" },
    { type: "Interior Designer", image: "/assets/images/contractors/03.jpeg" },
  ];

  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Col>
        <Row>
          {contractorTypes.map(({ type, image }) => {
            const contractorData =
              contractors.find(
                (c) =>
                  c?.contractorType?.toLowerCase() === type.toLowerCase()
              ) ?? DEFAULT_CONTRACTOR;

            return (
              <Col md={4} className="text-center" key={type}>
                <img
                  src={image}
                  alt={type}
                  className="img-fluid mb-2 rounded"
                  style={{ width: "500px", height: "300px", objectFit: "cover" }}
                />
                <h4>{type}</h4>
                <Form className="my-4">
                  {formControls.map(({ controlId, label, placeholder, type }) => (
                    <Form.Group
                      controlId={controlId}
                      key={controlId}
                      className="mb-3"
                    >
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
                          disabled={!isEditable}
                          type={type}
                          placeholder={placeholder}
                          value={contractorData[controlId] ?? ""}
                          onChange={(e) =>
                            handleFieldChange(type, controlId as keyof Contractor, e.target.value)
                          }
                          className="flex-grow-1"
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                    </Form.Group>
                  ))}
                </Form>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={isEditable ? handleSave : toggleEditable}
          className="w-25"
        >
          {!isEditable ? "Edit" : "Save"}
        </Button>
      </Col>
    </Container>
  );
};

export default ProjectContractor;

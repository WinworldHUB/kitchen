import { Row, Container, Col, Button } from "react-bootstrap";
import ContractorForm from "./project.contractor.form";
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
        // If the contractor does not exist, create a new one with default values
        return [
          ...prevContractors,
          { ...DEFAULT_CONTRACTOR, type, [field]: value },
        ];
      }

      // Ensure the field exists before updating it
      const updatedContractor = {
        ...prevContractors[contractorIndex],
        [field]: value || "",
      };

      return prevContractors.map((contractor, index) =>
        index === contractorIndex ? updatedContractor : contractor
      );
    });
  };

  const handleSave = async () => {
    const contractorPayload = { contractors };
    if (contractors?.length > 0) {
      await updateContractors(
        `${CONTRACTOR_APIS.UPDATE_CONTRACTOR_API}/${projectId}/update`,
        contractorPayload
      );
    } else {
      await addContractors(
        `${CONTRACTOR_APIS.CREATE_CONTRACTOR_API}/${projectId}/add`,
        contractorPayload
      );
    }
    toggleEditable();
  };

  const architect =
    contractors.find(
      (c) => c?.contractorType?.toLowerCase() === "architect".toLowerCase()
    ) ?? DEFAULT_CONTRACTOR;

  const builder =
    contractors.find(
      (c) => c?.contractorType?.toLowerCase() === "Builder".toLowerCase()
    ) ?? DEFAULT_CONTRACTOR;

  const interiorDesigner =
    contractors.find(
      (c) =>
        c?.contractorType?.toLowerCase() === "Interior Designer".toLowerCase()
    ) ?? DEFAULT_CONTRACTOR;

  return (
    <Container className="border border-1 border-black h-100 p-4">
      <Col>
        <Row>
          <ContractorForm
            isEditable={isEditable}
            title="Architect"
            imageSrc="/assets/images/contractors/01.jpeg"
            formControlIds={formControls}
            contractorData={architect}
            onFieldChange={(field, value) =>
              handleFieldChange("Architect", field as keyof Contractor, value)
            }
          />

          <ContractorForm
            isEditable={isEditable}
            title="Builder"
            imageSrc="/assets/images/contractors/02.jpeg"
            formControlIds={formControls}
            contractorData={builder}
            onFieldChange={(field, value) =>
              handleFieldChange("Builder", field as keyof Contractor, value)
            }
          />

          <ContractorForm
            isEditable={isEditable}
            title="Interior Designer"
            imageSrc="/assets/images/contractors/03.jpeg"
            formControlIds={formControls}
            contractorData={interiorDesigner}
            onFieldChange={(field, value) =>
              handleFieldChange(
                "Interior Designer",
                field as keyof Contractor,
                value
              )
            }
          />
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

import { Row, Container, Col, Button } from "react-bootstrap";
import ContractorForm from "./project.contractor.form";
import { architectFormControls, builderFormControls, interiorDesignerFormControls } from "../../constants";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { CONTRACTOR_APIS } from "../../constants/api-constants";
import Loader from "../Loader";

const ProjectContractor = () => {
  const { projectId } = useParams();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { getData: fetchContractors } = useApi<GetContractorsResponse>();
  const { postData: addContractors } = useApi<GeneralAPIResponse>();
  const { putData: updateContractors } = useApi<GeneralAPIResponse>();



  useEffect(() => {
    const fetchContractorsForProject = async () => {
      setLoading(true);
      const response = await fetchContractors(`${CONTRACTOR_APIS.GET_CONTRACTORS_API}/${projectId}`);
      if (response?.success) {
        setContractors(response.contractors);
      } else {
        setContractors([]); // No contractors found.
      }
      setLoading(false);
    };
    fetchContractorsForProject();
  }, [projectId]);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const contractorPayload = {
      projectId,
      contractors, // Collect updated or new contractor data here.
    };

    if (contractors.length > 0) {
      // Update existing contractors.
      await updateContractors(`${CONTRACTOR_APIS.GET_CONTRACTORS_API}/${projectId}/update`, contractorPayload);
    } else {
      // Add new contractors.
      await addContractors(`${CONTRACTOR_APIS.GET_CONTRACTORS_API}/${projectId}/add`, contractorPayload);
    }
    toggleEditable();
  };

  if (loading) {
    return <Loader/>;
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
        <Button variant="primary" onClick={isEditable ? handleSave : toggleEditable} className="w-25">
          {isEditable ? "Save" : "Edit"}
        </Button>
      </Col>
    </Container>
  );
};

export default ProjectContractor;

import { FC, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { DEFAULT_PROJECT_ADDRESS, ProjectType, PROPERTY_LIST } from "../constants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useApi from "../hooks/useApi";
import { PROJECT_APIS } from "../constants/api-constants";

interface NewProjectModalProps {
  isShow: boolean;
  onCloseClick: VoidFunction;
  setTriggerFetch: React.Dispatch<React.SetStateAction<number>>
}

const NewProjectModal: FC<NewProjectModalProps> = ({
  isShow,
  onCloseClick,
  setTriggerFetch
}) => {
  const { postData: sendProjectData } = useApi<CreateProjectResponse>();  
  const { getData: getAddresses, data: addressSummary } =
    useApi<AddressSummary>("https://postcode.apitier.com/v1/postcodes/");

  const [title, setTitle] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [address, setAddress] = useState<string>(DEFAULT_PROJECT_ADDRESS);
  const [projectType, setProjectType] = useState<string>(ProjectType.NewExtension);
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_LIST[0]); 

  const searchAddress = async () => {
    await getAddresses(
      `${postcode}?x-api-key=WQjGYGswUwaUAk3lAzF305NcmGLa4Yyh2UYD2w7q`
    );
  };

  const handleAddressChange = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  const handleCreateProject = async () => {
    try {  
      const newProject:CreateProjectRequest = {
        title: title,
        address: address ?? DEFAULT_PROJECT_ADDRESS,
        propertyType: propertyType,
        isExistingProject: projectType === ProjectType.ExistingRenovation,
      };
  
      // Send newProject data to backend
      const response = await sendProjectData(PROJECT_APIS.CREATE_PROJECT_API, newProject);
      if(response?.error){
        console.error("Error creating project:", response.error);
      }
      setTriggerFetch((prev) => prev + 1);
      onCloseClick();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  
  return (
    <Modal
      show={isShow}
      onHide={onCloseClick}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header
        closeButton={false}
        className="d-flex justify-content-center"
      >
        <Modal.Title className="w-100 text-center">
          About Your Project
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newProjectForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="createProjectForm.ProjectType">
            <Form.Label>Type of Project</Form.Label>
            <Form.Select
              aria-label="Select project type"
              value={projectType}
              required
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="new-extension">New/Extension</option>
              <option value="existing-renovation">Existing/Renovation</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="createProjectForm.PropertyType">
            <Form.Label>Type of Property</Form.Label>
            <Form.Select
              aria-label="Select property type"
              value={propertyType}
              required
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option disabled>Select the appropriate option</option>
              {PROPERTY_LIST.map((property, index) => (
                <option key={index} value={property}>
                  {property}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="createProjectForm.PostCode">
            <Form.Label>Address</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Postcode"
                aria-label="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <Button variant="outline-primary" onClick={searchAddress}>
                <FaMagnifyingGlass />
              </Button>
            </InputGroup>

            {addressSummary?.result?.addresses?.length > 0 && (
              <Form.Group controlId="selectAddressDropdown">
                <Form.Label>Select Address</Form.Label>
                <Form.Select
                  aria-label="Select an address"
                  onChange={(e) => handleAddressChange(e.target.value)}
                >
                  <option>Select an address...</option>
                  {addressSummary.result.addresses.map((addr) => (
                    <option key={addr.delivery_point_suffix} value={addr.address}>
                      {addr.address}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="outline-danger" onClick={onCloseClick}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#7F56D9" }}
          onClick={handleCreateProject}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProjectModal;

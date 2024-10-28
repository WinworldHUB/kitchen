import { FC, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { createProject } from "../utils/project.utils";
import { DEFAULT_PROJECT_ADDRESS } from "../constants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useApi from "../hooks/useApi";

interface NewProjectModalProps {
  isShow: boolean;
  onCreateClick: (project: Project) => void;
  onCloseClick: VoidFunction;
}

const NewProjectModal: FC<NewProjectModalProps> = ({
  isShow,
  onCreateClick,
  onCloseClick,
}) => {
  const [project, setProject] = useState<Project>(createProject());
  const { getData: getAddresses, data: addressSummary } =
    useApi<AddressSummary>("https://postcode.apitier.com/v1/postcodes/");
  const [postcode, setPostcode] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [projectType, setProjectType] = useState<string>("new-extension");
  const [propertyType, setPropertyType] = useState<string>("cottage");

  const searchAddress = async () => {
    await getAddresses(
      `${postcode ?? ""}?x-api-key=WQjGYGswUwaUAk3lAzF305NcmGLa4Yyh2UYD2w7q`
    );
  };

  const handleAddressChange = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  console.log(address);

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
              placeholder="Test Project"
              value={project.title}
              onChange={(e) =>
                setProject({
                  ...project,
                  title: e.target.value,
                  address: DEFAULT_PROJECT_ADDRESS,
                })
              }
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="createProjectForm.ProjectType"
          >
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

          {/* New Dropdown for Type of Property */}
          <Form.Group
            className="mb-3"
            controlId="createProjectForm.PropertyType"
          >
            <Form.Label>Type of Property</Form.Label>
            <Form.Select
              aria-label="Select property type"
              value={propertyType}
              required
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="cottage">Cottage</option>
              <option value="apartment">Apartment</option>
              <option value="loft-mills">Loft Mills</option>
              <option value="modern">Modern</option>
              <option value="period">Period</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="createProjectForm.PostCode">
            <Form.Label>Address</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Postcode"
                aria-label="Postcode"
                aria-describedby="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <Button variant="outline-primary" onClick={searchAddress}>
                <FaMagnifyingGlass />
              </Button>
            </InputGroup>

            {/* Dropdown for Address Selection */}
            {addressSummary?.result?.addresses?.length > 0 && (
              <Form.Group controlId="selectAddressDropdown">
                <Form.Label>Select Address</Form.Label>
                <Form.Select
                  aria-label="Select an address"
                  onChange={(e) => handleAddressChange(e.target.value)}
                >
                  <option>Select an address...</option>
                  {addressSummary.result.addresses.map((addr) => (
                    <option
                      key={addr.delivery_point_suffix}
                      value={addr.address}
                    >
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
          onClick={() => onCreateClick(project)}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProjectModal;

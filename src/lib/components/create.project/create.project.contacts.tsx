import { FC, useState } from "react";
import { Button, Form, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { FaLocationDot, FaMagnifyingGlass } from "react-icons/fa6";
import useApi from "../../hooks/useApi";

interface ProjectContactsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectContacts: FC<ProjectContactsProps> = ({ project, onSave }) => {
  const { getData: getAddresses, data: addressSummary } =
    useApi<AddressSummary>("https://postcode.apitier.com/v1/postcodes/");
  const [isShowAddressesModal, setIsShowAddressesModal] =
    useState<boolean>(false);
  const [postcode, setPostcode] = useState<string>();
  const [address, setAddress] = useState<string>();

  const searchAddress = async () => {
    await getAddresses(
      `${postcode ?? ""}?x-api-key=WQjGYGswUwaUAk3lAzF305NcmGLa4Yyh2UYD2w7q`
    );
  };

  const handleAddressesModalClose = () => setIsShowAddressesModal(false);
  const handleAddressChange = (selectedAddress: string) => {
    setAddress(selectedAddress);
    handleAddressesModalClose();
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="createProjectForm.Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Test project 1" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createProjectForm.PostCode">
          <Form.Label>Address</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Detailed address"
              aria-label="Detailed address"
              aria-describedby="basic-addon2"
              readOnly
              disabled
              value={address}
            />
            <Button
              variant="outline-info"
              id="btnSelectPostcode"
              onClick={() => setIsShowAddressesModal(true)}
            >
              <FaLocationDot />
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="createProjectForm.ContactNumber"
        >
          <Form.Label>Contact number</Form.Label>
          <Form.Control type="text" placeholder="Contact number" />
        </Form.Group>
      </Form>
      <Modal
        show={isShowAddressesModal}
        onHide={handleAddressesModalClose}
        backdrop="static"
        keyboard={false}
        centered
        scrollable
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Find address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="findAddressForm.postcode">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Postcode"
                  aria-label="Postcode"
                  aria-describedby="Postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
                <Button
                  variant="outline-primary"
                  id="btnPostcode"
                  onClick={searchAddress}
                >
                  <FaMagnifyingGlass />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          <br />
          <h6>Addresses</h6>
          <ListGroup className="list-container-400">
            {(addressSummary?.result?.addresses ?? []).map((address) => (
              <ListGroup.Item
                action
                key={address.delivery_point_suffix}
                onClick={() => handleAddressChange(address.address)}
              >
                {address.address}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddressesModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectContacts;

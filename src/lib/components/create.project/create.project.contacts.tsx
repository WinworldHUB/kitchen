import { FC, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import useApi from "../../hooks/useApi";

interface ProjectContactsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectContacts: FC<ProjectContactsProps> = ({ project, onSave }) => {
  const { getData: getAddresses, data: addressSummary } =
    useApi<AddressSummary>("https://www.192.com/addressesForPostcode/?");
  const [isShowAddressesModal, setIsShowAddressesModal] =
    useState<boolean>(false);

  const searchAddress = async (postcode: string) => {
    if (postcode.length >= 5 && postcode.length <= 7) {
      fetch(
        `https://www.192.com/addressesForPostcode/?postcode=${postcode}`
      ).then((response) => response.json().then((data) => console.log(data)));
      // await getAddresses(

      // );
    }
  };

  const handleAddressesModalClose = () => setIsShowAddressesModal(false);
  const handleAddressChange = () => {};
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="createProjectForm.Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Test project 1" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createProjectForm.Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="This is test project 1" />
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
              <FloatingLabel
                controlId="floatingInput"
                label="Type your postcode here ..."
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="postcode"
                  onChange={(e) => searchAddress(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
          <br />
          <h6>Addresses</h6>
          <ListGroup>
            {(addressSummary?.addresses ?? []).map((address) => (
              <ListGroup.Item action key={address.bn}>
                {address.st}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddressesModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleAddressChange()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectContacts;

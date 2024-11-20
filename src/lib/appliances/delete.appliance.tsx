import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteApplianceModalProps {
  show: boolean;
  onHide: () => void;
  selectedGroup: ApplianceGroup | null;
  selectedAppliances: Appliance[];
  handleDelete: () => void;
}

const DeleteApplianceModal: React.FC<DeleteApplianceModalProps> = ({
  show,
  onHide,
  selectedGroup,
  selectedAppliances,
  handleDelete,
}) => {
  if (!selectedGroup) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          "Select the appliances you want to delete"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h2>{selectedGroup.name}</h2>
          <h5>Quantity: {selectedGroup.quantity}</h5>
          {selectedAppliances.map((appliance) => (
            <div key={appliance.id}>
              <strong>Brand:</strong> {appliance.brand}, <strong>Type:</strong> {appliance.type}
            </div>
          ))}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteApplianceModal;

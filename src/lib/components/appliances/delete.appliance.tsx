import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
interface DeleteApplianceModalProps {
  show: boolean;
  onHide: () => void;
  selectedGroup: ApplianceGroup | null;
  selectedAppliances: Appliance[];
  handleDelete: (applianceIds: string[]) => void;
}

const DeleteApplianceModal: React.FC<DeleteApplianceModalProps> = ({
  show,
  onHide,
  selectedGroup,
  selectedAppliances,
  handleDelete,
}) => {
  // State to keep track of selected appliances (by ID)
  const [selectedApplianceIds, setSelectedApplianceIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedApplianceIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  if (!selectedGroup) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered // Centering the modal vertically
      className="modal-dialog-centered"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h4 font-weight-bold text-dark">
          Select the appliances you want to delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h2 className="h5 font-weight-bold">{selectedGroup.name}</h2>
          <h5 className="text-muted">Quantity: {selectedGroup.quantity}</h5>
        </div>

        {/* Render appliances with checkboxes */}
        <div className="mb-3">
          {selectedAppliances.map((appliance) => (
            <Form.Check
            key={appliance.id}
            type="checkbox"
            id={`appliance-${appliance.id}`}
            label={
              <span className="appliance-label">
                Brand: {appliance.brand} - Type: {appliance.type}
              </span>
            }
            checked={selectedApplianceIds.includes(appliance.id!)}
            onChange={() => handleCheckboxChange(appliance.id!)}
            className="font-weight-medium custom-checkbox"
          />
          
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide} className="px-4 py-2">
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDelete(selectedApplianceIds)} // Pass the selected appliance IDs to handleDelete
          className="px-4 py-2"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteApplianceModal;

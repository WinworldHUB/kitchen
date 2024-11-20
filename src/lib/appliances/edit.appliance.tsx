import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface EditApplianceModalProps {
  show: boolean;
  onHide: () => void;
  selectedGroup: ApplianceGroup | null;
  selectedAppliances: Appliance[];
  handleEdit: (appliance: Appliance) => void;
}

const EditApplianceModal: React.FC<EditApplianceModalProps> = ({
  show,
  onHide,
  selectedGroup,
  selectedAppliances,
  handleEdit,
}) => {
  const [step, setStep] = useState<number>(1); // Tracks the current step
  const [selectedApplianceId, setSelectedApplianceId] = useState<string | null>(null);
  const [applianceDetails, setApplianceDetails] = useState<Partial<Appliance>>({});
  
  useEffect(() => {
    if (selectedApplianceId && selectedGroup) {
      const appliance = selectedAppliances.find(a => a.id === selectedApplianceId);
      if (appliance) {
        setApplianceDetails({
          brand: appliance.brand,
          type: appliance.type,
          additionalInfo: appliance.additionalInfo,
          referenceUrl: appliance.referenceUrl,
        });
      }
    }
  }, [selectedApplianceId, selectedGroup, selectedAppliances]);

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedApplianceId) {
        setStep(2);
      } else {
        alert("Please select an appliance to edit.");
      }
    } else {
      if (selectedApplianceId && applianceDetails) {
        const updatedAppliance: Appliance = {
          id: selectedApplianceId,
          name: selectedGroup?.name || '',
          brand: applianceDetails.brand || '',
          type: applianceDetails.type || '',
          additionalInfo: applianceDetails.additionalInfo || '',
          referenceUrl: applianceDetails.referenceUrl || '',
        };
        handleEdit(updatedAppliance);
        onHide();
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedApplianceId(null);
    setApplianceDetails({});
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{step === 1 ? "Select Appliance" : "Edit Appliance Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form>
            <Form.Group controlId="applianceSelect">
              <Form.Label>Select Appliance to Edit</Form.Label>
              {selectedAppliances.length === 0 ? (
                <p>No appliances available for editing.</p>
              ) : (
                selectedAppliances.map((appliance) => (
                  <Form.Check
                    key={appliance.id}
                    type="radio"
                    id={`appliance-${appliance.id}`}
                    label={
                        <span className="appliance-label">
                          Brand: {appliance.brand} - Type: {appliance.type}
                        </span>
                      }
                    checked={selectedApplianceId === appliance.id}
                    onChange={() => setSelectedApplianceId(appliance.id)}
                  />
                ))
              )}
            </Form.Group>
          </Form>
        ) : (
          <Form>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                required
                value={applianceDetails.brand || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, brand: e.target.value })
                }
                placeholder="Enter brand"
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                required
                value={applianceDetails.type || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, type: e.target.value })
                }
                placeholder="Enter type"
              />
            </Form.Group>
            <Form.Group controlId="additionalInfo">
              <Form.Label>Additional Info</Form.Label>
              <Form.Control
                type="text"
                value={applianceDetails.additionalInfo || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, additionalInfo: e.target.value })
                }
                placeholder="Enter additional information"
              />
            </Form.Group>
            <Form.Group controlId="referenceUrl">
              <Form.Label>Reference URL</Form.Label>
              <Form.Control
                type="url"
                value={applianceDetails.referenceUrl || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, referenceUrl: e.target.value })
                }
                placeholder="Enter reference URL"
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleNextStep}>
          {step === 1 ? "Next" : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditApplianceModal;

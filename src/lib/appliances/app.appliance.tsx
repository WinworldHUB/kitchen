import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddApplianceProps {
  show: boolean;
  handleClose: () => void;
  addAppliance: (appliance: Appliance) => void;
  currentAppliance?: Appliance | null;
}

const AddAppliance: React.FC<AddApplianceProps> = ({
  show,
  handleClose,
  addAppliance,
  currentAppliance,
}) => {
  const [step, setStep] = useState<number>(1);
  const [applianceName, setApplianceName] = useState<string>("");
  const [applianceDetails, setApplianceDetails] = useState<Partial<Appliance>>({});

  const resetForm = () => {
    setStep(1);
    setApplianceName("");
    setApplianceDetails({});
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
      if (currentAppliance) {
        setApplianceName(currentAppliance.name);
        setApplianceDetails({
          brand: currentAppliance.brand,
          type: currentAppliance.type,
          additionalInfo: currentAppliance.additionalInfo,
          referenceUrl: currentAppliance.referenceUrl,
        });
      }
    } else {
      const newAppliance: Appliance = {
        name: applianceName,
        brand: applianceDetails.brand || "",
        type: applianceDetails.type || "",
        additionalInfo: applianceDetails.additionalInfo || "",
        referenceUrl: applianceDetails.referenceUrl || "",
      };
      addAppliance(newAppliance);
      handleClose();
      resetForm();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{step === 1 ? "Select Appliance" : "Enter Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form>
            <Form.Group controlId="applianceName">
              <Form.Label>Appliance Name</Form.Label>
              <Form.Control
                as="select"
                required
                value={applianceName}
                onChange={(e) => setApplianceName(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="fridge">Fridge</option>
                <option value="extractor">Extractor</option>
                <option value="tap">Tap</option>
                <option value="oven">Oven</option>
                <option value="dishwasher">Dishwasher</option>
                <option value="hob">Hob</option>
              </Form.Control>
            </Form.Group>
          </Form>
        ) : (
          <Form>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter brand"
                value={applianceDetails.brand || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, brand: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter type"
                value={applianceDetails.type || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, type: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="additionalInfo">
              <Form.Label>Additional Info</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter additional info"
                value={applianceDetails.additionalInfo || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, additionalInfo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="referenceUrl">
              <Form.Label>Reference URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter reference URL"
                value={applianceDetails.referenceUrl || ""}
                onChange={(e) =>
                  setApplianceDetails({ ...applianceDetails, referenceUrl: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleNextStep}>
          {step === 1 ? "Next" : currentAppliance ? "Update Appliance" : "Add Appliance"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAppliance;

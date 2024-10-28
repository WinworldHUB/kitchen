import React, { useMemo, useState } from "react";
import {
  Card,
  Accordion,
  Button,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../constants";

interface ApplianceGroup {
  name: string;
  quantity: number;
  details: string[];
}

const AppliancesTable: React.FC<DataTableProps<Appliance>> = ({
  initialData,
}) => {
  const [data, setData] = useState<Appliance[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance | null>(
    null
  );
  const [step, setStep] = useState<number>(1);
  const [applianceName, setApplianceName] = useState<string>("");
  const [applianceDetails, setApplianceDetails] = useState<Partial<Appliance>>(
    {}
  );

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentAppliance(null);
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
      addAppliance();
    }
  };

  const addAppliance = () => {
    const newAppliance: Appliance = {
      name: applianceName,
      brand: applianceDetails.brand || "",
      type: applianceDetails.type || "",
      additionalInfo: applianceDetails.additionalInfo || "",
      referenceUrl: applianceDetails.referenceUrl || "",
    };

    setData((prevData) => {
      // Check if we're updating an existing appliance
      const existingApplianceIndex = prevData.findIndex(
        (appliance) => appliance.name === currentAppliance?.name
      );

      if (existingApplianceIndex !== -1) {
        // Update existing appliance
        const updatedData = [...prevData]; // Create a new array
        updatedData[existingApplianceIndex] = newAppliance; // Update the specific appliance
        return updatedData; // Return the updated array
      } else {
        // Add new appliance
        return [...prevData, newAppliance]; // Return the new array with the new appliance
      }
    });

    handleClose();
    console.log("Added/Updated appliance", newAppliance);
  };

  const handleEdit = (row: ApplianceGroup) => {
    const appliance =
      data.find((appliance) => appliance.name === row.name) || null;
    setCurrentAppliance(appliance);
    handleShow();
  };

  const handleDelete = (row: ApplianceGroup) => {
    setData((prevData) =>
      prevData.filter((appliance) => appliance.name !== row.name)
    );
    alert(`Deleted ${row.name}`);
  };

  const groupedData: ApplianceGroup[] = useMemo(() => {
    const applianceMap: Record<string, ApplianceGroup> = {};

    data.forEach((appliance) => {
      if (!applianceMap[appliance.name]) {
        applianceMap[appliance.name] = {
          name: appliance.name,
          quantity: 0,
          details: [],
        };
      }
      applianceMap[appliance.name].quantity += 1; // Increment quantity for each occurrence
      applianceMap[appliance.name].details.push(
        `${appliance.type || "N/A"} (${appliance.brand || "N/A"})`
      );
    });

    return Object.values(applianceMap);
  }, [data]); // Recalculate groupedData whenever data changes

  const columns: TableColumn<ApplianceGroup>[] = useMemo(() => {
    return [
      {
        name: "Appliance",
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex w-100">
            <Accordion className="flex-grow-1 bg-transparent mx-4">
              <Accordion.Item
                eventKey={row.name}
                className="custom-accordion-item"
              >
                <Accordion.Header className="d-flex justify-content-between align-items-center w-100">
                  <div className="flex-grow-1">
                    {row.name} (Quantity: {row.quantity})
                  </div>
                </Accordion.Header>
                <Accordion.Body>{row.details.join(", ")}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                size="sm"
                className="appliance-delete-button mx-2"
                onClick={() => handleDelete(row)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                className="appliance-edit-button mx-2"
                onClick={() => handleEdit(row)}
              >
                Edit
              </Button>
            </div>
          </Container>
        ),
      },
    ];
  }, []);

  return (
    <Container fluid>
      <div className="my-4">
        <Button size="lg" className="add-appliance-button" onClick={handleShow}>
          Add Appliance
        </Button>
      </div>
      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={groupedData}
            striped
            highlightOnHover
            pagination
            customStyles={DATA_TABLE_DEFAULT_STYLE}
          />
        </Card.Body>
      </Card>
      <Modal show={isModalOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {step === 1 ? "Select Appliance" : "Enter Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 ? (
            <Form>
              <Form.Group controlId="applianceName">
                <Form.Label>Appliance Name</Form.Label>
                <Form.Control
                  as="select"
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
                  placeholder="Enter brand"
                  value={applianceDetails.brand || ""}
                  onChange={(e) =>
                    setApplianceDetails({
                      ...applianceDetails,
                      brand: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter type"
                  value={applianceDetails.type || ""}
                  onChange={(e) =>
                    setApplianceDetails({
                      ...applianceDetails,
                      type: e.target.value,
                    })
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
                    setApplianceDetails({
                      ...applianceDetails,
                      additionalInfo: e.target.value,
                    })
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
                    setApplianceDetails({
                      ...applianceDetails,
                      referenceUrl: e.target.value,
                    })
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
            {step === 1
              ? "Next"
              : currentAppliance
              ? "Update Appliance"
              : "Add Appliance"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppliancesTable;

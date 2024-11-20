
import React, { useMemo, useState } from "react";
import { Card, Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Select from 'react-select';  // Import react-select
import { DATA_TABLE_DEFAULT_STYLE } from "../constants";
import AddAppliance from "./app.appliance";
import useApi from "../hooks/useApi";
import { APPLIANCE_APIS } from "../constants/api-constants";
import { useParams } from "react-router-dom";

interface ApplianceGroup {
  name: string;
  quantity: number;
  details: string[];
}

const AppliancesTable: React.FC<DataTableProps<Appliance>> = ({
  initialData,
}) => {
  const { projectId } = useParams();

  const { postData: sendApplianceData, deleteData: deleteApplianceData } = useApi<GeneralAPIResponse>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>([]);

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteModalShow = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const resetForm = () => {
    setCurrentAppliance(null);
  };

  const addAppliance = (newAppliance: Appliance) => {
    const request: AddApplicanceRequest = {
      ...newAppliance,
      name: newAppliance.name,
      brand: newAppliance.brand,
      type: newAppliance.type,
      additionalInfo: newAppliance.additionalInfo,
      referenceUrl: newAppliance.referenceUrl,
    };

    sendApplianceData(
      `${APPLIANCE_APIS.ADD_APPLIANCE_API}/${projectId}/add`,
      request
    );

    handleClose();
    alert(`Added/Updated appliance: ${newAppliance.name}`);
  };

  const handleDelete = async () => {
    try {
      const request: DeleteAppliancesRequest = {
        applianceIds: selectedAppliances.map((appliance) => appliance.id),
      };
      
      const response = await deleteApplianceData(APPLIANCE_APIS.DELETE_APPLIANCE_API, request);
      if (!response.success) {
        throw new Error(`Error deleting appliance: ${response.message}`);
      }
      alert(`Deleted ${selectedAppliances.map((appliance) => appliance.name).join(", ")}`);
      handleDeleteModalClose();
    }
    catch (error) {
      console.error("Error deleting appliance: ", error);
    }
  };

  const groupedData: ApplianceGroup[] = useMemo(() => {
    const applianceMap: Record<string, ApplianceGroup> = {};

    initialData?.forEach((appliance) => {
      if (!applianceMap[appliance.name]) {
        applianceMap[appliance.name] = {
          name: appliance.name,
          quantity: 0,
          details: [],
        };
      }
      applianceMap[appliance.name].quantity += 1;
      applianceMap[appliance.name].details.push(
        `${appliance.type || "N/A"} (${appliance.brand || "N/A"})`
      );
    });

    return Object.values(applianceMap);
  }, [initialData]);

  const columns: TableColumn<ApplianceGroup>[] = [
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
              onClick={handleDeleteModalShow}
            >
              Delete
            </Button>
            <Button
              size="sm"
              className="appliance-edit-button mx-2"
              onClick={() => {}}
            >
              Edit
            </Button>
          </div>
        </Container>
      ),
    },
  ];

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
            customStyles={DATA_TABLE_DEFAULT_STYLE}
          />
        </Card.Body>
      </Card>
      <AddAppliance
        show={isModalOpen}
        handleClose={handleClose}
        addAppliance={addAppliance}
        currentAppliance={currentAppliance}
      />

      {/* Delete Modal */}
      <Modal show={deleteModalOpen} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Appliances to Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {groupedData.map((row) => (
              <div key={row.name}>
                <h5>{row.name} (Quantity: {row.quantity})</h5>
                <Select
                  isMulti
                  options={initialData
                    .filter((appliance) => appliance.name === row.name)
                    .map((appliance) => ({
                      value: appliance.id,
                      label: `${appliance.brand} - ${appliance.type}`,
                    }))}
                  onChange={(selectedOptions) => {
                    const selectedIds = selectedOptions.map((option: any) => option.value);
                    setSelectedAppliances(
                      initialData.filter((appliance) =>
                        selectedIds.includes(appliance.id)
                      )
                    );
                  }}
                  placeholder="Select appliances"
                />
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Selected
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppliancesTable;
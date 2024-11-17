import React, { useEffect, useMemo, useState } from "react";
import { Card, Container, Button, Accordion } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../constants";
import AddAppliance from "./app.appliance";
import useApi from "../hooks/useApi";
import { APPLIANCE_APIS } from "../constants/api-constants";

interface ApplianceGroup {
  name: string;
  quantity: number;
  details: string[];
}

const AppliancesTable: React.FC<DataTableProps<Appliance>> = ({
  initialData,
}) => {



  
  const { postData: sendApplianceData } = useApi<AddApplicanceRequest>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance | null>(
    null
  );

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentAppliance(null);
  };

 

  const addAppliance = (newAppliance: Appliance) => {
    addAppliance(newAppliance);

    handleClose();
    alert(`Added/Updated appliance: ${newAppliance.name}`);
  };

  // const handleEdit = (row: ApplianceGroup) => {
  //   const appliance =
  //     data.find((appliance) => appliance.name === row.name) || null;
  //   setCurrentAppliance(appliance);
  //   handleShow();
  // };

  const handleDelete = (row: ApplianceGroup) => {
    alert(`Deleted ${row.name}`);
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
                onClick={() => {}}
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
    </Container>
  );
};

export default AppliancesTable;

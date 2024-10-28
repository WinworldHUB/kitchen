import React, { useMemo } from "react";
import { Card, Accordion, Button, Container } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../constants";

interface ApplianceGroup {
  name: string;
  quantity: number;
  details: string[];
}

const AppliancesTable: React.FC<DataTableProps<Appliance>> = ({ data }) => {
  // Group appliances by name
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
      applianceMap[appliance.name].quantity += 1;
      applianceMap[appliance.name].details.push(
        `${appliance.type} (${appliance.brand})`
      );
    });

    return Object.values(applianceMap);
  }, [data]);

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
              <Button size="sm" className="appliance-delete-button mx-2" onClick={() => handleDelete(row)}>
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

  const handleEdit = (row: ApplianceGroup) => {
    console.log("Edit clicked for:", row);
  };

  const handleDelete = (row: ApplianceGroup) => {
    console.log("Delete clicked for:", row);
  };

  return (
    <Container fluid>
      <div className="my-4">
        <Button size="lg" className="add-appliance-button">
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
    </Container>
  );
};

export default AppliancesTable;

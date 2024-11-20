import React, { useMemo, useState } from "react";
import { Card, Container, Button, Accordion } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { useParams } from "react-router-dom";
import { DATA_TABLE_DEFAULT_STYLE } from "../constants";
import useApi from "../hooks/useApi";
import { APPLIANCE_APIS } from "../constants/api-constants";
import AddAppliance from "./app.appliance";
import DeleteApplianceModal from "./delete.appliance";



interface AppliancesTableProps {
  initialData: DataTableProps<Appliance>["initialData"];
  setTriggerFetch: React.Dispatch<React.SetStateAction<number>>
}

const AppliancesTable: React.FC<AppliancesTableProps> = ({
  initialData,
  setTriggerFetch,
}) => {
  const { projectId } = useParams();

  const { postData: sendApplianceData } = useApi<GeneralAPIResponse>();
  const { deleteData: deleteApplianceData } = useApi<GeneralAPIResponse>();
  const [modalType, setModalType] = useState<"add" | "delete">("add");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<ApplianceGroup | null>(
    null
  );
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>([]);

  const handleDeleteModalShow = (group: ApplianceGroup) => {
    setModalType("delete");
    setSelectedGroup(group);
    setSelectedAppliances(
      initialData.filter((appliance) => appliance.name === group.name)
    );
    setIsModalOpen(true);
  };

  const handleAddModalShow = () => {
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentAppliance(null);
    setSelectedGroup(null);
    setSelectedAppliances([]);
  };

  const addAppliance = async (newAppliance: Appliance) => {
    try {
      const request: AddApplicanceRequest = {
        ...newAppliance,
        name: newAppliance.name,
        brand: newAppliance.brand,
        type: newAppliance.type,
        additionalInfo: newAppliance.additionalInfo,
        referenceUrl: newAppliance.referenceUrl,
      };

      const response = await sendApplianceData(
        `${APPLIANCE_APIS.ADD_APPLIANCE_API}/${projectId}/add`,
        request
      );

      if (!response.success) {
        throw new Error(`Error adding appliance: ${response.message}`);
      }

      setTriggerFetch((prev) => prev + 1);
      handleClose();
    } catch (error) {
      console.error("Error adding appliance: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      const request: DeleteAppliancesRequest = {
        applianceIds: selectedAppliances.map((appliance) => appliance.id!),
      };

      const response = await deleteApplianceData(
        APPLIANCE_APIS.DELETE_APPLIANCE_API,
        request
      );

      if (!response.success) {
        throw new Error(`Error deleting appliance: ${response.message}`);
      }

   
      setTriggerFetch((prev) => prev + 1);
      handleClose();
    } catch (error) {
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
        `${appliance.brand || "N/A"} - ${appliance.type || "N/A"}`
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
              onClick={() => handleDeleteModalShow(row)}
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
        <Button size="lg" className="add-appliance-button" onClick={handleAddModalShow}>
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

      {/* Modal */}
      {modalType === "add" ? (
        <AddAppliance
          show={isModalOpen}
          handleClose={handleClose}
          addAppliance={addAppliance}
          currentAppliance={currentAppliance}
        />
      ) : (
        <DeleteApplianceModal
        show={isModalOpen}
        onHide={handleClose}
        selectedGroup={selectedGroup}
        selectedAppliances={selectedAppliances}
        handleDelete={handleDelete}
      />
      )}
    </Container>
  );
};

export default AppliancesTable;

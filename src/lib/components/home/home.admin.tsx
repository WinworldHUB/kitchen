import { FC, useMemo } from "react";
import { Card, Container } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../../constants";
import { getProjectStatus } from "../../utils/color";
import { DUMMY_PROJECTS, projects } from "../../data/dummy_projects";

const HomeAdmin: FC = () => {
  const columns: TableColumn<DUMMY_PROJECTS>[] = useMemo(() => {
    return [
      {
        name: "Username",
        selector: (row) => row.userName,
        sortable: true,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Address",
        selector: (row) => row.address,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => {
          const { color } = getProjectStatus(row.status);
          return (
            <div
              className="fw-bold"
              style={{
                color: color,
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {row.status}
            </div>
          );
        },
        sortable: true,
      },
    ];
  }, []);

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={projects}
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

export default HomeAdmin;

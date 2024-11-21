import { FC, useEffect, useMemo, useState } from "react";
import { Card, Container } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE, PageRoutes } from "../../constants";
import { getProjectStatus } from "../../utils/color";
import { useNavigate } from "react-router-dom";
import { PROJECT_APIS } from "../../constants/api-constants";
import useApi from "../../hooks/useApi";
import { replaceProjectId } from "../../utils/replacer";

const HomeAdmin: FC = () => {
  const navigate = useNavigate();
  const { getData: fetchProjects, data: projectsData } =
    useApi<GetProjectsResponse>();
  const [tableData, setTableData] = useState<UserProject[]>([]);
  // Fetch projects on component load
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetchProjects(PROJECT_APIS.GET_PROJECTS_API);
        if (response.error) {
          console.error("Error fetching projects:", response.error);
          return;
        }
  
        // Transform API response into UserProject type and set table data
        const transformedData = response.projects.map((project) => ({
          id: project.id,
          title: project.title,
          address: project.address || "N/A", // Default value if address is missing
          userName: response.user, // Assuming the `user` field applies to all projects
          status: project.status.toString(),
        }));
        setTableData(transformedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjectsData();
  }, [fetchProjects]);
  

  const handleProjectClick = (projectId: string) => {
    // Retrieve the full project details from projectsData
    const selectedProject = projectsData?.projects.find(
      (project) => project.id === projectId
    );
    if (selectedProject) {
      const url = `${replaceProjectId(
        PageRoutes.Overview,
        selectedProject.id
      )}`;
      navigate(url, { state: { project: selectedProject } });
    } else {
      console.error("Project not found:", projectId);
    }
  };
  const columns: TableColumn<UserProject>[] = useMemo(() => {
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
            data={tableData}
            striped
            highlightOnHover
            pagination
            onRowClicked={(row) => handleProjectClick(row.id)}
            customStyles={DATA_TABLE_DEFAULT_STYLE}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomeAdmin;

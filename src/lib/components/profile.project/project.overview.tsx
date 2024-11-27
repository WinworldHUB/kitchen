import React, { useContext, useState } from "react";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import { ProjectStatus } from "../../constants";
import FlexBox from "../app.flex.box";
import { getProjectStatus } from "../../utils/color";
import { AppContext } from "../../contexts/appcontext";
import useApi from "../../hooks/useApi";
import { PROJECT_APIS } from "../../constants/api-constants";

interface ProjectOverviewProps {
  project: Project;
  user: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, user }) => {
  const { appState } = useContext(AppContext);
  const [status, setStatus] = useState<string>(project?.status ?? ProjectStatus.draft);
  const { putData: updateProjectStatus } = useApi<GeneralAPIResponse>();

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    await updateProjectStatus(
      `${PROJECT_APIS.UPDATE_PROJECT_STATUS_API}/${project.id}/update/status`,
      { status: newStatus }
    );
  };

  return (
    <>
      <Row className="my-2 p-4">
        <img
          src="/assets/images/kitch.jpg"
          alt="Project"
          height={500}
          className="w-100 p-0 rounded"
        />
        <Card className="mt-4 p-2">
          <Card.Body>
            <FlexBox justifyContent="between">
              <Col>
                <Card.Title className="fw-bold fs-3">{user ?? ""}</Card.Title>
                <Card.Text>{project?.title}</Card.Text>
                <Card.Text>{project?.address}</Card.Text>
              </Col>
              <Col className="d-flex justify-content-end">
                <Card.Text className="d-flex mb-2">
                  <span className="fw-semibold mx-2 mt-2">Project Status:</span>
                  {appState.isAdmin ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="border-0 rounded-pill px-4 fs-6"
                        style={{
                          backgroundColor:
                            getProjectStatus(status).backgroundColor,
                          color: getProjectStatus(status).color,
                        }}
                      >
                        {status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {Object.values(ProjectStatus).map((projectStatus) => (
                          <Dropdown.Item
                            key={projectStatus}
                            onClick={() => handleStatusChange(projectStatus)}
                            className="text-center"
                          >
                            {projectStatus}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <span
                      className="fs-6 border rounded-pill px-4 py-2"
                      style={{
                        backgroundColor: getProjectStatus(project?.status)
                          .backgroundColor,
                        color: getProjectStatus(project?.status).color,
                      }}
                    >
                      {project?.status}
                    </span>
                  )}
                </Card.Text>
              </Col>
            </FlexBox>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default ProjectOverview;

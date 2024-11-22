import React, { useContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ProjectStatus } from "../../constants";
import FlexBox from "../app.flex.box";
import { getProjectStatus } from "../../utils/color";
import { AppContext } from "../../contexts/appcontext";

interface ProjectOverviewProps {
  project: Project;
  user: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, user }) => {
  const { appState } = useContext(AppContext);
  const [status, setStatus] = useState<string>(project?.status ?? ProjectStatus.draft);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    console.log("Status changed to:", newStatus);
  };

  console.log("is admin: ",appState.isAdmin);
  

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
                <Card.Text className="mb-2">
                  <span className="fw-semibold">Project Status:</span>
                  {appState.isAdmin ? (
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      style={{
                        backgroundColor: getProjectStatus(status).backgroundColor,
                        color: getProjectStatus(status).color,
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "999px",
                        appearance: "none",
                      }}
                    >
                      {Object.values(ProjectStatus).map((projectStatus) => (
                        <option
                          key={projectStatus}
                          value={projectStatus}
                          style={{
                            backgroundColor: getProjectStatus(projectStatus).backgroundColor,
                            color: getProjectStatus(projectStatus).color,
                          }}
                        >
                          {projectStatus}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className="fs-6 border rounded-pill px-4 py-2 ms-2"
                      style={{
                        backgroundColor: getProjectStatus(status).backgroundColor,
                        color: getProjectStatus(status).color,
                      }}
                    >
                      {status}
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

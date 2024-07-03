import { useContext, useEffect, useState } from "react";
import PageLayout from "../lib/components/app.layout";
import { AppContext } from "../lib/contexts/appcontext";
import { getProjectById } from "../lib/utils/project.utils";
import { ProjectStatus } from "../lib/constants";
import { Col, Row } from "react-bootstrap";
import CreateProjectContainer from "../lib/components/create.project/create.project.container";

const ProjectProfilePage = () => {
  const { appState } = useContext(AppContext);

  const [project, setProject] = useState<Project>(null);

  useEffect(() => {
    setProject(
      getProjectById(appState.activeProjects, appState.selectedProjectId)
    );
  }, [appState.activeProjects, appState.selectedProjectId]);

  return (
    <PageLayout>
      {project?.status === ProjectStatus.draft ? (
        <Row className="justify-content-center">
          <Col sm="8">
            <CreateProjectContainer project={project} onCreate={() => {}} />
          </Col>
        </Row>
      ) : (
        appState.selectedProjectId
      )}
    </PageLayout>
  );
};

export default ProjectProfilePage;

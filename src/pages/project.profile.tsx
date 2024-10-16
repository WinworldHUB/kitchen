import { useContext, useState } from "react";
import PageLayout from "../lib/components/app.layout";
import { AppContext } from "../lib/contexts/appcontext";
import { getProjectById } from "../lib/utils/project.utils";
import { Col, Row } from "react-bootstrap";
import { PageRoutes, ProjectStatus } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import ProjectProfileSwitcher from "../lib/components/profile.project/profile.project.switcher";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";

const ProjectProfilePage = () => {
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const [project, setProject] = useState<Project>(
    getProjectById(appState.activeProjects, appState.selectedProjectId)
  );

  const updateProject = () => {
    const updatedProject = {
      ...project,
      status: ProjectStatus.designQuotation,
    };
    setProject(updatedProject);
    const activeProjects = (appState.activeProjects ?? []).map((project) =>
      project.id === project?.id ? updatedProject : project
    );

    updateAppState({ ...appState, activeProjects: activeProjects });
    navigate(PageRoutes.Home);
  };

  return (
    <ProfileProjectLayout>
      <Row className="justify-content-center">
        <Col sm="8">
          <ProjectProfileSwitcher
            project={project}
            onProjectUpdate={updateProject}
          />
        </Col>
      </Row>
    </ProfileProjectLayout>
  );
};

export default ProjectProfilePage;

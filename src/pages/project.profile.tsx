import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/contexts/appcontext";
import { getProjectById } from "../lib/utils/project.utils";
import { Row } from "react-bootstrap";
import { PageRoutes, ProjectStatus } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectOverview from "../lib/components/profile.project/project.overview";

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

  useEffect(() => {
    if (appState && appState.user_id === "101") {
      updateProject();
    }
  });

  return (
    <ProfileProjectLayout>
      <Row className="justify-content-center">
        <ProjectOverview project={project} />
      </Row>
    </ProfileProjectLayout>
  );
};

export default ProjectProfilePage;

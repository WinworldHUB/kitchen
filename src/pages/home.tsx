import { Button } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ProjectsGrid from "../lib/components/projects.grid";
import { useContext, useState } from "react";
import NewProjectModal from "../lib/components/new.project.modal";
import { NO_ACTIVE_PROJECTS_MESSAGE, PageRoutes } from "../lib/constants";
import { AppContext } from "../lib/contexts/appcontext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [isShowCreateProject, setIsShowCreateProject] =
    useState<boolean>(false);
  const { appState, updateAppState } = useContext(AppContext);

  const handleCreateProject = () => {
    setIsShowCreateProject(true);
  };

  const handleProjectClick = (projectId: string) => {
    updateAppState({ ...appState, selectedProjectId: projectId });
    navigate(PageRoutes.ProjectDetails);
  };

  return (
    <PageLayout>
      <CardSimple
        title="Active Projects"
        headerAction={
          <Button onClick={handleCreateProject}>Create Project</Button>
        }
      >
        <ProjectsGrid
          projects={appState.activeProjects ?? []}
          onProjectClick={handleProjectClick}
          emptyMessage={NO_ACTIVE_PROJECTS_MESSAGE}
        ></ProjectsGrid>
      </CardSimple>
      <NewProjectModal
        isShow={isShowCreateProject}
        onCloseClick={() => setIsShowCreateProject(false)}
        onCreateClick={(project) => {
          setIsShowCreateProject(false);
          updateAppState({
            ...appState,
            activeProjects: [...(appState.activeProjects ?? []), project],
          });
        }}
      />
    </PageLayout>
  );
};

export default HomePage;

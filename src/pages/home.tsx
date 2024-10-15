import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../lib/components/app.layout";
import ProjectsGrid from "../lib/components/projects.grid";
import NewProjectModal from "../lib/components/new.project.modal";
import { AppContext } from "../lib/contexts/appcontext";
import { NO_ACTIVE_PROJECTS_MESSAGE, PageRoutes } from "../lib/constants";
import FlexBox from "../lib/components/app.flex.box";

const HomePage = () => {
  const navigate = useNavigate();
  const [isShowCreateProject, setIsShowCreateProject] = useState(false);
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
      <FlexBox justifyContent="center" className="mx-auto">
        <ProjectsGrid
          projects={appState.activeProjects ?? []}
          onProjectClick={handleProjectClick}
          emptyMessage={NO_ACTIVE_PROJECTS_MESSAGE}
          onProjectCreate={handleCreateProject}
        />
      </FlexBox>
      <NewProjectModal
        isShow={isShowCreateProject}
        onCloseClick={() => setIsShowCreateProject(false)}
        onCreateClick={(newProject) => {
          const existingProjects = appState.activeProjects ?? [];
          const projectExists = existingProjects.some(
            (project) => project.id === newProject.id
          );

          if (!projectExists) {
            updateAppState({
              ...appState,
              activeProjects: [...existingProjects, newProject],
            });
            setIsShowCreateProject(false);
          } else {
            alert("Project already exists!");
          }
        }}
      />
    </PageLayout>
  );
};

export default HomePage;

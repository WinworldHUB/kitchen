import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../lib/components/app.layout";
import ProjectsGrid from "../lib/components/projects.grid";
import NewProjectModal from "../lib/components/new.project.modal";
import { AppContext } from "../lib/contexts/appcontext";
import { NO_ACTIVE_PROJECTS_MESSAGE, PageRoutes } from "../lib/constants";
import { PROJECT_APIS } from "../lib/constants/api-constants";
import FlexBox from "../lib/components/app.flex.box";
import { replaceProjectId } from "../lib/utils/replacer";
import useApi from "../lib/hooks/useApi";

const HomePage = () => {
  const navigate = useNavigate();
  const [isShowCreateProject, setIsShowCreateProject] = useState(false);
  const { appState, updateAppState } = useContext(AppContext);

  const { getData: fetchProjects } = useApi<GetProjectResponse>();

  // Fetch projects on component load
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects(PROJECT_APIS.GET_PROJECTS_API);
        updateAppState({ ...appState, activeProjects: response.projects });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    loadProjects();
  }, [updateAppState]);

  const handleCreateProject = () => {
    setIsShowCreateProject(true);
  };

  const handleProjectClick = (projectId: string) => {
    updateAppState({ ...appState, selectedProjectId: projectId });
    const url = `${replaceProjectId(PageRoutes.Overview, projectId)}`;
    navigate(url);
  };
  console.log(appState.activeProjects);
  
  return (
    <PageLayout>
      <FlexBox justifyContent="start">
        <ProjectsGrid
          projects={appState?.activeProjects ?? []}
          onProjectClick={handleProjectClick}
          emptyMessage={NO_ACTIVE_PROJECTS_MESSAGE}
          onProjectCreate={handleCreateProject}
        />
      </FlexBox>
      <NewProjectModal
        isShow={isShowCreateProject}
        onCloseClick={() => setIsShowCreateProject(false)}
      />
    </PageLayout>
  );
};

export default HomePage;

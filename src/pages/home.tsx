import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../lib/components/app.layout";
import ProjectsGrid from "../lib/components/projects.grid";
import NewProjectModal from "../lib/components/new.project.modal";
import { NO_ACTIVE_PROJECTS_MESSAGE, PageRoutes } from "../lib/constants";
import { PROJECT_APIS } from "../lib/constants/api-constants";
import FlexBox from "../lib/components/app.flex.box";
import { replaceProjectId } from "../lib/utils/replacer";
import useApi from "../lib/hooks/useApi";




const HomePage = () => {
  const navigate = useNavigate();
  const [isShowCreateProject, setIsShowCreateProject] = useState(false);
  const { getData: fetchProjects, data: projectsData } = useApi<GetProjectsResponse>();

  // Fetch projects on component load
  useEffect(() => {
    fetchProjects(PROJECT_APIS.GET_PROJECTS_API).catch((error) => {
      console.error("Error fetching projects:", error);
    });
  }, []);

  const handleCreateProject = () => {
    setIsShowCreateProject(true);
  };

  const handleProjectClick = (projectId: string) => {
    // Retrieve the full project details from projectsData
    const selectedProject = projectsData?.projects.find((project) => project.id === projectId);
    if (selectedProject) {
      const url = `${replaceProjectId(PageRoutes.Overview, selectedProject.id)}`;
      navigate(url, { state: { project: selectedProject } });
    } else {
      console.error("Project not found:", projectId);
    }
  };

  return (
    <PageLayout>
      <FlexBox justifyContent="start">
        <ProjectsGrid
          projects={projectsData?.projects ?? []}
          onProjectClick={handleProjectClick} // Match the expected type
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


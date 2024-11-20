import React, { useEffect, useState } from "react";
import { NO_ACTIVE_PROJECTS_MESSAGE, PageRoutes } from "../../constants";
import FlexBox from "../app.flex.box";
import NewProjectModal from "../new.project.modal";
import ProjectsGrid from "../projects.grid";
import { useNavigate } from "react-router-dom";
import { PROJECT_APIS } from "../../constants/api-constants";
import useApi from "../../hooks/useApi";
import { replaceProjectId } from "../../utils/replacer";

const HomeUser = () => {
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
    <>
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
    </>
  );
};

export default HomeUser;

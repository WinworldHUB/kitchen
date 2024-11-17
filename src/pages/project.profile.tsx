import { useEffect } from "react";
import { Row } from "react-bootstrap";

import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectOverview from "../lib/components/profile.project/project.overview";
import useApi from "../lib/hooks/useApi";
import { PROJECT_APIS } from "../lib/constants/api-constants";
import useLocalStorage from "../lib/hooks/useLocalStorage";

const ProjectProfilePage = () => {
  const { getValue } = useLocalStorage();
  const { getData: fetchProjects, data: projectData } =
    useApi<GetProjectResponse>();

  useEffect(() => {
    const projectId = getValue("activeProjectId");
    if (projectId) {
      fetchProjects(`${PROJECT_APIS.GET_PROJECT_BY_ID_API}/${projectId}`);
    }
  }, []);

  console.log(projectData);

  return (
    <ProfileProjectLayout>
      <Row className="justify-content-center">
        <ProjectOverview
          project={projectData?.project}
          user={projectData?.user}
        />
      </Row>
    </ProfileProjectLayout>
  );
};

export default ProjectProfilePage;

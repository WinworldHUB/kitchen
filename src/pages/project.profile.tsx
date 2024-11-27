import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectOverview from "../lib/components/profile.project/project.overview";
import useApi from "../lib/hooks/useApi";
import { PROJECT_APIS } from "../lib/constants/api-constants";
import { useParams } from "react-router-dom";
import Loader from "../lib/components/Loader";

const ProjectProfilePage = () => {
  const { projectId } = useParams();
  const { getData: fetchProjects, data: projectData } =
    useApi<GetProjectResponse>();
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    setLoading(true);
    const fetchProjectData = async () => {
      if (projectId) {
        const response = await fetchProjects(`${PROJECT_APIS.GET_PROJECT_BY_ID_API}/${projectId}`);
        if (response.error) {
          console.error("Error fetching project:", response.error);
        }
        setLoading(false);
      }
    }
    fetchProjectData();
  }, []);

  if (loading) {
    return <Loader/>;
  }

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

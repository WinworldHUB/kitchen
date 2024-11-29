import ProjectContractor from "../lib/components/project.contractor/project.contractor";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import { useEffect, useState } from "react";
import useApi from "../lib/hooks/useApi";
import { CONTRACTOR_APIS } from "../lib/constants/api-constants";
import { Loader } from "react-bootstrap-typeahead";
import { useParams } from "react-router-dom";

const ProjectContractorPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { projectId } = useParams();
  const { getData: fetchContractors, data: contractorsData } =
    useApi<GetContractorsResponse>();
  useEffect(() => {
    const getContractors = async () => {
      setLoading(true);
      try {
        const response = await fetchContractors(
          `${CONTRACTOR_APIS.GET_CONTRACTORS_API}/${projectId}`
        );

        if (response?.error) {
          console.error("Error fetching contractors:", response.error);
        }

        console.log("Contractors Fetched:", response.contractors);
      } catch (error) {
        console.error("Error fetching contractors:", error);
      } finally {
        setLoading(false);
      }
    };
    getContractors();
  }, [projectId]);
  if (loading) {
    return <Loader />;
  }

  return (
    <ProfileProjectLayout>
      <ProjectContractor
        contractors={contractorsData?.contractors ?? []}
        projectId={projectId}
      />
    </ProfileProjectLayout>
  );
};

export default ProjectContractorPage;

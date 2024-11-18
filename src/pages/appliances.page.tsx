import React, { useEffect } from "react";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import AppliancesTable from "../lib/appliances/appliances.table";

import { APPLIANCE_APIS } from "../lib/constants/api-constants";
import useApi from "../lib/hooks/useApi";
import { useParams } from "react-router-dom";

const AppliancesPage = () => {
  const { projectId } = useParams();

  const {
    getData: getAppliances,
    data: applianceData,
  } = useApi<GetProjectAppliancesResponse>();
  useEffect(() => {
    const fetchApplicances = async () => {
      try {
        const response =  await getAppliances(`${APPLIANCE_APIS.GET_APPLIANCES_API}/${projectId}`);
        if (response.error){
          console.error("Error fetching appliances", response.error);
        }
        
      } catch (error) {
        console.error("Error fetching appliances", error);
      }
    };
    fetchApplicances();
  }, []);
  return (
      <ProfileProjectLayout>
        <AppliancesTable initialData={applianceData?.appliances}/>
      </ProfileProjectLayout>
  );
};

export default AppliancesPage;

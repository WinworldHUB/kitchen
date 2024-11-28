import React, { useEffect, useState } from "react";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectReport from "../lib/components/project.report/project.report";
import { useParams } from "react-router-dom";
import { LOG_APIS } from "../lib/constants/api-constants";
import useApi from "../lib/hooks/useApi";

const ProjectReportPage = () => {
  const { projectId } = useParams();

  const [triggerFetch, setTriggerFetch] = useState<number>(0);
  const { getData: getTimelineData, data: timelineData } =
    useApi<GetTimelineResponse>();

  useEffect(() => {
    const fetchTimelineData = async () => {
      const response = await getTimelineData(
        `${LOG_APIS.GET_PAYMENTS_API}/${projectId}`
      );
      if (response?.error) {
        console.log("Error fetching timeline data");
      } else if (response?.logs) {
      }
    };
    fetchTimelineData();
  }, [projectId, triggerFetch]);

  return (
    <ProfileProjectLayout>
      <ProjectReport
        timelineData={timelineData?.logs}
        setTriggerFetch={setTriggerFetch}
        activeLog={timelineData?.activeLog}
      />
    </ProfileProjectLayout>
  );
};

export default ProjectReportPage;

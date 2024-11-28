import React, { useEffect, useState } from "react";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectReport from "../lib/components/project.report/project.report";
import { useParams } from "react-router-dom";
import { LOG_APIS } from "../lib/constants/api-constants";
import useApi from "../lib/hooks/useApi";
import { DateTime } from "luxon";

const ProjectReportPage = () => {
  const { projectId } = useParams();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [triggerFetch, setTriggerFetch] = useState<number>(0);
  const { getData: getTimelineData, data: timelineData } =
    useApi<GetTimelineResponse>();
 




useEffect(() => {
  const fetchTimelineData = async () => {
    const response = await getTimelineData(`${LOG_APIS.GET_PAYMENTS_API}/${projectId}`);
    if (response?.error) {
      console.log("Error fetching timeline data");
    } else if (response?.logs) {
      // Get today's date in the format matching logs
      const today = DateTime.now().toFormat("d MMM yyyy");

      // Find the index of the log with today's date
      const index = response.logs.findIndex((log) => log.date === today);
      setActiveIndex(index); // If no match, index will be -1
    }
  };
  fetchTimelineData();
}, [projectId, triggerFetch]);



  

  return (
    <ProfileProjectLayout>
      <ProjectReport
        timelineData={timelineData?.logs}
        setTriggerFetch={setTriggerFetch}
        activeIndex={activeIndex}
      />
    </ProfileProjectLayout>
  );
};

export default ProjectReportPage;

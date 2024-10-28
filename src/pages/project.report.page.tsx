import React from "react";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import ProjectReport from "../lib/components/project.report/project.report";

const ProjectReportPage = () => {
  return (
    <ProfileProjectLayout>
      <h1>Project Report</h1>
      <ProjectReport />
    </ProfileProjectLayout>
  );
};

export default ProjectReportPage;

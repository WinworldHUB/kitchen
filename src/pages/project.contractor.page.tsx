import React from "react";

import ProjectContractor from "../lib/components/project.contractor/project.contractor";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";

const ProjectContractorPage = () => {
  return (
    <ProfileProjectLayout>
      <ProjectContractor />
    </ProfileProjectLayout>
  );
};

export default ProjectContractorPage;

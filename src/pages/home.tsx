import { Button } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ProjectsGrid from "../lib/components/projects.grid";
import { useState } from "react";
import NewProjectModal from "../lib/components/new.project.modal";
import { NO_ACTIVE_PROJECTS_MESSAGE } from "../lib/constants";

const HomePage = () => {
  const [isShowCreateProject, setIsShowCreateProject] =
    useState<boolean>(false);
  const [projects, updateProjects] = useState<Project[]>([]);

  const handleCreateProject = () => {
    setIsShowCreateProject(true);
  };

  return (
    <PageLayout>
      <CardSimple
        title="Active Projects"
        headerAction={
          <Button onClick={handleCreateProject}>Create Project</Button>
        }
      >
        <ProjectsGrid
          projects={projects}
          onProjectClick={() => {}}
          emptyMessage={NO_ACTIVE_PROJECTS_MESSAGE}
        ></ProjectsGrid>
      </CardSimple>
      <NewProjectModal
        isShow={isShowCreateProject}
        onCloseClick={() => setIsShowCreateProject(false)}
        onCreateClick={(project) => {
          setIsShowCreateProject(false);
          updateProjects([...projects, project]);
        }}
      />
    </PageLayout>
  );
};

export default HomePage;

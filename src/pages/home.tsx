import { Button } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ProjectsGrid from "../lib/components/projects.grid";
import { useContext, useMemo, useState } from "react";
import NewProjectModal from "../lib/components/new.project.modal";
import {
  NO_ACTIVE_PROJECTS_MESSAGE,
  PageRoutes,
  PROJECT_FILTERS,
} from "../lib/constants";
import { AppContext } from "../lib/contexts/appcontext";
import { useNavigate } from "react-router-dom";
import ProjectFilters from "../lib/components/projects.filters";
import FlexBox from "../lib/components/app.flex.box";

const HomePage = () => {
  const navigate = useNavigate();
  const [isShowCreateProject, setIsShowCreateProject] =
    useState<boolean>(false);
  const { appState, updateAppState } = useContext(AppContext);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState<number>(0);

  const handleCreateProject = () => {
    setIsShowCreateProject(true);
  };

  const handleProjectClick = (projectId: string) => {
    updateAppState({ ...appState, selectedProjectId: projectId });
    navigate(PageRoutes.ProjectDetails);
  };

  const filteredProjects = useMemo(
    () =>
      (appState.activeProjects ?? []).filter(
        (project) =>
          project.status === PROJECT_FILTERS[selectedFilterIndex].value
      ),
    [appState.activeProjects, selectedFilterIndex]
  );

  return (
    <PageLayout>
      <CardSimple
        title="Active Projects"
        headerAction={
          <FlexBox>
            <ProjectFilters onChange={setSelectedFilterIndex} />
            <Button className="w-content ms-sm-3" onClick={handleCreateProject}>
              Create Project
            </Button>
          </FlexBox>
        }
      >
        <ProjectsGrid
          projects={filteredProjects ?? []}
          onProjectClick={handleProjectClick}
          emptyMessage={NO_ACTIVE_PROJECTS_MESSAGE}
        ></ProjectsGrid>
      </CardSimple>
      <NewProjectModal
        isShow={isShowCreateProject}
        onCloseClick={() => setIsShowCreateProject(false)}
        onCreateClick={(project) => {
          setIsShowCreateProject(false);
          updateAppState({
            ...appState,
            activeProjects: [...(appState.activeProjects ?? []), project],
          });
        }}
      />
    </PageLayout>
  );
};

export default HomePage;

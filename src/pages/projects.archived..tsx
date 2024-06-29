import { useEffect, useMemo, useState } from "react";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ProjectsGrid from "../lib/components/projects.grid";
import { NO_ARCHIVED_PROJECTS_MESSAGE } from "../lib/constants";
import { Form } from "react-bootstrap";
import { dummyProjects, filterProjects } from "../lib/utils/project.utils";

const ArchivedProjectsPage = () => {
  const [projects, updateProjects] = useState<Project[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const filteredProjects = useMemo(
    () => filterProjects(projects, filterText),
    [filterText, projects]
  );
  useEffect(() => updateProjects(dummyProjects()), []);

  return (
    <PageLayout>
      <CardSimple
        title="Archived Projects"
        headerAction={
          <Form.Group controlId="archivedProjectsForm.searchProjects">
            <Form.Control
              type="text"
              placeholder="Search projects"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Form.Group>
        }
      >
        <ProjectsGrid
          projects={filteredProjects}
          onProjectClick={() => {}}
          emptyMessage={NO_ARCHIVED_PROJECTS_MESSAGE}
        ></ProjectsGrid>
      </CardSimple>
    </PageLayout>
  );
};

export default ArchivedProjectsPage;

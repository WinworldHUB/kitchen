import { Button } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ProjectsGrid from "../lib/components/projects.grid";
import { DEFAULT_KITCHEN_IMAGE } from "../lib/constants";

const Projects: Project[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Test Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    featuredImage: DEFAULT_KITCHEN_IMAGE,
  },
];

const HomePage = () => {
  return (
    <PageLayout>
      <CardSimple
        title="All Projects"
        headerAction={<Button>Create Project</Button>}
      >
        <ProjectsGrid
          projects={Projects}
          onProjectClick={() => {}}
        ></ProjectsGrid>
      </CardSimple>
    </PageLayout>
  );
};

export default HomePage;

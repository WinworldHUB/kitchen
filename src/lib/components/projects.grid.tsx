import { FC, useMemo } from "react";
import ProjectTile from "./projects.tile";
import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import FlexBox from "./app.flex.box";

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  emptyMessage: string;
  onProjectCreate: VoidFunction;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
  projects,
  onProjectClick,
  emptyMessage,
  onProjectCreate,
}) => {
  // Memoize project tiles to prevent unnecessary re-renders
  const projectTiles = useMemo(() => (
    projects.map((project) => (
      <div key={project.id} className="mx-4 mb-4" style={{ width: '300px' }}>
        <ProjectTile
          project={project}
          onClick={() => onProjectClick(project.id)}
        />
      </div>
    ))
  ), [projects, onProjectClick]);

  return (
    <div className="d-flex flex-wrap align-items-start justify-content-start">
      {/* Create New Project Button */}
      <div className="mx-4 mb-4">
        <Button
          onClick={onProjectCreate}
          style={{
            width: "300px",
            height: "320px",
            backgroundColor: "#007bff",
            borderRadius: "8px",
          }}
        >
          <FlexBox justifyContent="center" className="flex-column">
            <BsPlusLg size={132} />
            <span className="text-white m-4">Create New Project</span>
          </FlexBox>
        </Button>
      </div>

      {projects.length > 0 && (
        projectTiles
      )}
    </div>
  );
};

export default ProjectsGrid;

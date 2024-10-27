import { FC, useMemo } from "react";
import ProjectTile from "./projects.tile";
import CreateProjectButton from "./create.project/create.project.button";

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
      <div key={project.id} className="mx-4 mb-4 d-flex" style={{ width: '350px' }}>
        <ProjectTile
          project={project}
          onClick={() => onProjectClick(project.id)}
        />
      </div>
    ))
  ), [projects, onProjectClick]);

  return (
    <div className="d-flex flex-wrap align-items-start justify-content-start mx-auto">
      {/* Create New Project Button */}
      <CreateProjectButton onProjectCreate={onProjectCreate} />
      {projects.length > 0 && (
        projectTiles
      )}
    </div>
  );
};

export default ProjectsGrid;

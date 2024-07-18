import { FC } from "react";
import { Form } from "react-bootstrap";
import { PROJECT_FILTERS } from "../constants";

interface ProjectFiltersProps {
  onChange: (index: number) => void;
}

const ProjectFilters: FC<ProjectFiltersProps> = ({ onChange }) => {
  return (
    <Form.Select onChange={(e) => onChange(e.target.selectedIndex)}>
      <option value={-1}>All</option>
      {PROJECT_FILTERS.map((filter, index) => (
        <option value={filter.value} key={filter.value}>
          {filter.title}
        </option>
      ))}
    </Form.Select>
  );
};

export default ProjectFilters;

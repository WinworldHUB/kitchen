import { FC } from "react";
import { Form } from "react-bootstrap";
import { PROJECT_FILTERS } from "../constants";

interface ProjectFiltersProps {
  onChange: (index: number) => void;
}

const ProjectFilters: FC<ProjectFiltersProps> = ({ onChange }) => {
  return (
    <Form.Select onChange={(e) => onChange(e.target.selectedIndex)}>
      {PROJECT_FILTERS.map((filter, index) => (
        <option value={index} key={filter}>
          {filter}
        </option>
      ))}
    </Form.Select>
  );
};

export default ProjectFilters;

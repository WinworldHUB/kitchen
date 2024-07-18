import { FC } from "react";
import { Button } from "react-bootstrap";

interface ProjectStatusToolTipProps {
  currentStatus: string;
}

const ProjectStatusToolTip: FC<ProjectStatusToolTipProps> = ({
  currentStatus,
}) => {
  return <Button variant="light">Simple tooltip</Button>;
};

export default ProjectStatusToolTip;

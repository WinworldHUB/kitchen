import React from "react";
import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import FlexBox from "../app.flex.box";

interface CreateProjectButtonProps {
  onProjectCreate: VoidFunction;
}

const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({
  onProjectCreate,
}) => {
  return (
    <div className="mx-4 mb-4 d-flex">
      <Button
        onClick={onProjectCreate}
        style={{
          width: "350px",
          height: "350px",
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
  );
};

export default CreateProjectButton;

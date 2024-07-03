import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface SwitchCheckProps {
  id?: string;
  valueTitles?: string[];
  defaultState?: boolean;
  onSwitch: (isTrue: boolean) => void;
}

const SwitchCheck: FC<SwitchCheckProps> = ({
  id,
  defaultState,
  onSwitch,
  valueTitles = ["Yes", "No"],
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultState ?? false);
  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onSwitch(checked);
  };
  return (
    <Form.Check // prettier-ignore
      type="switch"
      id={`${id ?? uuidv4()}`}
      label={isChecked ? valueTitles[0] : valueTitles[1]}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
};

export default SwitchCheck;

import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface SwitchCheckProps {
  id?: string;
  defaultState?: boolean;
  onSwitch: (isTrue: boolean) => void;
}

const SwitchCheck: FC<SwitchCheckProps> = ({ id, defaultState, onSwitch }) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultState ?? false);
  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onSwitch(checked);
  };
  return (
    <Form.Check // prettier-ignore
      type="switch"
      id={`${id ?? uuidv4()}`}
      label={isChecked ? "Yes" : "No"}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
};

export default SwitchCheck;

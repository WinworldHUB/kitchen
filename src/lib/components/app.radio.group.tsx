import { FC } from "react";
import { Form } from "react-bootstrap";

interface RadioGroupProps {
  options: string[];
  onChange: (option?: string) => void;
  id: string;
}

const RadioGroup: FC<RadioGroupProps> = ({ options, onChange, id }) => {
  return (
    <div>
      {(options ?? []).map((option, index) => (
        <Form.Check
          inline
          label={option}
          name={id}
          type="radio"
          id={`${id}-${index}`}
          key={option}
          onClick={() => {
            onChange(option);
          }}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

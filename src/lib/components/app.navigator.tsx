import { FC } from "react";
import { Button } from "react-bootstrap";

interface NavigatorButtonsProps {
  onPreviousClick: VoidFunction;
  onNextClick: VoidFunction;
}

const NavigatorButtons: FC<NavigatorButtonsProps> = ({
  onPreviousClick,
  onNextClick,
}) => {
  return (
    <div className="d-flex justify-content-between align-item-center">
      <Button variant="outline-primary" onClick={onPreviousClick}>
        Previous
      </Button>
      <Button onClick={onNextClick}>Next</Button>
    </div>
  );
};

export default NavigatorButtons;

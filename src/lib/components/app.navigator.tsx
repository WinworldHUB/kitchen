import { FC } from "react";
import { Button } from "react-bootstrap";

interface NavigatorButtonsProps {
  buttonTitles?: string[];
  onPreviousClick: VoidFunction;
  onNextClick: VoidFunction;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

const NavigatorButtons: FC<NavigatorButtonsProps> = ({
  buttonTitles = ["Previous", "Next"],
  isFirstPage = false,
  isLastPage = false,
  onPreviousClick,
  onNextClick,
}) => {
  return (
    <div className="d-flex justify-content-between align-item-center">
      <Button
        variant="outline-primary"
        onClick={onPreviousClick}
        disabled={isFirstPage}
      >
        {buttonTitles[0]}
      </Button>
      <Button onClick={onNextClick} disabled={isLastPage}>
        {buttonTitles[1]}
      </Button>
    </div>
  );
};

export default NavigatorButtons;

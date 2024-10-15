import { FC } from "react";

interface FlexBoxProps extends ComponentProps {
  justifyContent?: string;
  direction?: string;
}

const FlexBox: FC<FlexBoxProps> = ({
  children,
  className,
  justifyContent = "between",
}) => (
  <div
    className={`d-sm-flex align-items-center justify-content-${justifyContent} ${className}`}
  >
    {children}
  </div>
);

export default FlexBox;

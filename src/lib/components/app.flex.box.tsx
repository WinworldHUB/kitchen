import { FC } from "react";

const FlexBox: FC<ComponentProps> = ({ children, className }) => (
  <div
    className={`d-flex justify-content-between align-items-center ${className}`}
  >
    {children}
  </div>
);

export default FlexBox;

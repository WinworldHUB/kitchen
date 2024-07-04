import React, { FC } from "react";
import { Card } from "react-bootstrap";

interface SimpleCardProps extends ComponentProps {
  title?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  variant?: string;
  noShadow?: boolean;
}

const CardSimple: FC<SimpleCardProps> = ({
  title,
  children,
  footer,
  headerAction,
  className,
  variant = "warning",
  noShadow = false,
}) => {
  return (
    <Card className={!noShadow && "shadow"}>
      {title && (
        <Card.Header
          className={`d-sm-flex justify-content-between align-items-center bg-${variant}`}
        >
          <p className="card-title">{title}</p>
          {headerAction}
        </Card.Header>
      )}
      {children && <Card.Body className={className}>{children}</Card.Body>}
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
};

export default CardSimple;

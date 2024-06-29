import React, { FC } from "react";
import { Card } from "react-bootstrap";

interface SimpleCardProps extends ComponentProps {
  title?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

const CardSimple: FC<SimpleCardProps> = ({
  title,
  children,
  footer,
  headerAction,
}) => {
  return (
    <Card className="shadow">
      {title && (
        <Card.Header className="bg-warning d-flex justify-content-between align-items-center">
          <p className="card-title">{title}</p>
          {headerAction}
        </Card.Header>
      )}
      {children && <Card.Body>{children}</Card.Body>}
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
};

export default CardSimple;

import React, { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";

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
        <Card.Header className="bg-wishLight">
          <Row className="align-items-center">
            <Col>
              <p className="card-title">{title}</p>
            </Col>
            {headerAction && (
              <Col xs="auto" className="text-end">
                {headerAction}
              </Col>
            )}
          </Row>
        </Card.Header>
      )}
      {children && <Card.Body>{children}</Card.Body>}
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
};

export default CardSimple;

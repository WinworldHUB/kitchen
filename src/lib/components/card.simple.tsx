import React, { FC } from "react";
import { Card, Col } from "react-bootstrap";
import FormFieldError from "./form.field.error";

interface SimpleCardProps extends ComponentProps {
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
  error?: string;
  headerAction?: React.ReactNode;
  variant?: string;
  noShadow?: boolean;
  isAuth?: boolean;
}

const CardSimple: FC<SimpleCardProps> = ({
  title,
  children,
  subTitle,
  footer,
  error,
  headerAction,
  className,
  variant = "warning",
  noShadow = false,
  isAuth = false,
}) => {
  return (
    <Card className={!noShadow && "shadow"}>
      {title && (
        <Card.Header
          className={`d-sm-flex ${
            isAuth ? "justify-content-center" : "justify-content-between"
          } align-items-center bg-${variant}`}
        >
          <Col className="text-center">
            <p className="fs-2 fw-semibold m-0 text-center">{title}</p>
            {subTitle && <p className="fs-6 m-0 card-title">{subTitle}</p>}
          </Col>
          {headerAction}
        </Card.Header>
      )}
      {children && <Card.Body className={className}>{children}</Card.Body>}
      {(footer || error) && (
        <Card.Footer className={isAuth ? `d-flex justify-content-center` : ""}>
          {footer ? (
            <div className="my-2">{footer}</div>
          ) : (
            <FormFieldError error={error} />
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default CardSimple;

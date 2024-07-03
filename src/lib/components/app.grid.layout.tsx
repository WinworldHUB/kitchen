import { FC } from "react";
import { Col, Row } from "react-bootstrap";

interface GridLayoutProps extends ComponentProps {
  cols: number;
  children: React.ReactNode[];
}

const GridLayout: FC<GridLayoutProps> = ({ children, className, cols }) => {
  const colWidth = Math.ceil(12 / cols);
  return (
    <Row className={className}>
      {(children ?? []).map((child, index) => (
        <Col key={index} sm={colWidth}>
          {child}
        </Col>
      ))}
    </Row>
  );
};

export default GridLayout;

import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

const ChangePasswordForm: FC = () => {
  return (
    <Form>
      <Form.Group>
        <Row className="d-flex align-items-center gy-3">
          <Col xs="4">
            <Form.Label>Current Password:</Form.Label>
          </Col>
          <Col xs="8">
            <Form.Control type="text" />
          </Col>
          <Col xs="4">
            <Form.Label>New Password:</Form.Label>
          </Col>
          <Col xs="8">
            <Form.Control type="text" />
          </Col>
          <Col xs="4">
            <Form.Label>Confirm Password:</Form.Label>
          </Col>
          <Col xs="8">
            <Form.Control type="text" />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default ChangePasswordForm;

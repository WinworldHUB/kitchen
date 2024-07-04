import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

const ChangePasswordForm: FC = () => {
  return (
    <Form>
      <Form.Group>
        <Row className="d-flex align-items-center gy-sm-3">
          <Col sm="4">
            <Form.Label>Current Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
          <Col sm="4">
            <Form.Label>New Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
          <Col sm="4">
            <Form.Label>Confirm Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default ChangePasswordForm;

import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

const UserProfileUpdateForm: FC = () => {
  return (
    <Form>
      <Form.Group>
        <Row className="d-flex align-items-center gy-sm-3">
          <Col sm="4">
            <Form.Label>Full name</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
          <Col sm="4">
            <Form.Label>Address</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
          <Col sm="4">
            <Form.Label>Phone:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
          <Col sm="4">
            <Form.Label>Email:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control type="text" disabled />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default UserProfileUpdateForm;

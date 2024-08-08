import { FC, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import { DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE } from "../../constants";

const ChangePasswordForm: FC = () => {
  const { getValue: getUserState } = useLocalStorage<User>();

  const [formData, setFormData] = useState<ResetPasswordRequest>({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const user = getUserState(DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE);
  if (!user) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <Form>
      <Form.Group>
        <Row className="d-flex align-items-center gy-sm-3">
          <Col sm="4">
            <Form.Label>Current Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="text"
              value={formData.oldPassword}
              onChange={handleChange}
              name="oldPassword"
            />
          </Col>
          <Col sm="4">
            <Form.Label>New Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="text"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
          </Col>
          <Col sm="4">
            <Form.Label>Confirm Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="text"
              value={formData.newPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default ChangePasswordForm;

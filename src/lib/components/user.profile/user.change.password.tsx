import { FC, useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import { DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE } from "../../constants";
import useApi from "../../hooks/useApi";
import FlexBox from "../app.flex.box";
import { USER_APIS } from "../../constants/api-constants";

const ChangePasswordForm: FC = () => {
  const { getValue: getUserState } = useLocalStorage<User>();
  const { postData: resetPassword } = useApi<GeneralAPIResponse>();

  const [formData, setFormData] = useState<ResetPasswordRequest>({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<unknown>("");
  const [success, setSuccess] = useState("");

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

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form data
    if (formData.newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const payload: ResetPasswordRequest = {
        email: user.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      const response = await resetPassword(
        USER_APIS.CHANGE_PASSWORD_API,
        payload
      );

      if (response.error) {
        setError(response.error);
      }
      if (response.success === true) {
        setSuccess("Password updated successfully!");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error as string}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group>
        <Row className="d-flex align-items-center gy-sm-3">
          <Col sm="4">
            <Form.Label>Current Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              name="oldPassword"
              required
            />
          </Col>
          <Col sm="4">
            <Form.Label>New Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
              required
            />
          </Col>
          <Col sm="4">
            <Form.Label>Confirm Password:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </Form.Group>
      <FlexBox justifyContent="end" className="mt-4">
        <Button variant="primary" type="submit">
          Update Password
        </Button>
      </FlexBox>
    </Form>
  );
};

export default ChangePasswordForm;

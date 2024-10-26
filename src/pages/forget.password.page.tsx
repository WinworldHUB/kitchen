import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CardSimple from "../lib/components/card.simple";
import { Formik } from "formik";
import FormFieldError from "../lib/components/form.field.error";
import { FORGOT_PASSWORD_VALIDATION_SCHEME } from "../lib/constants/validation-constants";
// import { USER_APIS } from "../lib/constants/api-constants";
// import useApi from "../lib/hooks/useApi";
import { useState } from "react";

const DEFAULT_FORGOT_PASSWORD_VALUES: ForgotPasswordRequest = {
  email: "",
};

const ForgotPasswordPage = () => {
  //   const { postData: sendForgetPasswordRequest } = useApi<ForgotPasswordResponse>();
  const [error, setError] = useState<string | null>(null);

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md="8" lg="6" xl="4">
          <CardSimple
            title="
Forgotten your password?"
            subTitle="There is nothing to worry about, we'll send you a message to help you reset your password."
            error={error ?? ""}
            variant="light"
            isAuth
          >
            <Formik
              initialValues={DEFAULT_FORGOT_PASSWORD_VALUES}
              validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEME}
              onSubmit={async (values: ForgotPasswordRequest, { setSubmitting }) => {
                try {
                  alert("This is a placeholder for the actual API call");
                } catch (error) {
                  console.error("Error signing in:", error);
                  setError("Error signing in. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="signInForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter personal or work email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormFieldError
                      error={errors.email && touched.email && errors.email}
                    />
                  </Form.Group>

                  <Row className="mx-2">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                        Send Reset Link
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardSimple>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;

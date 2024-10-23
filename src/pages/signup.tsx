import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";
import useAuthentication from "../lib/hooks/useAuthentication";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";

import { Formik } from "formik";
import FormFieldError from "../lib/components/form.field.error";
import { SIGN_IN_VALIDATION_SCHEME } from "../lib/constants/validation-constants";
import { useState } from "react";

const DEFAULT_SIGN_UP_VALUES: SignUpRequest = {
  fullName: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { signInUser } = useAuthentication();
  const { postData: sendSignupData } = useApi<SignUpResponse>();
  const footer = (
    <div>
      Already registered?{" "}
      <Link to={PageRoutes.Login}>
        <span style={{ color: "blue" }}>Sign In</span>
      </Link>
    </div>
  );

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md="8" lg="6" xl="4">
          <CardSimple
            title="Sign Up For Free"
            error={error ?? ""}
            variant="light"
            footer={footer}
            isAuth
          >
            <Formik
              initialValues={DEFAULT_SIGN_UP_VALUES}
              validationSchema={SIGN_IN_VALIDATION_SCHEME}
              onSubmit={async (values: SignUpRequest, { setSubmitting }) => {
                try {
                  // Send the encrypted data to the API
                  const response = await sendSignupData(
                    USER_APIS.SIGNUP_USER_API,
                    {
                      fullName: values.fullName,
                      email: values.email,
                      password: values.password,
                    }
                  );

                  // Handle successful response
                  if (response.success) {
                    signInUser(
                      // user data
                      {
                        email: values.email,
                        fullName: response.fullName,
                      },
                      // app state
                      {
                        isUserLoggedIn: true,
                        user_id: response.user_id,
                        accessToken: response.session_token,
                        accessJWT: response.session_jwt,
                      }
                    );
                    navigate(PageRoutes.Home);
                  } else {
                    // Handle error cases with various response types
                    if ("error" in response) {
                      setError(response.error as string);
                      console.error("Error:", response.error);
                    }
                    console.error("Sign-up failed:", response.message);
                    setError(response.message);
                  }
                } catch (error) {
                  // Handle network or other errors
                  setError("Error signing up. Please try again later.");
                  console.error("Error signing in:", error);
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
                  <Form.Group className="mb-3" controlId="signInForm.fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <FormFieldError
                      error={errors.email && touched.email && errors.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signInForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <FormFieldError
                      error={errors.email && touched.email && errors.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signInForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                      value={values.password}
                      onChange={handleChange}
                    />
                    <FormFieldError
                      error={
                        errors.password && touched.password && errors.password
                      }
                    />
                  </Form.Group>
                  <Row className="mx-2">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign Up
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
export default SignUpPage;

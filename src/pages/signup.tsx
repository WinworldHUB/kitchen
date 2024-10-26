import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";
import useAuthentication from "../lib/hooks/useAuthentication";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";

import { Formik } from "formik";
import FormFieldError from "../lib/components/form.field.error";
import {  SIGN_UP_VALIDATION_SCHEME } from "../lib/constants/validation-constants";
import { useState } from "react";

const DEFAULT_SIGN_UP_VALUES: SignUpRequest = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
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
              validationSchema={SIGN_UP_VALIDATION_SCHEME}
              onSubmit={async (values: SignUpRequest, { setSubmitting }) => {
                try {
                  const response = await sendSignupData(
                    USER_APIS.SIGNUP_USER_API,
                    {
                      fullName: values.firstName + " " + values.lastName,
                      email: values.email,
                      password: values.password,
                    }
                  );

                  if (response.success) {
                    signInUser(
                      {
                        email: values.email,
                        fullName: response.fullName,
                      },
                      {
                        isUserLoggedIn: true,
                        user_id: response.user_id,
                        accessToken: response.session_token,
                        accessJWT: response.session_jwt,
                      }
                    );
                    navigate(PageRoutes.Home);
                  } else {
                    if ("error" in response) {
                      setError(response.error as string);
                    }
                    setError(response.message);
                  }
                } catch (error) {
                  setError("Error signing up. Please try again later.");
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
                  <Row className="mb-3">
                    <Col xs={6}>
                      <Form.Group controlId="signInForm.firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="John"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          
                        />
                        <FormFieldError
                          error={errors.firstName && touched.firstName && errors.firstName}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group controlId="signInForm.lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          
                        />
                        <FormFieldError
                          error={errors.lastName && touched.lastName && errors.lastName}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="signInForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    <FormFieldError
                      error={errors.email && touched.email && errors.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signInForm.phoneNo">
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNo"
                      placeholder="+44 12345678"
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    <FormFieldError
                      error={errors.phoneNo && touched.phoneNo && errors.phoneNo}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signInForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="password"
                      
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Col>
                      <p className="text-muted" style={{ fontSize: "12px" }}>
                        It must be a combination of minimum 8 letters, numbers, and symbols.
                      </p>
                    </Col>
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

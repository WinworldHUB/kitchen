import { Button, Col, Form, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import {
  PageRoutes,
} from "../lib/constants";
import { Formik } from "formik";
import FormFieldError from "../lib/components/form.field.error";
import { SIGN_IN_VALIDATION_SCHEME } from "../lib/constants/validation-constants";
import { EncodeBase64Aes } from "../lib/utils/Encrypt";

import { USER_APIS } from "../lib/constants/api-constants";

import useApi from "../lib/hooks/useApi";
import useAuthentication from "../lib/hooks/useAuthentication";

const DEFAULT_LOGIN_VALUES: LoginRequest = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const navigate = useNavigate();
  const { postData: sendSignInData } = useApi<LoginResponse>();
  const { signInUser } = useAuthentication();

  return (
    <PageLayout>
      <Row className="justify-content-center">
        <Col md="8" lg="6" xl="4">
          <CardSimple title="Sign In" error="Some error">
            <Formik
              initialValues={DEFAULT_LOGIN_VALUES}
              validationSchema={SIGN_IN_VALIDATION_SCHEME}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  // Encrypt form values
                  const encryptedValues = EncodeBase64Aes(
                    JSON.stringify(values, null, 2)
                  );

                  // Send the encrypted data to the API
                  const response = await sendSignInData(
                    USER_APIS.LOGIN_USER_API,
                    encryptedValues
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
                      console.error("Error:", response.error);
                    }
                    console.error("Sign-up failed:", response.message);
                  }
                } catch (error) {
                  // Handle network or other errors
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
                  <Row>
                    <Col xs="8">
                      Not registered yet?{" "}
                      <Link to={PageRoutes.SignUp}>Register now</Link>
                    </Col>
                    <Col xs="4" className="text-end">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardSimple>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default SignInPage;

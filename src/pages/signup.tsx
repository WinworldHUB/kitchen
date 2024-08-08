import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";
import useAuthentication from "../lib/hooks/useAuthentication";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";
import { AppContext } from "../lib/contexts/appcontext";
const SignUpPage = () => {
  const navigate = useNavigate();
  const { postData: sendSignUpData } = useApi<SignUpResponse>();
  const { signInUser } = useAuthentication();
  const { updateAppState } = useContext(AppContext);

  // State for form data
  const [formData, setFormData] = useState<SignUpRequest>({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSignUp = async () => {
    try {
      
      // Check password strength, currently disabled because of cors issues
      // const stytchResponse = await stytchClient.passwords.strengthCheck({
      //   password: formData.password,
      // });
      // if (stytchResponse.score < 3) {
      //   console.error("Password is too weak");
      //   return;
      // }

      const response = await sendSignUpData(
        USER_APIS.SIGNUP_USER_API,
        formData
      );

      // Handle successful response
      if (response.success) {
        console.log("User signed up successfully:", response.message);

        signInUser({
          email: formData.email,
          sessionToken: response.session_token,
          sessionJwt: response.session_jwt,
        });
        updateAppState({
          isUserLoggedIn: true,
          accessToken: response.session_token,
          accessJWT: response.session_jwt,
        });
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
      console.error("Error signing up:", error);
    }
  };

  return (
    <PageLayout>
      <Row className="justify-content-center">
        <Col md="8" lg="6" xl="4">
          <CardSimple title="Sign Up">
            <Form>
              <Form.Group className="mb-3" controlId="signInForm.fullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signInForm.email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signInForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="password"
                  required
                />
              </Form.Group>
              <Row>
                <Col xs="8">
                  Already registered? <Link to={PageRoutes.Login}>Sign In</Link>
                </Col>
                <Col xs="4" className="text-end">
                  <Button variant="primary" type="button" onClick={onSignUp}>
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardSimple>
        </Col>
      </Row>
    </PageLayout>
  );
};
export default SignUpPage;

import { Button, Col, Form, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import {
  DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE,
  PageRoutes,
} from "../lib/constants";
import useAuthentication from "../lib/hooks/useAuthentication";
import { useContext, useState } from "react";
import { USER_APIS } from "../lib/constants/api-constants";
import { AppContext } from "../lib/contexts/appcontext";
import useApi from "../lib/hooks/useApi";
import useLocalStorage from "../lib/hooks/useLocalStorage";

const SignInPage = () => {
  const navigate = useNavigate();
  const { postData: sendSignUpData } = useApi<SignUpResponse>();
  const { signInUser } = useAuthentication();
  const { updateAppState } = useContext(AppContext);
  const { setValue: setUserState } = useLocalStorage<User>();
  // State for form data
  const [formData, setFormData] = useState<LoginRequest>({
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
  const onSignIn = async () => {
    try {

      const response = await sendSignUpData(USER_APIS.LOGIN_USER_API, formData);

      // Handle successful response
      if (response.success) {
        signInUser({
          email: formData.email,
          user_id: response.user_id,
          sessionToken: response.session_token,
          sessionJwt: response.session_jwt,
        });
        updateAppState({
          isUserLoggedIn: true,
          user_id: response.user_id,
          accessToken: response.session_token,
          accessJWT: response.session_jwt,
        });
        setUserState(DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE, {
          email: formData.email,
          fullName: response.fullName,
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
          <CardSimple title="Sign In">
            <Form>
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
                  type="Password"
                  placeholder="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col xs="8">
                  Not registered yet?{" "}
                  <Link to={PageRoutes.SignUp}>Register now</Link>
                </Col>
                <Col xs="4" className="text-end">
                  <Button variant="primary" type="button" onClick={onSignIn}>
                    Sign in
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

export default SignInPage;

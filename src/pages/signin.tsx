import { Button, Col, Form, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";
import useAuthentication from "../lib/hooks/useAuthentication";

const SignInPage = () => {
  const { signInUser } = useAuthentication();
  const navigate = useNavigate();
  const onSignIn = () => {
    signInUser({});
    navigate(PageRoutes.Home);
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
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signInForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="password" required />
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

import { Button, Col, Form, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";

const SignUpPage = () => {
  const navigate = useNavigate();
  const onSignUp = () => {
    navigate(PageRoutes.Login);
  };

  return (
    <PageLayout>
      <Row className="justify-content-center">
        <Col md="8" lg="6" xl="4">
          <CardSimple title="Sign Up">
            <Form>
              <Form.Group className="mb-3" controlId="signInForm.fullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" required />
              </Form.Group>
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

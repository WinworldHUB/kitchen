import { Button, Col, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import ChangePasswordForm from "../lib/components/user.change.password";
import FlexBox from "../lib/components/app.flex.box";
import useAuthentication from "../lib/hooks/useAuthentication";

const UserProfilePage = () => {
  const { signOutUser } = useAuthentication();

  const handleLogout = () => {
    signOutUser();
  };
  return (
    <PageLayout>
      <Row className="justify-content-center">
        <Col sm="4">
          <CardSimple
            title="Change Password"
            className="p-4"
            footer={
              <FlexBox justifyContent="end" className="pe-2">
                <Button variant="outline-primary">Update password</Button>
              </FlexBox>
            }
          >
            <ChangePasswordForm />
          </CardSimple>
        </Col>
        <Col sm="4">
          <CardSimple
            noShadow
            variant="light"
            title="Log off"
            className="p-4"
            footer={
              <FlexBox justifyContent="end" className="pe-2">
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout off session
                </Button>
              </FlexBox>
            }
          >
            <label className="text-label">
              By clicking the{" "}
              <em className="fw-bold text-blue">Logout off session</em> button
              below, you will be logged off from your current session. You might
              loose all your unsaved data.
              <br />
              <br />
              You can login again using the Login Screen of the app
            </label>
          </CardSimple>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default UserProfilePage;

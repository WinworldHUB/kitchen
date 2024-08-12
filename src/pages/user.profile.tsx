import { Button, Col, Row } from "react-bootstrap";
import PageLayout from "../lib/components/app.layout";
import CardSimple from "../lib/components/card.simple";
import FlexBox from "../lib/components/app.flex.box";
import useAuthentication from "../lib/hooks/useAuthentication";
import ChangePasswordForm from "../lib/components/user.profile/user.change.password";
import UserProfileUpdateForm from "../lib/components/user.profile/user.profile.update";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import {
  DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE,
  PageRoutes,
} from "../lib/constants";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { signOutUser } = useAuthentication();
  const { getValue: getAppData } = useLocalStorage<AppVars>();
  const { postData: sendLogoutRequest } = useApi<GeneralAPIResponse>();

  const handleLogout = async () => {
    try {
      const appData = getAppData(DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE);
      const response = await sendLogoutRequest(USER_APIS.LOGOUT_USER_API, {
        session_token: appData.accessToken,
      });
      if (response.error) {
        console.error(response.error);
        return;
      }
      navigate(PageRoutes.Login);
      signOutUser();
    } catch (error) {
      console.error("Error while logging out", error);
    }
  };
  return (
    <PageLayout>
      <Row className="gy-4">
        <Col sm="8">
          <CardSimple
            title="User details"
            className="p-4"
            footer={
              <FlexBox justifyContent="end" className="pe-2">
                <Button variant="outline-primary">Update</Button>
              </FlexBox>
            }
          >
            <UserProfileUpdateForm />
          </CardSimple>
        </Col>
        <Col sm="4">
          <Row className="gy-4">
            <Col sm="12">
              <CardSimple
                title="Change Password"
                className="p-4"
              
              >
                <ChangePasswordForm />
              </CardSimple>
            </Col>
            <Col sm="12">
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
                  <em className="fw-bold text-blue">Logout off session</em>{" "}
                  button below, you will be logged off from your current
                  session. You might loose all your unsaved data.
                  <br />
                  <br />
                  You can login again using the Login Screen of the app
                </label>
              </CardSimple>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default UserProfilePage;

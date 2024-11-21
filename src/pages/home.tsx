import { useEffect } from "react";
import PageLayout from "../lib/components/app.layout";
import HomeUser from "../lib/components/home/home.user";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";
import HomeAdmin from "../lib/components/home/home.admin";

const HomePage = () => {
  const { getData: getUserData, data: userData } = useApi<GetUserResponse>();
  useEffect(() => {
    getUserData(USER_APIS.GET_USER);
  }, []);

  return (
    <PageLayout>
      {userData && userData?.role === "admin" ? <HomeAdmin /> : <HomeUser />}
    </PageLayout>
  );
};

export default HomePage;

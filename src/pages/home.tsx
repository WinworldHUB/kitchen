import { useContext, useEffect, useState } from "react";
import PageLayout from "../lib/components/app.layout";
import HomeUser from "../lib/components/home/home.user";
import useApi from "../lib/hooks/useApi";
import { USER_APIS } from "../lib/constants/api-constants";
import HomeAdmin from "../lib/components/home/home.admin";
import { AppContext } from "../lib/contexts/appcontext";
import Loader from "../lib/components/Loader";

const HomePage = () => {
  const { updateAppState, appState } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { getData: getUserData, data: userData } = useApi<GetUserResponse>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getUserData(USER_APIS.GET_USER);
      if (data?.role) {
        updateAppState({ ...appState, isAdmin: data?.role === "admin" });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      {userData && userData?.role === "admin" ? <HomeAdmin /> : <HomeUser />}
    </PageLayout>
  );
};

export default HomePage;

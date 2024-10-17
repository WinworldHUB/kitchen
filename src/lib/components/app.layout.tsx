import { FC, useContext } from "react";
import { Container } from "react-bootstrap";
import MenuBar from "./app.mainmenu";
import { PageRoutes } from "../constants";
import { FaHouse, FaUserGear } from "react-icons/fa6";
import { AppContext } from "../contexts/appcontext";
import { matchPath, useLocation } from "react-router-dom";

const PageLayout: FC<LayoutProps> = ({
  isShowSideMenu = false,
  children,
  username = "",
}: LayoutProps) => {
  const { appState, updateAppState } = useContext(AppContext);
  const location = useLocation();
  
  // Determine if the current route is ProjectDetails
  const isProjectDetails = !!matchPath("/projectDetails/*", location.pathname);

  return (
    <>
      <MenuBar
        menuItems={APP_MENU}
        selectedItemId={appState.selectedMenuId ?? 0}
        username={username}
        onClick={(itemId) =>
          updateAppState({ ...appState, selectedMenuId: itemId })
        }
      />
      <Container fluid className={!isProjectDetails ? "py-3 px-3" : "py-0 px-0"}>
        {children}
      </Container>
    </>
  );
};

export default PageLayout;

const APP_MENU: MenuItem[] = [
  {
    id: 0,
    label: "Home",
    route: PageRoutes.Home,
    icon: <FaHouse />,
  },
  {
    id: 1,
    label: "User Profile",
    route: PageRoutes.UserProfile,
    icon: <FaUserGear stroke="1" />,
  },
];

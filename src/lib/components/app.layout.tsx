import { FC, useContext } from "react";
import { Container } from "react-bootstrap";
import MenuBar from "./app.mainmenu";
import { PageRoutes } from "../constants";
import { FaBoxArchive, FaHouse, FaUserGear } from "react-icons/fa6";
import { AppContext } from "../contexts/appcontext";

const PageLayout: FC<LayoutProps> = ({
  isShowSideMenu = false,
  children,
  username = "",
}: LayoutProps) => {
  const { appState, updateAppState } = useContext(AppContext);
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
      <Container fluid className="py-3 px-3">
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
    label: "Archives",
    route: PageRoutes.Archives,
    icon: <FaBoxArchive stroke="1" />,
  },
  {
    id: 2,
    label: "User Profile",
    route: PageRoutes.UserProfile,
    icon: <FaUserGear stroke="1" />,
  },
];

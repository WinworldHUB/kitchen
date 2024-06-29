import React, { FC } from "react";
import { Container } from "react-bootstrap";
import MenuBar from "./app.mainmenu";
import { PageRoutes } from "../constants";
import { FaHouse } from "react-icons/fa6";

const PageLayout: FC<LayoutProps> = ({
  isShowSideMenu = false,
  children,
  selectedMenuId = 0,
  username = "",
}: LayoutProps) => {
  return (
    <>
      <MenuBar
        menuItems={APP_MENU}
        selectedItemId={selectedMenuId}
        username={username}
      />
      <Container fluid className="pt-3 px-3">
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
];

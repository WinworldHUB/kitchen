import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AppContext } from "../contexts/appcontext";
import { Image } from "react-bootstrap";
import MainMenuItem from "./app.menuitem";

interface MenuBarProps {
  onClick?: (menuIndex: number) => void;
  menuItems: MenuItem[];
  selectedItemId: number;
  username: string;
}

const MenuBar = ({
  onClick,
  menuItems,
  selectedItemId,
  username,
}: MenuBarProps) => {
  const [currentMenuId, setCurrentMenuId] = useState<number>(0);
  const { appState } = useContext(AppContext);

  useEffect(() => {
    setCurrentMenuId(selectedItemId);
  }, [selectedItemId]);

  return (
    <Navbar
      expand="sm"
      data-bs-theme="dark"
      className="shadow main-menu"
      sticky="top"
      bg="primary"
    >
      <Container fluid className="px-3">
        <Navbar.Brand href="/" onClick={() => onClick?.(0)}>
          <Image src="/assets/images/moiety-kitchens-london-225w.png" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {appState?.isUserLoggedIn && (
            <>
              <Nav className="ms-auto">
                {menuItems.map((item, index) => (
                  <Nav.Link
                    key={item.id}
                    active={currentMenuId === menuItems[index].id}
                    onClick={() => onClick?.(index)}
                    href={item.route}
                  >
                    <MainMenuItem item={item} />
                  </Nav.Link>
                ))}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;

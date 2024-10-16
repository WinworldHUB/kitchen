import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import PageLayout from "../app.layout";
import FlexBox from "../app.flex.box";

interface NavLink {
  name: string;
  href: string;
}

const ProfileProjectLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "#ffc000";
    e.currentTarget.style.fontWeight = "bold";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.getAttribute("href") !== activeLink) {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.fontWeight = "normal";
    }
  };

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  const linksTop: NavLink[] = [
    { name: "Overview", href: "#" },
    { name: "Contractors", href: "#" },
    { name: "Design Brief", href: "#" }
  ];

  const linksBottom: NavLink[] = [
    { name: "Payments", href: "#" },
    { name: "My Documents", href: "#" },
    { name: "Project Report", href: "#" }
  ];

  return (
    <PageLayout>
      <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="flex-grow-1">
          <Col
            xs={2}
            className="shadow main-menu bg-primary text-white p-3"
            data-bs-theme="dark"
          >
            {/* Sidebar */}
            <Nav className="flex-column justify-content-between h-100">
              <div>
                {linksTop.map((link, index) => (
                  <Nav.Link
                    key={index}
                    href={link.href}
                    className="text-white"
                    style={{
                      backgroundColor: activeLink === link.href ? "#ffc000" : "transparent",
                      fontWeight: activeLink === link.href ? "bold" : "normal",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.name}
                  </Nav.Link>
                ))}
              </div>
              <div>
                {linksBottom.map((link, index) => (
                  <Nav.Link
                    key={index + linksTop.length}
                    href={link.href}
                    className="text-white"
                    style={{
                      backgroundColor: activeLink === link.href ? "#ffc000" : "transparent",
                      fontWeight: activeLink === link.href ? "bold" : "normal",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.name}
                  </Nav.Link>
                ))}
              </div>
            </Nav>
          </Col>
          <Col xs={10} className="p-3">
            {/* Content Area */}
            {children}
          </Col>
        </Row>
        <Row
          className="bg-primary text-white p-2 shadow main-menu"
          data-bs-theme="dark"
        >
          <FlexBox justifyContent="end">
            {/* Footer */}
            <span>Email</span>
            <Button variant="warning" className="mx-4">Book a Call</Button>
          </FlexBox>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default ProfileProjectLayout;

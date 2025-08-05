import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList, BsHouseDoor, BsClockFill, BsListCheck } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const guestLinks = [
    { path: "/", icon: <BsHouseDoor />, label: "Inicio" },
    { path: "/contacto", icon: <BsHouseDoor />, label: "Contacto" },
    { path: "/itinerario", icon: <BsClockFill />, label: "Itinerario" },
    { path: "/tareas-boda", icon: <BsListCheck />, label: "Tareas Boda" }
  ];

  return (
    <header className="app-header">
      <div className="header-decoration-top"></div>
      <Navbar expand="lg" className="header-navbar">
        <Container className="header-container">
          <Navbar.Brand as={Link} to="/" className="header-logo">
            <img src="../../public/img/02-logos/logolistastareaseventos.png" alt="Logo" className="logo-image" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggleMobileMenu}
            className="menu-toggle"
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <Nav className="nav-links">
              {guestLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-decoration-bottom"></div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList, BsHouseDoor, BsClockFill, BsListCheck } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const guestLinks = [
    { 
      path: "/", 
      icon: <BsHouseDoor />, 
      label: "Inicio",
      shortLabel: "Inicio",
      tooltip: "Volver a la página principal"
    },
    { 
      path: "/contacto", 
      icon: <BsHouseDoor />, 
      label: "Contacto con los Novios",
      shortLabel: "Contacto",
      tooltip: "Escríbenos si tienes alguna duda o necesitas información adicional"
    },
    { 
      path: "/itinerario", 
      icon: <BsClockFill />, 
      label: "Itinerario de la Boda",
      shortLabel: "Horarios",
      tooltip: "Consulta los horarios y actividades planeadas para nuestra celebración"
    },
    { 
      path: "/tareas-boda", 
      icon: <BsListCheck />, 
      label: "Tareas de la Boda",
      shortLabel: "Tareas",
      tooltip: "Lista de tareas pendientes para la organización de la boda"
    }
  ];

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="app-header">
      {/* Decoración superior */}
      <div className="header-decoration-top"></div>

      {/* Barra de navegación principal */}
      <Navbar expand="lg" className="header-navbar" expanded={isMobileMenuOpen}>
        <Container className="header-container">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="header-logo">
            <img 
              src="../../public/img/02-logos/logolistastareaseventos.png" 
              alt="Logo" 
              className="logo-image" 
            />
          </Navbar.Brand>

          {/* Botón hamburguesa para móvil */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="menu-toggle"
            onClick={handleToggleMobileMenu}
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>

          {/* Menú de navegación */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="quick-access-buttons">
              {guestLinks.map((link) => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`nav-button ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                  title={link.tooltip}
                  data-label={link.label}
                >
                  <span className="icon">{link.icon}</span>
                  <span className="nav-label">
                    {window.innerWidth < 768 ? link.label : link.shortLabel}
                  </span>
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Decoración inferior */}
      <div className="header-decoration-bottom"></div>
    </header>
  );
};

export default Header;
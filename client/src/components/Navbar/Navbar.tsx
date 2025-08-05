import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import "./Navbar.css";

function NavigationBar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="navbar-container">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="site-logo">
            NAME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}>
            <FontAwesomeIcon icon={isNavbarOpen ? faTimes : faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className={isNavbarOpen ? "show" : ""}>
            <Nav className="me-auto navbar-menu">
              <Nav.Link as={Link} to="/all">
                All
              </Nav.Link>
              <Nav.Link as={Link} to="/women">
                Women
              </Nav.Link>
              <Nav.Link as={Link} to="/men">
                Men
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav" className={isNavbarOpen ? "show" : ""}>
            <Nav className="me-auto navbar-etc">
              {user ? (
                <div className="user-section">
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="user-name">{user.firstName}</span>
                  </div>
                  <Nav.Link>
                    <button className="log-btn logout-btn" onClick={logout} role="button">
                      Logout
                    </button>
                  </Nav.Link>
                </div>
              ) : (
                <div className="user-section">
                  <Nav.Link as={Link} to="/Login">
                    <FontAwesomeIcon icon={faUser} />
                    <button className="log-btn" role="button">
                      Login
                    </button>
                  </Nav.Link>
                </div>
              )}
              <Nav.Link as={Link} to="/Cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
export { NavigationBar };

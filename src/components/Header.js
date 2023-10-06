import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="mb-5">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-link">
              React-Bootstrap
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>

              <NavLink to="/players" className="nav-link">
                Players
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Action" id="collapsible-nav-dropdown">
                {user && user.auth === true ? (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    <NavLink className="nav-link">Logout</NavLink>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

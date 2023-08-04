import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LogoutSharp } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
export default function Nav1() {
  const history = useHistory();
  const redirectLogin = () => {
    localStorage.removeItem("_token");
    history.push("/");
  };
  return (
    <Container fluid>
      <Navbar bg="secondary" expand="lg" className="container-fluid" sticky="top">
        <Navbar.Brand>
          <big>
            <b>
              vitae<font color="white">BUILDER</font>
            </b>
          </big>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="btn-light text-light bg-light"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Button onClick={redirectLogin}>
              Logout <LogoutSharp />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

import React from "react";
import Logo from './Logo';
import CartWidget from '../cartwidget/CartWidget'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink, Outlet } from 'react-router-dom';


function ColorSchemesExample() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={NavLink} to="/"><Logo /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categoria/infantil">Infantiles</Nav.Link>
            <Nav.Link as={NavLink} to="/categoria/adultos">Adultos</Nav.Link>
            <Nav.Link as={NavLink} to="/categoria/bautismo">Bautismo</Nav.Link>
            <Nav.Link as={NavLink} to="/categoria/comunion">Comunión</Nav.Link>
          </Nav>
          <Nav>
            <CartWidget />
          </Nav>

        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default ColorSchemesExample;
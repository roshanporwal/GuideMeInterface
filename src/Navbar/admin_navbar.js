import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

export default function ADMIN_NAVBAR(props) {

    return(
        <>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Text style = {{fontSize: "22px"}}>GuideMeDoc</Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style = {{paddingLeft: 200}}>
      <i class="far fa-hospital"></i>
      <Nav.Link className = "text-dark">Hospitals</Nav.Link>
        <Nav.Link  className = "text-dark">Patients</Nav.Link>
        <Nav.Link  className = "text-dark">Smart Search</Nav.Link>
        <Nav.Link  className = "text-dark">MIS</Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
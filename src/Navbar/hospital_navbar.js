import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

export default function PATIENT_NAVBAR(props) {

    return(
        <>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Text><img src="assets\images\GuideMeDoc.png" alt="" /></Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style = {{paddingLeft: 200}}>
      <i className = "fa fa-hospital-alt"></i><Nav.Link className = "text-dark">Hospitals</Nav.Link>
        <Nav.Link  className = "text-dark">Patients</Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
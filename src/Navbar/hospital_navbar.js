import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import {  Link,useHistory } from 'react-router-dom';

export default function HospitalNavbar(props) {
  const history = useHistory();

  function logout() {
   
    localStorage.removeItem("login")
    history.push({
     pathname:'/'
   });

  
 
 }

    return(
        <>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Text><img src="assets\images\GuideMeDoc.png" alt="" /></Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style = {{paddingLeft: 200}}>
      <i className = "fa fa-hospital-alt"></i><Nav.Link className = "text-dark" as={Link} to= '/hospital/dashboard'>Dashboard</Nav.Link>
        <Nav.Link  className = "text-dark"as={Link} to= '/admin/hospital/profile'>Profile</Nav.Link>
        <Nav.Link  className = "text-dark"as={Link} to= '/hospital/doctors'>Doctors</Nav.Link>
        <Nav.Link  className = "text-dark"as={Link} to= '/admin'>admin</Nav.Link>
        <Nav.Link  className = "text-dark" onClick={logout}>Logout</Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
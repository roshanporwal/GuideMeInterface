import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import {  Link,useHistory } from 'react-router-dom';

export default function ADMIN_NAVBAR(props) {
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
    <Navbar.Text style = {{fontSize: "22px"}}>GuideMeDoc</Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style = {{paddingLeft: 200}}>
      <i class="far fa-hospital"></i>
      <Nav.Link className = "text-dark" as={Link} to= '/admin/dashboard'>Dashboard</Nav.Link>
        <Nav.Link  className = "text-dark" as={Link} to= '/admin/hospital/profile'>Hospitals profile</Nav.Link>
        <Nav.Link  className = "text-dark" >Smart Search</Nav.Link>
        <Nav.Link  className = "text-dark"  >MIS</Nav.Link>
        <Nav.Link  className = "text-dark" onClick={logout}>Logout</Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import {  Link,useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


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
  <Navbar.Brand><img src="../assets/images/GuideMeDocLogo.png" alt="" style = {{height: "100px", width: "200px", marginTop: "-40px"}} /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
      <div className = "col-md-2"></div>
      <div className = "col-md-2"></div>
      <div className = "col-md-2">
      <Nav.Link className = "text-dark"  as={Link} to= '/hospital/dashboard'><p style = {{color: "black"}}>Dashboard</p></Nav.Link>
      </div>
      <div className = "col-md-2"></div>
       <div className = "col-md-2"> 
        <Nav.Link  className = "text-dark"as={Link} to= '/hospital/doctors'><p style = {{color: "black"}}>Doctors</p></Nav.Link>
        </div>
        <div className = "col-md-2"></div>
        <div className = "col-md-2"></div>
        <div className = "col-md-2"></div>
        <div className = "col-md-2"></div>
       
        <div className = "col-md-2">
        <Nav.Link  className = "text-dark"as={Link} to= '/hospital/profile'><p style = {{color: "black"}}><FontAwesomeIcon icon={faUser} style = {{fontSize: 22}} /></p></Nav.Link> 
        </div>
        <div className = "col-md-2">
        <Nav.Link  className = "text-dark" onClick={logout}><p style = {{color: "black"}}><FontAwesomeIcon icon={faSignOutAlt}  style ={{fontSize: 22}} /></p></Nav.Link> 
        </div>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar> 
    </>
    )
}
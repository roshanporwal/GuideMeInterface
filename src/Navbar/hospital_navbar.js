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
    <Navbar.Text>GuideMeDoc</Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style = {{paddingLeft: 200}}>
      
      <Nav.Link className = "text-dark"  as={Link} to= '/hospital/dashboard'><p style = {{color: "black", marginLeft: "20rem"}}>Dashboard</p></Nav.Link>
      {/* <FontAwesomeIcon icon={faUsers} style = {{fontSize: 22, marginLeft: "20px"}} />*/}
        
        
        <Nav.Link  className = "text-dark"as={Link} to= '/hospital/doctors'><p style = {{color: "black", marginLeft: "2rem"}}>Doctors</p></Nav.Link>
        {/* <FontAwesomeIcon icon={faUser}  style ={{fontSize: 22, marginLeft: "20px"}} />
        <Nav.Link  className = "text-dark"as={Link} to= '/admin'><p style = {{color: "black", marginLeft: "5px"}}>Admin</p></Nav.Link>
        <FontAwesomeIcon icon={faSignOutAlt}  style ={{fontSize: 22, marginLeft: "20px"}} />*/}
        <Nav.Link  className = "text-dark"as={Link} to= '/hospital/profile'><p style = {{color: "black", paddingLeft: "35rem"}}><FontAwesomeIcon icon={faUser} style = {{fontSize: 22, marginLeft: "20px"}} /></p></Nav.Link> 
        <Nav.Link  className = "text-dark" onClick={logout}><p style = {{color: "black", marginLeft: "1rem"}}><FontAwesomeIcon icon={faSignOutAlt}  style ={{fontSize: 22, marginLeft: "20px"}} /></p></Nav.Link> 
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar> 
{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" >GuideMeDoc</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active d-flex">
        <i className = "fa fa-columns" style = {{fontSize: 22, marginTop: 10}}></i>
        <a style = {{color: "black"}} className="nav-link"as={Link} to= '/hospital/dashboard'>Dashboard <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item d-flex">
      <i className = "fa fa-users" style = {{fontSize: 22, marginTop: 10}}></i>
        <a className="nav-link" as={Link} to= '/admin/hospital/profile'>Profile</a>
      </li>
      <li className="nav-item d-flex">
      <i className = "fa fa-stethoscope" style = {{fontSize: 22, marginTop: 10}}></i>
        <a className="nav-link" as={Link} to= '/hospital/doctors'><p style = {{color: "black"}}>Doctors</p></a>
      </li> 
      <li className="nav-item d-flex" style = {{color: "black"}}>
      <i className = "fa fa-user" style = {{fontSize: 22, marginTop: 10}}></i>
        <a className="nav-link" as={Link} to= '/admin'>Admin</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={logout}>Logout</a>
      </li>
    </ul>
  </div>
</nav>
 */}        </>
    )
}
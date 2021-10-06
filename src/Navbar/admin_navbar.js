import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import {  Link,useHistory } from 'react-router-dom';
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


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
    
    <Navbar.Brand><img src= "/assets/images/GuideMeDocLogo.png" alt="" style = {{height: "100px", width: "200px", marginTop: "-40px"}} /></Navbar.Brand>
    
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <div className = "col-md-2">
      <FontAwesomeIcon icon={faUserAlt} style = {{fontSize: 22, color: "#164473"}} />
      <Nav.Link className = "text-dark" as={Link} to= '/admin/dashboard'><p style = {{color:"#164473"}}>Patients</p></Nav.Link>
      </div>
      <div className = "col-md-2">
      <FontAwesomeIcon icon={faHospital} style = {{fontSize: 22, color: "#164473"}} />
        <Nav.Link  className = "text-dark" as={Link} to= '/admin/hospital/profile'><p style = {{color:"#164473"}}>Hospitals</p></Nav.Link>
        </div>
        <div className = "col-md-3">
        <FontAwesomeIcon icon={faSearch} style = {{fontSize: 22, color: "#164473"}} />
        <Nav.Link  className = "text-dark" as={Link} to= '/admin/smartsearch'><p style = {{color:"#164473"}}>Smart Search</p></Nav.Link>
        </div>
        <div className = "col-md-2">
        <FontAwesomeIcon icon={faPaperclip} style = {{fontSize: 22, color: "#164473"}} />
        <Nav.Link  className = "text-dark"  ><p style = {{color:"#164473"}}>MIS</p></Nav.Link>
        </div>
        <div className = "col-md-2">
        <Nav.Link  className = "text-dark" onClick={logout}><p style = {{color: "#164473", marginLeft: "1rem"}}><FontAwesomeIcon icon={faSignOutAlt}  style ={{fontSize: 22, marginLeft: "20rem", color: "#164473"}} /></p></Nav.Link> 
        </div>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
     
 {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand">GuideMeDoc</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" as={Link} to= '/admin/dashboard'>Dashboard <span class="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" as={Link} to= '/admin/hospital/profile'>Hospital Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" >Smart Search</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" >MIS</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" onClick={logout}>Disabled</a>
      </li>
    </ul>
  </div>
</nav> 
 */}    </>
    )
}
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
export default function ADMIN_NAVBAR(props) {
  const navigate = useNavigate();
  function logout() {
   
    localStorage.clear()
     
     navigate('/');
    

   
  
  }

    return(
        <>
        <div id="AdminNavBar">
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <Link to="/admin/dashboard" className="navbar-brand"><img src= "/assets/images/GuideMeDocLogo.png" className="HeaderLogo" alt="" /></Link>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto my-0">
                          <li className="nav-item d-flex justify-content-center align-items-center">
                            <img src="/assets/images/icons/patients.png" alt=""/>
                            <Link className = "nav-link active" to = '/admin/dashboard'><span style = {{color:"#164473"}}>Patients</span></Link>
                          </li>
                          <li className="nav-item d-flex justify-content-center align-items-center">
                            <img src="/assets/images/icons/hospitals.png" alt=""/>
                            <Link className = "nav-link" to = '/admin/hospital/profile'>
                            <span style = {{color:"#164473"}}> &nbsp;Hospitals</span></Link>
                          </li>
                          <li className="nav-item d-flex justify-content-center align-items-center">
                            <img src="/assets/images/icons/smart_search.png" alt=""/>
                            <Link className = "nav-link" to = '/admin/smartsearch'><span style = {{color:"#164473"}}>Smart Search</span></Link>
                          </li>
                          <li className="nav-item d-flex justify-content-center align-items-center">
                            <img src="/assets/images/icons/total_enquiries.png" alt=""/>
                            <Link className = "nav-link" to = '/admin/enquiry'><span style = {{color:"#164473"}}>Enquiry</span></Link>
                          </li>
                          <li className="nav-item d-flex justify-content-center align-items-center">
                            <img src="/assets/images/icons/MIS.png" alt=""/>
                            <Link className = "nav-link" as={Link} to= '/admin/mis'><span style = {{color:"#164473"}}>MIS</span></Link>
                          </li>
                        </ul>
                        <span className="navbar-text">
                          <div className = "nav-link" onClick={logout}><span style = {{color: "#164473"}}>
                          <img src="/assets/images/icons/logout.png" alt=""/></span></div>  
                        </span>
                      </div>
                  </nav>
                </div>  
              </div>   
          </div>  
        </div>
        
    </>
    )
}
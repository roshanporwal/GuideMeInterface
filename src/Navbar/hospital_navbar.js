import React , { useState ,useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Link, useHistory } from 'react-router-dom';
import './style.css';
import { Dropdown } from 'react-bootstrap';

export default function HospitalNavbar(props) {
  const history = useHistory();
  const [allhospital, setAllhospital] = useState([])
  const [loggedname,setLoggedName] = useState('');

  useEffect(() => {
   
       
    fetchData()
  }, []);

  async function fetchData() {
    let data = localStorage.getItem("allhospital")
   if(data===null){
     return 
   }
   let loggedin = localStorage.getItem("login")
   if(loggedin===null){
     return 
   }
  loggedin = JSON.parse(loggedin);
  setLoggedName(loggedin.hospital_name); 
   const  islogin = JSON.parse(data)
   setAllhospital(islogin)
  }
  async function onSubmit(data) {
    console.log(data)
    localStorage.setItem('login', JSON.stringify(data));
    window.location.reload();
  }

  function logout() {
   localStorage.clear()
    //localStorage.removeItem("login")
    history.push({
     pathname:'/'
   });

  
 
 }

    return(
        <>
        <div id="HospitalNavBar">
            <div className="container">
              <div className="row">
                  <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand"><img src= "/assets/images/GuideMeDocLogo.png" className="HeaderLogo" alt="" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                          <ul className="navbar-nav me-auto my-0">
                            <li className="nav-item d-flex justify-content-center align-items-center">
                              <Link className = "nav-link active" to = '/hospital/dashboard'><span style = {{color: "#164473"}}>Dashboard</span></Link>
                            </li>
                            <li className="nav-item d-flex justify-content-center align-items-center">
                              <Link className = "nav-link" to = '/hospital/doctors'><span style = {{color: "#164473"}}>Doctors</span></Link>
                            </li>
                            <li className="nav-item d-flex justify-content-center align-items-center">
                            {allhospital.length ? (
                                <>
                                  <Dropdown>
                                    <Dropdown.Toggle className='select-branch' id="dropdown-basic">
                                      {loggedname}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {allhospital.map((item,index) => {
                                        return (
                                          <Dropdown.Item href="#" onClick={() => onSubmit(item)} key={index}>{item.hospital_name}</Dropdown.Item>
                                        )
                                      })}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </>

                              ) : null }
                          </li>
                          </ul>
                          <span className="navbar-text">
                            <Link className = "nav-link" to = '/hospital/profile'><span style = {{color: "#164473"}}>
                            <img src="/assets/images/icons/patients.png" alt=""/></span></Link> 
                          </span>
                          
                          <span className="navbar-text">
                            <Link className = "nav-link" to ='#' onClick={logout}><span style = {{color: "#164473"}}>
                            <img src="/assets/images/icons/logout.png" alt=""/></span></Link>  
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
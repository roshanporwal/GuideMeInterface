import React from "react";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import HeroImagelg from "../../assets/dashboard-lg-hero.png";
//import HeroImagesm from '../../assets/dashboard-sm-hero.png';
import Logo from "../../assets/guidemedoc-logo.png";
import { useNavigate } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import ConsultationLogo from "../../assets/consultation.png";
import SecLogo from "../../assets/second-op-logo.png";
import HomeLogo from "../../assets/home-service.png";
import MedicineLogo from "../../assets/medicine.png";
import LabLogo from "../../assets/labtest-logo.png";
import XRayLogo from "../../assets/x-ray-logo.png";
import { FiLogOut } from 'react-icons/fi'

function Dashboard() {
    const navigate = useNavigate();
    let data = localStorage.getItem("login_patient")
    if(data){
        data = JSON.parse(data)
    }
    let data1 = localStorage.getItem("login")
    if(data1){
        data1 = JSON.parse(data1)
    }
  return (
    <>
      <div className="container-fluid">
        <Row>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>
                <img src={Logo} alt="Company-Logo" width={200} />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style = {{width : "100%"}}>
                  {data1 ? null : <div className = "offset-lg-1 col-sm-2">
                    <a style={{ color: "#164473" }} href="https://econsult.guidemedoc.com:8000/">E-Consult</a>
                  </div>}
                  {data1 ? (data1.hospital_name ? 
                  <div className = "col-sm-2" style={{ color: "#164473" }} >
                    <div onClick={() => navigate('/hospital/dashboard')}>
                    Dashboard </div>
                  </div> : null) : null }
                  {/* <Col lg={{ offset: 3 }} sm={5}>
                    <p style={{ color: "#164473" }}>Support</p>
                  </Col> */}
                    <div className = "offset-lg-5 col-sm-2">
                        {data || data1 ? 
                          null : 
                          <div
                              className="btn btn-primary"
                              onClick={() => navigate("/log-in")}
                          >
                          Login
                          </div> 
                      }
                    </div>
                    <div className = "col-sm-2">
                        {data || data1 ? 
                         <> <div
                          className="btn btn-primary"
                          onClick={() =>
                            { 
                              localStorage.removeItem("login");
                              localStorage.removeItem("login_patient");
                              window.location.reload()
                            }}
                          >
                            <div className="row">
                            &nbsp;{data ? data.name : data1 ? (data1.hospital_name ? data1.hospital_name: "" ): ""}
                          <div className ="col-2"><FiLogOut/></div>
                          </div>
                          </div>  </> : 
                          <div
                              className="btn btn-primary"
                              onClick={() => navigate("/hospital")}
                          >
                          Hospital Login
                          </div> 
                      }
                    </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </div>
      <Container>
        <div className="mt-5 py-3">
          <div className="row  align-items-start justify-content-around">
            <div className="col-md-4 col-11">
              <div className="text-center ">
                <p className="heading text-dark">
                  Simplify Healthcare ,<br />
                  Dial <span className="heading"> Guide Me Doc:</span>
                </p>
              </div>
              <div className="text-center">
                <a className="dashboard-call-button" href="tel:+971 43562356">
                +971 4 356 2 356
                </a>
              </div>
              <div className="mt-5 dashboard-logo">
                <img src={HeroImagelg} width="100%" alt="company-logo" />
              </div>
            </div>
            <div className="col-md-6 col-11 mt-5 mt-lg-0">
              <Row>
                <Col lg={{ span: 4 }} xs={6} >
                  <DashboardItem
                    item_desc="New Consultation"
                    item_img={ConsultationLogo}
                    item_link={"/new-consultation"}
                    navigate={navigate}
                  />
                </Col>
                <Col lg={{ span: 4 }} xs={6}>
                  <DashboardItem
                    item_desc="Second Opinion"
                    item_img={SecLogo}
                    item_link={"/free-opinion"}
                    navigate={navigate}
                  />
                </Col>
                <Col lg={{ span: 4 }} xs={6}>
                  <DashboardItem
                    item_desc="Home Service"
                    item_img={HomeLogo}
                    item_link={"/home-care-services"}
                    navigate={navigate}
                  />
                </Col>
                <div className ="col-lg-4 col-6 mt-3">
                  <DashboardItem
                    item_desc="Pharmacy"
                    item_img={MedicineLogo}
                    item_link={"/pharmacy"}
                    navigate={navigate}
                  />
                </div>
                <div className ="col-lg-4 col-6 mt-3">
                  <DashboardItem
                    item_desc="Lab Tests"
                    item_img={LabLogo}
                    item_link={"/lab-tests"}
                    navigate={navigate}
                  />
                </div>
                <div className ="col-lg-4 col-6 mt-3">
                  <DashboardItem
                    item_desc="Diagnostics/ Radiology"
                    item_img={XRayLogo}
                    item_link={"/diagnostic"}
                    navigate={navigate}
                  />
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Container>
      <div className="page-footer font-small blue">
      <div className="footer-copyright text-center py-3">
       All Rights Reserved @ Medi Connect International
      </div>
    </div>
    </>
  );
}

export default Dashboard;

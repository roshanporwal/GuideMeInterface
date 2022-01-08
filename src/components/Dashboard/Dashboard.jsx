import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeroImagelg from '../../assets/dashboard-lg-hero.png';
//import HeroImagesm from '../../assets/dashboard-sm-hero.png';

import Logo from '../../assets/guidemedoc-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DashboardItem from './DashboardItem';
import ConsultationLogo from '../../assets/consultation.png';
import SecLogo from '../../assets/second-op-logo.png';
import HomeLogo from '../../assets/home-service.png';
import MedicineLogo from '../../assets/medicine.png';
import LabLogo from '../../assets/labtest-logo.png';
import XRayLogo from '../../assets/x-ray-logo.png';

function Dashboard() {
    const navigate = useNavigate();
    return ( 
        <>
            <div className='container-fluid'>
            <Row className="header-row justify-content-between">
                <Col role="button" lg={{span:2,offset:1}} xs={6} onClick={() => navigate('/')}>
                    <img src={Logo} width={166}  alt='company-logo' />
                </Col>
                <Col lg={{span:5}} xs={6} className="align-self-center">
                    <div className='d-flex flex-row align-items-center justify-content-around'>
                        <h5>E Consult</h5>
                        <h5>Support</h5>
                        <div className="btn btn-primary" onClick={() => navigate("/log-in")}>
                            Login
                        </div>
                    </div>
                </Col>
            </Row>
            </div>
            <Container>
                <div className="mt-5 py-3">
                    <div className="row  align-items-start justify-content-around">
                        <div className='col-md-4 col-11'>
                            <div className='text-center '>
                                <p className='heading text-dark'>Think Healthcare ,<br/>
                                Dial <span className='heading'> Guide Me Doc:</span></p>
                            </div>
                            <div className='text-center'>
                                <Link className='dashboard-call-button' to="#">[04] 356 2 356</Link>
                            </div>
                            <div className='mt-5 dashboard-logo'>
                                <img src={HeroImagelg} width="100%" alt='company-logo'/>
                            </div>
                        </div>
                        <div className='col-md-6 col-11 mt-5 mt-lg-0'>
                            <Row>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="New Consultation"
                                        item_img={ConsultationLogo}
                                        item_link={"/new-consultation"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="Second Opinion"
                                        item_img={SecLogo}
                                        item_link={"/free-opinion"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="Home Service"
                                        item_img={HomeLogo}
                                        item_link={"/home-care-services"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="Pharmacy"
                                        item_img={MedicineLogo}
                                        item_link={"#"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="Lab Tests"
                                        item_img={LabLogo}
                                        item_link={"/lab-tests"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                                <Col lg={{span:4}} xs={6} >
                                    <DashboardItem 
                                        item_desc="Diagnostics/ Radiology"
                                        item_img={XRayLogo}
                                        item_link={"/diagnostic"}
                                        navigate = {navigate}
                                    />    
                                </Col>
                            </Row>
                            
                        </div>
                    </div>
                </div>
            </Container>
            <div className="footer-row-global">
            </div>
        </>
     );
}

export default Dashboard;
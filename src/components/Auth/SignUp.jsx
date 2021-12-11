import React from 'react';
import { useState } from 'react';
import { Container, Row ,Col, Form} from 'react-bootstrap';
import Logo from '../../assets/guidemedoc-logo.png';
import HeroImage from '../../assets/login-hero.png';
import {FaUserAlt} from 'react-icons/fa'
import {MdCall} from 'react-icons/md'
import './Auth.css';
import { useNavigate } from 'react-router-dom';
function SignUpScreen() {
    const navigate = useNavigate();

    const [formValues,setFormValues] = useState({
        mobile:""
    });

    const handleChange = (e) => {
        let {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    return ( 
        <>
            <div className='container-fluid'>
            <Row className="header-row">
                <Col role="button" lg={{span:2,offset:1}} xs={6} onClick={() => navigate('/')}>
                    <img src={Logo} width={166}  alt='company-logo' />
                </Col>
            </Row>
            </div>
            <Container>
                <div className="content-container">
                    <div className="row  align-items-center justify-content-center">
                        <div className='col-md-4 col-11 offset-md-1 mt-5 mt-lg-0'>
                            <div className="login-form-container d-flex flex-column align-items-center">
                                <div className='sub-heading mt-3 mb-2'>
                                    <p>Create An Account</p>
                                </div>
                                <Form onSubmit={e => handleSubmit(e)} className="login-form">                                        
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon">
                                                <FaUserAlt />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="name"
                                                placeholder='Enter Your Full Name'
                                                onChange={handleChange}
                                                value={formValues.name}
                                                className="grey-inputs"
                                            />
                                        </Form.Group>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon">
                                                <MdCall />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="mobile"
                                                placeholder='Enter Your Mobile Number'
                                                onChange={handleChange}
                                                value={formValues.mobile}
                                                className="grey-inputs"
                                            />
                                        </Form.Group>
                                        <Form.Group className='my-3'>
                                            <Form.Check
                                                name="terms-condition"
                                                value={formValues.mobile}
                                                type="checkbox"
                                                label="I agree to terms & conditions."
                                            />
                                        </Form.Group>
                                    <div className='text-center mt-4'>
                                        <button className="sign-up-button">
                                            SIGN UP
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className='col-md-4 col-11 offset-md-2'>
                            <div className='text-center'>
                                <h1 className='heading'>Welcome!</h1>
                            </div>
                            <img src={HeroImage} width="100%" alt='company-logo' />
                        </div>
                    </div>
                </div>
            </Container>
            <div className="footer-row">
            </div>
        </>
     );
}

export default SignUpScreen;
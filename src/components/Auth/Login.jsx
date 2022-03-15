import React from 'react';
import { useState } from 'react';
import { Container, Row ,Col, Form} from 'react-bootstrap';
import Logo from '../../assets/guidemedoc-logo.png';
import HeroImage from '../../assets/login-hero.png';
import {MdCall} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import * as auth_service from "../../service/auth_service";
import {loginvalidationSchema} from "./authValidation";
function LoginScreen() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState();


    const [formValues,setFormValues] = useState({
        mobile:""
    });

    const handleChange = (e) => {
        let {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const validate = async (values) => {
        try {
            await loginvalidationSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            
            return errObj;
        }
    }; 
    const handleSubmit =async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        if(Object.keys(err).length === 0){
            const req ={
                login_id:formValues.mobile,

            }
            const login = await auth_service.login(req)
            if(login.payload){
                localStorage.setItem('login_patient', JSON.stringify(login.payload));
                navigate('/');
            }
            else{
                alert(login.message)
            }
            
        }
        
        
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
                        <div className='col-md-4 col-11 offset-md-1'>
                            <img src={HeroImage} width="100%" alt='company-logo' />
                        </div>
                        <div className='col-md-4 col-11 offset-md-2 mt-5 mt-lg-0'>
                            <div className="login-form-container d-flex flex-column align-items-center">
                                <h1 className='heading'>Welcome!</h1>
                                <div className='sub-heading mt-3 mb-2'>
                                    <p>Login to Guide Me Doc</p>
                                </div>
                                <Form onSubmit={e => handleSubmit(e)} className="login-form">                                        
                                        <Form.Group>
                                            <div className="prepend-icon-auth">
                                                <MdCall />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="mobile"
                                                placeholder='Enter Your Mobile Number'
                                                onChange={handleChange}
                                                value={formValues.mobile}
                                                className="grey-inputs"
                                                isInvalid={errors?.mobile}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.mobile}</Form.Control.Feedback>
                                        </Form.Group>
                                    <div className='text-center mt-4'>
                                        <input className="login-submit" type="submit" value="LOGIN" />
                                    </div>
                                </Form>
                                <div className='sub-heading mt-4'>
                                    <p>New User ?</p>
                                </div>
                                <button className="sign-up-button"  onClick={() => navigate("/sign-up")}>
                                    SIGN UP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="footer-row">
            </div>
        </>
     );
}

export default LoginScreen;
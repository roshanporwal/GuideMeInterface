import React from 'react';
import { useState } from 'react';
import { Container, Row ,Col, Form} from 'react-bootstrap';
import Logo from '../../assets/guidemedoc-logo.png';
import HeroImage from '../../assets/login-hero.png';
import {MdCall,MdPassword} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import * as auth_service from "../../service/auth_service";
import {loginvalidationSchema} from "./authValidation";
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'

function LoginScreen() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState();


    const [formValues,setFormValues] = useState({
        mobile:"",
        otp:""
    });

    const handleChange = (e) => {
        let {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const handleNumber = (e) => {
        if(e)
            formValues.mobile = e.toString()
    }
    const [login,setLogin] = useState()
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
        if (Object.keys(err).length === 0) {
            if(login){
                if(Number(formValues.otp) === login.otp){
                    localStorage.setItem('login_patient', JSON.stringify(login));
                    navigate("/")
                }
                else{
                    alert("Incorrect OTP entered!")
                }
            }
            else{
                const req = {
                    login_id: formValues.mobile,
                    name: formValues.name
                }
                const temp = await auth_service.login(req)
                if(temp.payload){
                    setLogin(temp.payload)
                }
                else{
                    alert(temp.message)
                }
            }
        }        
    }
    return ( 
        <>
        {/* {console.log(login)} */}
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
                                            <Input
                                                name="mobile"
                                                placeholder='Enter Your Mobile Number'
                                                onChange={handleNumber}
                                                value={formValues.mobile}
                                                className="grey-inputs form-control"
                                                isinvalid={errors?.mobile}
                                            />
                                            {errors?.mobile ? (
                                                <Form.Label style={{ color: "red" }} type="valid">
                                                    {errors?.mobile}
                                                </Form.Label>
                                            ) : null}
                                        </Form.Group>
                                        { login ? <Form.Group className = "mt-4">
                                            <div className="prepend-icon-auth">
                                                <MdPassword />
                                            </div>
                                            <Form.Control 
                                                type = "number"
                                                autoComplete="one-time-code"
                                                pattern="\d{6}"
                                                name="otp"
                                                placeholder='Enter OTP'
                                                onChange={handleChange}
                                                value={formValues.otp}
                                                className="grey-inputs"
                                                isInvalid={errors?.otp}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.mobile}</Form.Control.Feedback>
                                        </Form.Group> : null }
                                        <div className='text-center mt-4'>
                                            <input className="login-submit" type="submit" value={login ? "LOGIN":"SEND OTP"}  />
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
import React from 'react';
import { useState } from 'react';
import { Container, Row ,Col, Form} from 'react-bootstrap';
import Logo from '../../assets/guidemedoc-logo.png';
import HeroImage from '../../assets/login-hero.png';
import {FaUserAlt} from 'react-icons/fa'
import {MdCall,MdUploadFile,MdEmail,MdTransgender,MdFlag} from 'react-icons/md'
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import * as auth_service from "../../service/auth_service";
import {signupvalidationSchema} from "./authValidation";
function SignUpScreen() {
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
            await signupvalidationSchema.validate(values, { abortEarly: false });
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
        console.log(formValues);
        const err = await validate(formValues);
        setErrors(err);
        if(Object.keys(err).length === 0){
            const req ={
                login_id:formValues.mobile,
                name:formValues.name
            }
            const createaccount = await auth_service.createaccount( req)
            console.log(createaccount)
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
                        <div className='col-md-4 mt-5 mt-lg-0'>
                            <div className="login-form-container d-flex flex-column align-items-center">
                                <div className='sub-heading mt-3 mb-2'>
                                    <h5>Create An Account</h5>
                                </div>
                                <Form onSubmit={e => handleSubmit(e)} className="login-form">                                        
                                <div className="row  align-items-center justify-content-center">
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                                <FaUserAlt />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="name"
                                                placeholder='Full Name'
                                                onChange={handleChange}
                                                value={formValues.name}
                                                className="signup-inputs"
                                                isInvalid={errors?.name}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.name}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                                <MdCall />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="mobile"
                                                placeholder='Mobile Number'
                                                onChange={handleChange}
                                                value={formValues.mobile}
                                                className="signup-inputs"
                                                isInvalid={errors?.mobile}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.mobile}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div> 
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                                <MdEmail/>
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="emailid"
                                                placeholder='Email Id'
                                                onChange={handleChange}
                                                value={formValues.emailid}
                                                className="signup-inputs"
                                                isInvalid={errors?.emailid}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.emailid}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>  
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                            <FaUserAlt />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="age"
                                                placeholder='Age'
                                                onChange={handleChange}
                                                value={formValues.age}
                                                className="signup-inputs"
                                                isInvalid={errors?.age}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.age}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div> 
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                                <MdTransgender />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="gender"
                                                placeholder='Gender'
                                                onChange={handleChange}
                                                value={formValues.gender}
                                                className="signup-inputs"
                                                isInvalid={errors?.gender}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.gender}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div> 
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                            <FaUserAlt />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="referrefby"
                                                placeholder='Pt referred by'
                                                onChange={handleChange}
                                                value={formValues.referrefby}
                                                className="signup-inputs"
                                                isInvalid={errors?.referrefby}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.referrefby}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div> 
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                        <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                                <MdFlag />
                                            </div>
                                            <Form.Control 
                                                type='text'
                                                name="nationality"
                                                placeholder='Nationality'
                                                onChange={handleChange}
                                                value={formValues.nationality}
                                                className="signup-inputs"
                                                isInvalid={errors?.nationality}
                                            />
                                            <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.nationality}</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>  
                                    <div className='col-md-6 mt-5 mt-lg-0'>
                                         <Form.Group className='my-3'>
                                            <div className="prepend-icon-auth">
                                            <MdUploadFile />
                                            </div>                
                                            <div  role="button" className='global-file-input'>
                                                <p>Upload Documents</p>
                                            </div>
                                            <input
                                                type="file"
                                                name="insurance"  
                                                accept="image/*,application/pdf"
                                                style={{ display: 'none' }}
                                            />      
                                        </Form.Group>   
                                    </div>  
                                </div>        
                                        
                                        
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
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { MdCall, MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { loginvalidationSchema } from '../Auth/authValidation';
import * as auth_service from "../../service/auth_service";
import HeroImage from '../../assets/login-hero.png';


function InnerLayout(props) {
    const data = JSON.parse(localStorage.getItem("login_patient"))

    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        mobile: "",
        name: ''
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            const req = {
                login_id: formValues.mobile,
                name: formValues.name
            }
            const login = await auth_service.login(req)
            if (login.payload) {
                localStorage.setItem('login_patient', JSON.stringify(login.payload));
                window.location.reload(true)
            }

        }


    }
    return (
        <div>
            {data === null ? 
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
        </Container> :
                <Container>
                    <div className="mt-4">
                        <div className="row  align-items-stretch justify-content-around">
                            <div className='col-md-4 col-11'>
                                <div className='h-100 text-center d-flex flex-column justify-content-between align-items-center'>
                                    <div className='mt-5'>
                                        <div>
                                            <Form.Group className="my-2">
                                                <div className="prepend-icon-auth">
                                                    <MdAccountCircle />
                                                </div>
                                                <Form.Control
                                                    type='text'
                                                    name="mobile"
                                                    placeholder='Enter Your name'
                                                    value={data.name}
                                                    className="grey-inputs"
                                                    disabled={true}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <div className="prepend-icon-auth">
                                                    <MdCall />
                                                </div>
                                                <Form.Control
                                                    type='text'
                                                    name="mobile"
                                                    placeholder='Enter Your Mobile Number'
                                                    value={data.login_id}
                                                    className="grey-inputs"
                                                    disabled={true}
                                                />
                                            </Form.Group>

                                        </div>
                                        </div>
                                        <div>
                                            <img src={props.HeroImage} width="100%" alt='company-logo' />
                                            <div className='my-1'>
                                                <h5>{props.pageName}</h5>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-1 divider-page"></div>
                                    <div className='col-md-5 col-11 mt-5 mt-lg-0' >
                                        <div className='d-flex align-items-center h-100 overflow-hidden'>

                                            {props.NestedComponent}
                                        </div>
                                    </div>

                            </div>
                        </div>
                    {/* </div> */}
                </Container>
            }
        </div>

    )
        }
    export default InnerLayout;
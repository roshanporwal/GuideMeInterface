import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { MdCall } from 'react-icons/md';
import { loginvalidationSchema } from '../Auth/authValidation';
import * as auth_service from "../../service/auth_service";

function InnerLayout(props) {
    const data = JSON.parse(localStorage.getItem("login")) 
    
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
                localStorage.setItem('login', JSON.stringify(login.payload));
                window.location.reload(true)
            }
            console.log(login)
            
        }
        
        console.log(formValues);
    }
    return ( 
        <div>
            {props.ThankYouModal}
            <Container>
                <div className="mt-4">
                    <div className="row  align-items-stretch justify-content-around">
                        <div className='col-md-4 col-11'>
                            <div className='h-100 text-center d-flex flex-column justify-content-between align-items-center'>
                                <div className='mt-5'>
                                    {data === null ? 
                                        <div>
                                            <div className='sub-heading mt-3 mb-2'>
                                                <p>Quick Login to Guide Me Doc</p>
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
                                        </div>
                                        : (
                                            <div>
                                                <Form.Group className="my-2">
                                                    <div className="prepend-icon-auth">
                                                        <MdCall />
                                                    </div>
                                                    <Form.Control 
                                                        type='text'
                                                        name="mobile"
                                                        placeholder='Enter Your Mobile Number'
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
                                        ) 
                                    }
                                </div>

                                    <div>
                                        <img src={props.HeroImage} width="100%" alt='company-logo' />
                                        <div className='my-1'>
                                            <h5>{props.pageName}</h5>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-5 col-11 mt-5 mt-lg-0' >
                                <div className='d-flex align-items-center h-100 overflow-hidden'>
                                    {data === null ? 
                                        <div className="loader-wrapper">
                                            
                                        </div>
                                        : null 
                                    }
                                {props.NestedComponent}
                                </div>                            
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}

export default InnerLayout;
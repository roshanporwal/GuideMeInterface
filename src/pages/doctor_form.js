import React , {useState} from 'react';

import PATIENT_NAVBAR from './patient_navbar';
import {Form } from 'react-bootstrap';
import { doctorSchema } from '../components/Validations/doctorValidation';

function DOCTOR_FORM(props){
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValue] = useState({
        doctor_name: "",
        doctor_speciality: "",
        doctor_bio: "",
        doctor_photo: "",
    })
    
    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        validate(formValues);
    }
    const validate = async (values) => {
        try {

            await doctorSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    }; 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = await validate(formValues);
        const formData = new FormData();
       
      
        
        formData.append('formValues', JSON.stringify(formValues))
        
        console.log(formValues)
        setValidated(true);

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };
    return (
        <>
        
       
            <Form  noValidate validated={validated}  onSubmit = {handleSubmit}>
            <Form.Group>
            <Form.Label>Doctor Name</Form.Label>
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                        label="Doctor Name"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="doctor_name" 
                        id="doctor_name" 
                        value = {formValues.doctor_name}
                        />
            </Form.Group>
            <Form.Group style = {{marginTop: "4rem"}}>
            <Form.Label>Doctor Speciality</Form.Label>
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                        label="Speciality"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="doctor_speciality" 
                        id="doctor_speciality" 
                        value = {formValues.doctor_speciality}
                        />
            </Form.Group>
            <Form.Group  style = {{marginTop: "4rem"}}>
            <Form.Label>Doctor Bio</Form.Label>
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                        label="Bio"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="doctor_bio" 
                        id="doctor_bio" 
                        value = {formValues.doctor_bio}
                        />
            </Form.Group>
            <Form.Group  style = {{marginTop: "4rem"}}>
            <Form.Label>Doctor Photo</Form.Label>
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                        label="Add Photo"
                        className = "form-control"
                        onChange={handleChange} 
                        type="file" 
                        name="doctor_photo" 
                        id="doctor_photo" 
                        value={formValues.doctor_photo}/>
             </Form.Group>
            </Form>
           
        
      
        </>
    )
}

export default DOCTOR_FORM;
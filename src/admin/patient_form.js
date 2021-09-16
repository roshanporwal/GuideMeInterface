import React, { useState } from 'react';
import 'react-bootstrap';

import {validationSchema} from '../components/Validations/patientValidation';


import { Form, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './style.css'
import ADMIN_NAVBAR from "../Navbar/admin_navbar"


import  * as auth_service from "../services/auth_service";

function PATIENT_FORM(props) {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
   /*  const hiddenFileInput = React.useRef(null); */
    const handleOthersField =()=> {
        setShow(!show)
        console.log("clicked")
        console.log(show)
    }
    const handleOthersField1 =()=> {
        setShow1(!show1)
        console.log("clicked")
        console.log(show)
    }
    const handleOthersField2 =()=> {
        setShow2(!show2)
        console.log("clicked")
        console.log(show)
    }
    const history = useHistory();
    const [formValues, setFormValue] = useState({
        
        patient_name: "",
        patient_email: "",
        patient_referred_by: "",
        patient_mobile: "",
        patient_age: "",
        patient_gender: "",
        patient_nationality: "",
        patient_document: "",
        patient_reports: "",
        current_diagnosis: "",
        insurance_card_copy: "",
        medical_history: "",
        proposed_treatment_plan: [],
        other_plan: "",
        transport_support_needed: "",
        languages_spoken: [],
        other_languages: "",
        food_preferences: "",
        accomodation: "",
        preferred_hospital_visit: "",
        proposal_date: "",
        from_date: "",
        to_date: "",
        insurance_name:""
    })
    

    const [isSubmitting] = useState(false)
    const [patient_document, setPatient_document] = useState()
    const [patient_reports, setPatient_reports] = useState()
    const [insurance_card_copy, setInsurance_card_copy] = useState()
    const [proposed_treatment_plan, setProposed_treatment_plan] = useState([]);
    const [languages_spoken, setLanguages_spoken] = useState([]);
    const [errors, setErrors] = useState({});
    

    const [formErrors] = useState({
        patient_name: "",
        patient_email: "",
        patient_referred_by: "",
        patient_mobile: "",
        patient_age: "",
        patient_gender: "",
        patient_nationality: "",
        patient_document: "",
        patient_reports: "",
        current_diagnosis: "",
        insurance_card_copy: "",
        medical_history: "",
        proposed_treatment_plan: "",
        other_plan: "",
        transport_support_needed: "",
        languages_spoken: "",
        other_languages: "",
        food_preferences: "",
        accomodation: "",
        preferred_hospital_visit: "",
        proposal_date: "",
        from_date: "",
        to_date: "",
        insurance_name:""
    })

    






    function checkBox(name, value) {

        if (name === "proposed_treatment_plan") {
            if (proposed_treatment_plan.find(item => item === value)) {
                setProposed_treatment_plan(proposed_treatment_plan.filter(item => item !== value));

            } else {
                setProposed_treatment_plan(prevArray => [...prevArray, value]);
            }
        } else if (name === "languages_spoken") {
            if (languages_spoken.find(item => item === value)) {
                setLanguages_spoken(languages_spoken.filter(item => item !== value));

            } else {
                setLanguages_spoken(prevArray => [...prevArray, value]);
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const err = await validate(formValues);
        /*  console.log(err) */
         setErrors(err); 
         console.log("err")
         console.log(err) 
         console.log("err")
         if(Object.keys(err).length === 0){
             console.log(err.length)
         
         

        const formData = new FormData();
        formValues.proposed_treatment_plan = proposed_treatment_plan;
        formValues.languages_spoken = languages_spoken
        formValues.status="New"
      
        formData.append('patient_document', patient_document);
        formData.append('patient_reports', patient_reports);
        formData.append('insurance_card_copy', insurance_card_copy);
        formData.append('formValues', JSON.stringify(formValues))
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

        
         console.log(patient_reports)
         console.log(insurance_card_copy)
         setValidated(false);


        

          auth_service.enquries("admin",formData).then((enquire_data) => {

            console.log(enquire_data)
            if(enquire_data.payload){
              
               history.push({
                 pathname:'/admin/dashboard'
               });
           }else{
               setShow(true)
           }
          })
        
    };
}

     const handleChange = e => {
       
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        validate(formValues);
        
    } 
    /* const onchange = e => {
        const { name } = e.currentTarget
        if (name === 'patient_document') {
            setPatient_document(e.target.files[0])
        } else if (name === 'patient_reports') {
            setPatient_reports(e.target.files[0])
        } else {
            setInsurance_card_copy(e.target.files[0])
        }
    } */

    const validate = async (values) => {
        try {

            await validationSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    }; 
    const onchange = e => {
        const { name } = e.currentTarget

        if (name === 'patient_document') {
            setPatient_document(e.target.files[0])
        } else if (name === 'patient_reports') {
            setPatient_reports(e.target.files[0])
        } else {
            setInsurance_card_copy(e.target.files[0])
        }

    }
    return (
        <>
        <ADMIN_NAVBAR/>
          <div>{show ? (<Alert show={show} variant="danger" >
          <Alert.Heading>error</Alert.Heading></Alert>) : null}
            <div className="container">
                <div className="row">
            <div className="patient_form_container">
            
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="col-md-4">
                     
                        <Form.Group >
                        <Form.Label>Patient name</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                type="text"
                                name="patient_name"
                                value={formValues.patient_name}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_name}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_name}</Form.Control.Feedback>
                        </Form.Group>
                       
                        
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient email</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="email"
                                name="patient_email"
                                value={formValues.patient_email}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_email}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_email}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Preferred By</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="patient_referred_by"
                                value={formValues.patient_referred_by}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_referred_by}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_referred_by}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Mobile</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="patient_mobile"
                                value={formValues.patient_mobile}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_mobile}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_mobile}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Age</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="patient_age"
                                value={formValues.patient_age}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_age}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_age}</Form.Control.Feedback>
                        </Form.Group>
                        
                        
                      
                        <div style = {{marginTop: "2rem"}}>
                            <label>Patient Gender</label>
                            <div className = "d-flex"  style = {{border: "2px solid #164473", borderRadius: 10, height: "3rem"}}>
                            <Form.Check
                                label = "Male"
                                required
                                style = {{paddingLeft: "4rem"}}
                                type="radio"
                                name="patient_gender"
                                id = "male"
                                value="male"
                                onChange={handleChange}
                                isInvalid={!!errors.patient_gender}
                            />
                            <Form.Check
                                label="Female"
                                style = {{paddingLeft: "7rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="patient_gender" 
                                id="female" 
                                value="female"
                                isInvalid={!!errors.patient_gender}
                                />
                                
                            <Form.Check
                                label="Neutral"
                                style = {{paddingLeft: "7rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="patient_gender" 
                                id="neutral" 
                                value="neutral"
                                isInvalid = {!!errors.patient_gender}/>
                            </div>
                            <Form.Control.Feedback style= {{color:"red"}}>{errors?.patient_gender}</Form.Control.Feedback>
                            <div className="invalid-feedback">{formErrors.patient_gender}</div>
                        </div>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Nationality</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="patient_nationality"
                                value={formValues.patient_nationality}
                                onChange={handleChange}
                                isInvalid={!!errors.patient_nationality}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_nationality}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Identification Document</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="file"
                                name="patient_document"
                               /*  ref = {hiddenFileInput} */
                                onChange={onchange}
                                isInvalid={!!errors.patient_document}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_document}</Form.Control.Feedback>
                        </Form.Group>
                        {/* <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Reports</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="file"
                                name="patient_reports"
                              /*   ref={hiddenFileInput} */
                                onChange={onchange}
                                isInvalid={!!errors.patient_reports}
                            />
                            
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.patient_reports}</Form.Control.Feedback>
                        </Form.Group>
                       {/*  <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                        
                    </div>
                    <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Current Diagnosis</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="current_diagnosis"
                                value={formValues.current_diagnosis}
                                onChange={handleChange}
                                isInvalid={!!errors.current_diagnosis}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.current_diagnosis}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Insurance Name</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="insurance_name"
                                value={formValues.insurance_name}
                                onChange={handleChange}
                                isInvalid={!!errors.insurance_name}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.insurance_name}</Form.Control.Feedback>
                        </Form.Group>
                        
                       
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Insurance Card Copy</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="file"
                                name="insurance_card_copy"
                               /*  ref = {hiddenFileInput} */
                                onChange={onchange}
                                isInvalid={!!errors.insurance_card_copy}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.insurance_card_copy}</Form.Control.Feedback>
                        </Form.Group>
                        {/* <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                        
                       
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Patient Medical History</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="medical_history"
                                value={formValues.medical_history}
                                onChange={handleChange}
                                isInvalid={!!errors.medical_history}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.medical_history}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="pt-4 ">
                            <label>Proposed Treatment plan/requirement</label>
                            <div style = {{border: "2px solid #164473", padding:10, borderRadius: 10}}>
                            <div className="d-flex ml-4">
                                <Form.Check
                                label = "Surgical Consultation"
                                required
                                style={{ marginLeft: 0}}
                                type="checkbox"
                                name="proposed_treatment_Plan"
                                value={formValues.proposed_treatment_plan}
                                id = "surgical_consultation"
                                onChange={() => checkBox("proposed_treatment_plan", "surgical_consultation")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                            <Form.Check
                            label = "Admission"
                                required
                                style={{marginLeft: "20px"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "admission"
                                onChange={() => checkBox("proposed_treatment_plan", "admission")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                            </div>

                            <Form.Check
                                label = "Second Opinion of Consultation"
                                required
                                style={{marginLeft: "0px", marginTop: "1rem"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "second_opinion_of_consultation"
                                onChange={() => checkBox("proposed_treatment_plan", "second_opinion_of_consultation")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                            <Form.Check
                                label = "International Expert Opinion"
                                required
                                style={{marginLeft: "0px", marginTop: "1rem"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "international_expert_opinion"
                                onChange={() => checkBox("proposed_treatment_plan", "international_expert_opinino")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                            <div className="d-flex" style = {{marginTop: "1rem"}}>
                            <Form.Check
                                label = "Home Care Services"
                                required
                                style={{marginLeft: "0px"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "home_care_services"
                                onChange={() => checkBox("proposed_treatment_plan", "home_care_services")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                            <Form.Check
                                label = "Teleconsultation"
                                required
                                style={{marginLeft: "20px"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "teleconsultation"
                                onChange={() => checkBox("proposed_treatment_plan", "teleconsultation")}
                                isInvalid={!!errors.proposed_treatment_plan}
                            />
                                
                            </div>
                            <Form.Check
                                label = "Need multiple options to choos e the best"
                                required
                                style={{marginLeft: "0px", marginTop: "1rem"}}
                                type="checkbox"
                                name="proposed_treatment_plan"
                                value={formValues.proposed_treatment_plan}
                                id = "multiple_options"
                                onChange={() => checkBox("proposed_treatment_plan", "multiple_options")}
                                isInvalid={!!errors.proposed_treatment_plan}
                                
                            />
                            <Form.Check
                                label = "Others"
                                required
                                style={{marginLeft: "0px", marginTop: "1rem"}}
                                type="checkbox"
                                onChange = {handleOthersField}
                                value = {formValues.proposed_treatment_plan}
                                
                                
                            />
                            {show?
                           
                            <Form.Control

                                required
                                style={{ border: "2px solid #164473", borderRadius:10,  marginBottom: "10px", }}
                                type="text"
                                placeholder = "Please specify"
                                name="other_plan"
                                value={formValues.other_plan}
                                onChange={handleChange}
                                isInvalid={!!errors.other_plan}
                            /> : ""}
                                   
                               
                            
                        </div>
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.other_plan}</Form.Control.Feedback>
                              
                          

                        </div>
                        <div className="pt-4">
                            <label>Transport Facility Needed</label>
                            <div className="d-flex"  style = {{border: "2px solid #164473", borderRadius: 10}}>
                            <Form.Check
                                label = "Yes"
                                required
                                style = {{paddingLeft: "4rem"}}
                                type="radio"
                                name="transport_support_needed"
                                id = "yes"
                                value="yes"
                                onChange={handleChange}
                                isInvalid={!!errors.transport_support_needed}
                            />
                            <Form.Check
                                label="No"
                                style = {{paddingLeft: "10rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="transport_support_needed" 
                                id="no" 
                                value="no"
                                isInvalid={!!errors.transport_support_needed}
                                />
                                
                            <Form.Check
                                label="Maybe"
                                style = {{paddingLeft: "10rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="transport_support_needed" 
                                id="maybe" 
                                value="maybe"
                                isInvalid = {!!errors.transport_support_needed}/>
                            
                            </div>
                            <Form.Control.Feedback style= {{color:"red"}}>{errors?.transport_support_needed}</Form.Control.Feedback>
                        </div>
                        


                    </div>
                    <div className="col-md-4">
                        <div className="" style={{ border: "1px rgb(56, 56, 121)" }}>
                            <label>Language Spoken</label>
                            <div  style = {{border: "2px solid #164473", borderRadius: 10}}>
                            <div className="d-flex">
                            <Form.Check
                                label = "English"
                                required
                                style={{marginLeft: "20px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "english"
                                onChange={() => checkBox("languages_spoken", "english")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "Arabic"
                                required
                                style={{marginLeft: "45px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "arabic"
                                onChange={() => checkBox("languages_spoken", "arabic")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "Hindi"
                                required
                                style={{marginLeft: "60px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "hindi"
                                onChange={() => checkBox("languages_spoken", "hindi")}
                                isInvalid={!!errors.languages_spoken}
                            />
                            </div>
                            <div className="d-flex">
                            <Form.Check
                                label = "Urdu"
                                required
                                style={{marginLeft: "20px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "urdu"
                                onChange={() => checkBox("languages_spoken", "urdu")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "Tagaloug"
                                required
                                style={{marginLeft: "59px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "tagaloug"
                                onChange={() => checkBox("languages_spoken", "tagaloug")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "French"
                                required
                                style={{marginLeft: "41px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "french"
                                onChange={() => checkBox("languages_spoken", "french")}
                                isInvalid={!!errors.languages_spoken}
                            />
                            </div>
                            <div className="d-flex">
                            <Form.Check
                                label = "Afrikaans"
                                required
                                style={{marginLeft: "20px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "afrikaans"
                                onChange={() => checkBox("languages_spoken", "afrikaans")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "Malayalam"
                                required
                                style={{marginLeft: "30px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "malayalam"
                                onChange={() => checkBox("languages_spoken", "malayalam")}
                                isInvalid={!!errors.languages_spoken}
                            />
                                <Form.Check
                                label = "Bengali"
                                required
                                style={{marginLeft: "30px", marginTop: "1rem"}}
                                type="checkbox"
                                name="languages_spoken"
                                value={formValues.languages_spoken}
                                id = "bengali"
                                onChange={() => checkBox("languages_spoken", "bengali")}
                                isInvalid={!!errors.languages_spoken}
                            />
                             </div>
                             <div className="">
                            <Form.Check
                                label = "Others"
                                required
                                style={{marginLeft: "20px", marginTop: "1rem"}}
                                type="checkbox"
                                onChange = {handleOthersField1}
                                value = {formValues.languages_spoken}
                                
                            />
                           </div>
                            {show1?
                            <Form.Control 
                                    style={{border: "2px solid #164473", borderRadius: 10,   marginBottom: "10px"}}
                                    className ={`form-control ${formErrors.languages_spoken ? "is-invalid" : ""}`}
                                    onChange={handleChange} 
                                    type="text" 
                                    name="other_languages" 
                                    id="other_languages" 
                                    placeholder = "Please specify"
                                    value={formValues.other_languages}
                                    isInvalid = {!!errors.other_languages}
                                    />:""}
                            </div>
                            <Form.Control.Feedback style= {{color:"red"}}>{errors?.languages_spoken}</Form.Control.Feedback>
                            
                            <div className="invalid-feedback">{formErrors.languages_spoken}</div>
                        </div>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Food Preferences</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="text"
                                name="food_preferences"
                                value={formValues.food_preferences}
                                onChange={handleChange}
                                isInvalid={!!errors.food_preferences}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.food_preferences}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="invalid-feedback">{formErrors.food_preferences}</div>
                        <div className="pt-4">
                            <label>Accomodation / Other Logistic Support Needed</label>
                            <div className="d-flex"  style = {{border: "2px solid #164473", borderRadius: 10, padding:5}}>
                            <Form.Check
                                label = "Yes"
                                required
                                className="mb-0"
                                style = {{paddingLeft: "4rem"}}
                                type="radio"
                                name="accomodation"
                                id = "yes"
                                value="yes"
                                onChange={handleChange}
                                isInvalid={!!errors.accomodation}
                            />
                            <Form.Check
                                label="No"
                                style = {{paddingLeft: "8rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="accomodation" 
                                id="no" 
                                value="no"
                                isInvalid={!!errors.accomodation}
                                />
                                
                            <Form.Check
                                label="Maybe"
                                style = {{paddingLeft: "7rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="accomodation" 
                                id="maybe" 
                                value="maybe"
                                isInvalid = {!!errors.accomodation}/>                            
                                </div>
                            <Form.Control.Feedback style= {{color:"red"}}>{errors?.accomodation}</Form.Control.Feedback>
                        </div>
                        
                        <label style = {{marginTop: 5}}>Preferred Hospital Visit Type</label>
                        <div className="pt-2"  style = {{ border: "2px solid #164473", borderRadius: 10}}>
                           

                            <Form.Check
                                label="One Visit - All Services"
                                style = {{paddingLeft: "5rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="preferred_hospital_visit" 
                                id="one_visit" 
                                value="one_visit"
                                isInvalid={!!errors.preferred_hospital_visit}
                                />
                            <Form.Check
                                label="Multiple Visit - But Minimal Waiting"
                                style = {{paddingLeft: "5rem"}}
                                onChange={handleChange} 
                                type="radio" 
                                name="preferred_hospital_visit" 
                                id="multiple_visit" 
                                value="multiple_visit"
                                isInvalid={!!errors.preferred_hospital_visit}
                                />
                                <Form.Check
                                label="Others"
                                style = {{paddingLeft: "5rem"}}
                                onChange={handleOthersField2} 
                                type="radio" 
                                
                                />
                           {show2?
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10,  marginBottom: "10px"}}
                                type="text"
                                name="preferred_hospital_visit"
                                placeholder = "Please specify"
                                value={formValues.preferred_hospital_visit}
                                onChange={handleChange}
                                isInvalid={!!errors.preferred_hospital_visit}
                            />: ""}
                                     
                           
                            
                        </div>
                        <Form.Control.Feedback style= {{color:"red"}}>{errors?.preferred_hospital_visit}</Form.Control.Feedback>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Proposed Date to awail the services</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="date"
                                name="proposal_date"
                                value={formValues.proposal_date}
                                onChange={handleChange}
                                isInvalid={!!errors.proposal_date}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.proposal_date}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Planned Duration of the trip from</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="date"
                                name="from_date"
                                value={formValues.from_date}
                                onChange={handleChange}
                                isInvalid={!!errors.from_date}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.from_date}</Form.Control.Feedback>
                        </Form.Group>
                       
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Label>Planned Duration of the trip to</Form.Label>
                            <Form.Control
                                required
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                type="date"
                                name="to_date"
                                value={formValues.to_date}
                                onChange={handleChange}
                                isInvalid={!!errors.to_date}
                            />
                             <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.to_date}</Form.Control.Feedback>
                        </Form.Group>
                       

                    </div>
                    <div className = "offset-col-md-4 col-md-4">
                         <button className="patient_submit" disabled={isSubmitting} type="submit" onClick={handleSubmit}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                    </div>
                </Form>
            </div>
            </div>
            </div>
            </div><br /><br /><br /><br />
        </>
    )
}



export default PATIENT_FORM;
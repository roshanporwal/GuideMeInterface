import React, { useState } from 'react';
import 'react-bootstrap';

import { validationSchema } from '../interfacecomponents/Validations/patientValidation';


import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css'
import ADMIN_NAVBAR from "../Navbar/admin_navbar"


import * as auth_service from "../services/auth_service";

function PATIENT_FORM(props) {
    const [validated, setValidated] = useState(false);
    const [fileprocess, setFileProcess] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [showpatientreffered, showPatientRefferedBy] = useState(false);
    const [patientrefferedtext, setPatientRefferedByText] = useState(" ");

    /*  const hiddenFileInput = React.useRef(null); */
    const handleOthersField = () => {
        setShow(!show)
    }
    const handleOthersField1 = () => {
        setShow1(!show1)
    }
    const handleOthersField2 = () => {
        setShow2(!show2)
    }
    const handleOthersField3 = () => {
        setShow3(!show3)
    }
    const navigate = useNavigate();
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

        // insurance_card_copy: "",
        medical_history: "",
        proposed_treatment_plan: [],
        other_plan: "",
        transport_support_needed: "",
        languages_spoken: [],
        other_languages: "",
        food_preferences: "",
        accomodation: "",
        airport_transfer_needed: "",
        ambulance_support_needed: "",
        medical_visa_arrangements: "",
        preferred_hospital_visit: "",
        proposal_date: "",
        from_date: "",
        to_date: "",
        insurance_name: ""
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
        // insurance_card_copy: "",
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
        insurance_name: ""
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

        let old_value = formValues["patient_referred_by"];
        setFormValue(prevState => ({
            ...prevState,
            patient_referred_by: old_value + " " + patientrefferedtext
        }))


        const form = event.currentTarget;
        const err = await validate(formValues);
        setErrors(err);


        if (Object.keys(err).length === 0) {
            var r = window.confirm("Confirm if all entered details are correct");
            if (r === true) {
                const formData = new FormData();
                formValues.proposed_treatment_plan = proposed_treatment_plan;
                formValues.languages_spoken = languages_spoken;
                formValues.status = "New";
                formData.append('patient_document', patient_document);
                if (patient_reports !== undefined) {
                    for (const tp of patient_reports) {
                        formData.append('patient_reports', tp);
                    }
                }
                
                formData.append('insurance_card_copy', insurance_card_copy);
                formData.append('formValues', JSON.stringify(formValues));
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                setFileProcess(!fileprocess)
                setValidated(false);
                auth_service.enquries("admin", formData).then((enquire_data) => {
                    if (enquire_data.payload) {
                        navigate('/admin/dashboard')
                    } else {
                        setShow(true)
                    }
                })
            }
        }
    }

    const handleRefferedByTextChange = e => {
        const { value } = e.currentTarget;
        setPatientRefferedByText(value)
    }

    const handleChange = e => {

        const { name, value } = e.currentTarget

        if (name === "patient_referred_by") {
            if (value === "Internal reference" || value === "Patient reference" ||
                value === "Insurance" || value === "TPA") {
                showPatientRefferedBy(true);
                setFormValue(prevState => ({
                    ...prevState,
                    [name]: value
                }))
            }
            else {
                setFormValue(prevState => ({
                    ...prevState,
                    [name]: value
                }))
                showPatientRefferedBy(false);
                setPatientRefferedByText(" ");
            }
        }
        else {
            setFormValue(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
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
        /*  console.log(e.target.files[0].type);
          for (var i = 0; i < e.target.files.length; i++) {
              if(e.target.files[i].type === "image/png" || e.target.files[i].type === "application/pdf"){
                  continue;
              }
              else{
                  alert("Doc type should be image ");
                  e.target.value = '';
                  return null;
              }
          }*/

        if (name === 'patient_document') {
            setPatient_document(e.target.files[0])
        } else if (name === 'patient_reports') {
            setPatient_reports(e.target.files)
        } else {
            setInsurance_card_copy(e.target.files[0])
        }

    }
    return (
        <>
            <ADMIN_NAVBAR />
            <div>{show ? (<Alert show={show} variant="danger" >
                <Alert.Heading>error</Alert.Heading></Alert>) : null}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="PatientForm my-5">
                            <div className="row">
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
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_name}</Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient email</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="email"
                                            name="patient_email"
                                            value={formValues.patient_email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.patient_email}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_email}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Referred By</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10, marginBottom: 20 }}
                                            name="patient_referred_by"
                                            value={formValues.patient_referred_by}
                                            onChange={handleChange}
                                            isInvalid={!!errors.patient_referred_by}
                                        >
                                            <option value="">Select an option</option>
                                            <option value="Internal reference">Internal reference</option>
                                            <option value="Patient reference">Patient reference</option>
                                            <option value="Social media">Social media</option>
                                            <option value="Insurance">Insurance</option>
                                            <option value="TPA">TPA</option>
                                        </Form.Control>
                                        {showpatientreffered ? (
                                            <>
                                                <Form.Label>Enter more details</Form.Label>

                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    value={patientrefferedtext}
                                                    onChange={handleRefferedByTextChange}
                                                    isInvalid={!!errors.patient_referred_by}
                                                /> </>)
                                            : null}
                                        {/* <Form.Control
                                    required
                                    style={{ border: "2px solid #164473", borderRadius: 10}}
                                    type="text"
                                    name="patient_referred_by"
                                    value={formValues.patient_referred_by}
                                    onChange={handleChange}
                                    isInvalid={!!errors.patient_referred_by}
                                /> */}
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_referred_by}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Mobile</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="patient_mobile"
                                            value={formValues.patient_mobile}
                                            onChange={handleChange}
                                            isInvalid={!!errors.patient_mobile}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_mobile}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Age</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="patient_age"
                                            value={formValues.patient_age}
                                            onChange={handleChange}
                                            isInvalid={!!errors.patient_age}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_age}</Form.Control.Feedback>
                                    </Form.Group>



                                    <div style={{ marginTop: "0.5rem" }}>
                                        <label>Patient Gender</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Male"
                                                        required
                                                        type="radio"
                                                        name="patient_gender"
                                                        id="male"
                                                        value="male"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.patient_gender}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Female"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="patient_gender"
                                                        id="female"
                                                        value="female"
                                                        isInvalid={!!errors.patient_gender}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Neutral"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="patient_gender"
                                                        id="neutral"
                                                        value="neutral"
                                                        isInvalid={!!errors.patient_gender} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.patient_gender}</Form.Control.Feedback>
                                        <div className="invalid-feedback">{formErrors.patient_gender}</div>
                                    </div>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Nationality</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="patient_nationality"
                                            value={formValues.patient_nationality}
                                            onChange={handleChange}
                                            isInvalid={!!errors.patient_nationality}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_nationality}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Identification Document</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="file"
                                            name="patient_document"
                                            accept="image/*,application/pdf"
                                            /*  ref = {hiddenFileInput} */
                                            onChange={onchange}
                                            isInvalid={!!errors.patient_document}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_document}</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Reports</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="file"
                                            name="patient_reports"
                                            multiple
                                            accept="image/*,application/pdf"
                                            /*   ref={hiddenFileInput} */
                                            onChange={onchange}
                                            isInvalid={!!errors.patient_reports}
                                        />

                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.patient_reports}</Form.Control.Feedback>
                                    </Form.Group>
                                    {/*  <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                                    <div className="pt-2">
                                        <label className="form-label">Airport Transport needed(applicable to international patients)</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        className="mb-0"
                                                        type="radio"
                                                        name="airport_transfer_needed"
                                                        id="yes"
                                                        value="yes"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.airport_transfer_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="airport_transfer_needed"
                                                        id="no"
                                                        value="no"
                                                        isInvalid={!!errors.airport_transfer_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Maybe"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="airport_transfer_needed"
                                                        id="maybe"
                                                        value="maybe"
                                                        isInvalid={!!errors.airport_transfer_needed} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.airport_transfer_needed}</Form.Control.Feedback>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Current Diagnosis</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="current_diagnosis"
                                            value={formValues.current_diagnosis}
                                            onChange={handleChange}
                                            isInvalid={!!errors.current_diagnosis}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.current_diagnosis}</Form.Control.Feedback>
                                    </Form.Group>
                                    <label className="form-label" style={{ marginTop: "0.5rem" }}>Cash or Insurance(Insurance Name)</label>
                                    <div className="pt-2" style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Form.Check
                                                    label="Cash"
                                                    onChange={handleChange}
                                                    type="radio"
                                                    name="insurance_name"
                                                    id="cash"
                                                    value="cash"
                                                    isInvalid={!!errors.insurance_name}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Form.Check
                                                    label="Insurance"
                                                    onChange={handleOthersField3}
                                                    type="radio"
                                                    name="insurance_name"
                                                    id="insurance"
                                                    value="insurance"
                                                    isInvalid={!!errors.insurance_name}
                                                />
                                            </div>
                                        </div>
                                        {show3 ?
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Form.Control
                                                        placeholder="Please Enter Insurance Name"
                                                        required
                                                        style={{ border: "2px solid #164473", borderRadius: 10, marginLeft: "0px", marginBottom: "1rem" }}
                                                        type="text"
                                                        name="insurance_name"
                                                        value={formValues.insurance_name}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.insurance_name}
                                                    />
                                                </div>
                                            </div> : ""}
                                    </div>
                                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.cash_or_insurance}</Form.Control.Feedback>




                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Insurance Card Copy</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="file"
                                            name="insurance_card_copy"
                                            accept="image/*,application/pdf"
                                            /*  ref = {hiddenFileInput} */
                                            onChange={onchange}
                                            isInvalid={!!errors.insurance_card_copy}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.insurance_card_copy}</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* <button onClick = {handleChange} className = "join_button">Upload<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}


                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Patient Medical History</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="medical_history"
                                            value={formValues.medical_history}
                                            onChange={handleChange}
                                            isInvalid={!!errors.medical_history}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.medical_history}</Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="pt-2 ">
                                        <label className="form-label">Proposed Treatment plan/requirement</label>
                                        <div style={{ border: "2px solid #164473", padding: "20px 10px", borderRadius: 10 }}>
                                            <div className="d-flex mb-1">
                                                <Form.Check
                                                    label="Surgical Consultation"
                                                    required
                                                    style={{ marginLeft: 0 }}
                                                    type="checkbox"
                                                    name="proposed_treatment_Plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="surgical_consultation"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Surgical Consultation")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                />
                                                <Form.Check
                                                    label="Admission"
                                                    required
                                                    style={{ marginLeft: "10px" }}
                                                    type="checkbox"
                                                    name="proposed_treatment_plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="admission"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Admission")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                />
                                            </div>
                                            <div className="d-flex mb-1">
                                                <Form.Check
                                                    label="Surgery"
                                                    required
                                                    style={{ marginBottom: 5 }}
                                                    type="checkbox"
                                                    name="proposed_treatment_plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="second_opinion_of_consultation"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Surgery")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                /><Form.Check
                                                    label="Consultation"
                                                    required
                                                    style={{ marginLeft: "10px" }}
                                                    type="checkbox"
                                                    name="proposed_treatment_plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="second_opinion_of_consultation"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Consultation")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                />
                                            </div>
                                            <Form.Check
                                                label="Second Opinion"
                                                required
                                                style={{ marginBottom: 5 }}
                                                type="checkbox"
                                                name="proposed_treatment_plan"
                                                value={formValues.proposed_treatment_plan}
                                                id="second_opinion_of_consultation"
                                                onChange={() => checkBox("proposed_treatment_plan", "Second Opinion of Consultation")}
                                                isInvalid={!!errors.proposed_treatment_plan}
                                            />
                                            <Form.Check
                                                label="International Expert Opinion"
                                                required
                                                style={{ marginBottom: 5 }}
                                                type="checkbox"
                                                name="proposed_treatment_plan"
                                                value={formValues.proposed_treatment_plan}
                                                id="international_expert_opinion"
                                                onChange={() => checkBox("proposed_treatment_plan", "International Expert Opinion")}
                                                isInvalid={!!errors.proposed_treatment_plan}
                                            />
                                            <div className="d-flex mb-1">
                                                <Form.Check
                                                    label="Home Care Services"
                                                    required
                                                    style={{ marginLeft: "0px" }}
                                                    type="checkbox"
                                                    name="proposed_treatment_plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="home_care_services"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Home Care Services")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                />
                                                <Form.Check
                                                    label="Teleconsultation"
                                                    required
                                                    style={{ marginLeft: "10px" }}
                                                    type="checkbox"
                                                    name="proposed_treatment_plan"
                                                    value={formValues.proposed_treatment_plan}
                                                    id="teleconsultation"
                                                    onChange={() => checkBox("proposed_treatment_plan", "Teleconsultation")}
                                                    isInvalid={!!errors.proposed_treatment_plan}
                                                />

                                            </div>
                                            <Form.Check
                                                label="Need multiple options to choose the best"
                                                required
                                                style={{ marginBottom: 5 }}
                                                type="checkbox"
                                                name="proposed_treatment_plan"
                                                value={formValues.proposed_treatment_plan}
                                                id="multiple_options"
                                                onChange={() => checkBox("proposed_treatment_plan", "multiple_options")}
                                                isInvalid={!!errors.proposed_treatment_plan}

                                            />
                                            <Form.Check
                                                label="Others"
                                                required
                                                style={{ marginBottom: 5 }}
                                                type="checkbox"
                                                onChange={handleOthersField}
                                                value={formValues.proposed_treatment_plan}


                                            />
                                            {show ?

                                                <Form.Control

                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10, marginBottom: "10px", }}
                                                    type="text"
                                                    placeholder="Please specify"
                                                    name="other_plan"
                                                    value={formValues.other_plan}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.other_plan}
                                                /> : ""}



                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.other_plan}</Form.Control.Feedback>



                                    </div>
                                    <div className="pt-2">
                                        <label className="form-label">Transport Facility Needed</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        type="radio"
                                                        name="transport_support_needed"
                                                        id="yes"
                                                        value="yes"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.transport_support_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="transport_support_needed"
                                                        id="no"
                                                        value="no"
                                                        isInvalid={!!errors.transport_support_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Maybe"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="transport_support_needed"
                                                        id="maybe"
                                                        value="maybe"
                                                        isInvalid={!!errors.transport_support_needed} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.transport_support_needed}</Form.Control.Feedback>
                                    </div>
                                    <div className="pt-2">
                                        <label className="form-label">Ambulance Support Needed(Applicable to international patients)</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        // className="mb-0"
                                                        type="radio"
                                                        name="ambulance_support_needed"
                                                        id="yes"
                                                        value="yes"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.ambulance_support_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="ambulance_support_needed"
                                                        id="no"
                                                        value="no"
                                                        isInvalid={!!errors.ambulance_support_needed}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Maybe"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="ambulance_support_needed"
                                                        id="maybe"
                                                        value="maybe"
                                                        isInvalid={!!errors.ambulance_support_needed} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.ambulance_support_needed}</Form.Control.Feedback>
                                    </div>


                                </div>
                                <div className="col-md-4">
                                    <div className="" style={{ border: "1px rgb(56, 56, 121)" }}>
                                        <label className="form-label"> Language Spoken</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: "20px 10px" }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="English"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="english"
                                                        onChange={() => checkBox("languages_spoken", "English")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Arabic"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="arabic"
                                                        onChange={() => checkBox("languages_spoken", "Arabic")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Hindi"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="hindi"
                                                        onChange={() => checkBox("languages_spoken", "Hindi")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Urdu"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="urdu"
                                                        onChange={() => checkBox("languages_spoken", "Urdu")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Tagaloug"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="tagaloug"
                                                        onChange={() => checkBox("languages_spoken", "Tagaloug")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="French"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="french"
                                                        onChange={() => checkBox("languages_spoken", "French")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Afrikaans"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="afrikaans"
                                                        onChange={() => checkBox("languages_spoken", "Afrikaans")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Malayalam"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="malayalam"
                                                        onChange={() => checkBox("languages_spoken", "Malayalam")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Bengali"
                                                        required
                                                        type="checkbox"
                                                        name="languages_spoken"
                                                        value={formValues.languages_spoken}
                                                        id="bengali"
                                                        onChange={() => checkBox("languages_spoken", "Bengali")}
                                                        isInvalid={!!errors.languages_spoken}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Others"
                                                        required
                                                        type="checkbox"
                                                        onChange={handleOthersField1}
                                                        value={formValues.languages_spoken}
                                                    />
                                                </div>
                                            </div>
                                            {show1 ?
                                                <Form.Control
                                                    style={{ border: "2px solid #164473", borderRadius: 10, marginBottom: "10px" }}
                                                    className={`form-control ${formErrors.languages_spoken ? "is-invalid" : ""}`}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="other_languages"
                                                    id="other_languages"
                                                    placeholder="Please specify"
                                                    value={formValues.other_languages}
                                                    isInvalid={!!errors.other_languages}
                                                /> : ""}
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.languages_spoken}</Form.Control.Feedback>

                                        <div className="invalid-feedback">{formErrors.languages_spoken}</div>
                                    </div>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Food Preferences</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="text"
                                            name="food_preferences"
                                            value={formValues.food_preferences}
                                            onChange={handleChange}
                                            isInvalid={!!errors.food_preferences}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.food_preferences}</Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="invalid-feedback">{formErrors.food_preferences}</div>
                                    <div className="pt-2">
                                        <label className="form-label">Accomodation / Other Logistic Support Needed</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        className="mb-0"
                                                        type="radio"
                                                        name="accomodation"
                                                        id="yes"
                                                        value="yes"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.accomodation}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="accomodation"
                                                        id="no"
                                                        value="no"
                                                        isInvalid={!!errors.accomodation}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Maybe"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="accomodation"
                                                        id="maybe"
                                                        value="maybe"
                                                        isInvalid={!!errors.accomodation} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.accomodation}</Form.Control.Feedback>
                                    </div>
                                    <div className="pt-2">
                                        <label className="form-label">Medical Visa Arrangement(Applicable to international patients)</label>
                                        <div style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        className="mb-0"
                                                        type="radio"
                                                        name="medical_visa_arrangements"
                                                        id="yes"
                                                        value="yes"
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.medical_visa_arrangements}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="medical_visa_arrangements"
                                                        id="no"
                                                        value="no"
                                                        isInvalid={!!errors.medical_visa_arrangements}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Maybe"
                                                        onChange={handleChange}
                                                        type="radio"
                                                        name="medical_visa_arrangements"
                                                        id="maybe"
                                                        value="maybe"
                                                        isInvalid={!!errors.medical_visa_arrangements} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.medical_visa_arrangements}</Form.Control.Feedback>
                                    </div>

                                    <label className="form-label" style={{ marginTop: 5 }}>Preferred Hospital Visit Type</label>
                                    <div className="pt-2" style={{ border: "2px solid #164473", borderRadius: 10, padding: 10 }}>


                                        <Form.Check
                                            label="One Visit - All Services"
                                            onChange={handleChange}
                                            type="radio"
                                            name="preferred_hospital_visit"
                                            id="one_visit"
                                            value="one_visit"
                                            isInvalid={!!errors.preferred_hospital_visit}
                                        />
                                        <Form.Check
                                            label="Multiple Visit - But Minimal Waiting"
                                            onChange={handleChange}
                                            type="radio"
                                            name="preferred_hospital_visit"
                                            id="multiple_visit"
                                            value="multiple_visit"
                                            isInvalid={!!errors.preferred_hospital_visit}
                                        />
                                        <Form.Check
                                            label="Others"
                                            onChange={handleOthersField2}
                                            type="radio"

                                        />
                                        {show2 ?
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10, marginBottom: "10px" }}
                                                type="text"
                                                name="preferred_hospital_visit"
                                                placeholder="Please specify"
                                                value={formValues.preferred_hospital_visit}
                                                onChange={handleChange}
                                                isInvalid={!!errors.preferred_hospital_visit}
                                            /> : ""}



                                    </div>
                                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.preferred_hospital_visit}</Form.Control.Feedback>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Propose date to avail the service</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="date"
                                            name="proposal_date"
                                            value={formValues.proposal_date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.proposal_date}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.proposal_date}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Planned Duration of the trip from</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="date"
                                            name="from_date"
                                            value={formValues.from_date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.from_date}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.from_date}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group style={{ marginTop: "0.5rem" }}>
                                        <Form.Label>Planned Duration of the trip to</Form.Label>
                                        <Form.Control
                                            required
                                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                            type="date"
                                            name="to_date"
                                            value={formValues.to_date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.to_date}
                                        />
                                        <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.to_date}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row my-5 justify-content-center">
                                <div className="col-md-2 text-center">
                                    <button className="patientsubmit" disabled={isSubmitting} type="submit" onClick={handleSubmit}>{fileprocess ? <i style={{ fontSize: 18, marginLeft: 10 }} className="fa fa-refresh fa-spin"></i> : "Submit"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}



export default PATIENT_FORM;
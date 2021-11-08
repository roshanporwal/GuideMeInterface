import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { quoteSchema } from '../components/Validations/quoteValidation';
//import InputField from '../components/input';
//import RadioField from '../components/radio';
import * as auth_service from "../services/auth_service";
import { Form } from 'react-bootstrap';
import HospitalNavbar from "../Navbar/hospital_navbar";
import './style.css'
import ReactGifLoader from '../components/gif_loader';


const res = {
    "patient_details": [
        {
            "id": 1,
            "patient_name": "Bessie Cooper",
            "patient_phone": "(316) 555 0116",
            "patient_email": "bessie.c@gmail.com",
            "patient_age": "31",
            "patient_gender": "female",
            "patient_nationality": "USA",
            "patient_language": "English"
        },

    ],

    "patient_preferences": [
        {
            "id": 1,
            "patient_requirements": "International Expert Opinion",
            "patient_location": "USA",
            "Proposed_date": "23/02/2021",
            "transport_support_needed": "yes",
            "accomodation_other_logistic": "yes",
            "preferred_hospital_visit_type": "multiple visits",
            "food_preferrences": "non-veg, allergic"
        },
    ],

    "queries": [
        {
            "query": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ligula turpis, dapibus sed enim id, pulvinar pharetra turpis. Vivamus condimentum mauris nec nunc feugiat sagittis. Praesent leo ex, ultrices at euismod quis, consequat id mauris. Aenean id lacinia lorem, at pellentesque arcu. Donec imperdiet erat malesuada tellus volutpat ultricies. Quisque urna enim, luctus quis placerat at, venenatis ultricies sapien. In sed tellus non leo interdum faucibus. Sed congue, felis vitae elementum interdum, mi neque faucibus tellus, venenatis varius dolor erat ut eros. Donec non maximus ante, vitae volutpat mi. Suspendisse potenti. Suspendisse lobortis, sapien vel accumsan fermentum, turpis enim consectetur risus, at porta turpis turpis ut urna. Nam ligula orci, tincidunt vitae ante sit amet, mattis volutpat sem. Phasellus interdum rhoncus nulla vitae aliquet. Pellentesque nunc sem, mollis quis lacus eu, malesuada eleifend urna. Morbi et ipsum sit amet tellus ultrices ullamcorper. Cras bibendum a dolor vel sodales. Quisque porttitor sed dolor in commodo. Integer id placerat libero. In posuere blandit nunc, at vehicula enim facilisis sit amet. Nulla justo libero, egestas et magna vel, commodo egestas mauris. Aenean et lacus ultrices enim laoreet fringilla. Etiam porttitor vehicula odio, quis mattis risus posuere quis. Nam accumsan, leo venenatis tincidunt lacinia, mauris arcu ultrices eros, in volutpat neque magna sed augue.",
        }
    ],

    "medical_history": [
        {
            "med1": "Diabetes",
            "med2": "Hypertension",
            "med3": "Bloodpressure",
            "status": "New"
        }
    ],
    "diagnosis": [
        {
            "current_diagnosis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ligula turpis, dapibus sed enim id, pulvinar pharetra turpis. Vivamus condimentum mauris nec nunc feugiat sagittis. Praesent leo ex, ultrices at euismod quis, consequat id mauris. Aenean id lacinia lorem, at pellentesque arcu. Donec imperdiet erat malesuada tellus volutpat ultricies. Quisque urna enim, luctus quis placerat at, venenatis ultricies sapien. In sed tellus non leo interdum faucibus. Sed congue, felis vitae elementum interdum, mi neque faucibus tellus, venenatis varius dolor erat ut eros. Donec non maximus ante, vitae volutpat mi. Suspendisse potenti. Suspendisse lobortis, sapien vel accumsan fermentum, turpis enim consectetur risus, at porta turpis turpis ut urna. Nam ligula orci, tincidunt vitae ante sit amet, mattis volutpat sem. Phasellus interdum rhoncus nulla vitae aliquet. Pellentesque nunc sem, mollis quis lacus eu, malesuada eleifend urna. Morbi et ipsum sit amet tellus ultrices ullamcorper. Cras bibendum a dolor vel sodales. Quisque porttitor sed dolor in commodo. Integer id placerat libero. In posuere blandit nunc, at vehicula enim facilisis sit amet. Nulla justo libero, egestas et magna vel, commodo egestas mauris. Aenean et lacus ultrices enim laoreet fringilla. Etiam porttitor vehicula odio, quis mattis risus posuere quis. Nam accumsan, leo venenatis tincidunt lacinia, mauris arcu ultrices eros, in volutpat neque magna sed augue.",
        }
    ],
    "doctor_checkbox": [
        {
            "doc1": "Dr Ashiya Leo",
            "doc2": "Dr Badami Sheetal",
            "doc3": "Dr Chatterji Manas",
            "doc4": "Dr abcd",
            "doc5": "Dr pqrs",
            "doc6": "Dr pqrs",
            "doc7": "Dr pqrs",
            "doc8": "Dr pqrs",
            "doc9": "Dr pqrs",
        }
    ],
    "anesthesiologist": [
        {
            "anes1": "Dr Ashiya Leo",
            "anes2": "Dr Badami Sheetal",
            "anes3": "Dr Chatterji Manas",
            "anes4": "Dr Chatterji Manas",
            "anes5": "Dr Chatterji Manas",
            "anes6": "Dr Chatterji Manas",
            "anes7": "Dr Chatterji Manas",
            "anes8": "Dr Chatterji Manas",
            "anes9": "Dr Chatterji Manas",
            "anes10": "Dr Chatterji Manas",
        }
    ],
}





function PATIENT_DASHBOARD(props) {


    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValue] = useState({
        select_doctor: "",
        select_anesthesiologist: "",
        treatment_plan: "",
        estimate_price: "",
        inclusion: "",
        exclusion: "",
        expected_length: "",
        estimate_copay: "",
        estimate_copay_percentage: "",
        translator: "",
        type_of_anesthesia: "",
        type_of_room: "",
        free_room_upgrade: "",
        free_physiotherapy: "",
        free_other_speciality_consultant: "",
        free_telephonic_feedback: "",
        free_annual_checkup: [],
        pickup_and_drop: "",
        free_patient_dedicated_relationship: "",
        benefits_for_patient: "",
        benefits_for_attendent: "",
        food_menu: "",
        confirmation: "",
        general_disclaimer: "",
        lenth_of_stay: "",
    })


    const [select_doctor, setSelect_doctor] = useState([]);
    const [select_anesthesiologist, setSelect_anesthesiologist] = useState([]);
    const [enqurie_data, setEnqurie_data] = useState([])
    const [errors, setErrors] = useState({});
    const [doctor, setDoctor] = useState([])
    const [free_annual_checkup, setFree_annual_checkup] = useState([])
    const [sendquote, setSendquote] = useState(true)
    const [sendquotebutton, setSendquotebutton] = useState(true)

    useEffect(() => {

        fetchData(props).then(() => setLoading(false));;
    }, [props]);


    async function fetchData(props) {

        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        const getenquriesbyid = await auth_service.getenquriesbyid(data.login_id, props.location.state)

        const getdoctor = await auth_service.getdoctorbyhospital(data._id, data.login_id)
        if(getdoctor.payload){
            setDoctor(getdoctor.payload)
          }
        const hospital_data = getenquriesbyid.payload[0].hospitals.find(item => item.hospital_id === data._id)
        getenquriesbyid.payload[0].status = hospital_data.status
        setEnqurie_data(getenquriesbyid.payload)

        if (hospital_data != null) {

            let ahospital_data = hospital_data.select_doctor ? setSelect_doctor(hospital_data.select_doctor) : null;
            await ahospital_data;
            ahospital_data = hospital_data.select_doctor ? setSendquote(false) : null;
            await ahospital_data;
            ahospital_data = hospital_data.select_doctor ? setFormValue(hospital_data) : null;
            await ahospital_data;
            ahospital_data = hospital_data.select_doctor ? setSendquotebutton(false) : null;
            await ahospital_data;
            ahospital_data = hospital_data.free_annual_checkup ? setFree_annual_checkup(hospital_data.free_annual_checkup) : null;
            await ahospital_data;
            ahospital_data = hospital_data.select_anesthesiologist ? setSelect_anesthesiologist(hospital_data.select_anesthesiologist) : null;
            await ahospital_data;
        }
    }





    function checkBox(name, value) {

        if (name === "select_doctor") {
            if (select_doctor.find(item => item === value)) {
                setSelect_doctor(select_doctor.filter(item => item !== value));

            } else {
                setSelect_doctor(prevArray => [...prevArray, value]);
            }
        } else if (name === "select_anesthesiologist") {
            if (select_anesthesiologist.find(item => item === value)) {
                setSelect_anesthesiologist(select_anesthesiologist.filter(item => item !== value));

            } else {
                setSelect_anesthesiologist(prevArray => [...prevArray, value]);
            }
        } else if (name === "free_annual_checkup") {
            if (select_anesthesiologist.find(item => item === value)) {
                setFree_annual_checkup(select_anesthesiologist.filter(item => item !== value));

            } else {
                setFree_annual_checkup(prevArray => [...prevArray, value]);
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        const err = await validate(formValues);
        setErrors(err);
        formValues.select_doctor = select_doctor;
        formValues.select_anesthesiologist = select_anesthesiologist;
        formValues.free_annual_checkup = free_annual_checkup;
        formValues.status = "Awaiting From Patients"
        setValidated(false);
        if (Object.keys(err).length === 0) {

            const formsubmit = await auth_service.sendquote(enqurie_data[0]._id, data.login_id, data._id, formValues)
            if (formsubmit.payload) {
                const getenquries = await auth_service.getenquriesbyid(data.login_id, enqurie_data[0]._id)
                setEnqurie_data(getenquries.payload)
                const hospital_data = getenquries.payload[0].hospitals.find(item => item.hospital_id === data._id)
                if (hospital_data != null) {
                    setFormValue(hospital_data)
                    let ahospital_data = hospital_data.select_doctor ? setSelect_doctor(hospital_data.select_doctor) : null;
                    await ahospital_data;
                    ahospital_data = hospital_data.select_doctor ? setSendquote(false) : null;
                    await ahospital_data;
                    ahospital_data = hospital_data.select_doctor ? setSendquotebutton(false) : null;
                    await ahospital_data;
                    ahospital_data = hospital_data.free_annual_checkup ? setFree_annual_checkup(hospital_data.free_annual_checkup) : null;
                    await ahospital_data;
                    ahospital_data = hospital_data.select_anesthesiologist ? setSelect_anesthesiologist(hospital_data.select_anesthesiologist) : null;
                    await ahospital_data;
                    window.location.reload();

                }


            }
        }
    };

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        // const err = validate(formValues);
    }
    /* const onchange = e => {
        const { name } = e.currentTarget
        if (name === 'treatment_plan') {
            setTreatment_plan(e.target.files[0])
        } else if(name === 'estimate_price') {
            setEstimate_price(e.target.files[0])
        } 
    } */
    const validate = async (values) => {
        try {

            await quoteSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
            for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    };
    if (loading === true)
        return (
            <>
                <ReactGifLoader />
            </>
        )
    else

        return (
            <>
            <HospitalNavbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        {
                            enqurie_data.map((target, index) => (
                                <div key={index}>
                                    <div className="PatientDetails">
                                        <h2 className="PatientName py-3">{target.patient_name}</h2>
                                        <p><b>Phone Number : </b><span>{target.patient_mobile}</span></p>
                                        <p><b>Email : </b><span>{target.patient_email}</span></p>
                                        <p><b>Age : </b><span>{target.patient_age}</span></p>
                                        <p><b>Gender : </b><span>{target.patient_gender}</span></p>
                                        <p><b>Nationality : </b><span>{target.patient_nationality}</span></p>
                                        <h5><b>Language : </b> <span>Language: {target.languages_spoken.join(', ')}</span></h5>  
                                    </div>
                                </div>
                            ))
                        }
                        {
                             enqurie_data.map((target, index) => (
                                <div key={index}>
                                    <div className="PatientPreferencesDetails my-4">
                                        <h2 className="PatientPreferences py-3">Patient Preferences</h2>
                                        <p className="mb-1">Patient Requirement : </p>
                                         <h6>{target.proposed_treatment_plan.join(', ')}</h6>
                                        <p>Patient Location : {target.patient_nationality}</p>
                                        <p>Proposed Date : {target.proposal_date}</p>
                                        <p>Transport Support Needed : {target.transport_support_needed}</p>
                                        <p>Accomodation / Other Logistic : {target.accomodation}</p>
                                        <p>Preferred Hospital Visit Type : {target.preferred_hospital_visit}</p>
                                        <p>Food Preferences : {target.food_preferences} </p>                                         
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="col-md-8">
                        {
                            enqurie_data.map((target, index) => (
                                <div key={index}>
                                    <p><b>Speciality : </b>{ }</p>
                                    <p><b>Medical History : </b>{target.medical_history}&nbsp;&nbsp;{target.med2}&nbsp;&nbsp;{target.med3}</p>
                                    <p><b>Status : </b>{target.status}</p> 
                                </div>
                            ))}
                        {
                            enqurie_data.map((target, index) => (
                                <div key={index} >
                                    <div className="queryBox my-2">
                                        <h2>Query</h2>                                              
                                        <p>{target.current_diagnosis}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {enqurie_data[0].reports[1] ?
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="DownloadButton" 
                                    onClick={() => { window.location.href = enqurie_data[0].reports[1] }} >Download Reports
                                    <i className="fa fa-download "></i></div>
                                </div>
                                <div className="col-md-5">
                                    <div className="InsuranceButton" onClick={() => { window.location.href = enqurie_data[0].insurance_card_copy[0] }}>View Insurance
                                    <i className="fa fa-eye "></i></div>
                                </div>
                            </div>
                            :
                            null}
                        {
                            enqurie_data.map((target, index) => (
                                <div key={index}>
                                    <div className="diagnosisBox my-3">
                                        <h2>Current Diagnosis</h2>
                                         <p>{target.current_diagnosis}</p>                                          
                                    </div>
                                </div>
                            ))}
                            {
                                 sendquote ?
                                <div className="text-center">  
                                    <button className="JoinButton col-md-4" type="submit" onClick={() => setSendquote(false)}>Send Quote &nbsp;&nbsp;<i className="fa fa-share"></i></button>
                                </div>
                                :
                                <div >
                                    <Form noValidate validated={validated} style={{ border: "2px", borderColor: "#164473", borderRadius: "15px" }} onSubmit={handleSubmit} >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5>Select Doctors</h5>
                                                <div className="SelectDoctor">
                                                    {
                                                        doctor.map((target, index) => (
                                                            <Form.Check
                                                                key={index}
                                                                label={target.doctor_name}
                                                                required
                                                                type="checkbox"
                                                                name="select_doctor"
                                                                value={formValues.select_doctor}
                                                                checked={select_doctor.length !== 0 ? select_doctor.find(item => item === target.doctor_name) : false}
                                                                onChange={() => checkBox("select_doctor", target.doctor_name)}
                                                                isInvalid={!!errors.select_doctor}
                                                            />
                                                    ))}
                                                </div>
                                                <span style={{ color: "red" }}>{errors?.select_doctor}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Select Anesthesiologist</h5>
                                                <div className="Anesthesiologist">
                                                    {
                                                        res.anesthesiologist.map((target, index) => (
                                                            <Form.Check
                                                                key={index}
                                                                label={target.anesthesiologist}
                                                                required
                                                                type="checkbox"
                                                                name="select_doctor"
                                                                value={formValues.select_anesthesiologist}
                                                                onChange={() => checkBox("select_doctor")}
                                                                isInvalid={!!errors.select_anesthesiologist}
                                                            />
                                                        ))}
                                                </div>
                                                <span style={{ color: "red", marginLeft: "20rem" }}>{errors?.select_anesthesiologist}</span>
                                            </div>
                                        </div>

                                        <div className = "row">
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                <Form.Label>Treatment Plan</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="treatment_plan"
                                                    value={formValues.treatment_plan}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.treatment_plan}
                                                />
                                                 <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.treatment_plan}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                <Form.Label>Estimate Price</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="estimate_price"
                                                    value={formValues.estimate_price}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.estimate_price}
                                                />
                                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.estimate_price}</Form.Control.Feedback>
                                                 </Form.Group>
                                            </div>
                                        </div>

                                        <div className = "row mt-2">
                                            <div className = "col-md-6">
                                            <Form.Group >
                                                <Form.Label>Inclusions</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="inclusion"
                                                    value={formValues.inclusion}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.inclusion}
                                                />
                                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.inclusion}</Form.Control.Feedback>
                                            </Form.Group>
                                            </div>
                                            <div className = "col-md-6">
                                            <Form.Group>
                                                <Form.Label>Exclusions</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="exclusion"
                                                    value={formValues.exclusion}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.exclusion}
                                                />
                                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.exclusion}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                   </div>

                                    <div className = "row mt-2">
                                        <div className = "col-md-6">
                                            <Form.Group>
                                                <Form.Label>Estimate Copay</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="estimate_copay"
                                                    value={formValues.estimate_copay}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.estimate_copay}
                                                />
                                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.estimate_copay}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className = "col-md-6">
                                            <Form.Group>
                                                <Form.Label>Estimate Copay Percentage</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                    type="text"
                                                    name="estimate_copay_percentage"
                                                    value={formValues.estimate_copay_percentage}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.estimate_copay_percentage}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Form.Label className="pt-2">Translator available as per patients's preferred language</Form.Label>
                                    <div className="row py-1" style={{border: "2px solid #164473", borderRadius: 10,margin:0}}>
                                        <div className="col-md-6">
                                            <Form.Check
                                                label="Yes"
                                                required
                                                type="radio"
                                                name="translator"
                                                id="yes"
                                                value="yes"
                                                checked={formValues.translator === "yes"}
                                                onChange={handleChange}
                                                isInvalid={!!errors.translator}
                                             />
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Check
                                                label="No"
                                                required
                                                type="radio"
                                                name="translator"
                                                id="no"
                                                value="no"
                                                checked={formValues.translator === "no"}
                                                onChange={handleChange}
                                                isInvalid={!!errors.translator}
                                            />     
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.type_of_anesthesia}</Form.Control.Feedback>
                                    </div>
                                    <Form.Label className="pt-2">Types of Anesthesia</Form.Label>
                                        <div className="row py-1" style={{border: "2px solid #164473", borderRadius: 10,margin:0}}>
                                            <div className="col-md-5">
                                                <Form.Check
                                                    label="Local"
                                                    required
                                                    type="radio"
                                                    name="type_of_anesthesia"
                                                    id="local"
                                                    value="local"
                                                    checked={formValues.type_of_anesthesia === "local"}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.type_of_anesthesia}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <Form.Check
                                                    label="General"
                                                    required
                                                    type="radio"
                                                    name="type_of_anesthesia"
                                                    id="general"
                                                    value="general"
                                                    checked={formValues.type_of_anesthesia === "general"}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.type_of_anesthesia}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <Form.Check
                                                    label="Epidural"
                                                    required
                                                    type="radio"
                                                    name="type_of_anesthesia"
                                                    id="epidural"
                                                    value="epidural"
                                                    checked={formValues.type_of_anesthesia === "epidural"}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.type_of_anesthesia}
                                                />
                                            </div>
                                        </div>
                                        <Form.Control.Feedback style={{ color: "red" }}>{errors?.type_of_anesthesia}</Form.Control.Feedback>
                                        
                                        <Form.Group className="pt-2">
                                            <Form.Label>Type of Room</Form.Label>
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                type="text"
                                                name="type_of_room"
                                                value={formValues.type_of_room}
                                                onChange={handleChange}
                                                isInvalid={!!errors.type_of_room}
                                            />
                                            <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.type_of_room}</Form.Control.Feedback>
                                        </Form.Group>

                                        <div className = "row mt-2">
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                    <Form.Label>Expected Length of Stay in Hospital</Form.Label>
                                                    <Form.Control
                                                        required
                                                        style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                        type="text"
                                                        name="expected_length"
                                                        value={formValues.expected_length}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.expected_length}
                                                    />
                                                    <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.expected_length}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                    <Form.Label>Expected Length of Stay in the Country</Form.Label>
                                                    <Form.Control
                                                        required
                                                        style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                        type="text"
                                                        name="length_of_stay"
                                                        value={formValues.length_of_stay}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.length_of_stay}
                                                    />
                                                    <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.length_of_stay}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="py-2">Free Room Upgrade</label>
                                                <div className="d-flex justify-content-between" style={{border: "2px solid #164473", borderRadius: 10,padding:"5px 10px"}}>
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        ype="radio"
                                                        name="free_room_upgrade"
                                                        id="yes"
                                                        value="yes"
                                                        checked={formValues.free_room_upgrade === "yes"}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.free_room_upgrade}
                                                    />
                                                    <Form.Check
                                                        label="No"
                                                        required
                                                       type="radio"
                                                        name="free_room_upgrade"
                                                        id="no"
                                                        value="no"
                                                        checked={formValues.free_room_upgrade === "no"}
                                                        onChange={handleChange}
                                                         isInvalid={!!errors.free_room_upgrade}
                                                    />
                                                    <Form.Check
                                                        label="At Discount"
                                                         required
                                                        type="radio"
                                                        name="free_room_upgrade"
                                                        id="at_discount"
                                                        value="at_discount"
                                                        checked={formValues.free_room_upgrade === "at_discount"}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.free_room_upgrade}
                                                        />
                                                </div>
                                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_room_upgrade}</Form.Control.Feedback>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="py-2">Free Physiotherapy</label>
                                                <div className="d-flex justify-content-between" style={{border: "2px solid #164473", borderRadius: 10,padding:"5px 10px"}}>
                                                        <Form.Check
                                                            label="Yes"
                                                            required
                                                            type="radio"
                                                            name="free_physiotherapy"
                                                            id="yes"
                                                            value="yes"
                                                            checked={formValues.free_physiotherapy === "yes"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_physiotherapy}
                                                        />
                                                        <Form.Check
                                                            label="No"
                                                            required
                                                            type="radio"
                                                            name="free_physiotherapy"
                                                            id="no"
                                                            value="no"
                                                            checked={formValues.free_physiotherapy === "no"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_physiotherapy}
                                                        />
                                                        <Form.Check
                                                            label="At Discount"
                                                            required
                                                            type="radio"
                                                            name="free_physiotherapy"
                                                            id="at_discount"
                                                            value="at_discount"
                                                            checked={formValues.free_physiotherapy === "at_discount"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_physiotherapy}
                                                        />
                                                </div>
                                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_physiotherapy}</Form.Control.Feedback>
                                            </div>
                                        </div>

                                        <Form.Group className="mt-2">
                                            <Form.Label>For Other Speciality Consultant</Form.Label>
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                type="text"
                                                name="free_other_speciality_consultant"
                                                value={formValues.free_other_speciality_consultant}
                                                onChange={handleChange}
                                                isInvalid={!!errors.free_other_speciality_consultant}
                                            />
                                            <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.free_other_speciality_consultant}</Form.Control.Feedback>
                                        </Form.Group>
                                        
                                        <div className="pt-2">
                                            <Form.Label>Free Telephonic Feedback from other patients / attendants who have undergone similar treatment</Form.Label>
                                            <div className="row py-1" style={{ border: "2px solid #164473", borderRadius: 10, margin:0}}>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Yes"
                                                        required
                                                        type="radio"
                                                        name="free_telephonic_feedback"
                                                        id="yes"
                                                        value="yes"
                                                        checked={formValues.free_telephonic_feedback === "yes"}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.free_telephonic_feedback}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="No"
                                                        required
                                                        type="radio"
                                                        name="free_telephonic_feedback"
                                                        id="no"
                                                        value="no"
                                                        checked={formValues.free_telephonic_feedback === "no"}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.free_telephonic_feedback}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="At Discount"
                                                        required
                                                        type="radio"
                                                        name="free_telephonic_feedback"
                                                        id="at_discount"
                                                        value="at_discount"
                                                        onChange={handleChange}
                                                        checked={formValues.free_telephonic_feedback === "at_discount"}
                                                        isInvalid={!!errors.free_telephonic_feedback}
                                                    />
                                                </div>
                                            </div>
                                            <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_telephonic_feedback}</Form.Control.Feedback>
                                        </div>

                                        <div className="pt-2">
                                            <Form.Label>Free Annual Checkup</Form.Label>
                                            <div className="row py-1" style={{ border: "2px solid #164473", borderRadius: 10, margin:0 }}>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Patients"
                                                        required
                                                        type="checkbox"
                                                        name="free_annual_checkup"
                                                        id="patients"
                                                        value="patients"
                                                        checked={free_annual_checkup.find(item => item === "patients")}
                                                        onChange={() => checkBox("free_annual_checkup", "patients")}
                                                        isInvalid={!!errors.free_annual_checkup}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="Family Members"
                                                        required
                                                        type="checkbox"
                                                        name="free_annual_checkup"
                                                        id="family_members"
                                                        value="family_members"
                                                        checked={free_annual_checkup.find(item => item === "family_members")}
                                                        onChange={() => checkBox("free_annual_checkup", "family_members")}
                                                        isInvalid={!!errors.free_annual_checkup}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Check
                                                        label="At Discount"
                                                        required
                                                        type="checkbox"
                                                        name="free_annual_checkup"
                                                        id="at_discount"
                                                        value="at_discount"
                                                        checked={free_annual_checkup.find(item => item === "at_discount")}
                                                        onChange={() => checkBox("free_annual_checkup", "at_discount")}
                                                        isInvalid={!!errors.free_annual_checkup}
                                                    />
                                                </div>
                                            </div>
                                            <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_annual_checkup}</Form.Control.Feedback>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="py-2">Pickup and Drop</label>
                                                <div className="d-flex justify-content-between" style={{ border: "2px solid #164473", borderRadius: 10,padding:"5px 10px" }}>
                                                    <Form.Check
                                                            label="Yes"
                                                            required
                                                            type="radio"
                                                            name="pickup_and_drop"
                                                            id="yes"
                                                            value="yes"
                                                            checked={formValues.pickup_and_drop === "yes"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.pickup_and_drop}
                                                    />
                                                    <Form.Check
                                                            label="No"
                                                            required
                                                            type="radio"
                                                            name="pickup_and_drop"
                                                            id="no"
                                                            value="no"
                                                            checked={formValues.pickup_and_drop === "no"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.pickup_and_drop}
                                                    />
                                                    <Form.Check
                                                            label="Could be planned"
                                                            required
                                                            type="radio"
                                                            name="pickup_and_drop"
                                                            id="at_discount"
                                                            value="at_discount"
                                                            checked={formValues.pickup_and_drop === "at_discount"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.pickup_and_drop}
                                                    />
                                                </div>
                                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.pickup_and_drop}</Form.Control.Feedback>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="my-2">Dedicated Patient Relationship Management</label>
                                                <div className="d-flex justify-content-between" style={{ border: "2px solid #164473", borderRadius: 10,padding:"5px 10px" }}>
                                                    <Form.Check
                                                            label="Yes"
                                                            required
                                                            type="radio"
                                                            name="free_patient_dedicated_relationship"
                                                            id="yes"
                                                            value="yes"
                                                            checked={formValues.free_patient_dedicated_relationship === "yes"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_patient_dedicated_relationship}
                                                    />
                                                    <Form.Check
                                                            label="No"
                                                            required
                                                            type="radio"
                                                            name="free_patient_dedicated_relationship"
                                                            id="no"
                                                            value="no"
                                                            checked={formValues.free_patient_dedicated_relationship === "no"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_patient_dedicated_relationship}
                                                    />
                                                    <Form.Check
                                                            label="Available"
                                                            required
                                                           type="radio"
                                                            name="free_patient_dedicated_relationship"
                                                            id="available"
                                                            value="available"
                                                            checked={formValues.free_patient_dedicated_relationship === "available"}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.free_patient_dedicated_relationship}
                                                    />
                                                </div>
                                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_patient_dedicated_relationship}</Form.Control.Feedback>
                                            </div>
                                        </div>
                                      
                                        <div className = "row mt-2">
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                    <Form.Label>Other Benefits For Patient</Form.Label>
                                                    <Form.Control
                                                        required
                                                        style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                        type="text"
                                                        name="benefits_for_patient"
                                                        value={formValues.benefits_for_patient}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.benefits_for_patient}
                                                    />
                                                    <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.benefits_for_patient}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className = "col-md-6">
                                                <Form.Group>
                                                    <Form.Label>Other Benefits of Attendants</Form.Label>
                                                    <Form.Control
                                                        required
                                                        style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                        type="text"
                                                        name="benefits_for_attendent"
                                                        value={formValues.benefits_for_attendent}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.benefits_for_attendent}
                                                    />
                                                    <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.benefits_for_attendent}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <Form.Group className="mt-2">
                                            <Form.Label>Food Menu</Form.Label>
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                type="text"
                                                name="food_menu"
                                                value={formValues.food_menu}
                                                onChange={handleChange}
                                                isInvalid={!!errors.food_menu}
                                            />
                                            <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.food_menu}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label>Confirm Date</Form.Label>
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                type="date"
                                                name="confirmation"
                                                value={formValues.confirmation}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmation}
                                            />
                                            <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.confirmation}</Form.Control.Feedback>
                                        </Form.Group>
                                        
                                        <Form.Group className="mt-2">
                                            <Form.Label>General disclaimer</Form.Label>
                                            <Form.Control
                                                required
                                                style={{ border: "2px solid #164473", borderRadius: 10 }}
                                                type="text"
                                                name="general_disclaimer"
                                                value={formValues.general_disclaimer}
                                                onChange={handleChange}
                                                isInvalid={!!errors.general_disclaimer}
                                            />
                                            <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.general_disclaimer}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form>

                                    {
                                        sendquotebutton ?
                                        <div className="text-center my-3">
                                            <button className="JoinButton col-md-4" type="submit" onClick={handleSubmit}>Send Quote<i style={{ fontSize: 12, marginLeft: "20%" }} className="fa fa-share"></i></button>
                                        </div> : null
                                    }
                                </div>
                            }
                         </div>
                    </div>
                </div>
            </>
        );
}


export default PATIENT_DASHBOARD;



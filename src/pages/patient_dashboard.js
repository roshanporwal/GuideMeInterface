import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { quoteSchema } from '../components/Validations/quoteValidation';
import InputField from '../components/input';
//import RadioField from '../components/radio';
import * as auth_service from "../services/auth_service";
import { Form } from 'react-bootstrap';


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
    const [formValues, setFormValue] = useState({
        
        select_doctor: "",
        select_anesthesiologist: "",
        treatment_plan: "",
        estimate_price: "",
        inclusion: "",
        exclusion: "",
        expected_length: "",
        estimate_copay: "",
        type_of_anesthesia: "",
        type_of_room: "",
        free_room_upgrade: "",
        free_physiotherapy: "",
        free_other_speciality_consultant: "",
        free_telephonic_feedback: "",
        free_annual_checkup: "",
        pickup_and_drop: "",
        free_patient_dedicated_relationship: "",
        benefits_for_patient: "",
        benefits_for_attendent: "",
        food_menu: "",
        confirmation: "",
        general_disclaimer: "",
        })
        
    
       const [select_doctor, setSelect_doctor] = useState([]);
    const [select_anesthesiologist, setSelect_anesthesiologist] = useState([]);
    const [enqurie_data, setEnqurie_data] = useState([])
    const [errors, setErrors] = useState({});
    const [doctor, setDoctor] = useState([])
    const [sendquote, setSendquote] = useState(true)



    const [formErrors/* , setFormErrors */] = useState({
        select_doctor: "",
        select_anesthesiologist: "",
        treatment_plan: "",
        estimate_price: "",
        inclusion: "",
        exclusion: "",
        expected_length: "",
        estimate_copay: "",
        type_of_anesthesia: "",
        type_of_room: "",
        free_room_upgrade: "",
        free_physiotherapy: "",
        free_other_speciality_consultant: "",
        free_telephonic_feedback: "",
        free_annual_checkup: "",
        pickup_and_drop: "",
        free_patient_dedicated_relationship: "",
        benefits_for_patient: "",
        benefits_for_attendent: "",
        food_menu: "",
        confirmation: "",
        general_disclaimer: "",
    })
  /*   useEffect(() => {

        fetchData(props);
    }, [props]);
 */

    async function fetchData(props) {

        let data = localStorage.getItem("login")
        data = JSON.parse(data)

        setEnqurie_data([props.location.state])
        console.log(props.location)
        console.log(props.location.state)
        const getenquries = await auth_service.getdoctorbyhospital(data._id, data.login_id)
        setDoctor(getenquries.payload)
        /*const getenquries1 = await auth_service.getenquriesbyhospitals()
       
        console.log(getenquries1.payload) */

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
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        console.log("data", data)
        const err = await validate(formValues);
        console.log(err)
        setErrors(err);



        formValues.select_doctor = select_doctor;
        formValues.select_anesthesiologist = select_anesthesiologist;
        formValues.status = "Done"

        /* formData.append('treatment_plan', treatment_plan);
         formData.append('estimate_price', estimate_price);
         formData.append('formValues', JSON.stringify(formValues))*/

        console.log(formValues)
        setValidated(true);

        /* const formsubmit = await auth_service.sendquote(enqurie_data[0]._id, data.login_id, data._id, formValues) */
        /* console.log(formsubmit) */
    };

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        const err = validate(formValues);
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


    return (
        <>

            <div className="d-flex">
                <div className="col-3 column_small">
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="container_patient_details">
                                    <div className="patient_name">
                                        <h5><b>{target.patient_name}</b></h5>
                                    </div>
                                    <div className="patient_details">
                                        <p className="card-text">Phone Number: {target.patient_mobile}</p>
                                        <p className="card-text">Email: {target.patient_email}</p>
                                        <p className="card-text">Age: {target.patient_age}</p>
                                        <p className="card-text">Gender: {target.patient_gender}</p>
                                        <p className="card-text">Nationality: {target.patient_nationality}</p>
                                        <p className="card-text">Language: {target.languages_spoken}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="container_patient_preferences">
                                    <div className="patient_name">
                                        <h5><b>Patient Preferences</b></h5>
                                    </div>

                                    <div className="patient_prefernces_details">
                                        <p className="card-text"><b>Patient Requirement:</b><br />{target.proposed_treatment_plan}</p>
                                        <p className="card-text"><b>Patient Location:</b><br />{target.patient_nationality}</p>
                                        <p className="card-text"><b>Proposed Date:</b><br />{target.proposal_date}</p>
                                        <p className="card-text"><b>Transport Support Needed:</b><br />{target.transport_support_needed}</p>
                                        <p className="card-text"><b>Accomodation / Other Logistic:</b><br />{target.accomodation}</p>
                                        <p className="card-text"><b>Preferred Hospital Visit Type:</b><br />{target.preferred_hospital_visit}</p>
                                        <p className="card-text"><b>Food Preferences:</b><br />{target.food_preferences}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="col-9 column_big">
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="d-flex mt-5">
                                    <p><b>Speciality: </b></p>
                                    <p style={{ paddingLeft: 10 }}>{target.medical_history}</p>
                                </div>
                                <div className="d-flex">
                                    <p style={{ marginBottom: 5 }}><b>Medical History</b></p>
                                    <p style={{ paddingLeft: 20 }}>{target.medical_history}</p>
                                    <p style={{ paddingLeft: 20 }}>{target.med2}</p>
                                    <p style={{ paddingLeft: 20 }}>{target.med3}</p>
                                </div>
                                <div className="d-flex">
                                    <p style={{ marginBottom: 5 }}><b>Status:</b></p>
                                    <p style={{ paddingLeft: 20 }}>{target.status}</p>
                                </div>
                            </div>
                        ))}
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="query_container">
                                    <div className="query_title">
                                        <h2>Query</h2>
                                    </div>
                                    <div className="query_content">
                                        <p>{target.current_diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="buttons d-flex">
                        <div>
                            <button className="download_button" type="submit" onClick={() => { window.location.href = enqurie_data[0].reports[1] }} >Download Reports<i style={{ fontSize: 16, marginLeft: "40%" }} className="fa fa-download "></i></button>
                        </div>
                        <div>
                            <button className="view_button" type="submit" onClick={() => { window.location.href = enqurie_data[0].insurance_card_copy[0] }}>View Insurance<i style={{ fontSize: 16, marginLeft: "40%" }} className="fa fa-eye "></i></button>
                        </div>
                    </div>
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="query_container">
                                    <div className="query_title">
                                        <h2>Current Diagnosis</h2>
                                    </div>
                                    <div className="query_content">
                                        <p>{target.current_diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    {
                      sendquote?
                        
                    <div style={{ marginLeft: "40%", marginTop: "3%", marginBottom: "4%" }}>
                        <button className="join_button" type="submit" onClick={()=>setSendquote(false)}>Send Quote<i style={{ fontSize: 12, marginLeft: "20%" }} className="fa fa-share"></i></button>
                    </div>
                    :
                    <div >
                        <Form  noValidate validated={validated} style={{ border: "2px", borderColor: "#164473", borderRadius: "15px" }} onSubmit={handleSubmit} >
                            <div className="d-flex">
                                <div>
                                    <h5>Select Doctors</h5>


                                    <div style={{ border: "2px solid #164473", borderRadius: 10, height: "18rem" }} className="select_doctor">
                                        {

                                            doctor.map((target, index) => (
                                                <Form.Check
                                                    key = {index}{...target}
                                                    label = {target.doctor_name}
                                                    required
                                                    style={{marginLeft: "20px", marginTop: "1rem"}}
                                                    type="checkbox"
                                                    name="select_doctor"
                                                    value={formValues.select_doctor}
                                                   
                                                    onChange={() => checkBox("select_doctor")}
                                                    isValid={!errors.select_doctor}
                                                />
                                            ))}

                                    </div>
                                    <span style={{ color: "red" }}>{errors?.select_doctor}</span>
                                </div>
                                <div>
                                    <h5 style={{ marginLeft: "20rem" }}>Select Anesthesiologist</h5>
                                    
                                            <div style={{ border: "2px solid #164473", borderRadius: 10, marginLeft: "20rem", height: "14rem" }} className="select_doctor">
                                            {
                                        res.anesthesiologist.map((target, index) => (
                                            <Form.Check
                                            key = {index}{...target}
                                            label = {target.anesthesiologist}
                                            required
                                            style={{marginLeft: "20px", marginTop: "1rem"}}
                                            type="checkbox"
                                            name="select_doctor"
                                            value={formValues.select_anesthesiologist}
                                           
                                            onChange={() => checkBox("select_doctor")}
                                            isValid={!errors.select_anesthesiologist}
                                        />

                                        ))}
                                                </div>
                                        
                                    <span style={{ color: "red", marginLeft: "20rem" }}>{errors?.select_anesthesiologist}</span>

                                </div>
                            </div>
                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Treatment Plan</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="treatment_plan"
                                        value={formValues.treatment_plan}
                                        onChange={handleChange}
                                        isValid={!errors.treatment_plan}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.treatment_plan}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Estimate Price</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="estimate_price"
                                        value={formValues.estimate_price}
                                        onChange={handleChange}
                                        isValid={!errors.estimate_price}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.estimate_price}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Inclusions</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="inclusion"
                                        value={formValues.inclusion}
                                        onChange={handleChange}
                                        isValid={!errors.inclusion}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.inclusion}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Exclusions</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="treatment_plan"
                                        value={formValues.exclusion}
                                        onChange={handleChange}
                                        isValid={!errors.exclusion}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.exclusion}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Estimate Copay</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="estimate_copay"
                                        value={formValues.estimate_copay}
                                        onChange={handleChange}
                                        isValid={!errors.estimate_copay}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.estimate_copay}</Form.Control.Feedback>
                                </Form.Group>

                            <div className="pt-4">
                                <Form.Label>Types of Anesthesia</Form.Label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>
                                <Form.Check
                                    label = "Local"
                                    required
                                    style = {{paddingLeft: "4rem"}}
                                    type="radio"
                                    name="types_of_anesthesia"
                                    id = "local"
                                    value="local"
                                    onChange={handleChange}
                                    isValid={!errors.type_of_anesthesia}
                                />
                                    <Form.Check
                                        label = "General"
                                        required
                                        style = {{paddingLeft: "40rem"}}
                                        type="radio"
                                        name="types_of_anesthesia"
                                        id = "general"
                                        value="general"
                                        onChange={handleChange}
                                        isValid={!errors.type_of_anesthesia}
                                    />
                                    <Form.Check
                                        label = "Epidural"
                                        required
                                        style = {{paddingLeft: "40rem"}}
                                        type="radio"
                                        name="types_of_anesthesia"
                                        id = "epidural"
                                        value="epidural"
                                        onChange={handleChange}
                                        isValid={!errors.type_of_anesthesia}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.type_of_anesthesia}</Form.Control.Feedback>
                            </div>
                            <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Type of Room</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="type_of_room"
                                        value={formValues.type_of_room}
                                        onChange={handleChange}
                                        isValid={!errors.type_of_room}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.type_of_room}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Expected Length of Stay</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="estimate_copay"
                                        value={formValues.expected_length}
                                        onChange={handleChange}
                                        isValid={!errors.expected_length}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.expected_length}</Form.Control.Feedback>
                                </Form.Group>


                            <div style = {{marginTop: "2rem"}}>
                                <Form.Label>Free Room Upgrade</Form.Label>
                                <div className="d-flex" style={{ border: "2px solid #164473", width: 380, borderRadius: 10, height: "5rem" }}>
                                    <Form.Check
                                        label = "Yes"
                                        required
                                        style = {{paddingLeft: "4rem"}}
                                        type="radio"
                                        name="free_room_upgrade"
                                        id = "yes"
                                        value="yes"
                                        onChange={handleChange}
                                        isValid={!errors.free_room_upgrade}
                                    />
                                    <Form.Check
                                        label = "No"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_room_upgrade"
                                        id = "no"
                                        value="no"
                                        onChange={handleChange}
                                        isValid={!errors.free_room_upgrade}
                                    />
                                    <Form.Check
                                        label = "At Discount"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_room_upgrade"
                                        id = "at_discount"
                                        value="at_discount"
                                        onChange={handleChange}
                                        isValid={!errors.free_room_upgrade}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_room_upgrade}</Form.Control.Feedback>

                            </div>
                            <div style={{ marginLeft: 600, marginTop: -75 }}>
                                <label>Free Physiotherapy</label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>

                                <Form.Check
                                        label = "Yes"
                                        required
                                        style = {{paddingLeft: "4rem"}}
                                        type="radio"
                                        name="free_physiotherapy"
                                        id = "yes"
                                        value="yes"
                                        onChange={handleChange}
                                        isValid={!errors.free_physiotherapy}
                                    />
                                    <Form.Check
                                        label = "No"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_physiotherapy"
                                        id = "no"
                                        value="no"
                                        onChange={handleChange}
                                        isValid={!errors.free_physiotherapy}
                                    />
                                    <Form.Check
                                        label = "At Discount"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_physiotherapy"
                                        id = "at_discount"
                                        value="at_discount"
                                        onChange={handleChange}
                                        isValid={!errors.free_physiotherapy}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_physiotherapy}</Form.Control.Feedback>
                            </div>



                            <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>For Other Speciality Consultant</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="free_other_speciality_consultant"
                                        value={formValues.free_other_speciality_consultant}
                                        onChange={handleChange}
                                        isValid={!errors.free_other_speciality_consultant}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.free_other_speciality_consultant}</Form.Control.Feedback>
                                </Form.Group>


                                <div className="pt-4">
                                <Form.Label>Free Telephonic Feedback from other patients / attendants who have undergone similar treatment</Form.Label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>
                                <Form.Check
                                    label = "Yes"
                                    required
                                    style = {{paddingLeft: "4rem"}}
                                    type="radio"
                                    name="free_telephonic_feedback"
                                    id = "yes"
                                    value="yes"
                                    onChange={handleChange}
                                    isValid={!errors.free_telephonic_feedback}
                                />
                                    <Form.Check
                                        label = "No"
                                        required
                                        style = {{paddingLeft: "40rem"}}
                                        type="radio"
                                        name="free_telephonic_feedback"
                                        id = "no"
                                        value="no"
                                        onChange={handleChange}
                                        isValid={!errors.free_telephonic_feedback}
                                    />
                                    <Form.Check
                                        label = "At Discount"
                                        required
                                        style = {{paddingLeft: "40rem"}}
                                        type="radio"
                                        name="free_telephonic_feedback"
                                        id = "at_discount"
                                        value="at_discount"
                                        onChange={handleChange}
                                        isValid={!errors.free_telephonic_feedback}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_telephonic_feedback}</Form.Control.Feedback>
                            </div>
                            
                            <div className="pt-4">
                                <Form.Label>Free Annual Checkup</Form.Label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>
                                <Form.Check
                                    label = "Patients"
                                    required
                                    style = {{paddingLeft: "4rem"}}
                                    type="checkbox"
                                    name="free_annual_checkup"
                                    id = "patients"
                                    value="patients"
                                    onChange={() => checkBox("free_annual_checkup","patients" )}
                                    isValid={!errors.free_annual_checkup}
                                />
                                    <Form.Check
                                        label = "Family Members"
                                        required
                                        style = {{paddingLeft: "35rem"}}
                                        type="checkbox"
                                        name="free_annual_checkup"
                                        id = "family_members"
                                        value="family_members"
                                        onChange={() => checkBox("free_annual_checkup","family_members" )}
                                        isValid={!errors.free_annual_checkup}
                                    />
                                    <Form.Check
                                        label = "At Discount"
                                        required
                                        style = {{paddingLeft: "35rem"}}
                                        type="checkbox"
                                        name="free_annual_checkup"
                                        id = "at_discount"
                                        value="at_discount"
                                        onChange={() => checkBox("free_annual_checkup","at_discount" )}
                                        isValid={!errors.free_annual_checkup}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_annual_checkup}</Form.Control.Feedback>
                            </div>
                            
                            
                            <div className=" pt-4" style = {{width: 450}}>
                      
                                <label>Pickup and Drop</label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>

                                <Form.Check
                                        label = "Yes"
                                        required
                                        style = {{paddingLeft: "4rem"}}
                                        type="radio"
                                        name="pickup_and_drop"
                                        id = "yes"
                                        value="yes"
                                        onChange={handleChange}
                                        isValid={!errors.pickup_and_drop}
                                    />
                                    <Form.Check
                                        label = "No"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="pickup_and_drop"
                                        id = "no"
                                        value="no"
                                        onChange={handleChange}
                                        isValid={!errors.pickup_and_drop}
                                    />
                                    <Form.Check
                                        label = "Could be planned"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="pickup_and_drop"
                                        id = "at_discount"
                                        value="at_discount"
                                        onChange={handleChange}
                                        isValid={!errors.pickup_and_drop}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.pickup_and_drop}</Form.Control.Feedback>
                            </div>

                            <div style={{ marginLeft: 600, marginTop: -75 }}>
                                <label>Dedicated Patient Relationship Management</label>
                                <div className="d-flex" style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}>

                                <Form.Check
                                        label = "Yes"
                                        required
                                        style = {{paddingLeft: "4rem"}}
                                        type="radio"
                                        name="free_patient_dedicated_relationship"
                                        id = "yes"
                                        value="yes"
                                        onChange={handleChange}
                                        isValid={!errors.free_patient_dedicated_relationship}
                                    />
                                    <Form.Check
                                        label = "No"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_patient_dedicated_relationship"
                                        id = "no"
                                        value="no"
                                        onChange={handleChange}
                                        isValid={!errors.free_patient_dedicated_relationship}
                                    />
                                    <Form.Check
                                        label = "Available"
                                        required
                                        style = {{paddingLeft: "100px"}}
                                        type="radio"
                                        name="free_patient_dedicated_relationship"
                                        id = "available"
                                        value="available"
                                        onChange={handleChange}
                                        isValid={!errors.free_patient_dedicated_relationship}
                                    />
                                </div>
                                <Form.Control.Feedback style={{ color: "red" }}>{errors?.free_patient_dedicated_relationship}</Form.Control.Feedback>
                            </div>

                            <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Other Benefits For Patient</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="benefits_for_patient"
                                        value={formValues.benefits_for_patient}
                                        onChange={handleChange}
                                        isValid={!errors.benefits_for_patient}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.benefits_for_patient}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Other Benefits of Attendants</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="benefits_for_attendent"
                                        value={formValues.benefits_for_attendent}
                                        onChange={handleChange}
                                        isValid={!errors.benefits_for_attendent}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.benefits_for_attendent}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Food Menu</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="food_menu"
                                        value={formValues.food_menu}
                                        onChange={handleChange}
                                        isValid={!errors.food_menu}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.food_menu}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style = {{marginTop: "2rem"}}>
                                <Form.Label>Confirmation</Form.Label>
                                    <Form.Control
                                        required
                                        style={{ border: "2px solid #164473", borderRadius: 10, height: "5rem" }}
                                        type="text"
                                        name="confirmation"
                                        value={formValues.confirmation}
                                        onChange={handleChange}
                                        isValid={!errors.confirmation}
                                    />
                                    <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.confirmation}</Form.Control.Feedback>
                                </Form.Group>

                        </Form>
                        <div style={{ marginLeft: "40%", marginTop: "3%", marginBottom: "4%" }}>
                        <button className="join_button" type="submit" onClick={handleSubmit}>Send Quote<i style={{ fontSize: 12, marginLeft: "20%" }} className="fa fa-share"></i></button>
                    </div>
                    </div>
}

                </div>
            </div>


        </>
    );
}


export default PATIENT_DASHBOARD;



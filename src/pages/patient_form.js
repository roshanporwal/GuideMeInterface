import React, { useState } from 'react';
import 'react-bootstrap';
import InputField from '../components/input';
//import auth_service from "../services/auth_service";

function PATIENT_FORM(props) {

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
        proposed_treatment_plan: "",
        transport_support_needed: "",
        languages_spoken: "",
        food_preferences: "",
        accomodation: "",
        preferred_hospital_visit: "",
        proposal_date: "",
        from_date: "",
        to_date: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [patient_document, setPatient_document] = useState()
    const [patient_reports, setPatient_reports] = useState()
    const [insurance_card_copy, setInsurance_card_copy] = useState()
    const [proposed_treatment_plan, setProposed_treatment_plan] = useState([]);
    const [languages_spoken, setLanguages_spoken] = useState([]);


    const [formErrors, setFormErrors] = useState({
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
        transport_support_needed: "",
        languages_spoken: "",
        food_preferences: "",
        accomodation: "",
        preferred_hospital_visit: "",
        proposal_date: "",
        from_date: "",
        to_date: ""
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

        const formData = new FormData();
        formValues.proposed_treatment_plan = proposed_treatment_plan;
        formValues.languages_spoken = languages_spoken
      
        formData.append('patient_document', patient_document);
        formData.append('patient_reports', patient_reports);
        formData.append('insurance_card_copy', insurance_card_copy);
        formData.append('formValues', JSON.stringify(formValues))
        
        console.log(formValues)

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
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

            <div className="patient_form_container">
                <form className="col-md-12" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <InputField
                        label="Patient Name"
                        className ={`form-control ${formErrors.patient_name ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="patient_name" 
                        id="patient_name" 
                        value={formValues.patient_name}/>
                         <InputField
                        label="Patient Email"
                        className ={`form-control ${formErrors.patient_name ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="email" 
                        name="patient_email" 
                        id="patient_email" 
                        value={formValues.patient_email}/>

                        <div className="form-group pt-4">
                            <label>Patient Name</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_name ? "is-invalid" : ""}`} onChange={handleChange} type="text" name="patient_name" id="patient_name" value={formValues.patient_name} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_name}</div>
                        <div className="form-group pt-4">
                            <label>Patient Email</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_email ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="patient_email" id="patient_email" value={formValues.patient_email} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_email}</div>
                        <div className="form-group pt-4">
                            <label>Patient Referred By</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_referred_by ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="patient_referred_by" id="patient_referred_by" value={formValues.patient_referred_by} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_referred_by}</div>
                        <div className="form-group pt-4">
                            <label>Patient Mobile Number</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_mobile ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="patient_mobile" id="patient_mobile" value={formValues.patient_mobile} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_mobile}</div>
                        <div className="form-group pt-4">
                            <label>Patient Age</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_age ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="patient_age" id="patient_age" value={formValues.patient_age} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_age}</div>
                        <div className="pt-4">
                            <label>Patient Gender</label>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.patient_gender ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="patient_gender" id="male" value={"Male"} />
                                    <label className="form-check-label" >
                                        Male
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.patient_gender ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="patient_gender" id="female" value={"Female"} />
                                    <label className="form-check-label" >
                                        Female
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.patient_gender ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="patient_gender" id="neutral" value={"Neutral"} />
                                    <label className="form-check-label" >
                                        Neutral
                                    </label>
                                </div>
                            </div>
                            <div className="invalid-feedback">{formErrors.patient_gender}</div>
                        </div>
                        <div className="form-group pt-4">
                            <label>Patient Nationality</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_nationality ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="patient_nationality" id="patient_nationality" value={formValues.patient_nationality} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_nationality}</div>
                        <div className="form-group pt-4">
                            <label>Identification Document(Passport, Emirates ID, Driver's licence, any such relevant document)</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_document ? "is-invalid" : ""}`} onChange={onchange} type="file" name="patient_document" id="patient_document" value={formValues.patient_document} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_document}</div>
                        <div className="form-group pt-4">
                            <label>Patient reports(including lab, diagnosis, and prescription)</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.patient_reports ? "is-invalid" : ""}`} onChange={onchange} type="file" name="patient_reports" id="patient_reports" value={formValues.patient_reports} />
                        </div>
                        <div className="invalid-feedback">{formErrors.patient_reports}</div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group pt-4">
                            <label>Current Diagnosis</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.current_diagnosis ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="current_diagnosis" id="current_diagnosis" value={formValues.current_diagnosis} />
                        </div>
                        <div className="invalid-feedback">{formErrors.current_diagnosis}</div>
                        <div className="form-group pt-4">
                            <label>Insurance Card Copy (Front and Back)</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.insurance_card_copy ? "is-invalid" : ""}`} onChange={onchange} type="file" name="insurance_card_copy" id="insurance_card_copy" value={formValues.insurance_card_copy} />
                        </div>
                        <div className="invalid-feedback">{formErrors.insurance_card_copy}</div>
                        <div className="form-group pt-4">
                            <label>Medical History and Co Morbidities (eg. Diabetes, Hypertension, Blood Pressure, Any Respiratory illness, Previous Surgeries/Procedures if any etc.)</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.medical_history ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="medical_history" id="medical_history" value={formValues.medical_history} />
                        </div>
                        <div className="invalid-feedback">{formErrors.medical_history}</div>
                        <div className="pt-4">
                            <label>Proposed Treatment plan/requirement</label>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", "Surgical Consultation")} type="checkbox" name="proposed_treatment_plan" id="surgical_consultation" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Surgical Consultation
                                    </label>
                                </div>
                                <div className="form-check" style={{ marginLeft: "40px" }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", "Admission")} type="checkbox" name="proposed_treatment_plan" id="admission" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label">
                                        Admission
                                    </label>
                                </div>
                            </div>
                            <div className="form-check">
                                <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", "Second Opinion of Consultation")} type="checkbox" name="proposed_treatment_plan" id="second_opinion_of_report" value={formValues.proposed_treatment_plan} />
                                <label className="form-check-label" >
                                    Second Opinion of Consultation
                                </label>
                            </div>
                            <div className="form-check">
                                <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", " International Expert Opinion")} type="checkbox" name="proposed_treatment_plan" id="international_expert_opinion" value={formValues.proposed_treatment_plan} />
                                <label className="form-check-label" >
                                    International Expert Opinion
                                </label>
                            </div>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", " Home Care Services")} type="checkbox" name="proposed_treatment_plan" id="home_care_services" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Home Care Services
                                    </label>
                                </div>
                                <div className="form-check" style={{ marginLeft: "50px" }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", "Teleconsultation")} type="checkbox" name="proposed_treatment_plan" id="teleconsultation" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Teleconsultation
                                    </label>
                                </div>
                            </div>
                            <div className="form-check">
                                <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={() => checkBox("proposed_treatment_plan", " Need Multiple Options to choose the best")} type="checkbox" name="proposed_treatment_plan" id="multiple_options" value={formValues.proposed_treatment_plan} />
                                <label className="form-check-label" >
                                    Need Multiple Options to choose the best
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-check-label" >
                                    Others
                                </label>
                                <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.proposed_treatment_plan ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="proposed_treatment_plan" id="others" value={formValues.proposed_treatment_plan} />

                            </div>
                            <div className="invalid-feedback">{formErrors.proposed_treatment_plan}</div>

                        </div>
                        <div className="pt-4">
                            <label>Transport Facility Needed</label>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.transport_support_needed ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="transport_support_needed" id="yes" value={"Yes"} />
                                    <label className="form-check-label" >
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.transport_support_needed ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="transport_support_needed" id="no" value={"No"} />
                                    <label className="form-check-label" >
                                        No
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.transport_support_needed ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="transport_support_needed" id="maybe" value={"Maybe"} />
                                    <label className="form-check-label" >
                                        Maybe
                                    </label>
                                </div>
                            </div>
                            <div className="invalid-feedback">{formErrors.transport_support_needed}</div>
                        </div>



                    </div>
                    <div className="col-md-4">
                        <div className="pt-4" style={{ border: "1px rgb(56, 56, 121)" }}>
                            <label>Language Spoken</label>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "English")} type="checkbox" name="languages_spoken" id="english" value={formValues.languages_spoken} />
                                    <label className="form-check-label" >
                                        English
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 45 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Arabic")} type="checkbox" name="languages_spoken" id="arabic" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Arabic
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 60 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Hindi")} type="checkbox" name="languages_spoken" id="hindi" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Hindi
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Urdu")} type="checkbox" name="languages_spoken" id="urdu" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Urdu
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 59 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Tagaloug")} type="checkbox" name="languages_spoken" id="tagaloug" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Tagaloug
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 41 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "French")} type="checkbox" name="languages_spoken" id="french" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        French
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Afrikaans")} type="checkbox" name="languages_spoken" id="afrikaans" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Afrikaans
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Malayalam")} type="checkbox" name="languages_spoken" id="malayalam" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Malayalam
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)" }} className={`form-check-input ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", "Bengali")} type="checkbox" name="languages_spoken" id="bengali" value={formValues.proposed_treatment_plan} />
                                    <label className="form-check-label" >
                                        Bengali
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-check-label" >
                                    Others
                                </label>
                                <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: "10px" }} className={`form-control ${formErrors.languages_spoken ? "is-invalid" : ""}`} onChange={() => checkBox("languages_spoken", " english")} type="text" name="languages_spoken" id="languages_spoken" value={formValues.proposed_treatment_plan} />

                            </div>
                            <div className="invalid-feedback">{formErrors.languages_spoken}</div>
                        </div>
                        <div className="form-group pt-4">
                            <label>Food Preferences(Veg, Non-veg, Any food, Allergies)</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.food_preferences ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="food_preferences" id="food_preferences" value={formValues.food_preferences} />
                        </div>
                        <div className="invalid-feedback">{formErrors.food_preferences}</div>
                        <div className="pt-4">
                            <label>Accomodation / Other Logistic Support Needed</label>
                            <div className="d-flex">
                                <div className="form-check">
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.accomodation ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="accomodation" id="yes" value={"Yes"} />
                                    <label className="form-check-label" >
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.accomodation ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="accomodation" id="no" value={"No"} />
                                    <label className="form-check-label" >
                                        No
                                    </label>
                                </div>
                                <div className="form-check" style={{ paddingLeft: 30 }}>
                                    <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.accomodation ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="accomodation" id="maybe" value={"Maybe"} />
                                    <label className="form-check-label" >
                                        Maybe
                                    </label>
                                </div>
                            </div>
                            <div className="invalid-feedback">{formErrors.accomodation}</div>
                        </div>
                        <div className="pt-4">
                            <label>Preferred Hospital Visit Type</label>

                            <div className="form-check">
                                <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.preferred_hospital_visit ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="preferred_hospital_visit" id="one_visit" value={"One Visit - All Services"} />
                                <label className="form-check-label" >
                                    One Visit - All Services
                                </label>
                            </div>
                            <div className="form-check">
                                <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-check-input ${formErrors.preferred_hospital_visit ? "is-invalid" : ""}`} onChange={handleChange  } type="radio" name="preferred_hospital_visit" id="multiple_visit" value={"Multiple Visit - but  minimal waiting"} />
                                <label className="form-check-label" >
                                    Multiple Visit - but  minimal waiting
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-check-label" >
                                    Others
                                </label>
                                <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} className={`form-control ${formErrors.preferred_hospital_visit ? "is-invalid" : ""}`} onChange={handleChange  } type="text" name="preferred_hospital_visit" id="preferred_hospital_visit" value={formValues.proposed_treatment_plan} />

                            </div>
                            <div className="invalid-feedback">{formErrors.preferred_hospital_visit}</div>
                        </div>
                        <div className="form-group pt-4">
                            <label>Proposal Date to awail the services</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} type="date" className={`form-control ${formErrors.proposal_date ? "is-invalid" : ""}`} onChange={handleChange  } id="proposal_date" name="proposal_date" value={formValues.proposal_date} min="" max="" />
                        </div>
                        <div className="invalid-feedback">{formErrors.proposal_date}</div>

                        <div className="form-group pt-4">
                            <label>Planned Duration of Trip From</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} type="date" className={`form-control ${formErrors.from_date ? "is-invalid" : ""}`} onChange={handleChange  } id="from_date" name="from_date" value={formValues.from_date} min="" max="" />
                        </div>
                        <div className="invalid-feedback">{formErrors.from_date}</div>
                        <div className="form-group pt-4">
                            <label>Planned Duration of Trip To</label>
                            <input style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }} type="date" className={`form-control ${formErrors.to_date ? "is-invalid" : ""}`} onChange={handleChange  } id="to_date" name="to_date" value={formValues.to_date} min="" max="" />
                        </div>
                        <div className="invalid-feedback">{formErrors.to_date}</div>


                    </div>
                    <button style={{ marginTop: 50, marginLeft: 130 }} className="join_button" disabled={isSubmitting} type="submit" onClick={handleSubmit}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                </form>
            </div>
        </>
    )
}



export default PATIENT_FORM;
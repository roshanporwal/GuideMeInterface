import React, {useState,useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import {useLocation} from "react-router-dom";

export default function PATIENT_VIEW(props) {
    const [enqurie_data, setEnqurie_data] = useState([])
    const [hopital_enq, setHopital_enq] = useState([]);
    const [show_quota, setShow_quota] = useState(false); 
    const search = useLocation().search;
  const name = new URLSearchParams(search).get('id');
    useEffect(() => {
        fetchData(name);
      }, [name]);
    async function fetchData(id) {
        const getenquries = await auth_service.getenquriesbyid_patient(id)
        setEnqurie_data(getenquries.payload)
        const enq=getenquries.payload[0].hospitals
        setHopital_enq(enq)
        if(enq.length !== 0){
            setShow_quota(true)
        }
    }
    
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
                                    <p style={{ paddingLeft: 10 }}>{target.speciality}</p>
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
                        
                </div>
            </div>
            {show_quota?
            <div>
            <div className="col-md-12" style={{ marginTop: 20 }}>
                
                <div className="col-md-3">

                </div>
                {
                    hopital_enq.map((target, index) => (
                <div className="col-md-3" key={index} {...target}>
                    <p><b>{target.hospital_name}</b></p>
                </div>
               
                 ))}
                
            </div>
            <div className="col-md-12" >
                <div className="col-md-3" style={{ textAlign: "center" }}>
                    <p><b>Estimate Price</b></p>
                    <p><b>Treatment Plan</b></p>
                    <p><b>Inclusions</b></p>
                    <p><b>Exclusions</b></p>
                    <p><b>Copay Required</b></p>
                    <p><b>Types of Anesthesia</b></p>
                    <p><b>Type of room</b></p>
                    <p><b>Length of stay</b></p>
                    <p><b>Free room upgrade</b></p>
                    <p><b>Free Physiotherapy</b></p>
                    <p><b>Pickup and drop</b></p>
                    <p><b>Other free consultation</b></p>
                    <p><b>Free Annual checkup</b></p>
                </div>
                {
                    hopital_enq.map((target, index) => (
                        <div className="col-md-3" key={index} {...target}>
                            {target.estimate_price ?
                                
                                <div>
                            <p>{target.estimate_price}</p>
                            <p>{target.treatment_plan}</p>
                            <p>{target.inclusion}</p>
                            <p>{target.exclusion}</p>
                            <p>{target.estimate_copay}</p>
                            <p>{target.type_of_anesthesia}</p>
                            <p>{target.type_of_room}</p>
                            <p>{target.free_room_upgrade}</p>
                            <p>{target.free_physiotherapy}</p>
                            <p>{target.pickup_and_drop}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            </div>

                            :<div className="col-md-3">
                                <p>AWAITING FOR QUOTATION</p>
                            
                        </div>
}

                        </div>
                    ))}
               
            </div>
          
            </div>:null}



        </>
    );
}





import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import { useLocation } from "react-router-dom";

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
        const enq = getenquries.payload[0].hospitals
        setHopital_enq(enq)
        if (enq.length !== 0) {
            setShow_quota(true)
        }
    }

    return (
        <>
		<div className="container my-5">
			<div className="row">
				<div className="col-md-4">
					{
						enqurie_data.map((target, index) => (
							<div key={index} {...target}>
								<div className="PatientDetails">
									<h2 class="PatientName py-3"><b>{target.patient_name}</b></h2>
									<p><b>Phone Number :</b> <span>{target.patient_mobile}</span></p>
									<p><b>Email :</b> <span>{target.patient_email}</span></p>	
									<p><b>Age :</b> <span>{target.patient_age}</span></p>	
									<p><b>Gender :</b> <span>{target.patient_gender}</span></p>	
									<p><b>Nationality :</b> <span>{target.patient_nationality}</span></p>	
									<p><b>Language :</b> <span>{target.languages_spoken}</span></p>
								</div>
							</div>
						))
					}
					{
						enqurie_data.map((target, index) => (
							<div key={index} {...target}>
								<div className="PatientPreferencesDetails my-4">
									<h2 className="PatientPreferences py-3">Patient Preferences</h2>
									<p className="mb-1"><b>Patient Requirement :</b> {target.proposed_treatment_plan}</p>
									<p><b>Patient Location :</b>{target.patient_nationality}</p>
									<p><b>Proposed Date : </b>{target.proposal_date}</p>
									<p><b>Transport Support Needed :</b>{target.transport_support_needed}</p>
									<p><b>Accomodation / Other Logistic :</b>{target.accomodation}</p>
									<p><b>Preferred Hospital Visit Type :</b> {target.preferred_hospital_visit}</p>
									<p><b>Food Preferences : </b>{target.food_preferences}</p>
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
					
                    {   enqurie_data[0]? enqurie_data[0].reports[1] ?
                       <div className="row justify-content-center">
                             <div className="col-md-5">
                                <div className="DownloadButton" onClick={() => { window.location.href = enqurie_data[0].reports[1] }} > Download Reports <i className="fa fa-download "></i></div>
                            </div>
                            <div className="col-md-5">
                                <div className="InsuranceButton" onClick={() => { window.location.href = enqurie_data[0].insurance_card_copy[0] }}> View Insurance <i className="fa fa-eye "></i></div>
                            </div>
                        </div> : null:null
                    }
					
					
                    {
                        enqurie_data.map((target, index) => (
                        <div key={index}>
                            <div className="diagnosisBox my-3">
                                <h2>Current Diagnosis</h2>
                                <p>{target.current_diagnosis}</p>                                          
                            </div>
						</div>
                    ))}

                </div>
            </div>
		</div>	
			
			
            {show_quota ?
				<div className="container my-5">
                    <div className="row mb-3" style={{background:"#164473"}} >
                        <div className="col-md-2">{/* empty column for table headling */}</div>
                            {
                                hopital_enq.map((target, index) => (
                                <div className="col-md-2" key={index} >
                                    <h2 className="HospitalTitle">{target.hospital_name}</h2>
                                </div>
                            ))}
                    </div>	
					 <div className="row" >	
                        <div className="col-md-2" style={{ textAlign: "center" }}>
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
                                 <div className="col-md-2" key={index}>
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

                                        : <div className="col-md-3">
                                            <p>AWAITING FOR QUOTATION</p>
                                        </div>
                                    }

                                </div>
                            ))}

                    </div>

                </div> : null}
        </>
    );
}





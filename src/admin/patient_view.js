import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import { useLocation } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

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
        // console.log(getenquries.payload)
        const enq = getenquries.payload[0].hospitals
        setHopital_enq(enq)
        if (enq.length !== 0) {
            setShow_quota(true)
        }
    }

    const DownloadReports = (element) => {
          window.open (element,'_blank')  
    }
    const viewInsurance = () => {
        // console.log(enqurie_data[0]);
        if(enqurie_data[0].insurance_card_copy.length === 0){
            return  alert("No reports found")
        }
        enqurie_data[0].insurance_card_copy.forEach(element => {
          window.open (element,'_blank')  
        });
         //window.open (enqurie_data[0].insurance_card_copy[0],'_blank') 
    }
    
    return (
        <>
        <ReactTooltip />
        <ReactTooltip />
		<div className="container my-5">
			<div className="row">
				<div className="col-md-4">
					{
						enqurie_data.map((target, index) => (
							<div key={index} {...target}>
								<div className="PatientDetails">
									<h2 className="PatientName py-3"><b>{target.patient_name}</b></h2>
									<p><b>Phone Number :</b> <span>{target.patient_mobile || "__"}</span></p>
									<p><b>Email :</b> <span>{target.patient_email || "__"}</span></p>	
									<p><b>Age :</b> <span>{target.patient_age || "__"}</span></p>	
									<p><b>Gender :</b> <span>{target.patient_gender || "__"}</span></p>	
									<p><b>Nationality :</b> <span>{target.patient_nationality || "__"}</span></p>	
                                    {target.languages_spoken[0] ? <p><b>Language :</b> <span>{target.languages_spoken}</span></p> : null }
								</div>
							</div>
						))
					}
					{
						enqurie_data.map((target, index) => (
							<div key={index} {...target}>
								<div className="PatientPreferencesDetails my-4">
									<h2 className="PatientPreferences py-3">Patient Preferences</h2>
									<p className="mb-1"><b>Patient Requirement :</b> {target.proposed_treatment_plan.join(", ") || "__"}</p>
									<p><b>Patient Location :</b>{target.patient_nationality || "__"}</p>
									<p><b>Proposed Date : </b>{target.proposal_date || "__"}</p>
									<p><b>Transport Support Needed :</b>{target.transport_support_needed || "__"}</p>
									<p><b>Accomodation / Other Logistic :</b>{target.accomodation || "__"}</p>
									<p><b>Preferred Hospital Visit Type :</b> {target.preferred_hospital_visit || "__"}</p>
									<p><b>Food Preferences : </b>{target.food_preferences || "__"}</p>
								</div>
							</div>
				   ))}
				</div>
				<div className="col-md-8">
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index}>
                                <p><b>Speciality : </b>{ "__" }</p>
                                <p><b>Medical History : </b>{target.medical_history || "__"}&nbsp;&nbsp;{target.med2}&nbsp;&nbsp;{target.med3}</p>
                                <p><b>Status : </b>{target.status || "__"}</p> 
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
                             <div className="col-md-5 d-flex justify-content-between">
                                {enqurie_data[0].reports.map((element,index) => {
                                    
                                    if(element.search('http://192.46.209.112:8080/download') !== -1){
                                        
                                    return(
                                        <div className="DownloadButton Hover m-1" key={index}
                                            onClick={() => DownloadReports(element)} > Download Report
                                        </div>)
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="col-md-5">
                                <div className="InsuranceButton" onClick={() => viewInsurance()}> View Insurance <i className="fa fa-eye "></i></div>
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
                    <div id="table-scroll" className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                {
                                    hopital_enq.map((target, index) => (
                                    <th scope="col" key={index} >
                                        <h2 className="HospitalTitle">{target.hospital_name}</h2>
                                    </th>
                                ))}                              
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>
                                <p><b>Estimate Price</b></p>
                                <p><b>Treatment Plan</b></p>
                                <p><b>Inclusions</b></p>
                                <p><b>Exclusions</b></p>
                                <p><b>Copay Required</b></p>
                                <p><b>Types of Anesthesia</b></p>
                                <p><b>Type of room</b></p>
                                <p><b>Length of stay</b></p>
                                <p><b>Free room upgrade</b></p>
                                <p><b>Free telephonic feedback</b></p>
                                <p><b>Translator</b></p>
                                <p><b>Free Physiotherapy</b></p>
                                <p><b>Pickup and drop</b></p>
                                <p><b>Other free consultation</b></p>
                                <p><b>Free Annual checkup</b></p> 
                                <p><b>Selected Doctors</b></p>    
                                <p><b>General Disclaimer</b></p>    
                            </th>
                            {
                                hopital_enq.map((target, index) => (
                                    <td key={index} >
                                        {target.estimate_price ?
                                        <div className="targetData">
                                        <p data-tip={target.estimate_price}>{target.estimate_price}</p>
                                        <p data-tip={target.treatment_plan}>{target.treatment_plan}</p>
                                        <ReactTooltip/><p data-tip={target.inclusion}>{target.inclusion || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.exclusion}>{target.exclusion || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.estimate_copay}>{target.estimate_copay || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.type_of_anesthesia}>{target.type_of_anesthesia || "__"}</p>
                                        <p data-tip={target.type_of_room}>{target.type_of_room || "__"}</p>
                                        <p data-tip={target.lenth_of_stay}>{target.lenth_of_stay || "__"}</p>
                                        <p data-tip={target.free_room_upgrade}>{target.free_room_upgrade || "__"}</p>
                                        <p data-tip={target.free_telephonic_feedback}>{target.free_telephonic_feedback || "__"}</p>
                                        <p data-tip={target.translator}>{target.translator || "__"}</p>
                                        <p data-tip={target.free_physiotherapy}>{target.free_physiotherapy || "__"}</p>
                                        <p data-tip={target.pickup_and_drop}>{target.pickup_and_drop || "__"}</p>
                                        <p data-tip={target.free_other_speciality_consultant}>{target.free_other_speciality_consultant || "__"}</p>
                                        <p data-tip={target.free_other_speciality_consultant}>{target.free_other_speciality_consultant || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.select_doctor.join(", ")}>{target.select_doctor.join(", ") || "__"} </p>
                                        <ReactTooltip/><p data-tip={target.general_disclaimer}>{target.general_disclaimer || "__"}</p>
                                        </div>
                                        : <div>AWAITING FOR QUOTATION</div>
                                    }                           
                                    </td>
                            ))
                            }       
                        </tr>
                        </tbody>
                     </table>
                </div>
            </div> : null}
        </>
    );
}









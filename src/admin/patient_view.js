import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import { useLocation } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import constants from "../constant";
import { FaFileDownload } from 'react-icons/fa'

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
        window.open(constants.serverBaseUrl + element, '_blank')
    }
    const viewInsurance = () => {
        // console.log(enqurie_data[0]);
        if (enqurie_data[0].insurance_card_copy.length === 0) {
            return alert("No reports found")
        }
        // enqurie_data[0].insurance_card_copy.forEach(element => {
        window.open(constants.serverBaseUrl + enqurie_data[0].insurance_card_copy[0], "_blank");
        // });
        //  window.open (enqurie_data[0].insurance_card_copy[0],'_blank') 
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
                                        {target.languages_spoken[0] ? <p><b>Language :</b> <span>{target.languages_spoken}</span></p> : null}
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
                                    <p><b>Speciality : </b>{"__"}</p>
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

                        {enqurie_data[0] ? enqurie_data[0].reports[1] ?
                            <div className="row justify-content-center">
                                <div className="col-md-5 d-flex justify-content-between">
                                    {enqurie_data[0].reports.map((element, index) => {

                                        if (element.search('/download') !== -1) {

                                            return (
                                                <div className="DownloadButton Hover m-1" key={index}
                                                    onClick={() => DownloadReports(element)} > Download Report
                                                </div>)
                                        }
                                        return null;
                                    })}
                                </div>
                                <div className="col-md-5">
                                    <div className="InsuranceButton" onClick={() => viewInsurance()}> View Insurance </div>
                                </div>
                            </div> : null : null
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
                        <div className="text-center"><button onClick={() => window.print()}>Download Quote <FaFileDownload /></button></div>
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
                                    <td><b>Estimate Price</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.estimate_price || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Treatment Plan</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.treatment_plan || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Inclusions</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.inclusion || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Inclusions</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.inclusion || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Exclusions</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.exclusion || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Copay Required</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.estimate_copay || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Copay Percentage</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.estimate_copay_percentage || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Translator</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.translator || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Types of Anesthesia</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.type_of_anesthesia || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Type of Room</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.type_of_room || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Length of stay in Hospital</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.expected_length || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Length of stay in Country</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.length_of_stay || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Free room upgrade</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.free_room_upgrade || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Other Free Consultation</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.free_physiotherapy || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Free Physiotherapy</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.free_other_speciality_consultant || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Free Telephonic Feedback</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.free_telephonic_feedback || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Free Annual Checkup</b></td>
                                   { hopital_enq.map((target, index) => (
                                            
                                            <td key={index} >
                                                {target.free_annual_checkup ? 
                                                target.free_annual_checkup.join(", ") || "__" : null }
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Pickup and drop</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.pickup_and_drop || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Dedicated Relationship</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.free_patient_dedicated_relationship || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Benefits For Patient</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.benefits_for_patient || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Benefits of Attendants</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.benefits_for_attendent || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Food Menu</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.food_menu || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Confirm Date</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.confirmation || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Selected Doctors</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.select_doctor ? 
                                                target.select_doctor.join(", ") || "__" : null }
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>General Disclaimer</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.general_disclaimer || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td><b>Other Comments</b></td>
                                   { hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.other_comments || "__"}
                                            </td>
                                        ))
                                    }
                                </tr>
                        {/* <table>
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
                                        <p><b>Copay Percentage</b></p>
                                        <p><b>Translator</b></p>
                                        <p><b>Types of Anesthesia</b></p>
                                        <p><b>Type of Room</b></p>
                                        <p><b>Length of stay in Hospital</b></p>
                                        <p><b>Length of stay in Country</b></p>
                                        <p><b>Free room upgrade</b></p>
                                        <p><b>Free Physiotherapy</b></p>
                                        <p><b>Other Free Consultation</b></p>
                                        <p><b>Free telephonic feedback</b></p>
                                        <p><b>Free Annual Checkup</b></p>
                                        <p><b>Pickup and drop</b></p>
                                        <p><b>Dedicated Relationship</b></p>
                                        <p><b>Benefits For Patient</b></p>
                                        <p><b>Benefits of Attendants</b></p>
                                        <p><b>Food Menu</b></p>
                                        <p><b>Confirm Date</b></p>
                                        <p><b>Selected Doctors</b></p>
                                        <p><b>General Disclaimer</b></p>
                                        <p><b>Other Comments</b></p>
                                    </th>
                                    {
                                        hopital_enq.map((target, index) => (
                                            <td key={index} >
                                                {target.estimate_price ?
                                                    <div className="targetData">
                                                        <ReactTooltip /><p data-tip={target.estimate_price}>{target.estimate_price || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.treatment_plan}>{target.treatment_plan || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.inclusion}>{target.inclusion || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.exclusion}>{target.exclusion || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.estimate_copay}>{target.estimate_copay || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.estimate_copay_percentage}>{target.estimate_copay_percentage || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.translator}>{target.translator || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.type_of_anesthesia}>{target.type_of_anesthesia || "__"}</p>
                                                        <p data-tip={target.type_of_room}>{target.type_of_room || "__"}</p>
                                                        <p data-tip={target.expected_length}>{target.expected_length || "__"}</p>
                                                        <p data-tip={target.length_of_stay}>{target.length_of_stay || "__"}</p>
                                                        <p data-tip={target.free_room_upgrade}>{target.free_room_upgrade || "__"}</p>
                                                        <p data-tip={target.free_physiotherapy}>{target.free_physiotherapy || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.free_other_speciality_consultant}>{target.free_other_speciality_consultant || "__"}</p>
                                                        <p data-tip={target.free_telephonic_feedback}>{target.free_telephonic_feedback || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.free_annual_checkup.join(", ")}>{target.free_annual_checkup.join(", ") || "__"}</p>
                                                        <p data-tip={target.pickup_and_drop}>{target.pickup_and_drop || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.free_patient_dedicated_relationship}>{target.free_patient_dedicated_relationship || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.benefits_for_patient}>{target.benefits_for_patient || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.benefits_for_attendent}>{target.benefits_for_attendent || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.food_menu}>{target.food_menu || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.confirmation}>{target.confirmation || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.select_doctor.join(", ")}>{target.select_doctor.join(", ") || "__"} </p>
                                                        <ReactTooltip /><p data-tip={target.general_disclaimer}>{target.general_disclaimer || "__"}</p>
                                                        <ReactTooltip /><p data-tip={target.other_comments}>{target.other_comments || "__"}</p>
                                                    </div>
                                                    : <div>AWAITING FOR QUOTATION</div>
                                                }
                                            </td>
                                        ))
                                    }
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div> : null}
        </>
    );
}
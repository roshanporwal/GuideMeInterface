import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import { MultiSelect } from "react-multi-select-component";
import ReactStars from "react-rating-stars-component";
import { Form } from "react-bootstrap";
import './style.css';
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from '../components/gif_loader';
import constants from "../constant";


export default function ADMIN_PATIENT_DASHBOARD(props) {
    const [enqurie_data, setEnqurie_data] = useState([])
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleOthersField = () => {
        setShow(!show)
    }
    const [rating, setRating] = useState(0)
    const [islowrating, setIsLowRating] = useState(null);
    const [hospitals, setHospitals] = useState([])
    const [selected, setSelected] = useState([]);
    const [hopital_enq, setHopital_enq] = useState([]);
    const [show_quota, setShow_quota] = useState(false);
    const [formValues, setFormValue] = useState({
        commission: "",
        transaction: "",
        id: '',
        communication_skills: "",
        care_and_hospitality: "",
        hospital_infrastructure: "",
        transparency: "",
        overall_outcome: "",
        other_rating: "",


    })
    const [feedbackmessage, setFeedbackmessgae] = useState('');
    const [isSubmitting] = useState(false)
    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    useEffect(() => {

        fetchData(props).then(() => setLoading(false));
    }, [props]);


    async function fetchData(props) {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        const getenquriesbyid = await auth_service.getenquriesbyid(data.login_id, props.location.state)
        setEnqurie_data(getenquriesbyid.payload)
        const enq = getenquriesbyid.payload[0].hospitals
        setHopital_enq(enq)
        if (enq.length !== 0) {
            setShow_quota(true)
        }
        const getenquries = await auth_service.gethospitals(data.login_id)
        setHospitals(getenquries.payload)
    }

    const handleSubmit = async (event) => {
        //event.preventDefault();
        setLoading(true);
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if (event === "before") {
            if (selected.length > 5) {
                return alert(" Patient details can be shared only with three Hospitals.")
            } else {
                const updateenquries = await auth_service.updateenquries(enqurie_data[0]._id, selected, data.login_id)
                if (updateenquries.payload) {
                    const getenquries = await auth_service.getenquriesbyid(data.login_id, enqurie_data[0]._id)
                    setEnqurie_data(getenquries.payload)
                    setHopital_enq(getenquries.payload[0].hospitals)
                    setShow_quota(true)
                }
                setLoading(false);
            }
        } else {
            const url = {
                url: `${constants.clientBaseUrl}patient_view?id=` + enqurie_data[0].id,
                email: enqurie_data[0].patient_email,
                enq_id: enqurie_data[0]._id,
                name:enqurie_data[0].patient_name
            }
            const getenquries = await auth_service.sendmail(data.login_id, url)
            if (getenquries.payload) {
                alert(getenquries.payload)
                fetchData(props).then(
                    () => setLoading(false)
                ).catch((c) => {
                    setLoading(false);
                    alert("Some thing Went Wrong");
                });
            }
        }

    };
    const DownloadReports = () => {
        //console.log(enqurie_data[0]);
        if(enqurie_data[0].reports.length === 0){
            return  alert("No reports found")
        }
        enqurie_data[0].reports.forEach(element => {
          window.location.href = element;  
        });
    }
    const viewInsurance = () => {
        console.log(enqurie_data[0]);
        if(enqurie_data[0].insurance_card_copy.length === 0){
            return  alert("No reports found")
        }
        enqurie_data[0].insurance_card_copy.forEach(element => {
          window.open (element,'_blank')  
        });
         //window.open (enqurie_data[0].insurance_card_copy[0],'_blank') 
    }

    async function wonandloss(wonorloss) {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if(wonorloss=== "won"){
        const wonandloss = await auth_service.won(enqurie_data[0]._id, data.login_id, formValues.id, formValues)
        if (wonandloss.payload) {
            window.location.reload();
        }
    }else{
        const wonandloss = await auth_service.loss(enqurie_data[0]._id, data.login_id)
        if (wonandloss.payload) {
            window.location.reload();
        }
    }
    


    }
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    const checklowRating = async () => {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if (rating < 4 && feedbackmessage === '') {

            setIsLowRating(true)
        }
        else {

            const res = {
                feedbackmessage: feedbackmessage,
                feedbackrating: rating
            }
            const feedback = await auth_service.feedback(enqurie_data[0]._id, data.login_id, res)
            if (feedback.payload) {
                setIsLowRating(false)
            }
        }
    }
    if (loading === true)
        return (
            <>
                <ReactGifLoader />
            </>
        )
    else
        return (
            <>
                <ADMIN_NAVBAR />
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Transaction</h5>

                            </div>
                            <div className="modal-body">
                                <Form onSubmit={()=>wonandloss("won")}>
                                    <Form.Group>

                                        <Form.Control
                                            style={{ border: "2px solid #164473", borderRadius: 10, width: "27rem" }}
                                            placeholder="Transaction Value"
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="transaction"
                                            id="transaction"

                                            value={formValues.transaction}
                                        />

                                    </Form.Group>
                                    <Form.Group style={{ marginTop: "2rem" }}>

                                        <Form.Control
                                            style={{ border: "2px solid #164473", borderRadius: 10, width: "27rem" }}
                                            placeholder="Commision Value"
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="commission"
                                            id="commission"

                                            value={formValues.commision}
                                        />

                                    </Form.Group>
                                </Form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button data-toggle="modal" data-target="#exampleModal" disabled={isSubmitting} type="submit" className="btn btn-primary" onClick={()=>wonandloss("won")}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-4">
                            {
                                enqurie_data.map((target, index) => (
                                    <div key={index}>
                                        <div className="PatientDetails">
                                            <h2 className="PatientName py-3">{target.patient_name}</h2>
                                            <p><b>Id :</b> <span>{target.id}?</span></p>
                                            <p><b>Phone Number : </b> <span>{target.patient_mobile}</span></p>
                                            <p><b>Email : </b> <span>{target.patient_email}</span></p>
                                            <p><b>Age : </b> <span>{target.patient_age}</span></p>
                                            <p><b>Gender : </b> <span>{target.patient_gender}</span></p>
                                            <p><b>Nationality : </b> <span>{target.patient_nationality}</span></p>
                                            <p><b>Language : </b> <span>{target.languages_spoken.join(', ')}</span></p>
                                            
                                        </div>

                                    </div>
                                ))
                            }
                            {
                                enqurie_data.map((target, index) => (
                                    <div key={index} {...target}>
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
                            <div className="row">
                            {
                                enqurie_data.map((target, index) => (
                                    <div key={index} className="col-md-6">
                                        <p><b>Speciality : </b>{target.speciality}</p>
                                        <p><b>Medical History : </b>{target.medical_history}&nbsp;&nbsp;{target.med2}&nbsp;&nbsp;{target.med3}</p>
                                        <p><b>Status : </b>{target.status}</p> 
                                    </div>
                                ))}
                                    <div className="col-md-6">
                                        <h2 className="rating">Please rate us!</h2>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={42}
                                            activeColor="#ffd700"
                                        />
                                    </div>    
                                {islowrating ?
                                    <div className="col-md-12">
                                        <div className="ratingBox" >
                                            <h4>We understand that there are certain areas where we need to improve our level of services further.
                                            Please let us know where you would want to focus the most.</h4>
                                            <hr />
                                            <div>
                                                <form>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="checkbox" name="rating"
                                                            value=" Communication Skills of Professionals"
                                                            id="communication_skills"
                                                            onClick={() => setFeedbackmessgae(" Communication Skills of Professionals")} />
                                                        <label className="form-check-label"> Communication Skills of Professionals
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label>Care and Hospitality of other professionals</label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="care_and_hospitality"
                                                            value="Care and Hospitality of other professionals"
                                                            className="form-check-input"
                                                            onClick={() => setFeedbackmessgae("Care and Hospitality of other professionals")}
                                                        />

                                                    </div>
                                                    <div className="form-check">
                                                        <label>Hospital Infrastructure</label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="hospital_infrastructure"
                                                            value="Hospital Infrastructure"
                                                            className="form-check-input"
                                                            onClick={() => setFeedbackmessgae("Hospital Infrastructure")}

                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>Transparency in Communication</label>
                                                        <input
                                                            type="checkbox"
                                                            label="Transparency in Communication"
                                                            id="transparency"
                                                            value="Transparency in Communication"
                                                            className="form-check-input"
                                                            name="rating"
                                                            onClick={() => setFeedbackmessgae("Transparency in Communication")}
                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>Overall outcome of treatment</label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="overall_outcome"
                                                            value="Overall outcome of treatment"
                                                            className="form-check-input"
                                                            onClick={() => setFeedbackmessgae("Overall outcome of treatment")}
                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>Other</label>
                                                        <input
                                                            type="checkbox"
                                                            label="Other"
                                                            id="other_text"
                                                            name="other_text"
                                                            value="Other_text"
                                                            onChange={handleOthersField}
                                                            className="form-check-input"
                                                        />
                                                    </div>
                                                    {show ?

                                                        <div className="form-check">
                                                            <input
                                                                type="text"
                                                                label="Other"
                                                                id="other"
                                                                name="rating"
                                                                className="form-control"
                                                                style={{ width: "32rem" }}
                                                            />
                                                        </div>
                                                        : ""}
                                                </form>
                                            </div>
                                        </div>
                                    </div> : islowrating == null ? "" : 
                                    <div>
                                        <h3>Thankyou!</h3>
                                    </div>}
                                    <div className="offset-lg-5 col-md-2 my-2">                      
                                         <div style={{width:"100%",letterSpecing:1}} onClick={checklowRating}  className="btn btn-warning">SEND</div>
                                    </div>                             
                            </div>
                             {
                                enqurie_data.map((target, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-12">
                                            <div className="queryBox my-2">
                                                <h2>Query</h2>                                              
                                                <p>{target.current_diagnosis}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                             {enqurie_data[0].reports[1] ?
                               <div className="row m-2">
                                    <div className="col-md-5">
                                        <div className="DownloadButton Hover" 
                                            onClick={() => DownloadReports()} > Download Reports
                                            <i className="fa fa-download "></i>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-5">
                                        <div className="InsuranceButton Hover"
                                            onClick={() => viewInsurance()}>View Insurance
                                            <i className="fa fa-eye "></i>
                                        </div>
                                    </div>
                                </div>
                                : null}
                                {
                                enqurie_data.map((target, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-12">
                                            <div className="diagnosisBox my-3">
                                                <h2>Current Diagnosis</h2>
                                                <p>{target.current_diagnosis}</p>                                          
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                 
                            {show_quota ? null :
                                <div className="row">
                                    <div className="col-md-12">   
                                        <label className="form-label">Select Hospital(Please Select any 5)</label>
                                        <MultiSelect
                                            options={hospitals}
                                            value={selected}
                                            onChange={setSelected}
                                            labelledBy="Select"
                                        />
                                        <button className="JoinButton my-2" type="submit" onClick={() => handleSubmit("before")}>{"Submit"}</button>
                                    </div>
                                </div>}
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
                                                {enqurie_data[0].status === "Awaiting From Patients" ?
                                                    <button className="JoinButton Hover" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                                        onClick={() =>
                                                            setFormValue(prevState => ({
                                                                ...prevState,
                                                                id: target.hospital_id
                                                            }))
                                                        }
                                                    >Certified Patients</button> : null
                                                }
                                            </div>

                                            : <div className="col-md-3">
                                                <p>AWAITING FOR QUOTATION</p>

                                            </div>
                                        }

                                    </div>
                                ))}

                        </div>
                        {enqurie_data[0].status === "Won Patients" ?
                            <div className="row mt-4" >
                                <div className="col-md-3 text-center">
                                    <p><b>Won: </b></p>
                                    <p><b>Transaction Value: </b></p>
                                    <p><b>Commission Value:</b></p>
                                </div>
                                <div className="col-md-9">
                                    <p>{enqurie_data[0].hospital_name} </p>
                                    <p>{enqurie_data[0].value}</p>
                                    <p>{enqurie_data[0].commission}</p>
                                </div>
                            </div> : null
                        }
                        <div className="py-5">
                        {enqurie_data[0].status === "Awaiting From Hospital" ?
                            <div className="col-md-12 my-3">
                                <button style={{width:"100%"}} className="JoinButton Hover" onClick={() => handleSubmit("after")}>Forward to Patient</button>
                            </div>
                            :(enqurie_data[0].status === "Lost Patients" || enqurie_data[0].status === "Won Patients" )? null: <div className="col-md-12 ">
                                <button style={{width:"100%",backgroundColor:'orange'}} className="JoinButton Hover" onClick={()=>wonandloss("lost")}>Patient Lost</button>
                            </div>}
                        </div>
                    </div> : null}



            </>
        );
}





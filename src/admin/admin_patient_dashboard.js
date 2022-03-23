import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import * as auth_service from "../services/auth_service";
import { MultiSelect } from "react-multi-select-component";
import ReactStars from "react-rating-stars-component";
import { Form, Modal } from "react-bootstrap";
import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from "../interfacecomponents/gif_loader";
import constants from "../constant";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export default function ADMIN_PATIENT_DASHBOARD(props) {
    const { state } = useLocation();
    const [enqurie_data, setEnqurie_data] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleOthersField = () => {
        setShow(!show);
    };
    const [rating, setRating] = useState(0);
    const [islowrating, setIsLowRating] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [selected, setSelected] = useState([]);
    const [hopital_enq, setHopital_enq] = useState([]);
    const [show_quota, setShow_quota] = useState(false);
    const [formValues, setFormValue] = useState({
        commission: "",
        transaction: "",
        id: "",
        communication_skills: "",
        care_and_hospitality: "",
        hospital_infrastructure: "",
        transparency: "",
        overall_outcome: "",
        other_rating: "",
    });
    const [feedbackmessage, setFeedbackmessgae] = useState("");
    const [showreason, setShowReason] = useState(false);
    const [lossreason, setLossReason] = useState(" ");

    const [isSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleReason = (e) => {
        const { value } = e.currentTarget;
        setLossReason(value);
    };

    useEffect(() => {
        fetchData(state).then(() => setLoading(false));
    }, [state]);

    async function fetchData(props) {
        let data = localStorage.getItem("login");
        data = JSON.parse(data);
        const getenquriesbyid = await auth_service.getenquriesbyid(
            data.login_id,
            props.id
        );
        setEnqurie_data(getenquriesbyid.payload);
        //console.log(getenquriesbyid.payload[0]);
        const enq = getenquriesbyid.payload[0].hospitals;
        setHopital_enq(enq);
        if (enq.length !== 0) {
            setShow_quota(true);
        }
        const getenquries = await auth_service.gethospitals(data.login_id);
        setHospitals(getenquries.payload);
        // console.log(getenquries.payload);
    }

    const handleSubmit = async (event) => {
        //event.preventDefault();
        setLoading(true);
        let data = localStorage.getItem("login");
        data = JSON.parse(data);
        if (event === "before") {
            if (selected.length > 5) {
                return alert(
                    " Patient details can be shared only with three Hospitals."
                );
            } else {
                const updateenquries = await auth_service.updateenquries(
                    enqurie_data[0]._id,
                    selected,
                    data.login_id
                );
                if (updateenquries.payload) {
                    const getenquries = await auth_service.getenquriesbyid(
                        data.login_id,
                        enqurie_data[0]._id
                    );
                    setEnqurie_data(getenquries.payload);
                    setHopital_enq(getenquries.payload[0].hospitals);
                    setShow_quota(true);
                }
                setLoading(false);
            }
        } else {
            const url = {
                url:
                    `${constants.clientBaseUrl}patient_view?id=` +
                    enqurie_data[0].id,
                email: enqurie_data[0].patient_email,
                enq_id: enqurie_data[0]._id,
                name: enqurie_data[0].patient_name,
            };
            const getenquries = await auth_service.sendmail(data.login_id, url);
            
            console.log(getenquries);
            if (getenquries.payload) {
                alert("sent successfully");
                fetchData(props)
                    .then(() => setLoading(false))
                    .catch((c) => {
                        setLoading(false);
                        alert("Some thing Went Wrong");
                    });
                // navigate()
            }
            else{
                alert("Mail not sent. Please try again later.")
            }
        }
    };
    const DownloadReports = (element) => {
        window.open(constants.serverBaseUrl+element, "_blank");
    };
    const viewInsurance = () => {
        // console.log(enqurie_data[0]);
        if (enqurie_data[0].insurance_card_copy.length === 0) {
            return alert("No reports found");
        }
        // enqurie_data[0].insurance_card_copy.forEach((element) => {
            window.open(constants.serverBaseUrl+enqurie_data[0].insurance_card_copy[0], "_blank");
        // });
        //window.open (enqurie_data[0].insurance_card_copy[0],'_blank')
    };

    async function wonandloss(wonorloss) {
        let data = localStorage.getItem("login");
        data = JSON.parse(data);
        if (wonorloss === "won") {
            const wonandloss = await auth_service.won(
                enqurie_data[0]._id,
                data.login_id,
                formValues.id,
                formValues
            );
            if (wonandloss.payload) {
                window.location.reload();
            }
        } else if (wonorloss === "lost") {
            const patient_lost_reason = lossreason;
            const wonandloss = await auth_service.loss(
                enqurie_data[0]._id,
                data.login_id,
                patient_lost_reason
            );
            if (wonandloss.payload) {
                window.location.reload();
            }
        } else if (wonorloss === "reason") {
            setShowReason(!showreason);
            return;
        }
    }
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const checklowRating = async () => {
        let data = localStorage.getItem("login");
        data = JSON.parse(data);
        if (rating < 4 && feedbackmessage === "") {
            setIsLowRating(true);
        } else {
            const res = {
                feedbackmessage: feedbackmessage,
                feedbackrating: rating,
                patient_name: enqurie_data[0].patient_name,
                current_diagnosis: enqurie_data[0].current_diagnosis,
                hospital_name: enqurie_data[0].hospital_name,
                patient_id: enqurie_data[0]._id,
            };
            const feedback = await auth_service.feedback(
                enqurie_data[0]._id,
                data.login_id,
                res
            );
            if (feedback.payload) {
                setIsLowRating(false);
            }
        }
    };
    if (loading === true)
        return (
            <>
                <ReactGifLoader />
            </>
        );
    else
        return (
            <>
                {showreason ? (
                    <Modal
                        show={showreason}
                        onHide={() => wonandloss("reason")}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Mark Patient Lost</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Loss Reason</Form.Label>
                                <Form.Control
                                    required
                                    style={{
                                        border: "2px solid #164473",
                                        borderRadius: 10,
                                    }}
                                    type="text"
                                    name="patient_name"
                                    value={lossreason}
                                    onChange={handleReason}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => wonandloss("reason")}
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => wonandloss("lost")}
                            >
                                Mark Lost
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : null}

                <ADMIN_NAVBAR />
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Transaction
                                </h5>
                            </div>
                            <div className="modal-body">
                                <Form onSubmit={() => wonandloss("won")}>
                                    <Form.Group>
                                        <Form.Control
                                            style={{
                                                border: "2px solid #164473",
                                                borderRadius: 10,
                                                width: "27rem",
                                            }}
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
                                            style={{
                                                border: "2px solid #164473",
                                                borderRadius: 10,
                                                width: "27rem",
                                            }}
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
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={() => wonandloss("won")}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-4">
                            {enqurie_data.map((target, index) => (
                                <div key={index}>
                                    <div className="PatientDetails">
                                        <h2 className="PatientName py-3">
                                            {target.patient_name}
                                        </h2>
                                        <p>
                                            <b>Id :</b> <span>{target.id}</span>
                                        </p>
                                        {target.family ? (
                                            <p>
                                                <b>For Family Member : </b>
                                                <span>
                                                    {target.family.first_name}{" "}
                                                    {target.family.last_name}
                                                </span>
                                            </p>
                                        ) : null}
                                        <p>
                                            <b>Phone Number : </b>{" "}
                                            <span>{target.patient_mobile}</span>
                                        </p>
                                        <p>
                                            <b>Email : </b>{" "}
                                            <span>{target.patient_email}</span>
                                        </p>
                                        <p>
                                            <b>Age : </b>{" "}
                                            <span>{target.patient_age}</span>
                                        </p>
                                        <p>
                                            <b>Gender : </b>{" "}
                                            <span>{target.patient_gender}</span>
                                        </p>
                                        {target.patient_address ? (
                                            <p>
                                                <b>Address : </b>{" "}
                                                <span>
                                                    target.patient_address
                                                </span>
                                            </p>
                                        ) : null}
                                        {target.map_link ? (
                                            <p>
                                                <b>Map Link : </b>
                                                <span>
                                                    <a href={target.map_link}>
                                                        {target.map_link.slice(
                                                            28
                                                        )}
                                                    </a>
                                                </span>
                                            </p>
                                        ) : null}
                                        {target.insurance_name ? (
                                            <p>
                                                <b>Insurance Name : </b>{" "}
                                                <span>
                                                    {target.insurance_name}
                                                </span>
                                            </p>
                                        ) : null}
                                        <p>
                                            <b>Nationality : </b>{" "}
                                            <span>
                                                {target.patient_nationality || "----"}
                                            </span>
                                        </p>
                                        {target.languages_spoken[0] ? (
                                            <p>
                                                <b>Language : </b>{" "}
                                                <span>
                                                    {target.languages_spoken.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </p>
                                        ) : null}
                                        {target.patient_referred_by ? (
                                            <p>
                                                <b>Referred By : </b>
                                                <span>
                                                    {target.patient_referred_by}
                                                </span>
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                            {enqurie_data.map((target, index) => (
                                <div key={index} {...target}>
                                    <div className="PatientPreferencesDetails my-4">
                                        <h2 className="PatientPreferences py-3">
                                            Patient Preferences
                                        </h2>

                                        {target.proposed_treatment_plan[0] ? (
                                            <>
                                                <p className="mb-1">
                                                    Patient Requirement :{" "}
                                                </p>
                                                <h6>
                                                    {target.proposed_treatment_plan.join(
                                                        ", "
                                                    )}
                                                </h6>{" "}
                                            </>
                                        ) : null}
                                        {target.enquiry_date ? (
                                            <p>
                                                Enquiry Date :{" "}
                                                {target.enquiry_date}
                                            </p>
                                        ) : null}
                                        {target.location ? (
                                            <p>
                                                Patient Location :{" "}
                                                {target.location}
                                            </p>
                                        ) : null}
                                        {target.proposal_date ? (
                                            <p>
                                                Proposed Date :{" "}
                                                {target.proposal_date}
                                            </p>
                                        ) : null}
                                        {target.proposal_date_time_first &&
                                        target.proposal_date_time_first !==
                                            "0:00 am" ? (
                                            <p>
                                                Proposal Time :{" "}
                                                {
                                                    target.proposal_date_time_first
                                                }
                                            </p>
                                        ) : null}
                                        {target.proposal_date_second ? (
                                            <p>
                                                Alternate Proposed Date :{" "}
                                                {target.proposal_date_second}
                                            </p>
                                        ) : null}
                                        {target.proposal_date_time_second &&
                                        target.proposal_date_time_second !==
                                            "0:00 am" ? (
                                            <p>
                                                Alternate Proposal Time :{" "}
                                                {
                                                    target.proposal_date_time_second
                                                }
                                            </p>
                                        ) : null}
                                        {target.nursing_date_range ? (
                                            <p className="card-text">
                                                <b>Nursing Date Range : </b>
                                                {
                                                    target.nursing_date_range
                                                } for {target.time_period} hours
                                            </p>
                                        ) : null}
                                        {target.transport_support_needed ? (
                                            <p>
                                                Transport Support Needed :{" "}
                                                {
                                                    target.transport_support_needed
                                                }
                                            </p>
                                        ) : null}
                                        {target.accomodation ? (
                                            <p>
                                                Accomodation / Other Logistic :{" "}
                                                {target.accomodation}
                                            </p>
                                        ) : null}
                                        {target.preferred_hospital_visit ? (
                                            <p>
                                                Preferred Hospital Visit Type :{" "}
                                                {
                                                    target.preferred_hospital_visit
                                                }
                                            </p>
                                        ) : null}
                                        {target.food_preferences ? (
                                            <p>
                                                Food Preferences :{" "}
                                                {target.food_preferences}{" "}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                {enqurie_data.map((target, index) => (
                                    <div key={index} className="col-md-6">
                                        {/* <p><b>Speciality : </b>{target.speciality}</p> */}
                                        <p>
                                            <b>Medical History : </b>
                                            {target.medical_history}&nbsp;&nbsp;
                                            {target.med2}
                                            &nbsp;&nbsp;{target.med3}
                                        </p>
                                        <p>
                                            <b>Status : </b>
                                            {target.status}{" "}
                                            {target.status ===
                                            "Lost Patients" ? (
                                                <>
                                                    <br />
                                                    <b>Reason :</b>
                                                    {target.patient_lost_reason}
                                                </>
                                            ) : null}
                                        </p>
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
                                {islowrating ? (
                                    <div className="col-md-12">
                                        <div className="ratingBox">
                                            <h4>
                                                We understand that there are
                                                certain areas where we need to
                                                improve our level of services
                                                further. Please let us know
                                                where you would want to focus
                                                the most.
                                            </h4>
                                            <hr />
                                            <div>
                                                <form>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="rating"
                                                            value=" Communication Skills of Professionals"
                                                            id="communication_skills"
                                                            onClick={() =>
                                                                setFeedbackmessgae(
                                                                    " Communication Skills of Professionals"
                                                                )
                                                            }
                                                        />
                                                        <label className="form-check-label">
                                                            {" "}
                                                            Communication Skills
                                                            of Professionals
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label>
                                                            Care and Hospitality
                                                            of other
                                                            professionals
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="care_and_hospitality"
                                                            value="Care and Hospitality of other professionals"
                                                            className="form-check-input"
                                                            onClick={() =>
                                                                setFeedbackmessgae(
                                                                    "Care and Hospitality of other professionals"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>
                                                            Hospital
                                                            Infrastructure
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="hospital_infrastructure"
                                                            value="Hospital Infrastructure"
                                                            className="form-check-input"
                                                            onClick={() =>
                                                                setFeedbackmessgae(
                                                                    "Hospital Infrastructure"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>
                                                            Transparency in
                                                            Communication
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            label="Transparency in Communication"
                                                            id="transparency"
                                                            value="Transparency in Communication"
                                                            className="form-check-input"
                                                            name="rating"
                                                            onClick={() =>
                                                                setFeedbackmessgae(
                                                                    "Transparency in Communication"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="form-check">
                                                        <label>
                                                            Overall outcome of
                                                            treatment
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            name="rating"
                                                            id="overall_outcome"
                                                            value="Overall outcome of treatment"
                                                            className="form-check-input"
                                                            onClick={() =>
                                                                setFeedbackmessgae(
                                                                    "Overall outcome of treatment"
                                                                )
                                                            }
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
                                                            onChange={
                                                                handleOthersField
                                                            }
                                                            className="form-check-input"
                                                        />
                                                    </div>
                                                    {show ? (
                                                        <div className="form-check">
                                                            <input
                                                                type="text"
                                                                label="Other"
                                                                id="other"
                                                                name="rating"
                                                                className="form-control"
                                                                style={{
                                                                    width: "32rem",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ) : islowrating == null ? (
                                    ""
                                ) : (
                                    <div>
                                        <h3>Thankyou!</h3>
                                    </div>
                                )}
                                <div className="offset-lg-5 col-md-2 my-2">
                                    <div
                                        style={{
                                            width: "100%",
                                            letterSpecing: 1,
                                        }}
                                        onClick={checklowRating}
                                        className="btn btn-warning"
                                    >
                                        SEND
                                    </div>
                                </div>
                            </div>
                            {enqurie_data.map((target, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="queryBox my-2">
                                            <h2>Query</h2>
                                            <p>{target.current_diagnosis}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {enqurie_data[0].reports[1] ? (
                                <div className="row m-2">
                                    <div className="col-md-5 d-flex justify-content-between">
                                        {enqurie_data[0].reports.map(
                                            (element, index) => {
                                                if (
                                                    element.search(
                                                        "/download"
                                                    ) !== -1
                                                ) {
                                                    return (
                                                        <div
                                                            className="DownloadButton Hover m-1"
                                                            key={index}
                                                            onClick={() =>
                                                                DownloadReports(
                                                                    element
                                                                )
                                                            }
                                                        >
                                                            {" "}
                                                            Download Report
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-5">
                                        <div
                                            className="InsuranceButton Hover"
                                            onClick={() => viewInsurance()}
                                        >
                                            View Insurance
                                            {/* <i className="fa fa-eye "></i> */}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {enqurie_data.map((target, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="diagnosisBox my-3">
                                            <h2>Current Diagnosis</h2>
                                            <p>{target.current_diagnosis}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {enqurie_data[0].medicine_name ? (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="diagnosisBox my-3">
                                            <h2>Medicine Name</h2>
                                            <p>
                                                {enqurie_data[0].medicine_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {show_quota ? null : (
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="form-label">
                                            Select Hospital(Please Select any 5)
                                        </label>
                                        <MultiSelect
                                            options={hospitals}
                                            value={selected}
                                            onChange={setSelected}
                                            labelledBy="Select"
                                        />
                                        <button
                                            className="JoinButton my-2"
                                            type="submit"
                                            onClick={() =>
                                                handleSubmit("before")
                                            }
                                        >
                                            {"Submit"}
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                        <ReactTooltip/><p data-tip={target.estimate_price}>{target.estimate_price || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.treatment_plan}>{target.treatment_plan || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.inclusion}>{target.inclusion || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.exclusion}>{target.exclusion || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.estimate_copay}>{target.estimate_copay || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.estimate_copay_percentage}>{target.estimate_copay_percentage || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.translator}>{target.translator || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.type_of_anesthesia}>{target.type_of_anesthesia || "__"}</p>
                                        <p data-tip={target.type_of_room}>{target.type_of_room || "__"}</p>
                                        <p data-tip={target.expected_length}>{target.expected_length || "__"}</p>
                                        <p data-tip={target.length_of_stay}>{target.length_of_stay || "__"}</p>
                                        <p data-tip={target.free_room_upgrade}>{target.free_room_upgrade || "__"}</p>
                                        <p data-tip={target.free_physiotherapy}>{target.free_physiotherapy || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.free_other_speciality_consultant}>{target.free_other_speciality_consultant || "__"}</p>
                                        <p data-tip={target.free_telephonic_feedback}>{target.free_telephonic_feedback || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.free_annual_checkup.join(", ")}>{target.free_annual_checkup.join(", ") || "__"}</p>
                                        <p data-tip={target.pickup_and_drop}>{target.pickup_and_drop || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.free_patient_dedicated_relationship}>{target.free_patient_dedicated_relationship || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.benefits_for_patient}>{target.benefits_for_patient || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.benefits_for_attendent}>{target.benefits_for_attendent || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.food_menu}>{target.food_menu || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.confirmation}>{target.confirmation || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.select_doctor.join(", ")}>{target.select_doctor.join(", ") || "__"} </p>
                                        <ReactTooltip/><p data-tip={target.general_disclaimer}>{target.general_disclaimer || "__"}</p>
                                        <ReactTooltip/><p data-tip={target.other_comments}>{target.other_comments || "__"}</p>
                                        </div>
                                        : <div>AWAITING FOR QUOTATION</div>
                                    }                           
                                    </td>
                            ))
                            }       
                        </tr>
                        <tr className="mt-2">
                            <th scope="col"></th>
                            {
                                hopital_enq.map((target, index) => (
                                <th scope="col" key={index} >
                                    {enqurie_data[0].status ===
                            "Awaiting From Patients" ? (
                                    <button
                                        className="JoinButton Hover"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() =>
                                            setFormValue(
                                                (prevState) => ({
                                                    ...prevState,
                                                    id: target.hospital_id,
                                                })
                                            )
                                        }
                                    >
                                        Certified Patients
                                    </button>
                            ) : null}
                                </th>
                            ))}                              
                            </tr>
                            <tr>
                            
                        </tr>
                        </tbody>
                     </table>
                     {enqurie_data[0].status === "Won Patients" ? (
                            <div className="row mt-4">
                                <div className="col-md-3 text-center">
                                    <p>
                                        <b>Won: </b>
                                    </p>
                                    <p>
                                        <b>Transaction Value: </b>
                                    </p>
                                    <p>
                                        <b>Commission Value:</b>
                                    </p>
                                </div>
                                <div className="col-md-9">
                                    <p>{enqurie_data[0].hospital_name} </p>
                                    <p>{enqurie_data[0].value}</p>
                                    <p>{enqurie_data[0].commission}</p>
                                </div>
                            </div>
                        ) : null}
                        <div className="py-5">
                            {enqurie_data[0].status ===
                            "Awaiting From Hospital" || enqurie_data[0].status.toLowerCase().includes(" quotes recieved") ? (
                                <div className="col-md-12 my-3">
                                    <button
                                        style={{ width: "100%" }}
                                        className="JoinButton Hover"
                                        onClick={() => handleSubmit("after")}
                                    >
                                        Forward to Patient
                                    </button>
                                </div>
                            ) : enqurie_data[0].status === "Lost Patients" ||
                              enqurie_data[0].status ===
                                  "Won Patients" ? null : (
                                <div className="col-md-12 ">
                                    <button
                                        style={{
                                            width: "100%",
                                            backgroundColor: "orange",
                                        }}
                                        className="JoinButton Hover"
                                        onClick={() => wonandloss("reason")}
                                    >
                                        Patient Lost
                                    </button>
                                </div>
                            )}
                        </div>
                </div>
            </div> : null}
            </>
        );
}

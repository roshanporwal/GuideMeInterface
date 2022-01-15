import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import * as auth_service from "../services/auth_service";
// import { MultiSelect } from "react-multi-select-component";
// import ReactStars from "react-rating-stars-component";
// import { Form } from "react-bootstrap";
import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from "../components/gif_loader";
// import constants from "../constant";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
}
function convertTime(str) {
  var d = new Date(str);
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  return hr + ":" + min + " " + ampm;
}
export default function ADMIN_ENQUIRY_INFO(props) {
  const [enqurie_data, setEnqurie_data] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [show, setShow] = useState(false);

  // const handleOthersField = () => {
  //   setShow(!show);
  // };
  // const [rating, setRating] = useState(0);
  // const [islowrating, setIsLowRating] = useState(null);
  // const [hospitals, setHospitals] = useState([]);
  // const [selected, setSelected] = useState([]);
  // const [hopital_enq, setHopital_enq] = useState([]);
  // const [show_quota, setShow_quota] = useState(false);
  // const [formValues, setFormValue] = useState({
  //   commission: "",
  //   transaction: "",
  //   id: "",
  //   communication_skills: "",
  //   care_and_hospitality: "",
  //   hospital_infrastructure: "",
  //   transparency: "",
  //   overall_outcome: "",
  //   other_rating: "",
  // });
  // const [feedbackmessage, setFeedbackmessgae] = useState("");
  // const [isSubmitting] = useState(false);
  // const handleChange = (e) => {
  //   const { name, value } = e.currentTarget;
  //   setFormValue((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    fetchData(props).then(() => setLoading(false));
  }, [props]);

  async function fetchData(props) {
    let data = localStorage.getItem("login");
    data = JSON.parse(data);
    const getenquriesbyid = await auth_service.getenquriesinfo(
      data.login_id,
      props.location.state
    );
    setEnqurie_data(getenquriesbyid.payload);
    console.log(getenquriesbyid.payload);
    // const enq = getenquriesbyid.payload[0].hospitals;
    // setHopital_enq(enq);
    // if (enq.length !== 0) {
    //   setShow_quota(true);
    // }
    // const getenquries = await auth_service.gethospitals(data.login_id);
    // setHospitals(getenquries.payload);
  }

  // const handleSubmit = async (event) => {
  //   //event.preventDefault();
  //   let data = localStorage.getItem("login");
  //   data = JSON.parse(data);
  //   if (event === "before") {
  //     if (selected.length > 3) {
  //       return alert(
  //         " Patient details can be shared only with three Hospitals."
  //       );
  //     } else {
  //       const updateenquries = await auth_service.updateenquries(
  //         enqurie_data[0]._id,
  //         selected,
  //         data.login_id
  //       );
  //       if (updateenquries.payload) {
  //         const getenquries = await auth_service.getenquriesbyid(
  //           data.login_id,
  //           enqurie_data[0]._id
  //         );
  //         setEnqurie_data(getenquries.payload);
  //         setHopital_enq(getenquries.payload[0].hospitals);
  //         setShow_quota(true);
  //         window.location.reload();
  //       }
  //     }
  //   } else {
  //     const url = {
  //       url: `${constants.clientBaseUrl}patient_view?id=` + enqurie_data[0].id,
  //       email: enqurie_data[0].patient_email,
  //       enq_id: enqurie_data[0]._id,
  //       name: enqurie_data[0].patient_name,
  //     };
  //     const getenquries = await auth_service.sendmail(data.login_id, url);
  //     if (getenquries.payload) {
  //       window.location.reload();
  //       alert(getenquries.payload);
  //     }
  //   }
  // };

  // async function wonandloss(id) {
  //   let data = localStorage.getItem("login");
  //   data = JSON.parse(data);
  //   const wonandloss = await auth_service.wonandloss(
  //     enqurie_data[0]._id,
  //     data.login_id,
  //     formValues.id,
  //     formValues
  //   );
  //   if (wonandloss.payload) {
  //     window.location.reload();
  //   }
  // }
  // const ratingChanged = (newRating) => {
  //   setRating(newRating);
  //   checklowRating()
  // };

  // const checklowRating = async () => {
  //   let data = localStorage.getItem("login");
  //   data = JSON.parse(data);
  //   if (rating < 4 && feedbackmessage === "") {
  //     setIsLowRating(true);
  //   } else {
  //     const res = {
  //       feedbackmessage: feedbackmessage,
  //       feedbackrating: rating,
  //     };
  //     const feedback = await auth_service.feedback(
  //       enqurie_data[0]._id,
  //       data.login_id,
  //       res
  //     );
  //     if (feedback.payload) {
  //       setIsLowRating(false);
  //     }
  //   }
  // };
  if (loading === true)
    return (
      <>
        <ReactGifLoader />
      </>
    );
  else
    return (
      <>
        <ADMIN_NAVBAR />
        {/* <div
          className="modal fade bd-example-modal-sm"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        > */}
        {/* <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Transaction
                </h5>
              </div>
              <div className="modal-body">
                <Form onSubmit={wonandloss}>
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
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-toggle="modal"
                  data-target="#exampleModal"
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary"
                  onClick={wonandloss}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          <div className="col-md-4 column_small">
            {enqurie_data.map((target, index) => (
              <div key={index} {...target}>
                <div className="container_patient_details">
                  <div className="patient_name">
                    <h5>
                      <b>{target.name}</b>
                    </h5>
                  </div>
                  <div className="patient_details">
                    <p className="card-text">Id: {target.id}</p>
                    <p className="card-text">Mobile Number: {target.mobile}</p>
                    <p className="card-text">Email: {target.email}</p>
                    <p className="card-text">Age: {target.age}</p>
                    <p className="card-text">Gender: {target.gender}</p>
                    {target.location ? <p className="card-text">Location:{target.location}</p> : null }
                    <p className="card-text">
                      Nationality: {target.nationality}
                    </p>
                    <p className="card-text">
                      Referred By: {target.referredby}
                    </p>
                    {/* <div className="card-text">
                      <h5 className="languages">
                        Language: {target.languages_prefer}
                      </h5>
                      <br />{" "}
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
            {enqurie_data.map((target, index) => (
              <div key={index} {...target}>
                <div className="container_patient_preferences">
                  <div className="patient_name">
                    <h4>
                      <b>Patient Preferences</b>
                    </h4>
                  </div>

                  <div className="patient_prefernces_details">
                    {target.preferred_date_first ? (
                      <p className="card-text">
                        <b>Proposed Date:</b>
                        <br />
                        {convert(target.preferred_date_first)}
                      </p>
                    ) : null}
                    {convertTime(target.preferred_date_first) !== "0:00 am" ? (
                      <p className="card-text">
                        <b>Proposed Time:</b>
                        <br />
                        {convertTime(target.preferred_date_first)}
                      </p>
                    ) : null}
                    {target.preferred_date_second ? (
                      <p className="card-text">
                        <b>Proposed Date Second:</b>
                        <br />
                        {convert(target.preferred_date_second)}
                      </p>
                    ) : null}
                    {convertTime(target.preferred_date_second) !== "0:00 am" ? (
                      <p className="card-text">
                        <b>Proposed Time:</b>
                        <br />
                        {convertTime(target.preferred_date_second)}
                      </p>
                    ) : null}
                    {target.preferred_gender ? (
                      <p className="card-text">
                        <b>Preferred Gender:</b>
                        <br />
                        {target.preferred_gender}
                      </p>
                    ) : null}
                    {target.languages_prefer ? (
                      <p className="card-text">
                        <b>Preferred Language:</b>
                        <br />
                        {target.languages_prefer}
                      </p>
                    ) : null}
                    {target.payment_mode ? (
                      <p className="card-text">
                        <b>Payment Mode:</b>
                        <br />
                        {target.payment_mode}{" "}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-8 row">
            {/* {enqurie_data.map((target, index) => (
              <div key={index} {...target} className="col-md-5">
                <div className="d-flex mt-5">
                  <p>
                    <b>Type: </b>
                  </p>
                  <p style={{ paddingLeft: 10 }}>{target.speciality}</p>
                </div>
                <div className="d-flex">
                  <p style={{ marginBottom: 5 }}>
                    <b>Medical History</b>
                  </p>
                  <p style={{ paddingLeft: 20 }}>{target.medical_history}</p>
                  <p style={{ paddingLeft: 20 }}>{target.med2}</p>
                  <p style={{ paddingLeft: 20 }}>{target.med3}</p>
                </div>
                <div className="d-flex">
                  <p style={{ marginBottom: 5 }}>
                    <b>Status:</b>
                  </p>
                  <p style={{ paddingLeft: 20 }}>{target.status}</p>
                </div>
              </div>
            ))} */}
            {/* <div className="col-md-5 pt-4">
              <h4>Please rate us!</h4>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={42}
                activeColor="#ffd700"
              />

              {islowrating ? (
                <div
                  className="rate"
                  style={{ borderRadius: "15px", backgroundColor: "beige" }}
                >
                  <div className=" heading text-center">
                    <h4>
                      We understand that there are certain areas where we need
                      to improve our level of services further. Please let us
                      know where you would want to focus the most.
                    </h4>
                  </div>
                  <hr />
                  <div style={{ paddingLeft: "5px" }}>
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
                          Communication Skills of Professionals
                        </label>
                      </div>

                      <div className="form-check">
                        <label>
                          Care and Hospitality of other professionals
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
                        <label>Hospital Infrastructure</label>
                        <input
                          type="checkbox"
                          name="rating"
                          id="hospital_infrastructure"
                          value="Hospital Infrastructure"
                          className="form-check-input"
                          onClick={() =>
                            setFeedbackmessgae("Hospital Infrastructure")
                          }
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
                          onClick={() =>
                            setFeedbackmessgae("Transparency in Communication")
                          }
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
                          onClick={() =>
                            setFeedbackmessgae("Overall outcome of treatment")
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
                          onChange={handleOthersField}
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
                            style={{ width: "32rem" }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </div>
              ) : islowrating == null ? (
                ""
              ) : (
                <div>
                  <h3>Thankyou!</h3>
                </div>
              )}

              <button
                onClick={checklowRating}
                type="submit"
                className="btn btn-warning"
              >
                Send
              </button>
            </div> */}

            {enqurie_data.map((target, index) => (
              <div key={index} {...target}>
                <div className="query_container">
                  <div className="query_title">
                    <h2>Query</h2>
                  </div>
                  <div className="query_content">
                    <p>{target.type}</p>
                  </div>
                </div>
              </div>
            ))}
            {enqurie_data.map((target, index) => (
              <div key={index} {...target}>
                <div className="query_container">
                  <div className="query_title">
                    <h2>Symptoms</h2>
                  </div>
                  <div className="query_content">
                    <p>{target.symptoms}</p>
                  </div>
                </div>
              </div>
            ))}
            {enqurie_data[0].reports[1] ? (
              <div className="buttons">
                <div className="row">
                  <div className="col-md-5">
                    <button
                      className="download_button"
                      type="submit"
                      onClick={() => {
                        window.location.href = enqurie_data[0].reports[1];
                      }}
                    >
                      Download Reports
                      <i
                        style={{
                          fontSize: 16,
                          float: "right",
                          paddingRight: "10%",
                        }}
                        className="fa fa-download "
                      ></i>
                    </button>
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <button
                      className="view_button"
                      type="submit"
                      onClick={() => {
                        window.location.href =
                          enqurie_data[0].insurance_card_copy[0];
                      }}
                    >
                      View Insurance
                      <i
                        style={{
                          fontSize: 16,
                          float: "right",
                          paddingRight: "10%",
                        }}
                        className="fa fa-eye "
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {enqurie_data.map((target, index) => (
              <div key={index} {...target}>
                <div className="diagnosis_container">
                  <div className="query_title">
                    <h2>Current Diagnosis</h2>
                  </div>
                  <div className="query_content">
                    <p>{target.current_diagnosis}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* {show_quota ? null : (
              <div className="pt-5 pb-5">
                <label>Select Hospital(Please Select any 3)</label>
                <MultiSelect
                  options={hospitals}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
                <button
                  style={{ marginTop: 100 }}
                  className="join_button"
                  type="submit"
                  onClick={() => handleSubmit("before")}
                >
                  {"Submit"}
                </button>
              </div>
            )} */}
          </div>
        </div>
        {/* {show_quota ? (
          <div>
            <div className="col-md-12" style={{ marginTop: 20 }}>
              <div className="col-md-3"></div>
              {hopital_enq.map((target, index) => (
                <div className="col-md-3" key={index} {...target}>
                  <p>
                    <b>{target.hospital_name}</b>
                  </p>
                </div>
              ))}
            </div>
            <div className="col-md-12">
              <div className="col-md-3" style={{ textAlign: "center" }}>
                <p>
                  <b>Estimate Price</b>
                </p>
                <p>
                  <b>Treatment Plan</b>
                </p>
                <p>
                  <b>Inclusions</b>
                </p>
                <p>
                  <b>Exclusions</b>
                </p>
                <p>
                  <b>Copay Required</b>
                </p>
                <p>
                  <b>Types of Anesthesia</b>
                </p>
                <p>
                  <b>Type of room</b>
                </p>
                <p>
                  <b>Length of stay</b>
                </p>
                <p>
                  <b>Free room upgrade</b>
                </p>
                <p>
                  <b>Free Physiotherapy</b>
                </p>
                <p>
                  <b>Pickup and drop</b>
                </p>
                <p>
                  <b>Other free consultation</b>
                </p>
                <p>
                  <b>Free Annual checkup</b>
                </p>
              </div>
              {hopital_enq.map((target, index) => (
                <div className="col-md-3" key={index} {...target}>
                  {target.estimate_price ? (
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
                      {enqurie_data[0].status === "Awaiting From Patients" ? (
                        <button
                          data-toggle="modal"
                          data-target="#exampleModal"
                          style={{
                            background: "#164473",
                            border: "1px solid #164473",
                            borderRadius: "15px",
                            color: "white",
                            width: "14rem",
                          }}
                          onClick={() =>
                            setFormValue((prevState) => ({
                              ...prevState,
                              id: target.hospital_id,
                            }))
                          }
                        >
                          Certified Patients
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="col-md-3">
                      <p>AWAITING FOR QUOTATION</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {enqurie_data[0].status === "Won Patients" ? (
              <div className="col-md-12 mt-4">
                <div className="col-md-3">
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
            {enqurie_data[0].status === "Awaiting From Hospital" ? (
              <div>
                <button
                  style={{ width: "100%", marginBottom: 30, marginTop: 30 }}
                  className="join_button"
                  onClick={() => handleSubmit("after")}
                >
                  Forward to Patient
                </button>
              </div>
            ) : null}
          </div>
        ) : null} */}
      </>
    );
}

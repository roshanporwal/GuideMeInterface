import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import * as auth_service from "../services/auth_service";
// import { MultiSelect } from "react-multi-select-component";
// import ReactStars from "react-rating-stars-component";
// import { Form } from "react-bootstrap";
import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from "../interfacecomponents/gif_loader";
// import constants from "../constant";
import { useLocation } from "react-router-dom";
// import { Form } from "react-bootstrap";
// import { FaComment } from "react-icons/fa";

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
  const { state } = useLocation();
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
    fetchData(state).then(() => setLoading(false));
  }, [state]);

  async function fetchData(props) {
    let data = localStorage.getItem("login");
    data = JSON.parse(data);
    const getenquriesbyid = await auth_service.getenquriesinfo(
      data.login_id,
      props.id
    );
    setEnqurie_data(getenquriesbyid.payload);
    // console.log(getenquriesbyid.payload[0])
    // const enq = getenquriesbyid.payload[0].hospitals;
    // setHopital_enq(enq);
    // if (enq.length !== 0) {
    //   setShow_quota(true);
    // }
    // const getenquries = await auth_service.gethospitals(data.login_id);
    // setHospitals(getenquries.payload);
  }
  // const [status, setStatus] = useState("");
  // const [comment, setComment] = useState("");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('comment',comment);
  //   formData.append('status',status);

  //   const setstatus = await auth_service.setenquiriesstatus(
  //     enqurie_data[0]._id,
  //     formData
  //   );
  //   if(setstatus.payload){
  //     setStatus("")
  //   }
  //   else{
  //     alert(setstatus.message)
  //   }
  // };

  const DownloadReports = (element) => {
    window.open(element, "_blank");
  };
  const viewInsurance = () => {
    // console.log(enqurie_data[0]);
    if (enqurie_data[0].insurance_card_copy.length === 0) {
      return alert("No reports found");
    }
    enqurie_data[0].insurance_card_copy.forEach((element) => {
      window.open(element, "_blank");
    });
    //window.open (enqurie_data[0].insurance_card_copy[0],'_blank')
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
        <ADMIN_NAVBAR />
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              {enqurie_data.map((target, index) => (
                <div key={index} {...target}>
                  <div className="PatientDetails">
                    <h2 className="PatientName py-3">{target.name}</h2>
                    <p>
                      <b>Id :</b>
                      <span>{target.id}</span>
                    </p>
                    { target.family ?
                      <p>
                        <b>For Family Member : </b>
                        <span>{target.family.first_name} {target.family.last_name}</span>
                      </p> : null
                    }
                    <p>
                      <b>Mobile Number : </b>
                      <span>{target.mobile}</span>
                    </p>
                    {target.alternate_number ? (
                      <p>
                        <b>Alternate Mobile Number : </b>
                        <span>{target.alternate_number}</span>
                      </p>
                    ) : null}
                    <p>
                      <b>Email : </b>
                      <span>{target.email}</span>
                    </p>
                    <p>
                      <b>Date of Birth : </b>
                      <span>{convert(target.dob)}</span>
                    </p>
                    <p>
                      <b>Gender : </b>
                      <span>{target.gender}</span>
                    </p>
                    <p>
                      <b>Insurance Name : </b>
                      <span>{target.insurance_name}</span>
                    </p>
                    {target.location ? 
                    <p>
                      <b>Location : </b>
                      <span>{target.location ? target.location : null }</span> 
                      {/* <span>{target.location.city ? target.location.city : null }</span> 
                      <span>{target.location.state ? target.location.state : null }</span> 
                      <span>{target.location.country ? target.location.country : null }</span>  */}
                    </p> : null }
                    {target.address_patient ? (
                      <p>
                        <b>Address : </b>
                        <span>{target.address_patient}</span>
                      </p>
                    ) : null}
                    {target.map_link ? (
                      <p>
                        <b>Map Link : </b>
                        <span>
                          <a href={target.map_link}>
                            {target.map_link.slice(28)}
                          </a>
                        </span>
                      </p>
                    ) : null}
                    <p>
                      <b>Nationality : </b>
                      <span>{target.nationality}</span>
                    </p>
                    <p>
                      <b>Referred By : </b>
                      <span>{target.referredby}</span>
                    </p>
                    
                  </div>
                </div>
              ))}

              {enqurie_data.map((target, index) => (
                <div key={index} {...target}>
                  <div className="PatientPreferencesDetails my-4">
                    <h2 className="PatientPreferences py-3">
                      Patient Preferences
                    </h2>
                    {target.enquiry_date ? (<p className="card-text">
                      <b>Enquiry Date : </b>
                      <span>{convert(target.enquiry_date)}</span>
                    </p>):null}
                    {target.preferred_hospital_doctor ? (
                      <p className="card-text">
                        <b>Hospital/ Doctor/ Specialization : </b>
                        {target.preferred_hospital_doctor}
                      </p>
                    ) : null}
                    
                    {target.preferred_date_first ? (
                      <p className="card-text">
                        <b>Proposed Date : </b>
                        {convert(target.preferred_date_first)}
                      </p>
                    ) : null}
                    {target.preferred_date_first &&
                    convertTime(target.preferred_date_first) !== "0:00 am" ? (
                      <p className="card-text">
                        <b>Proposed Time : </b>
                        {convertTime(target.preferred_date_first)}
                      </p>
                    ) : null}
                    {target.preferred_date_second ? (
                      <p className="card-text">
                        <b>Proposed Date Second : </b>
                        {convert(target.preferred_date_second)}
                      </p>
                    ) : null}
                    {target.preferred_date_second &&
                    convertTime(target.preferred_date_second) !== "0:00 am" ? (
                      <p className="card-text">
                        <b>Proposed Time : </b>
                        {convertTime(target.preferred_date_second)}
                      </p>
                    ) : null}
                    {target.preferred_gender ? (
                      <p className="card-text">
                        <b>Preferred Gender : </b>
                        {target.preferred_gender}
                      </p>
                    ) : null}
                    {target.languages_prefer ? (
                      <p className="card-text">
                        <b>Preferred Language : </b>
                        {target.languages_prefer}
                      </p>
                    ) : null}
                    {target.payment_mode ? (
                      <p className="card-text">
                        <b>Payment Mode : </b>
                        {target.payment_mode}{" "}
                      </p>
                    ) : null}
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-8">
              <div className="row">
                {/* <div className="col-md-12">
                  <div className="statusBox my-2">
                    <div className="row">
                      <div className="col-4">
                        <h2>Status</h2>
                      </div>
                      <div className="col-6">
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="New">{enqurie_data[0].status}</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>
                    </div>
                    {status ? (
                      <Form
                        // onSubmit={(e) => handleSubmit(e)}
                        className="row justify-content-center"
                      >
                        <div className="row">
                          <div className="col-9">
                            <div
                              style={{
                                position: "relative",
                                width: "20px",
                                bottom: "-28px",
                                zIndex: "2",
                                left: "0",
                                marginLeft: "9px",
                                color: "color: rgba(26, 73, 129, 1)",
                              }}
                            >
                              <FaComment />
                            </div>
                            <textarea
                              placeholder="Comments"
                              style={{
                                paddingLeft: "40px",
                                width: "100%",
                                backgroundColor: "rgba(245, 245, 245, 1)",
                              }}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            {/* <Form.Control
                              type="text"
                              name="name"
                              // value={name}
                              placeholder="Comments" style={{
                                paddingLeft: "40px",
                                width: "100%",
                                backgroundColor: "rgba(245, 245, 245, 1)",
                              }}
                              
                            /> */}
                       {/*}   </div>
                          <div
                            style={{ marginTop: "28px" }}
                            className="col-2 text-center"
                          >
                            <input
                              className="form-button"
                              type="button"
                              value="UPDATE"
                              onClick={handleSubmit}
                            />
                          </div>
                        </div>
                      </Form>
                    ) 
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="queryBox my-2">
                    <h2>Query</h2>
                    <p>{enqurie_data[0].type} ---&gt; {enqurie_data[0].subtype}</p>
                  </div>
                </div>

                { enqurie_data[0].symptoms ? 
                    <div className="col-md-12">
                      <div className="queryBox my-2">
                        <h2>Symptoms</h2>
                        <p>{enqurie_data[0].symptoms}</p>
                      </div>
                    </div> : null
                }
                {enqurie_data[0].reports[1] ? (
                  <div className="row m-2">
                    <div className="col-md-5 d-flex justify-content-between">
                      {enqurie_data[0].reports.map((element, index) => {
                        // console.log(element)
                        if (
                          element.search(
                            "http://192.46.209.112:8080/download"
                          ) !== -1
                        ) {
                          return (
                            <div
                              className="DownloadButton Hover m-1"
                              key={index}
                              onClick={() => DownloadReports(element)}
                            >
                              {" "}
                              Download Report
                            </div>
                          );
                        }
                        return null;
                      })}
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
                {enqurie_data[0].current_diagnosis ?
                    <div className="col-md-12">
                      <div className="queryBox my-2">
                        <h2>Current Diagnosis</h2>
                        <p>{enqurie_data[0].current_diagnosis}</p>
                      </div>
                    </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

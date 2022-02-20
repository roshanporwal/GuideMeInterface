import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap";
import * as auth_service from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from "../interfacecomponents/gif_loader";
import "react-data-components/css/table-twbs.css";
import ConsultationLogo from ".././assets/consultation.png";
import SecLogo from ".././assets/second-op-logo.png";
import HomeLogo from ".././assets/home-service.png";
import MedicineLogo from ".././assets/medicine.png";
import LabLogo from ".././assets/labtest-logo.png";
import XRayLogo from ".././assets/x-ray-logo.png";
import { Form, Modal } from "react-bootstrap";
import {  FaRegHospital, FaRegMoneyBillAlt, FaFileInvoiceDollar } from "react-icons/fa";

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


const customStyles = {
  rows: {
    style: {
      cursor: "pointer",
    },
  },
};

export default function ADMIN_ENQUIRY_DASHBOARD(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enquriesstatus, setEnquriesstatus] = useState([]);
  const [search, setSearch] = useState("");
  const [enquries, setEnquries] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [patient1,setPatient1] = useState()
  const [completedShow,setCompletedShow] = useState(false)
  const [progressShow,setProgressShow] = useState(false)

  const columns = [
    {
      name: "Name",
      selector: (row) => row["name"],
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => {
          return row["location"]
        // if(row["location"])
        //   return `${row["location"].country} ${row["location"].state} ${row["location"].city}`
      },
      sortable: true,
    },
    {
      name: "Condition /Symptoms",
      selector: (row) => row["symptoms"],
      sortable: true,
    },
    {
      name: "Date & Time",
      selector: (row) =>{ 
        return convert(row["preferred_date_first"]) + " " + (convertTime(row["preferred_date_first"]) !== "0:00 am" ? convertTime(row["preferred_date_first"]) : "")
      },
      sortable: true,
    },
    // {
    //   name: "Time",
    //   selector: (row) => {
    //     return convertTime(row["preferred_date_first"]);
    //   },
    //   sortable: true,
    // },
    {
      name: "Type",
      selector: (row) => row["subtype"],
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => row["status"],
    //   sortable: true,
    // },
    {
      name: "Status",
      selector: (row) => {
        if (row["status"] === "New") {
          return (
            <select
              onClick={(e) => {
                handleStatusChanges(e, row["_id"]);
              }}
            >
              <option value={row["status"]}>{row["status"]}</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Lost">Lost</option>
            </select>
          );
        }
        else if(row["status"] === "In Progress"){
          return (
            <select
              onClick={(e) => {
                handleStatusChanges(e, row["_id"]);
              }}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Lost">Lost</option>
            </select>
          );
        }
        else{
          return(row["status"])
        }
      },
      sortable: true,
    },
  ];
  const handleStatusChanges = async  (e,patient) =>{
    setStatus(e.target.value)
    setPatient1(patient)
    if(e.target.value === "Completed")
      setCompletedShow(true)
    else if(e.target.value === "In Progress")
      setProgressShow(true)
    else if(e.target.value === "Lost"){
      await postForm(patient,e.target.value)
    }
  }
  const handleCompletedClose = () => {
    setCompletedShow(false)
  }
  const handleProgressClose = () => {
    setProgressShow(false)
  }
  
  useEffect(() => {
    fetchData("null").then(() => setLoading(false));
  }, []);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  async function fetchData(enquiryField) {
    let data = localStorage.getItem("login");
    data = JSON.parse(data);
    const getadminstaus = await auth_service.getenquiriesstatus(data.login_id);
    setEnquriesstatus(getadminstaus.payload);
    console.log(enquiryField);

    const getenquries = await auth_service.getenquriesSpecific(
      data.login_id,
      enquiryField
    );
    console.log(getenquries)
    setEnquries(getenquries.payload.reverse());
  }
  const handleClick = async (event) => {
    navigate("/admin/enquiry/info", { state: { id: event._id } });
  };

  const [formValues, setFormValues] = useState({
    hospital_name : "",
    commision_value: "",
    bill_amount: ""
  });
  const [errors, setErrors] = useState({
    hospital_name : "",
    commision_value: "",
    bill_amount: ""
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const postForm = async (patient,status1) => {
    const formData = new FormData();
    formData.append('status',status1);
    formData.append("formValues", JSON.stringify(formValues));
    const setstatus = await auth_service.setenquiriesstatus(
      patient,
      formData
    );
    if(setstatus.payload){
      setStatus("")
      setFormValues({
        hospital_name : "",
        commision_value: "",
        bill_amount: ""
      })
      setErrors({
          hospital_name : "",
          commision_value: "",
          bill_amount: ""
        })
        setPatient1("")
        handleProgressClose()
        handleCompletedClose()
    }
    else{
      alert(setstatus.message)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await validate();
    if (errors.hospital_name === "" && errors.commision_value === "" && errors.bill_amount === "" && status) {
      // console.log("in ", patient1)
      await postForm(patient1,status)
    }
  }

  const validate = async () => {
      setErrors({
        hospital_name:formValues.hospital_name !== "" ? "":"Hospital name is Required",
        commision_value:formValues.commision_value !== "" ?"":"Commision Value is Required",
        bill_amount:formValues.bill_amount !== "" ?  "": "Bill Amount is Required"
      })
      return 
  };
  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    await validateProgress();
    if (errors.hospital_name === "" && status) {
      await postForm(patient1,status)
    }
  }
  
  const validateProgress = async () => {
    setErrors({
      hospital_name:formValues.hospital_name !== "" ? "":"Hospital name is Required"
    })
    return 
  };
  const DashboardItem = ({ item_img, item_desc, item_link }) => {
    return (
      <div
        role={"button"}
        className="dashboard-item-container text-center p-3"
        onClick={() => {
          fetchData(item_desc);
          setTitle(item_desc);
        }}
      >
        <div className="item-logo">
          <img src={item_img} width="40px" alt="dashboard item" />
        </div>
        <div className="item-desc">
          <p>{item_desc}</p>
        </div>
      </div>
    );
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
        <Modal show={completedShow} onHide={handleCompletedClose} centered>
        <div className="form-container m-5">
          <h2 className="p-1 card-title text-center">Status Complete</h2>
          <Form
            onSubmit={(e) => handleSubmit(e)}
            className="row justify-content-center"
          >
            <div className="row justify-content-center">
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaRegHospital />
                  </div>
                  <Form.Control
                    type="text"
                    name="hospital_name"
                    placeholder="Hospital Name"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={errors?.hospital_name}
                  />
                  <Form.Control.Feedback
                    style={{ color: "red" }}
                    type="invalid"
                  >
                    {errors?.hospital_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaRegMoneyBillAlt />
                  </div>
                  <Form.Control
                    type="text"
                    name="bill_amount"
                    placeholder="Bill Amount"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={errors?.bill_amount}
                  />
                  <Form.Control.Feedback
                    style={{ color: "red" }}
                    type="invalid"
                  >
                    {errors?.bill_amount}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaFileInvoiceDollar />
                  </div>
                  <Form.Control
                    type="text"
                    name="commision_value"
                    placeholder="Commission Value"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={errors?.commision_value}
                  />
                  <Form.Control.Feedback
                    style={{ color: "red" }}
                    type="invalid"
                  >
                    {errors?.commision_value}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="text-center mt-4">
                <input className="form-button" type="submit" value="SUBMIT" />
              </div>
            </div>
          </Form>
        </div>
        </Modal>
        <Modal show={progressShow} onHide={handleProgressClose} centered>
        <div className="form-container m-5">
          <h2 className="p-1 card-title text-center">Status In-Progress</h2>
          <Form
            onSubmit={(e) => handleProgressSubmit(e)}
            className="row justify-content-center"
          >
            <div className="row justify-content-center">
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaRegHospital />
                  </div>
                  <Form.Control
                    type="text"
                    name="hospital_name"
                    placeholder="Hospital Name"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={errors?.hospital_name}
                  />
                  <Form.Control.Feedback
                    style={{ color: "red" }}
                    type="invalid"
                  >
                    {errors?.hospital_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="text-center mt-4">
                <input className="form-button" type="submit" value="SUBMIT" />
              </div>
            </div>
          </Form>
        </div>
        </Modal>
        <ADMIN_NAVBAR />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mt-0 pt-4 pb-2" style={{ color: "#164572" }}>
                Enquiry Dashboard
              </h1>
              <h2 style={{ color: "#787575" }}>Quick Stats</h2>
            </div>
          </div>
        </div>
        <br />
        {enquriesstatus.map((target, index) => (
          <div className="container pb-5" key={index} {...target}>
            <div className="row">
              <div className="col-md-2 offset-lg-1 col-sm-6 total_enquiries text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="/assets/images/icons/total_enquiries.png"
                    className="IconFont"
                    alt=""
                  />
                  <h2>{target.total}</h2>
                </div>
                <h3>Total Enquiries</h3>
              </div>
              <div className="col-md-2 col-sm-6 new_enquiries text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="/assets/images/icons/new_enquiries.png"
                    className="IconFont"
                    alt=""
                  />
                  <h2>{target.new}</h2>
                </div>
                <h3>New Enquiries</h3>
              </div>
              <div className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="/assets/images/icons/lost_enquiries.png"
                    className="IconFont"
                    alt=""
                  />
                  <h2>{target.lost}</h2>
                </div>
                <h3>Lost Enquiries</h3>
              </div>
              <div className="col-md-2 col-sm-6 won_enquiries text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="/assets/images/icons/won_enquiries.png"
                    className="IconFont"
                    alt=""
                  />
                  <h2>{target.completed}</h2>
                </div>
                <h3>Completed Enquiries</h3>
              </div>
              <div className="col-md-2 col-sm-6 lost_enquiries text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="/assets/images/icons/in_progress.png"
                    className="IconFont"
                    alt=""
                  />
                  <h2>{target.inprogress}</h2>
                </div>
                <h3>In Progress</h3>
              </div>
            </div>
          </div>
        ))}
        <div className="container">
          <div className="row">
            <div className="col-md-2  col-6">
              <DashboardItem
                item_desc="New Consultation"
                item_img={ConsultationLogo}
                item_link={"new_consultation"}
              />
            </div>
            <div className="col-md-2 col-6">
              <DashboardItem
                item_desc="Second Opinion"
                item_img={SecLogo}
                item_link={"free_opinion"}
              />
            </div>
            <div className="col-md-2 col-6">
              <DashboardItem
                item_desc="Home Service"
                item_img={HomeLogo}
                item_link={"home_care_services"}
              />
            </div>
            <div className="col-md-2 col-6">
              <DashboardItem
                item_desc="Pharmacy"
                item_img={MedicineLogo}
                item_link={"pharmacy"}
              />
            </div>
            <div className="col-md-2 col-6">
              <DashboardItem
                item_desc="Lab Tests"
                item_img={LabLogo}
                item_link={"lab_tests"}
              />
            </div>
            <div className="col-md-2 col-6">
              <DashboardItem
                item_desc="Diagnostics or Radiology"
                item_img={XRayLogo}
                item_link={"diagnostic"}
              />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="patient_table_container">
            <div className="text-center">
              <h2>{title ? title + " :" : " "}</h2>
            </div>
            <div className="data_table">
              <div className="offset-lg-10 col-md-3 pb-2">
                <label htmlFor="search">
                  Search by Patient Name:
                  <br />
                  <input id="search" type="text" onChange={handleSearch} />
                </label>
              </div>

              <DataTable
                className="react_table"
                style={{ paddingTop: "30px" }}
                columns={columns}
                data={enquries.filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                )}
                highlightOnHover
                pagination
                paginationPerPage={5}
                defaultSortField="name"
                onRowClicked={(target) => handleClick(target)}
                paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
                customStyles={customStyles}
                theme="default"
                fixedHeader
                paginationComponentOptions={{
                  rowsPerPageText: "Records per page:",
                  rangeSeparatorText: "out of",
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
}

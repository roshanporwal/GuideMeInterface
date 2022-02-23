import React, { forwardRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import {
  MdOutlineCalendarToday,
  MdOutlineFilePresent,
  MdOutlineLocalHospital,
  MdStickyNote2,
  MdLocationOn
} from "react-icons/md";
import DatePicker from "react-datepicker";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from "./consultationValidation";
import ForFamily from "../AddFamily/ForFamily";
// import Location from '../../interfacecomponents/location'
import ThankYouModal from '../Layout/ThankYouModal'

function NewConsultation({ handleModalShow }) {
  // const hiddenFileInputInsurance = React.useRef(null);
  const hiddenFileInputReports = React.useRef(null);
  const [errors, setErrors] = useState();
  // const [fileerrors,setFileErrors] = useState({
  //     // insurance:"",
  //     reports:"",
  // });
  const [dateerrors, setDateErrors] = useState({
    dateOne: "",
    dateTwo: "",
  });
  const [loading, setLoading] = useState(false);

  // const handlePatientShow = () => setAddPatientShow(true);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  // const handleFileInsuranceClick = event => {
  //     hiddenFileInputInsurance.current.click();
  // };
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleFileReportsClick = (event) => {
    hiddenFileInputReports.current.click();
  };

  const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
    <input
      readOnly
      placeholder={text}
      className="form-control global-inputs"
      onClick={onClick}
      ref={ref}
      value={value}
    />
  ));
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    gender: "",
    insurance_card_copy: [],
    mobile: "",
    nationality: "",
    symptoms: "",
    email: "",
    referredby: "",
    location: "",
    preferred_hospital_doctor: "",
    preferred_date_first: "",
    preferred_date_second: "",
    insurance_name: "",
    status: "",
  });
  const [dateOne, setDateOne] = useState();
  const [dateTwo, setDateTwo] = useState();
  const [reports, setReports] = useState([]);
  // const [insurance, setInsurance] = useState();

  // const [location,setLocation ] = useState({
  //   country : "",
  //   state: "",
  //   city: ""
  // })
  const [submitted,setSubmitted] = useState(false)

    const [name,setName] = useState("")
    const [familyCheckBox, setFamilyCheckBox] = useState(false);
    const [data, setData] = useState();
    const [selectedMember, setSelectedMember] = useState();
    useEffect(() => {
        async function fetchData() {
            let data = localStorage.getItem("login_patient")
            if (data !== null) {
                data = JSON.parse(data)
                setName(data.name)
                setData(data)
            }
        }
        fetchData()
    }, []);
    const handleForFamily = async (e) => {
        if (!familyCheckBox) {
            setFamilyCheckBox(true);
        } else {
            setFamilyCheckBox(false);
        }
    };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = await validate(formValues);
    setErrors(err);
    if (Object.keys(err).length === 0 /*&& fileerrors.insurance === ""*/) {
      setLoading(true)
      const formData = new FormData();

      formValues.type = "New Consultation";
      formValues.subtype = "New Consultaion"
      formValues.name = data.name;
      formValues.email = data.email;
      formValues.current_diagnosis = formValues.symptoms;
      formValues.preferred_date_first = dateOne.toString();
      if(dateTwo)
                formValues.preferred_date_second = dateTwo.toString();
      formValues.dob = data.dob;
      formValues.gender = data.gender;
      formValues.insurance_card_copy = data.insurance_card_copy;
      formValues.mobile = data.login_id;
      formValues.patientid = data._id;
      formValues.nationality = data.nationality;
      formValues.referredby = data.referredby;
      formValues.insurance_name = data.insurance_name;
      formValues.status = "New";
      formValues.family = selectedMember
      // formValues.location = location

      if (reports !== undefined) {
        for (const tp of reports) {
          formData.append("patient_reports", tp);
        }
      }
      // formData.append('insurance_card_copy', insurance);
      formData.append("formValues", JSON.stringify(formValues));

      const createNewConsulation = await auth_service.createNewenqurire(
        data.login_id,
        formData
      );
      if (createNewConsulation.payload) {
        setLoading(false)
        setSubmitted(true)
        handleModalShow();
      } else {
        alert(createNewConsulation.message);
      }
    }
  };
  

  const validate = async (values) => {
    try {
      // setFileErrors({/*insurance:insurance === undefined ? "required" : "",*/reports:reports === undefined ? "required" : ""});
      setDateErrors({
        dateOne: dateOne === undefined ? "required" : "",
        dateTwo: dateTwo === undefined ? "required" : "",
      });
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      let errObj = {};
      for (let { path, message } of err.inner) {
        errObj[path] = message;
      }
      return errObj;
    }
  };
  const handleFiles = (e) => {
    const { name } = e.currentTarget;
    if (name === "reports") {
      setReports(e.target.files);
    }
    // else {
    //     setInsurance(e.target.files[0])
    // }
  };
  if(submitted === true)
    return(<ThankYouModal/>)
  else if (loading === true)
    return (
      <>
        <ReactGifLoader />
      </>
    );
  else
  return (
    
    <div className="form-container">
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="row justify-content-center"
      >
       <div className="col-3">
          <Form.Group className="d-flex">
            <Form.Check
              type="radio"
              name="form-type"
              label="Myself"
              onChange={() => {setFamilyCheckBox(false); setSelectedMember()}}
              defaultChecked = {true}
            />
          </Form.Group>
        </div>
        <div className="col-6">
          <Form.Group className="d-flex">
            <Form.Check
              type="radio"
              name="form-type"
              label="For Family"
              onChange={handleForFamily}
            />
          </Form.Group>
        </div>
        <div className="col-10">
          <Form.Group>
            <div className="prepend-icon">
              <FaRegUser />
            </div>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Person Name *"
              // onChange={handleChange}
              className="global-inputs"
              isInvalid={errors?.name}
              disabled={true}
            />
            <Form.Control.Feedback style={{ color: "red" }} type="invalid">
              {errors?.name}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        {familyCheckBox ? (
                    <div className="row justify-content-center">
                    <ForFamily setSelectedMember = {setSelectedMember} /></div>
                ):null}
        {/* <div className="col-7">
           <Form.Group>
            <div className="prepend-icon">
              <MdFamilyRestroom />
            </div>
            <Form.Control
              type="text"
              name="family"
              placeholder="Add Family Member"
              onChange={handleChange}
              className="global-inputs"
              readOnly
              onClick={handleFamilyShow}
            />
          </Form.Group>
        </div> */}

        {/*
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlinePersonAdd />
                        </div>
                        <Form.Control
                            type='text'
                            name="register"
                            placeholder='Register Patient'
                            onChange={handleChange}
                            className="global-inputs"
                            readOnly
                            onClick={handlePatientShow}
                        />
                    </Form.Group>
                </div> */}
        {/* <Location setLocation={setLocation} /> */}
        <div className="col-10"> 
          <Form.Group>
            <div className="prepend-icon">
              <MdLocationOn />
            </div>
            <Form.Control
              type="text"
              name="location"
              placeholder="Location *"
              onChange={handleChange}
              className="global-inputs"
              isInvalid={errors?.location}
            />
            <Form.Control.Feedback style={{ color: "red" }} type="invalid">
              {errors?.location}
            </Form.Control.Feedback>
          </Form.Group> 
         </div>
      <div className="col-10">
          <Form.Group>
            <div className="prepend-icon">
              <MdStickyNote2 />
            </div>
            <Form.Control
              type="text"
              name="symptoms"
              placeholder="Symptoms / Conditions *"
              onChange={handleChange}
              className="global-inputs"
              isInvalid={errors?.symptoms}
            />
            <Form.Control.Feedback style={{ color: "red" }} type="invalid">
              {errors?.symptoms}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="col-10">
          <Form.Group>
            <div className="prepend-icon">
              <MdOutlineLocalHospital />
            </div>
            <Form.Control
              type="text"
              name="preferred_hospital_doctor"
              placeholder="Preferred doctor/hospital/specialization *"
              onChange={handleChange}
              className="global-inputs"
              isInvalid={errors?.preferred_hospital_doctor}
            />
            <Form.Control.Feedback style={{ color: "red" }} type="invalid">
              {errors?.preferred_hospital_doctor}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="col-10">
          <Form.Group>
            <div className="prepend-icon">
              <MdOutlineCalendarToday />
            </div>
            <div>
              <DatePicker
                selected={dateOne}
                onChange={(date) => setDateOne(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy hhaa"
                minDate = {new Date()}
                minTime = {new Date().setHours(7, 0, 0, 0)}
                maxTime = {new Date().setHours(19, 0, 0, 0)}
                customInput={<DatePickerInput text="Preferred Date and Time 1 *" />}
                isInvalid={errors?.dateOne}
              />
              {dateerrors.dateOne ? (
                <Form.Label style={{ color: "red" }} type="valid">
                  Date is required
                </Form.Label>
              ) : null}
            </div>
          </Form.Group>
        </div>
        <div className="col-10">
          <Form.Group>
            <div className="prepend-icon">
              <MdOutlineCalendarToday />
            </div>
            <div>
              <DatePicker
                selected={dateTwo}
                onChange={(date) => setDateTwo(date)}
                dateFormat="dd/MM/yyyy hhaa"
                showTimeSelect
                minDate = {new Date()}
                minTime = {new Date().setHours(7, 0, 0, 0)}
                maxTime = {new Date().setHours(19, 0, 0, 0)}
                customInput={<DatePickerInput text="Preferred Date and Time 2 *" />}
                isInvalid={errors?.dateTwo}
              />
              {dateerrors.dateTwo ? (
                <Form.Label style={{ color: "red" }} type="valid">
                  Date is required
                </Form.Label>
              ) : null}
            </div>
          </Form.Group>
        </div>
        {/*
                <div className='col-10 col-md-5'>
                    <Form.Group>
                       <div className="prepend-icon">
                            <MdUploadFile />
                        </div>
                        
                        <div  role="button" onClick={handleFileInsuranceClick} className='global-file-input'>
                            <p>{insurance === undefined ? "Upload Insurance Details" : insurance.name}</p>
                        </div>
                        <input
                            type="file"
                            name="insurance"
                            ref={hiddenFileInputInsurance}
                            accept="image/*,application/pdf"
                            style={{ display: 'none' }}
                            onChange={handleFiles}
                        />
                        {fileerrors.insurance ? (
                            <Form.Label style = {{color:"red"}} type = "valid">File is required</Form.Label>)
                        : null}    
                     
                    </Form.Group>
                </div>
                        */}

        <div className="col-10 col-md-7">
          <Form.Group>
            <div className="prepend-icon">
              <MdOutlineFilePresent />
            </div>
            <div
              role="button"
              onClick={handleFileReportsClick}
              className="global-file-input"
            >
              <p>
                {reports.length === 0
                  ? "Upload Reports (If Any)"
                  : reports.length + " File(s) Uploaded"}
              </p>
            </div>
            <Form.Control
              type="file"
              name="reports"
              ref={hiddenFileInputReports}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={handleFiles}
              multiple
            />
          </Form.Group>
        </div>
        <div className="text-center mt-4">
          <input className="form-button" type="submit" value="SUBMIT" />
        </div>
      </Form>
    </div>
  );
}

export default NewConsultation;

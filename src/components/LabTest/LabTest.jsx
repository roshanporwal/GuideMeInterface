import React, { forwardRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
  MdLocationOn, MdOutlineCalendarToday, MdUploadFile,
  MdFormatListNumbered,
  MdOutlineApartment, MdCall, MdPayment
} from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import { FaBuilding, FaGlobeAsia, } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { GiDirectionSigns } from 'react-icons/gi'
import DatePicker from "react-datepicker";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './labValidation';
import ForFamily from "../AddFamily/ForFamily";
import ThankYouModal from '../Layout/ThankYouModal'

function LabTest({ handleModalShow }) {
  const hiddenFileInputInsurance = React.useRef(null);
  // const hiddenFileInputReports = React.useRef(null);
  const [errors, setErrors] = useState();
  // const [fileerrors, setFileErrors] = useState({
  //   insurance: "",
  //   // reports:"",
  // });
  const [dateerrors, setDateErrors] = useState({
    dateOne: "",
    dateTwo: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const validate = async (values) => {
    try {
      // setFileErrors({ insurance: insurance === undefined ? "required" : "",/*reports:reports === undefined ? "required" : ""*/ });

      setDateErrors({ dateOne: DateOne === undefined ? "required" : "", dateTwo: "" });

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

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleFileInsuranceClick = event => {
    hiddenFileInputInsurance.current.click();
  };
  // Programatically click the hidden file input element
  // when the Button component is clicked
  // const handleFileReportsClick = event => {
  //     hiddenFileInputReports.current.click();
  // };

  const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
    <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
  ));
  const [formValues, setFormValues] = useState({
    name: '',
    age: '',
    gender: '',
    nationality: '',
    email: '',
    referredby: '',
    address_patient: '',
    mobile: '',
    insurance_card_copy: [],
    map_link:""
  });
  const [DateOne, setDateOne] = useState();
  const [DateTwo, setDateTwo] = useState();
  // const [reports, setReports] = useState([]);
  const [insurance, setInsurance] = useState();

  const [link, setLink] = useState(false);
  const [addressForm, setAddressForm] = useState(false);

  const [name, setName] = useState("")
  const [familyCheckBox, setFamilyCheckBox] = useState(false);
  const [data, setData] = useState();
  const [selectedMember, setSelectedMember] = useState();

  const geolocate = async () => {
    await navigator.geolocation.getCurrentPosition(
      function(position) {
        formValues.map_link = "https://www.google.com/maps/@"+position.coords.latitude+","+position.coords.longitude
        setLink(true)
      },
    // function error(msg) {alert('Please enable your GPS position feature.');}
    // ,{maximumAge:10000, timeout:10000, enableHighAccuracy: true}
    );
  }
  useEffect(()=>{
    geolocate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
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

  const [addressErr, setAddressErr] = useState("");
  const handleAddress = () => {
    setAddressErr("");
    if (
      formValues.flat_number &&
      formValues.building_name &&
      formValues.street_name &&
      formValues.location &&
      formValues.emirates
    ) {
      formValues.address_patient =
        formValues.flat_number +
        ", " +
        formValues.building_name +
        ", " +
        formValues.street_name +
        ", " +
        formValues.location +
        ", " +
        formValues.emirates +
        ", " +
        formValues.landmark;
    }
    if (!formValues.address_patient) {
      if (!formValues.map_link) {
        setAddressErr("Address Field is Required.");
      }
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddress()
    const err = await validate(formValues);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true)
      const formData = new FormData();

      formValues.patient_id = data._id;
      formValues.name = data.name;
      formValues.dob = data.dob;
      formValues.gender = data.gender;
      formValues.nationality = data.nationality;
      formValues.email = data.email;
      formValues.referredby = data.referredby;
      formValues.current_diagnosis = formValues.symptoms
      formValues.mobile = data.login_id;
      formValues.insurance_card_copy = data.insurance_card_copy
      formValues.preferred_date_first = DateOne.toString();
      formValues.type = "Lab Tests";
      formValues.subtype = "Lab Test";
      formValues.status = "New"
      formValues.insurance_name = data.insurance_name
      formValues.family = selectedMember;

      /* if (reports !== undefined) {
           for (const tp of reports) {
               formData.append('patient_reports', tp);
           }
       }*/
      formData.append('patient_reports', insurance);
      formData.append('formValues', JSON.stringify(formValues));

      const abc = await auth_service.createNewenqurire(data.login_id, formData)

      if (abc.payload) {
        setLoading(false)
        setSubmitted(true)
        handleModalShow();
      }
      else {
        alert(abc.message)
                    setLoading(false)
      }
    }

  }
  const handleFiles = e => {
    const { name } = e.currentTarget
    if (name === 'reports') {
      // setReports(e.target.files)
    }
    else {
      setInsurance(e.target.files[0])
    }
  }
  if (submitted === true)
    return (<ThankYouModal formValues = {formValues}/>)
  else
    if (loading === true)
      return (
        <>
          <ReactGifLoader />
        </>
      );
    else
      return (
        <div className="form-container">
          <Form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
            <div className="col-3">
              <Form.Group className="d-flex">
                <Form.Check
                  type="radio"
                  name="form-type"
                  label="Myself"
                  onChange={() => { setFamilyCheckBox(false); setSelectedMember() }}
                  defaultChecked={true}
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
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <FaRegUser />
                </div>
                <Form.Control
                  type='text'
                  name="name"
                  value={name}
                  placeholder='Person Name *'
                  // onChange={handleChange}
                  className="global-inputs"
                  isInvalid={errors?.name}
                  disabled={true}
                />
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.name}</Form.Control.Feedback>

              </Form.Group>
            </div>
            {familyCheckBox ? (
              <div className="row justify-content-center">
                <ForFamily setSelectedMember={setSelectedMember} /></div>
            ) : null}
            {/* <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdFamilyRestroom />
                        </div>
                        <Form.Control
                            type='text'
                            name="family"
                            placeholder='Add Family Member'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
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
                        />
                    </Form.Group>
                </div> */}
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdOutlineCalendarToday />
                </div>
                <div>
                  <DatePicker
                    selected={DateOne}
                    onChange={date => { setDateOne(date) }}
                    dateFormat="dd/MM/yyyy hhaa"
                    showTimeSelect
                    minDate={new Date()}
                    minTime={new Date().setHours(7, 0, 0, 0)}
                    maxTime={new Date().setHours(19, 0, 0, 0)}
                    timeIntervals={60}
                    customInput={<DatePickerInput text='Date and Time of Sample Collection 1 *' />}
                  />
                </div>
                {dateerrors.dateOne ? (
                  <Form.Label style={{ color: "red" }} type="valid">Date is required</Form.Label>)
                  : null}
              </Form.Group>
            </div>
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdOutlineCalendarToday />
                </div>
                <div>
                  <DatePicker
                    selected={DateTwo}
                    onChange={date => { setDateTwo(date) }}
                    dateFormat="dd/MM/yyyy hhaa"
                    showTimeSelect
                    minDate={new Date()}
                    minTime={new Date().setHours(7, 0, 0, 0)}
                    maxTime={new Date().setHours(19, 0, 0, 0)}
                    timeIntervals={60}
                    customInput={<DatePickerInput text='Date and Time of Sample Collection 2' />}
                  />
                </div>
              </Form.Group>
            </div>
            <div className='col-10 mt-2'>
              <div className='d-flex align-items-start justify-content-center mt-2'>
                <div className="mx-1 mb-1">
                  <IoHomeOutline />
                </div>
                <div>
                  <span>Address </span>
                </div>
              </div>
            </div>
            <div className="col-10">
              <Form.Group className="d-flex">
                <div className="col-5 global-inputs-check">
                  <Form.Check
                    type="checkbox"
                    name="address_field"
                    label="Address Form"
                    onChange={() => setAddressForm(!addressForm)}
                    isInvalid={addressErr}
                  />
                </div>
                <div className="col-7 global-inputs-check">
                  <Form.Check
                    type="checkbox"
                    name="location_link"
                    label="Location Link"
                    checked = {link}
                    onChange={() => setLink(!link)}
                    isInvalid={addressErr}
                  />
                </div>
              </Form.Group>
              {/* { addressErr ? 
                <>{
                (!link) ? 
                <>
                    {(!addressForm) ?
                    <Form.Label style={{ color: "red" }} type="invalid">
                    Atleast One field Should be checked.
                    </Form.Label>  : null }
                </>
                : null 
                }</>:null} */}
            </div>
            {addressForm ? <>
              <div className="col-10 col-md-5">
                <Form.Group>
                  <div className="prepend-icon">
                    <MdFormatListNumbered />
                  </div>
                  <Form.Control
                    type="text"
                    name="flat_number"
                    placeholder="Flat Number / Apartment Number *"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />
                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                    Flat Number is required
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10 col-md-5">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaBuilding />
                  </div>
                  <Form.Control
                    type="text"
                    name="building_name"
                    placeholder="Building Name *"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />
                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                    Building Name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10 col-md-5">
                <Form.Group>
                  <div className="prepend-icon">
                    <GiDirectionSigns />
                  </div>
                  <Form.Control
                    type="text"
                    name="street_name"
                    placeholder="Street Name *"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />
                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                    Street Name is Required.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10 col-md-5">
                <Form.Group>
                  <div className="prepend-icon">
                    <MdLocationOn />
                  </div>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Area / Location *"
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />
                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                    Area is Required.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <FaGlobeAsia />
                  </div>
                  <Form.Control
                    as="select"
                    name="emirates"
                    placeholder="Emirates"
                    onChange={handleChange}
                    value={formValues.emirates}
                    className="global-inputs"
                    isInvalid={addressErr}
                    style={{ fontSize: "small", color: "black" }}
                  >
                    <option value="">Select Emirates *</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Al Ain">Al Ain</option>
                  </Form.Control>
                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                    Emirates is Required.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <MdOutlineApartment />
                  </div>
                  <Form.Control
                    type="text"
                    name="landmark"
                    placeholder="Nearest Landmark "
                    onChange={handleChange}
                    className="global-inputs"
                  />
                  {/* <Form.Control.Feedback style={{ color: "red" }} type="invalid">
              {errors?.landmark}
            </Form.Control.Feedback> */}
                </Form.Group>
              </div> </> : null}
            {link ?
              <div className="col-10">
                <Form.Group>
                  <div className="prepend-icon">
                    <SiGooglemaps />
                  </div>
                  <Form.Control
                    type="text"
                    name="map_link"
                    placeholder="Google Maps Location (Link) *"
                    value = {formValues.map_link}
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />

                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">Location Link is Required.</Form.Control.Feedback>
                </Form.Group>
              </div> : null}
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdCall />
                </div>
                <Form.Control
                  type='text'
                  name="alternate_number"
                  placeholder='Alternate Mobile Number'
                  onChange={handleChange}
                  className="global-inputs"
                  isInvalid={errors?.alternate_number}
                />
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.alternate_number}</Form.Control.Feedback>

              </Form.Group>
            </div>
            {/* <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaClipboardList />
                        </div>
                        <Form.Control
                            type='text'
                            name="symptoms"
                            placeholder='Symptoms/ Conditions *'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.symptoms}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.symptoms}</Form.Control.Feedback>

                    </Form.Group>
                </div> */}
            {/* <div className="col-10 col-md-5">
            <Form.Group>
            <div className="prepend-icon">
                <MdTransgender />
            </div>
            <Form.Control
                as="select"
                name="preferred_gender"
                placeholder="Prefered Gender of Care Giver "
                onChange={handleChange}
                value={formValues.preferred_gender}
                className="global-inputs"
                style = {{fontSize: "small", color:"black"}}
                isInvalid={errors?.preferred_gender}
            >
                <option value="">Select Gender of Care Giver *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </Form.Control>
                <Form.Control.Feedback
                    style={{ color: "red" }}
                    type="invalid"
                >
                    {errors?.preferred_gender}
                </Form.Control.Feedback>
            </Form.Group>
        </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaLanguage />
                        </div>
                        <Form.Control
                            type='text'
                            name="languages_prefer"
                            placeholder='Language of the caregiver'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.languages_prefer}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.languages_prefer}</Form.Control.Feedback>

                    </Form.Group>
                </div> */}
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdPayment />
                </div>
                <Form.Control
                  as="select"
                  name="payment_mode"
                  placeholder="Mode of Payment"
                  onChange={handleChange}
                  value={formValues.payment_mode}
                  className="global-inputs mt-1"
                  style={{ fontSize: "small", color: "black" }}
                  isInvalid={errors?.payment_mode}
                >
                  <option value="">Payment Mode *</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                </Form.Control>
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.payment_mode}</Form.Control.Feedback>

              </Form.Group>
            </div>

            <div className='col-10 col-md-7'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdUploadFile />
                </div>

                <div role="button" onClick={handleFileInsuranceClick} className='global-file-input'>
                  <p>{insurance === undefined ? "Upload Prescription Details" : insurance.name}</p>
                </div>
                <input
                  type="file"
                  name="insurance"
                  ref={hiddenFileInputInsurance}
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  onChange={handleFiles}
                />
                {/* {fileerrors.insurance ? (
                  <Form.Label style={{ color: "red" }} type="valid">File is required</Form.Label>)
                  : null} */}
              </Form.Group>
            </div>
            {/* <div className='col-10 col-md-7'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineFilePresent />
                        </div>
                        <div  role="button" onClick={handleFileReportsClick} className='global-file-input'>
                            <p>{reports.length === 0 ? "Upload Prescription" : reports.length + " File(s) Uploaded"}</p>
                        </div>
                        <input
                            type="file"
                            name="reports"
                            ref={hiddenFileInputReports}
                            accept="image/*,application/pdf"
                            style={{ display: 'none' }}
                            onChange={handleFiles}
                            multiple
                        />
                        {fileerrors.reports ? (
                                <Form.Label style = {{color:"red"}} type = "valid">File is required</Form.Label>)
                            : null}  
                    </Form.Group>
                </div> */}
            <div className='text-center mt-4'>
              <input className="form-button" type="submit" value="SUBMIT" />
            </div>
          </Form>
        </div>
      );
}

export default LabTest;
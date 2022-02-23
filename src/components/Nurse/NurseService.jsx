import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaClock, FaRegUser } from 'react-icons/fa';
import {
  MdLocationOn, MdOutlineFilePresent,
  MdFormatListNumbered,
  MdOutlineApartment, MdCall, MdTransgender, MdPayment
} from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import { FaBuilding, FaGlobeAsia, FaLanguage } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { GiDirectionSigns } from 'react-icons/gi'
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './nurseValidation';
import ForFamily from "../AddFamily/ForFamily";
import ThankYouModal from '../Layout/ThankYouModal'
import { MultiSelect } from "react-multi-select-component";

function NurseService({ handleModalShow }) {
  // Create a reference to the hidden file input element
  // const hiddenFileInputInsurance = React.useRef(null);
  const hiddenFileInputReports = React.useRef(null);
  const [errors, setErrors] = useState();
  // const [fileerrors,setFileErrors] = useState({
  //     // insurance:"",
  //     reports:"",
  // });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const validate = async (values) => {
    try {
      // setFileErrors({/*insurance:insurance === undefined ? "required" : "",*/reports:reports === undefined ? "required" : ""});
      //    setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo: "" });
      if (formValues.languages_prefer === "")
        setLanguageErr("Preferred Language is Required.")
      else
        setLanguageErr("")
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
  // const handleFileInsuranceClick = event => {
  //     hiddenFileInputInsurance.current.click();
  // };
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleFileReportsClick = event => {
    hiddenFileInputReports.current.click();
  };

  /* const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
      <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
  )); */
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
    languages_prefer: ""
  });
  //const [DateOne, setDateOne] = useState();
  const [reports, setReports] = useState([]);
  // const [insurance, setInsurance] = useState();

  const [link, setLink] = useState(false);
  const [addressForm, setAddressForm] = useState(false);

  const [name, setName] = useState("")
  const [familyCheckBox, setFamilyCheckBox] = useState(false);
  const [data, setData] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const languages = [{ label: "English", value: "English" }, { label: "Arabic", value: "Arabic" }, { label: "Hindi", value: "Hindi" }, { label: "Urdu", value: "Urdu" }, { label: "Tagaloug", value: "Tagaloug" }, { label: "French", value: "French" }, { label: "Afrikaans", value: "Afrikaans" },
  { label: "Malayalam", value: "Malayalam" }, { label: "Bengali", value: "Bengali" }
  ];
  const [selected, setSelected] = useState([]);
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
  const [languageErr, setLanguageErr] = useState("")
  const [addressErr, setAddressErr] = useState("")
  const handleAddress = () => {
    setAddressErr("")
    if (
      (formValues.flat_number &&
        formValues.building_name &&
        formValues.street_name &&
        formValues.location &&
        formValues.emirates)
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
        setAddressErr("Address Field is Required.")
      }
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const valueRenderer = (selected) => {
    if (!selected.length) {
      return "Language of the Care Giver *";
    }

    // return selected.length === 1
    //   ? `${selected[0].label} 😶`
    //   : selected.map(({ label }) => "✔️ " + label);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddress()
    var languages = []
    formValues.languages_prefer = ""
    selected.map((select) => languages.push(select.value))
    formValues.languages_prefer = languages.join(", ")
    const err = await validate(formValues);
    setErrors(err);

    if (Object.keys(err).length === 0 && addressErr === ""/* && fileerrors.insurance === ""*/) {
      setLoading(true)

      const formData = new FormData();

      formValues.patient_id = data._id;
      formValues.name = data.name;
      formValues.dob = data.dob;
      formValues.gender = data.gender;
      formValues.nationality = data.nationality;
      formValues.email = data.email;
      formValues.referredby = data.referredby;
      formValues.mobile = data.login_id;
      formValues.insurance_card_copy = data.insurance_card_copy
      formValues.type = "Home Service";
      formValues.subtype = "Nursing Service"
      formValues.status = "New"
      formValues.insurance_name = data.insurance_name
      formValues.family = selectedMember;

      if (reports !== undefined) {
        for (const tp of reports) {
          formData.append('patient_reports', tp);
        }
      }
      // formData.append('insurance_card_copy', insurance);
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
      setReports(e.target.files)
    }
    // else {
    //     setInsurance(e.target.files[0])
    // }
  }
  if (submitted === true)
    return (<ThankYouModal />)
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
                  disabled={true}
                />
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
            {/* <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineCalendarToday />
                        </div>
                        <div>
                            <DatePicker
                                selected={DateOne}
                                onChange={date => setDateOne(date)}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect
                                customInput={<DatePickerInput text='Date and Time of Delivery' />}
                            />
                        </div>
                    </Form.Group>
                </div>*/}
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdFormatListNumbered />
                </div>
                <Form.Control
                  type='text'
                  name="current_diagnosis"
                  placeholder='Current Diagnosis *'
                  onChange={handleChange}
                  className="global-inputs"
                  isInvalid={errors?.current_diagnosis}
                />
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.current_diagnosis}</Form.Control.Feedback>

              </Form.Group>
            </div>
            <div className='col-10'>
              <Form.Group>
                <div className="prepend-icon">
                  <FaClock />
                </div>
                <Form.Control
                  type='text'
                  name="preferred_date_two"
                  placeholder='Time period for nursing service (number of days/months) *'
                  onChange={handleChange}
                  className="global-inputs"
                  isInvalid={errors?.preferred_date_two}
                />
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.preferred_date_two}</Form.Control.Feedback>

              </Form.Group>
            </div>
            <div className='col-10'>
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
                    onChange={handleChange}
                    className="global-inputs"
                    isInvalid={addressErr}
                  />

                  <Form.Control.Feedback style={{ color: "red" }} type="invalid">Location Link is Required.</Form.Control.Feedback>
                </Form.Group>
              </div> : null}
            <div className="col-10">
              <Form.Group>
                <div className="prepend-icon">
                  <MdTransgender />
                </div>
                <Form.Control
                  as="select"
                  name="preferred_gender"
                  placeholder="Prefered Gender of Doctor "
                  onChange={handleChange}
                  value={formValues.preferred_gender}
                  className="global-inputs mt-1"
                  style={{ fontSize: "small", color: "black" }}
                  isInvalid={errors?.preferred_gender}
                >
                  <option value="">Select Gender of Doctor *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">
                  {errors?.preferred_gender}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-10">
              <Form.Group>
                <div className="prepend-icon">
                  <FaLanguage />
                </div>
                <MultiSelect
                  className="dark global-inputs"
                  options={languages}
                  hasSelectAll={false}
                  value={selected}
                  onChange={setSelected}
                  valueRenderer={valueRenderer}
                />
                <Form.Control.Feedback style={{ color: "red" }} type="">
                  {languageErr}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
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
                  <option value="">Payment Code *</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                </Form.Control>
                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.payment_mode}</Form.Control.Feedback>

              </Form.Group>
            </div>
            <div className='col-10 col-md-7'>
              <Form.Group>
                <div className="prepend-icon">
                  <MdOutlineFilePresent />
                </div>
                <div role="button" onClick={handleFileReportsClick} className='global-file-input'>
                  <p>{reports.length === 0 ? "Upload Reports (If Any)" : reports.length + " File(s) Uploaded"}</p>
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
              </Form.Group>
            </div>
            <div className='text-center mt-4'>
              <input className="form-button" type="submit" value="SUBMIT" />
            </div>
          </Form>
        </div>
      );
}

export default NurseService;
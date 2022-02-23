import React, { forwardRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdLocationOn, MdOutlineCalendarToday,MdUploadFile
} from 'react-icons/md';
import { FaClipboardList, FaGlobeAsia } from 'react-icons/fa'
import DatePicker from "react-datepicker";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './xrayValidation';
import ForFamily from "../AddFamily/ForFamily";
import ThankYouModal from '../Layout/ThankYouModal'

function XRay({ handleModalShow }) {
    const hiddenFileInputInsurance = React.useRef(null);
    const [errors, setErrors] = useState();
    const [fileerrors,setFileErrors] = useState({
        insurance:"",
    });
    const [dateerrors, setDateErrors] = useState({
        dateOne: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const validate = async (values) => {
        try {
            setFileErrors({insurance:insurance === undefined ? "required" : ""});
            setDateErrors({ dateOne: DateOne === undefined ? "required" : "" });
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
        mobile: '',
        insurance_card_copy: [],
        preferred_date_first: '',
    });
    const [DateOne, setDateOne] = useState();
    const [DateTwo, setDateTwo] = useState();
    const [insurance, setInsurance] = useState();
    const [name, setName] = useState("")
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);

        if (Object.keys(err).length === 0 && insurance) {
            setLoading(true)
            const formData = new FormData();

            formValues.patient_id = data._id;
            formValues.name = data.name;
            formValues.dob = data.dob;
            formValues.gender = data.gender;
            formValues.nationality = data.nationality;
            formValues.current_diagnosis = formValues.symptoms
            formValues.email = data.email;
            formValues.referredby = data.referredby;
            formValues.mobile = data.login_id;
            formValues.insurance_card_copy = data.insurance_card_copy
            formValues.preferred_date_first = DateOne.toString()
            formValues.type = "Diagnostics or Radiology";
            formValues.subtype = "X-ray"
            formValues.status = "New"
            formValues.family = selectedMember;
            formValues.insurance_name = data.insurance_name

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
                                    onChange={handleChange}
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
                                        customInput={<DatePickerInput text='Preferred Date and Time of Test 1 *' />}
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
                                        customInput={<DatePickerInput text='Preferred Date and Time of Test 2' />}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col-10">
                            <Form.Group>
                                <div className="prepend-icon">
                                    <FaGlobeAsia />
                                </div>
                                <Form.Control
                                    as="select"
                                    name="address_patient"
                                    placeholder="Emirates"
                                    onChange={handleChange}
                                    value={formValues.address_patient}
                                    className="global-inputs"
                                    isInvalid={errors?.address_patient}
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
                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.address_patient}</Form.Control.Feedback>

                            </Form.Group>
                        </div>
                        <div className='col-10'>
                            <Form.Group>
                                <div className="prepend-icon">
                                    <MdLocationOn />
                                </div>
                                <Form.Control
                                    type='text'
                                    name="location"
                                    placeholder='Area / Location *'
                                    onChange={handleChange}
                                    className="global-inputs"
                                    isInvalid={errors?.location}
                                />
                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.location}</Form.Control.Feedback>

                            </Form.Group>
                        </div>

                        <div className='col-10'>
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
                                <Form.Control.Feedback style={{ color: "red" }} type="invalid">{errors?.symptoms}</Form.Control.Feedback>

                            </Form.Group>
                        </div>
                        <div className='col-10 col-md-7'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdUploadFile />
                        </div>
                        
                        <div  role="button" onClick={handleFileInsuranceClick} className='global-file-input'>
                            <p>{insurance === undefined ? "Upload Prescription Details *" : insurance.name}</p>
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
                        <div className='col-10 mt-2'>
                            <p className="sub-title text-center">Payment would be done at the time of test in the lab center.</p>
                        </div>
                        <div className='text-center mt-2'>
                            <input className="form-button" type="submit" value="SUBMIT" />
                        </div>
                    </Form>
                </div>
            );
}

export default XRay;
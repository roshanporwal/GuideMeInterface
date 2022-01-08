import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdFamilyRestroom, MdLocationOn, MdOutlineCalendarToday, MdOutlineFilePresent,
    MdOutlinePersonAdd, MdUploadFile,MdFormatListNumbered,
    MdOutlineApartment,MdCall,MdTransgender,MdPayment
} from 'react-icons/md';
import {FaBuilding,FaGlobeAsia,FaClipboardList,FaLanguage} from 'react-icons/fa'
import {IoHomeOutline} from 'react-icons/io5'
import {GiDirectionSigns} from 'react-icons/gi'
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './doctorValidation';
function DoctorVisit({handleModalShow}) {
    const hiddenFileInputInsurance = React.useRef(null);
    const hiddenFileInputReports = React.useRef(null);
    const [errors, setErrors] = useState();
    const [fileerrors,setFileErrors] = useState({
        insurance:"",
        reports:"",
    });
    const [dateerrors,setDateErrors] = useState({
        dateOne:"",
        dateTwo:"",
    });

    const validate = async (values) => {
        try {
            setFileErrors({insurance:insurance === undefined ? "required" : "",reports:reports === undefined ? "required" : ""});
            
            setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo: "" });
            
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
    const handleFileReportsClick = event => {
        hiddenFileInputReports.current.click();
    };
    
    const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
        <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
    ));
    const [formValues, setFormValues] = useState();
    const [DateOne, setDateOne] = useState();
    const [reports, setReports] = useState([]);
    const [insurance, setInsurance] = useState();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        console.log(err)
        if(Object.keys(err).length === 0 && fileerrors.insurance === "")  {    
                console.log(formValues);
                const formData = new FormData();

                let data = localStorage.getItem("login")
                data = JSON.parse(data)

                formValues.patient_id = data._id;
                formValues.patient_name = data.name;
                formValues.type = "physiotherapy";
                formValues.basetype = "home_service"


                if (reports !== undefined) {
                    for (const tp of reports) {
                        formData.append('patient_reports', tp);
                    }
                }
                formData.append('insurance_card_copy', insurance);
                formData.append('formValues', JSON.stringify(formValues));

                const abc = await auth_service.createNewenqurire(data.login_id, formData)
                console.log(abc)
            handleModalShow();
        }


    }
    const handleFiles = e => {
        const { name } = e.currentTarget
        if (name === 'reports') {
            setReports(e.target.files)
        } else {
            setInsurance(e.target.files[0])
        }
    }
    return (
        <div className="form-container">
            <Form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
            <div className='col-3'>
                    <Form.Group className="d-flex">
                        <Form.Check
                            type='checkbox'
                            name="myself"
                            label='Myself'
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className="d-flex">
                        <Form.Check
                            type='checkbox'
                            name="myself"
                            label='For Family'
                            onChange={handleChange}
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
                            placeholder='Person Name'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.name}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.name}</Form.Control.Feedback>

                    </Form.Group>
                </div>
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
                                onChange={date => setDateOne(date)}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect
                                customInput={<DatePickerInput text='Date and Time of Delivery' />}
                            />
                        </div>
                        {dateerrors.dateOne ? (
                            <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
                        : null}
                    </Form.Group>
                </div>
                <div className='col-10'>
                    <div className='d-flex align-items-start justify-content-center mt-2'>
                        <div className="mx-1">
                            <IoHomeOutline /> 
                        </div>
                        <div>
                            <span>Address </span>
                        </div>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdFormatListNumbered />
                        </div>
                        <Form.Control
                            type='text'
                            name="flat_number"
                            placeholder='Flat Number / Apartment Number'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.flat_number}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.flat_number}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaBuilding />
                        </div>
                        <Form.Control
                            type='text'
                            name="building_name"
                            placeholder='Building Name (Mandatory)'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.building_name}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.building_name}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <GiDirectionSigns />
                        </div>
                        <Form.Control
                            type='text'
                            name="street_name"
                            placeholder='Street Name'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.street_name}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.street_name}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdLocationOn />
                        </div>
                        <Form.Control
                            type='text'
                            name="location"
                            placeholder='Area / Location'
                            onChange={handleChange}
                            className="global-inputs"
                           isInvalid={errors?.location}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.location}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaGlobeAsia />
                        </div>
                        <Form.Control
                            type='text'
                            name="emirates"
                            placeholder='Emirates'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.emirates}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.emirates}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineApartment />
                        </div>
                        <Form.Control
                            type='text'
                            name="landmark"
                            placeholder='Nearest Landmark (Optional)'
                            onChange={handleChange}
                            className="global-inputs"
                           isInvalid={errors?.landmark}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.landmark}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdCall />
                        </div>
                        <Form.Control
                            type='text'
                            name="mobile"
                            placeholder='Alternate Mobile Number'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.mobile}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.mobile}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                 <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaClipboardList />
                        </div>
                        <Form.Control
                            type='text'
                            name="requirements"
                            placeholder='Select your requirement '
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.requirements}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.requirements}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdTransgender />
                        </div>
                        <Form.Control
                            type='text'
                            name="preffered_gender"
                            placeholder='Prefered Gender of Care Giver '
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.preffered_gender}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.preffered_gender}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaLanguage />
                        </div>
                        <Form.Control
                            type='text'
                            name="preffered_language"
                            placeholder='Language of the caregiver'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.preffered_language}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.preffered_language}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdPayment />
                        </div>
                        <Form.Control
                            type='text'
                            name="payment_type"
                            placeholder='Mode of Payment'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.payment_type}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.payment_type}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                
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
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineFilePresent />
                        </div>
                        <div  role="button" onClick={handleFileReportsClick} className='global-file-input'>
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

export default DoctorVisit;
import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdFamilyRestroom, MdLocationOn, MdOutlineCalendarToday, MdOutlineFilePresent,
    MdOutlinePersonAdd, MdUploadFile,
} from 'react-icons/md';
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './mammogramValidation';
function Mammogram({handleModalShow}) {
    const hiddenFileInputInsurance = React.useRef(null);
    const hiddenFileInputReports = React.useRef(null);
    const [errors, setErrors] = useState();
    const [fileerrors,setFileErrors] = useState({
        insurance:"",
        reports:"",
    });
    const [dateerrors,setDateErrors] = useState({
        dateOne:"",
        DateTwo:""
    });

    const validate = async (values) => {
        try {
            setFileErrors({insurance:insurance === undefined ? "required" : "",reports:reports.length === 0 ? "required" : ""});
            
            setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo:DateTwo === undefined ? "required" : ""});
            
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
    const handleFileReportsClick = event => {
        hiddenFileInputReports.current.click();
    };
    
    
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleFileInsuranceClick = event => {
        hiddenFileInputInsurance.current.click();
    };
    
    const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
        <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
    ));
    const [formValues, setFormValues] = useState();
    const [DateOne, setDateOne] = useState();
    const [DateTwo, setDateTwo] = useState();
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
        console.log(fileerrors);
        console.log(err)
        if(Object.keys(err).length === 0 && fileerrors.insurance === "")  {    
                console.log(formValues);
                const formData = new FormData();

                let data = localStorage.getItem("login")
                data = JSON.parse(data)

                formValues.patient_id = data._id;
                formValues.patient_name = data.name;
                formValues.type = "mammogram";
                formValues.basetype = "diagnostics"


                if (reports !== undefined) {
                    for (const tp of reports) {
                        formData.append('patient_reports', tp);
                    }
                }
                formData.append('prescription', insurance);
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
                        />
                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
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
                </div>
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
                                customInput={<DatePickerInput text='Date and Time of Test' />}
                            />
                        </div>
                        {dateerrors.dateOne ? (
                            <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
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
                                onChange={date => setDateTwo(date)}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect
                                customInput={<DatePickerInput text='Date and Time of Reports' />}
                            />
                        </div>
                        {dateerrors.dateTwo ? (
                            <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
                        : null}
                    </Form.Group>
                </div>
                <div className='col-10'>
                    <Form.Group >
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
                </div>
                <div className='col-10'>
                    <p className="sub-title text-center">payment would be done at the time of test in the lab center</p>
                </div>
                <div className='text-center mt-4'>
                    <input className="form-button" type="submit" value="SUBMIT" />
                </div>
            </Form>
        </div>
    );
}

export default Mammogram;
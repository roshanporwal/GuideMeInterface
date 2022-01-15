import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaClock, FaRegUser } from 'react-icons/fa';
import {
    MdLocationOn, MdOutlineFilePresent,
    MdFormatListNumbered,
    MdOutlineApartment,MdCall
} from 'react-icons/md';
import {FaBuilding,FaGlobeAsia} from 'react-icons/fa'
import {IoHomeOutline} from 'react-icons/io5'
import {GiDirectionSigns} from 'react-icons/gi'
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './nurseValidation';
function NurseService({handleModalShow}) {
    // Create a reference to the hidden file input element
    // const hiddenFileInputInsurance = React.useRef(null);
    const hiddenFileInputReports = React.useRef(null);
    const [errors, setErrors] = useState();
    // const [fileerrors,setFileErrors] = useState({
    //     // insurance:"",
    //     reports:"",
    // });

    const validate = async (values) => {
        try {
            // setFileErrors({/*insurance:insurance === undefined ? "required" : "",*/reports:reports === undefined ? "required" : ""});
            
        //    setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo: "" });
            
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
        name:'',
        age:'',
        gender:'',
        nationality:'',
        email:'',
        referredby : '',
        address_patient:'',
        mobile:'',
        insurance_card_copy: [],
    });
    //const [DateOne, setDateOne] = useState();
    const [reports, setReports] = useState([]);
    // const [insurance, setInsurance] = useState();
    
    const [name,setName] = useState("")
    useEffect(() => {
        async function fetchData() {
            let data = localStorage.getItem("login_patient")
            if (data !== null) {
                data = JSON.parse(data)
                setName(data.name)
            }
        }
        fetchData()
    }, []);
    const handleAddress = () => { 
        formValues.address_patient = formValues.flat_number +", " + formValues.building_name + ", " + formValues.street_name 
                        + ", " + formValues.location + ", " + formValues.emirates + ", " + formValues.landmark
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        
        if(Object.keys(err).length === 0/* && fileerrors.insurance === ""*/)  {    
               e.preventDefault();
                
                const formData = new FormData();

                let data = localStorage.getItem("login_patient")
                data = JSON.parse(data)
                
                handleAddress()
            
                formValues.patient_id = data._id;
                formValues.name = data.name;
                formValues.age = data.age;
                formValues.gender = data.gender;
                formValues.nationality = data.nationality;
                formValues.email = data.email;
                formValues.referredby = data.referredby;
                formValues.mobile = data.login_id;            
                formValues.insurance_card_copy = data.insurance_card_copy
                formValues.type = "nursingservice";
                
                

                if (reports !== undefined) {
                    for (const tp of reports) {
                        formData.append('patient_reports', tp);
                    }
                }
                // formData.append('insurance_card_copy', insurance);
                formData.append('formValues', JSON.stringify(formValues));

                const abc = await auth_service.createNewenqurire(data.login_id, formData)
                
                if(abc.payload){
                    handleModalShow();
                }
                else{
                    alert(abc.message)
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
                            value = {name}
                            placeholder='Person Name'
                            // onChange={handleChange}
                            className="global-inputs"
                            disabled = {true}
                        />
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
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdFormatListNumbered />
                        </div>
                        <Form.Control
                            type='text'
                            name="current_diagnosis"
                            placeholder='Current diagnosis (compulsory)'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.current_diagnosis}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.current_diagnosis}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaClock />
                        </div>
                        <Form.Control
                            type='text'
                            name="preferred_date_two"
                            placeholder='Time period for nursing service (number of days/months) '
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.preferred_date_two}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.preferred_date_two}</Form.Control.Feedback>

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
                            name="alternate_number"
                            placeholder='Alternate Mobile Number'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.alternate_number}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.alternate_number}</Form.Control.Feedback>

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
                <div className='col-10 col-md-7'>
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

export default NurseService;
import React, { forwardRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
     MdLocationOn, MdOutlineCalendarToday,
} from 'react-icons/md';
import {FaClipboardList} from 'react-icons/fa'
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
import { validationSchema } from './ultrasoundValidation';
function UltraSound({handleModalShow}) {
    // const hiddenFileInputInsurance = React.useRef(null);
    const [errors, setErrors] = useState();
    // const [fileerrors,setFileErrors] = useState({
    //     insurance:"",
    // });
    const [dateerrors,setDateErrors] = useState({
        dateOne:"",
        DateTwo:""
    });

    const validate = async (values) => {
        try {
            // setFileErrors({insurance:insurance === undefined ? "required" : ""});
            
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
    // const handleFileInsuranceClick = event => {
    //     hiddenFileInputInsurance.current.click();
    // };
    
    const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
        <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
    ));
    const [formValues, setFormValues] = useState({
        name:'',
        age:'',
        gender:'',
        nationality:'',
        email:'',
        referredby : '',
        mobile:'',
        insurance_card_copy: [],
        preferred_date_first:'',
        preferred_date_second:''
    });
    const [DateOne, setDateOne] = useState();
    const [DateTwo, setDateTwo] = useState();
    
    // const [insurance, setInsurance] = useState();
    
    useEffect(() => {
        fetchData()
    }, []);
    async function fetchData() {
        let data = localStorage.getItem("login_patient")
        if (data !== null) {
            data = JSON.parse(data)
            formValues.name = data.name
            setFormValues({ ...formValues, name: data.name });
        }
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
                
                const formData = new FormData();

                let data = localStorage.getItem("login_patient")
                data = JSON.parse(data)

                formValues.patient_id = data._id;
                formValues.name = data.name;
                formValues.age = data.age;
                formValues.gender = data.gender;
                formValues.nationality = data.nationality;
                formValues.current_diagnosis = formValues.symptoms
                formValues.email = data.email;
                formValues.referredby = data.referredby;
                formValues.mobile = data.login_id;            
                formValues.insurance_card_copy = data.insurance_card_copy
                formValues.preferred_date_first = DateOne.toString()
                formValues.preferred_date_second = DateTwo.toString()
                formValues.type = "ultrasound";
                

                // formData.append('prescription', insurance);
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
    // const handleFiles = e => {
    //         setInsurance(e.target.files[0])
    // }
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
                            value = {formValues.name}
                            placeholder='Person Name'
                            onChange={handleChange}
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
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineCalendarToday />
                        </div>
                        <div>
                            <DatePicker
                                selected={DateOne}
                                onChange={date => {setDateOne(date)}}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect
                                minDate = {new Date()}
                                minTime = {new Date().setHours(7, 0, 0, 0)}
                                maxTime = {new Date().setHours(19, 0, 0, 0)}
                                timeIntervals = {60}
                                customInput={<DatePickerInput text='Preferred Date and Time' />}
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
                                onChange={date => { setDateTwo(date)}}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect
                                minDate = {new Date()}
                                minTime = {new Date().setHours(7, 0, 0, 0)}
                                maxTime = {new Date().setHours(19, 0, 0, 0)}
                                timeIntervals = {60}
                                customInput={<DatePickerInput text='Preferred Date and Time' />}
                            /> 
                        </div>
                        {dateerrors.dateTwo ? (
                            <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
                        : null}
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
                            <FaClipboardList />
                        </div>
                        <Form.Control
                            type='text'
                            name="symptoms"
                            placeholder='Symptoms/Conditions'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.symptoms}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.symptoms}</Form.Control.Feedback>

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
                    </Form.Group>
                    {fileerrors.insurance ? (
                            <Form.Label style = {{color:"red"}} type = "valid">File is required</Form.Label>)
                        : null}  
                </div> */}
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

export default UltraSound;
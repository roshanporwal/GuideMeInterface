import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import {  FaDiagnoses } from 'react-icons/fa';
import { MdOutlineCalendarToday, MdOutlineFilePresent,
} from 'react-icons/md';
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
import {validationSchema} from "./freeopinionValidation";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import ThankYouModal from '../Layout/ThankYouModal';


function FreeOpinion({handleModalShow}) {
    // const hiddenFileInputInsurance = React.useRef(null);
    const hiddenFileInputReports = React.useRef(null);

    
    const [errors, setErrors] = useState();
    // const [fileerrors,setFileErrors] = useState({
    //     // insurance:"",
    //     reports:"",
    // });
    const [dateerrors,setDateErrors] = useState({
        dateOne:"",
        dateTwo:"",
    });
    const [radioErr,setRadioErr] = useState("");
    const [loading, setLoading] = useState(false)
    const [submitted,setSubmitted ] = useState(false)
    const [opinion, setOpinion] = useState("");
    const handleOpinionChange = (e) => {
        setOpinion(e.target.value)
    }
    
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
        current_diagnosis : ''
    });
    const [DateOne, setDateOne] = useState();
    const [DateTwo, setDateTwo] = useState();
    const [reports, setReports] = useState([]);
    // const [insurance, setInsurance] = useState();


    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const validate = async (values) => {
        try {
            
            // setFileErrors({/*insurance:insurance === undefined ? "required" : "",*/reports:reports === undefined ? "required" : ""});
            console.log(DateOne)
            setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo:DateTwo === undefined ? "required" : "" });
            setRadioErr(opinion === "" ? "required" : "")
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        if(Object.keys(err).length === 0 /*&& fileerrors.insurance === "" */&& dateerrors.dateOne === "" && opinion )  {  
            setLoading(true)
            const formData = new FormData();

            let data = localStorage.getItem("login_patient")
            data = JSON.parse(data)

            formValues.patient_id = data._id;
            formValues.name = data.name;
            formValues.dob = data.dob;
            formValues.gender = data.gender;
            formValues.nationality = data.nationality;
            formValues.email = data.email;
            formValues.referredby = data.referredby;
            formValues.mobile = data.login_id;
            formValues.insurance_card_copy = data.insurance_card_copy
            formValues.type = "Second Opinion"
            formValues.subtype = opinion;
            formValues.status = "New"
            formValues.insurance_name = data.insurance_name
            // formValues.basetype = opinion;
            formValues.preferred_date_first = DateOne.toString()
            if(DateTwo)
                formValues.preferred_date_second = DateTwo.toString()


            if (reports !== undefined) {
                for (const tp of reports) {
                    formData.append('patient_reports', tp);
                }
            }
            // formData.append('insurance_card_copy', insurance);
            formData.append('formValues', JSON.stringify(formValues));

            const freeOpinion = await auth_service.createNewenqurire(data.login_id, formData)
            if(freeOpinion.payload){
                setLoading(false)
                setSubmitted(true)
                // handleModalShow();
                
           }else{
                setLoading(false)
               alert(freeOpinion.message)
           }
        }
    }
    const handleFiles = e => {
        const { name } = e.currentTarget
        if (name === 'reports') {
            setReports(e.target.files) 
        
        }
        //  else {
        //     setInsurance(e.target.files[0])
        // }
    }
    if(submitted === true){
        return(
            <>
              <ThankYouModal />
            </>
        )
    }
    else if (loading === true)
    return (
      <>
        <ReactGifLoader />
      </>
    );
  else
    return (
        <div className="form-container">
            <Form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
               
                    <Form.Group className="row">
                        <Form.Check
                            className='col-5 offset-1'
                            type='radio'
                            id = "free_surgical_opinion"
                            name="Opinion"
                            value="Free Surgical Opinion"
                            label='Free Surgical Second Opinion Within The Country'
                            onChange={handleOpinionChange}
                        />
                        <Form.Check
                            className='col-5'
                            type='radio'
                            id = "interational_expert_opinion"
                            name="Opinion"
                            value="Interational Expert Opinion"
                            label = "International Expert Opinion"
                            onChange={handleOpinionChange}
                        />
                        {radioErr ? (
                            <Form.Label className='offset-4' style = {{color:"red"}} type = "valid">Field is required</Form.Label>)
                        : null}  
                    </Form.Group>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaDiagnoses/>
                        </div>
                        <Form.Control
                            type='text'
                            name="current_diagnosis"
                            placeholder='Name of the diagnosed medical condition(compulsory)- ICD code(list to be shared)'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.current_diagnosis}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.current_diagnosis}</Form.Control.Feedback>

                    </Form.Group>
                </div>
               {/*  <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdInfoOutline />
                        </div>
                        <Form.Control
                            type='text'
                            name="additional_condition_info"
                            placeholder='Additional Information'
                            onChange={handleChange}
                            className="global-inputs"
                        />

                    </Form.Group>
                </div> */}
                {/* <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdRefresh />
                        </div>
                        <Form.Control
                            type='text'
                            name="recomended_treatment"
                            placeholder='Recommended Treatment'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.recomended_treatment}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.recomended_treatment}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdInfoOutline />
                        </div>
                        <Form.Control
                            type='text'
                            name="additional_treatment_info"
                            placeholder='Additional information'
                            onChange={handleChange}
                            className="global-inputs"
                        />

                    </Form.Group>
                </div> */}
                {/* <div className='col-10'>
                    <Form.Group> */}
                            {/* <div className="prepend-icon">
                                <MdStickyNote2 />
                            </div> */}
                            {/* <Form.Check
                                type='checkbox'
                                name="doctor_specialization_recommend"
                                label='Not sure which doctor specialization - kindly recommend'
                                onChange={handleChange}
                                className="global-inputs-check form-control"
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
                                minDate = {new Date()}
                                customInput={<DatePickerInput text='Preferred date of appointment (1) (compulsory)' />}
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
                                minDate = {new Date()}
                                customInput={<DatePickerInput text='Preferred date of appointment (2) (not compulsory)' />}
                            />
                        </div>
                        {/* {dateerrors.dateTwo ? (
                            <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
                        : null}   */}
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
                        
                        <input
                            type="file"
                            name="reports"
                            ref={hiddenFileInputReports}
                            accept="image/*,application/pdf"
                            style={{ display: 'none' }}
                            onChange={handleFiles}
                            multiple
                        />
                        </div>
                    </Form.Group>
                </div>
                <div className='text-center mt-4'>
                    <input className="form-button" type="submit" value="SUBMIT" />
                </div>
            </Form>
        </div>
    );
}

export default FreeOpinion;
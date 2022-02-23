import React, { forwardRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
     MdOutlineCalendarToday,
     MdLocationOn
    //  , MdOutlineFilePresent,
    // MdOutlineLocalHospital,  MdStickyNote2
} from 'react-icons/md';
import DatePicker from "react-datepicker";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import {validationSchema} from "./rtpcrValidation";
import * as auth_service from "../../service/auth_service";
import ForFamily from "../AddFamily/ForFamily";
// import Location from '../../interfacecomponents/location'
import ThankYouModal from '../Layout/ThankYouModal'

function RTPCR({handleModalShow}) {
    // const hiddenFileInputInsurance = React.useRef(null);
    // const hiddenFileInputReports = React.useRef(null);
    const [errors, setErrors] = useState();
    // const [fileerrors,setFileErrors] = useState({
    //     // insurance:"",
    //     reports:"",
    // });
    const [dateerrors,setDateErrors] = useState({
        dateOne:"",
        dateTwo:"",
    });
  const [loading, setLoading] = useState(false);
  const [submitted,setSubmitted] = useState(false)
    const validate = async (values) => {
        try {
            // setFileErrors({/*insurance:insurance === undefined ? "required" : "",*/reports:reports === undefined ? "required" : ""});
            setDateErrors({dateOne:DateOne === undefined ? "required" : "",dateTwo:DateTwo === undefined ? "required" : "" });
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
    // const handleFileReportsClick = event => {
    //     hiddenFileInputReports.current.click();
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
        current_diagnosis:''
    });
    // const [location,setLocation ] = useState({
    //     country : "",
    //     state: "",
    //     city: ""
    //   })

    const [DateOne, setDateOne] = useState();
    const [DateTwo, setDateTwo] = useState();
    // const [reports, setReports] = useState([]);
    // const [insurance, setInsurance] = useState();
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        
        if(Object.keys(err).length === 0 /* && fileerrors.insurance === ""*/)  {  
            setLoading(true)  
            const formData = new FormData();

            // setFormValues({ ...formValues, patient_id: data.id });
            formValues.patient_id = data.id
            formValues.name = data.name;
            formValues.dob = data.dob;
            formValues.gender = data.gender;
            formValues.current_diagnosis = formValues.symptoms
            formValues.nationality = data.nationality;
            formValues.email = data.email;
            formValues.referredby = data.referredby;
            formValues.mobile = data.login_id;            
            formValues.insurance_card_copy = data.insurance_card_copy
            formValues.preferred_date_first = DateOne.toString()
            if(DateTwo)
                formValues.preferred_date_second = DateTwo.toString()
            formValues.type = "Home Service"
            formValues.subtype = "RT PCR Test";
            formValues.status = "New"
            formValues.insurance_name = data.insurance_name   
            formValues.family = selectedMember;    


            // if (reports !== undefined) {
            //     for (const tp of reports) {
            //         formData.append('patient_reports', tp);
            //     }
            // }
            // formData.append('insurance_card_copy', insurance);
            formData.append('formValues', JSON.stringify(formValues));
            
            const abc = await auth_service.createNewenqurire(data.login_id, formData)
            if(abc.payload){
                setSubmitted(true)
                setLoading(false)
                // handleModalShow();
            }
            else{
                alert(abc.message)
                    setLoading(false)
            }
        }

    }
    // const handleFiles = e => {
    //     const { name } = e.currentTarget
    //     if (name === 'reports') {
    //         setReports(e.target.files)
    //     }
    //     // else {
    //     //     setInsurance(e.target.files[0])
    //     // }
    // }
    if(submitted === true)
    return(<ThankYouModal formValues = {formValues}/>)
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
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaRegUser />
                        </div>
                        <Form.Control
                            type='text'
                            name="name"
                            value = {name}
                            placeholder='Person Name *'
                            className="global-inputs"
                            isInvalid={errors?.name}
                            disabled={true}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.name}</Form.Control.Feedback>

                    </Form.Group>
                </div>
                {familyCheckBox ? (
                    <div className="row justify-content-center">
                    <ForFamily setSelectedMember = {setSelectedMember} /></div>
                ):null}
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
                </div> */}
                {/* <div className='col-10 col-md-5'>
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

                {/* <Location setLocation = {setLocation}/> */}
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
                {/* <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdStickyNote2 />
                        </div>
                        <Form.Control
                            type='text'
                            name="symptoms"
                            placeholder='Symptoms / Conditions *'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.symptoms}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.symptoms}</Form.Control.Feedback>

                    </Form.Group>
                </div> */}
                {/* <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineLocalHospital />
                        </div>
                        <Form.Control
                            type='text'
                            name="hospital"
                            placeholder='Preferred doctor/hospital/specialization'
                            onChange={handleChange}
                            className="global-inputs"
                            isInvalid={errors?.hospital}
                        />
                        <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.hospital}</Form.Control.Feedback>
                    
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
                                customInput={<DatePickerInput text='Preferred Date and Time of Sample Collection 1*' />}
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
                                customInput={<DatePickerInput text='Preferred Date and Time of Sample Collection 2*' />}
                            />
                            {dateerrors.dateTwo ? (
                            <Form.Label style={{ color: "red" }} type="valid">Date is required</Form.Label>)
                            : null}
                        </div>
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
                {/* <div className='col-10 col-md-7'>
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
                </div> */}
                <div className='text-center mt-4'>
                    <input className="form-button" type="submit" value="SUBMIT" />
                </div>
            </Form>
        </div>
    );
}

export default RTPCR;
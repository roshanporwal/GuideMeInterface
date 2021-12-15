import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdInfoOutline, MdOutlineCalendarToday, MdOutlineFilePresent,
    MdRefresh, MdUploadFile
} from 'react-icons/md';
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
function InternationalOpinion({handleModalShow}) {
    const hiddenFileInputInsurance = React.useRef(null);
    const hiddenFileInputReports = React.useRef(null);

    
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
    const [DateTwo, setDateTwo] = useState();
    const [reports, setReports] = useState([]);
    const [insurance, setInsurance] = useState();


    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);       
        const formData = new FormData();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)

        formValues.patient_id = data._id;
        formValues.patient_name = data.name;
        formValues.type = "new_consulation";


        if (reports !== undefined) {
            for (const tp of reports) {
                formData.append('patient_reports', tp);
            }
        }
        formData.append('insurance_card_copy', insurance);
        formData.append('formValues', JSON.stringify(formValues));

        const createNewConsulation = await auth_service.createNewConsulation(data.login_id, formData)
        console.log(createNewConsulation)
        handleSubmit();
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
                            name="condition"
                            placeholder='Name of the diagnosed medical condition(compulsory)- ICD code(list to be shared)'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-10'>
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
                </div>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdRefresh />
                        </div>
                        <Form.Control
                            type='text'
                            name="recomended_treatment"
                            placeholder='Register Patient'
                            onChange={handleChange}
                            className="global-inputs"
                        />
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
                </div>
                <div className='col-10'>
                    <Form.Group>
                            {/* <div className="prepend-icon">
                                <MdStickyNote2 />
                            </div> */}
                            <Form.Check
                                type='checkbox'
                                name="doctor_specialization_recommend"
                                label='Not sure which doctor specialization - kindly recommend'
                                onChange={handleChange}
                                className="global-inputs-check form-control"
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
                                customInput={<DatePickerInput text='Preferred date of appointment (1) (compulsory)' />}
                            />
                        </div>
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
                                customInput={<DatePickerInput text='Preferred date of appointment (2) (not compulsory)' />}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdUploadFile />
                        </div>
                        
                        <div  role="button" onClick={handleFileClick} className='global-file-input'>
                            <p>{insurance === undefined ? "Upload Insurance Details" : insurance.name}</p>
                        </div>
                        <input
                            type="file"
                            name="insurance"
                            ref={hiddenFileInput}
                            accept="image/*,application/pdf"
                            style={{ display: 'none' }}
                            onChange={handleFiles}
                        />
                    </Form.Group>
                </div>
                <div className='col-10 col-md-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineFilePresent />
                        </div>
                        <div  role="button" onClick={handleFileClick} className='global-file-input'>
                            <p>{reports.length === 0 ? "Upload Reports (If Any)" : reports.length + " File(s) Uploaded"}</p>
                        </div>
                        <input
                            type="file"
                            name="reports"
                            ref={hiddenFileInput}
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

export default InternationalOpinion;
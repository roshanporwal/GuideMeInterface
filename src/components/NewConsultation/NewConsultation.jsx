import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdFamilyRestroom, MdLocationOn, MdOutlineCalendarToday, MdOutlineFilePresent,
    MdOutlineLocalHospital, MdOutlinePersonAdd, MdStickyNote2, MdUploadFile
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as auth_service from "../../service/auth_service";
function NewConsultation() {
    const navigate = useNavigate();
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
                <div className='col-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdFamilyRestroom />
                        </div>
                        <Form.Control
                            type='text'
                            name="mobile"
                            placeholder='Add Family Member'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlinePersonAdd />
                        </div>
                        <Form.Control
                            type='text'
                            name="mobile"
                            placeholder='Register Patient'
                            onChange={handleChange}
                            className="global-inputs"
                        />
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
                            placeholder='Location *'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdStickyNote2 />
                        </div>
                        <Form.Control
                            type='text'
                            name="symptoms"
                            placeholder='Symptoms / Conditions'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-10'>
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
                                customInput={<DatePickerInput text='Preferred date 1 *' />}
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
                                customInput={<DatePickerInput text='Preferred date 2 *' />}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className='col-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdUploadFile />
                        </div>
                        <Form.Control
                            type='file'
                            name="insurance"
                            placeholder='Upload insurance details'
                            onChange={handleFiles}
                            accept="image/*,application/pdf"
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-5'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlineFilePresent />
                        </div>
                        <Form.Control
                            type='file'
                            name="reports"
                            placeholder='Upload reports (if any) '
                            onChange={handleFiles}
                            accept="image/*,application/pdf"
                            className="global-inputs"
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

export default NewConsultation;
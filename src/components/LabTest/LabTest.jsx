import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import {
    MdFamilyRestroom, MdLocationOn, MdOutlineCalendarToday, MdOutlineFilePresent,
    MdOutlinePersonAdd, MdStickyNote2, MdUploadFile,MdFormatListNumbered,
    MdOutlineApartment,MdCall,MdTransgender,MdPayment
} from 'react-icons/md';
import {FaBuilding,FaGlobeAsia,FaClipboardList,FaLanguage} from 'react-icons/fa'
import {IoHomeOutline} from 'react-icons/io5'
import {GiDirectionSigns} from 'react-icons/gi'
import DatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";
function LabTest({handleModalShow}) {
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
        handleModalShow();

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
                                customInput={<DatePickerInput text='Date and Time of Delivery' />}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className='col-10'>
                    <div className='d-flex align-items-start justify-content-center mb-2'>
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
                            name="flat-number"
                            placeholder='Flat Number / Apartment Number'
                            onChange={handleChange}
                            className="global-inputs"
                        />
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
                        />
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
                        />
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
                        />
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
                        />
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
                        />
                    </Form.Group>
                </div>
                <div className='col-10'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdCall />
                        </div>
                        <Form.Control
                            type='text'
                            name="symptoms"
                            placeholder='Alternate Mobile Number'
                            onChange={handleChange}
                            className="global-inputs"
                        />
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
                        />
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
                        />
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
                        />
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
                        />
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

export default LabTest;
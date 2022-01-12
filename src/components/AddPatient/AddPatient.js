import { forwardRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";

import { MdPerson, MdOutlineCalendarToday, MdFlag } from "react-icons/md";
import { validationSchema } from "./addpatientValidation";
function AddPatient(props) {
  const [formValues, setFormValues] = useState();
  const [errors, setErrors] = useState();
  const [dateerrors,setDateErrors] = useState({
        dateOne:"",
    });
  const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
      <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
  ));
  const [DateOne, setDateOne] = useState();
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

  const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);
        
        if(Object.keys(err).length === 0)  {    
            const formData = new FormData();
            let data = localStorage.getItem("login")
            data = JSON.parse(data)

            formValues.patient_id = data._id;
            formValues.patient_name = data.name;
            formValues.type = "new_consulation";

            formData.append('formValues', JSON.stringify(formValues));

            const createNewConsulation = await auth_service.createNewenqurire(data.login_id, formData)
            if(!createNewConsulation.payload)
                alert(createNewConsulation.message)

        }

    }
    const validate = async (values) => {
        try {
            setDateErrors({dateOne:DateOne === undefined ? "required" : ""});
            
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

  return (
    <>
      <Modal 
        show={props.modalshow} 
        onHide={props.handlePatientClose}
        centered
      >        
        <div className="form-container m-5">
          <h2 className="p-1 card-title">Add Patient</h2>
          <Form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
            <div className="row justify-content-center">
                  <div className='col-10'>
                      <Form.Group>
                          <div className="prepend-icon">
                              <MdPerson />
                          </div>
                          <Form.Control
                              type='text'
                              name="name"
                              placeholder='Name'
                              onChange={handleChange}
                              className="global-inputs"
                              isInvalid={errors?.name}
                          />
                          <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.name}</Form.Control.Feedback>
                      </Form.Group>
                  </div>
                  <div className='col-10'>
                      <Form.Group>
                          <div className="prepend-icon">
                              <MdOutlineCalendarToday />
                          </div>
                          <div>
                              <ReactDatePicker
                                  selected={DateOne}
                                  onChange={date => setDateOne(date)}
                                  dateFormat="dd/MM/yyyy"
                                  customInput={<DatePickerInput text='Date of Birth *' />}
                                  isInvalid={errors?.dateOne}
                              />
                              {dateerrors.dateOne ? (
                                  <Form.Label style = {{color:"red"}} type = "valid">Date is required</Form.Label>)
                              : null}
                          </div>
                      </Form.Group>
                  </div>
                  <div className='col-10'>
                      <Form.Group>
                          <div className="prepend-icon">
                              <MdFlag />
                          </div>
                          <Form.Control
                              type='text'
                              name="nationality"
                              placeholder='Nationality & Country of Residence'
                              onChange={handleChange}
                              className="global-inputs"
                              isInvalid={errors?.nationality}
                          />
                          <Form.Control.Feedback style = {{color:"red"}} type = "invalid">{errors?.nationality}</Form.Control.Feedback>
                      </Form.Group>
                  </div>
                  <div className='text-center mt-4'>
                      <input className="form-button" type="submit" value="SUBMIT" />
                  </div>
            </div>
          </Form>
          
        </div>
        <div className="modal-footer">

        </div>
      </Modal>
    </>
  )
}
export default AddPatient;
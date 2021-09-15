import React, {useState,useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { Form } from 'react-bootstrap';
import './style.css'

import { hospitalSchema } from '../components/Validations/hospitalValidation';


function ADMIN_HOSPITAL_PROFILE (props){
    
    const [errors, setErrors] = useState({});
    const [hospital_data, setHospital_data] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValue] = useState({
        hospital_address: "",
        hospital_mobile: "",
        hospital_email: "",
        
    })
    
    const [isSubmitting] = useState(false)

    useEffect(() => {

        fetchData();
    }, []);
    async function fetchData(props) {


        console.log(props)
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        console.log(data.insurance)
        setHospital_data([data])
        setSpeciality(data.speciality)
        setInsurance(data.insurance)

       
    }

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        validate(formValues);
    }
    const validate = async (values) => {
        try {

            await hospitalSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    }; 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = await validate(formValues);
        const formData = new FormData();
       
        setErrors(err);       
        
        formData.append('formValues', JSON.stringify(formValues))
        
        console.log(formValues)
        setValidated(true);

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };
        return(
            
            <>
          
            {/* <Modal show={show} onHide={handleClose} style = {{opacity: 1, marginTop: "10rem"}}>
        <Modal.Header closeButton>
          <Modal.Title>
           Sample Modal Heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  noValidate validated={validated}  onSubmit = {handleSubmit}>
            <Form.Group>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Address"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_address" 
                        id="hospital_address" 
                        isValid = {!errors.hospital_address}
                        value = {formValues.hospital_address}
                        />
                      <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Mobile"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_mobile" 
                        id="hospital_mobile" 
                        isValid = {!errors.hospital_mobile}
                        value = {formValues.hospital_mobile}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_mobile}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Email"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_email" 
                        id="hospital_email" 
                        isValid = {!errors.hospital_email}
                        value = {formValues.hospital_email}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_email}</Form.Control.Feedback>
            </Form.Group>
           
          
            </Form>
           
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick = {handleClose}>
           Close
          </Button>
          <Button variant="primary"  onClick = {handleSubmit}>
           Submit
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
        
      </div>
      <div className="modal-body">
      <Form  noValidate validated={validated}  onSubmit = {handleSubmit}>
            <Form.Group>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Address"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_address" 
                        id="hospital_address" 
                        isValid = {!errors.hospital_address}
                        value = {formValues.hospital_address}
                        />
                      <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Mobile"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_mobile" 
                        id="hospital_mobile" 
                        isValid = {!errors.hospital_mobile}
                        value = {formValues.hospital_mobile}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_mobile}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Email"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_email" 
                        id="hospital_email" 
                        isValid = {!errors.hospital_email}
                        value = {formValues.hospital_email}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_email}</Form.Control.Feedback>
            </Form.Group>
           
          
            </Form>
           
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick = {handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
</div>
           
              <div className = "hospital_profile_title">
                    <h1>HOSPITAL PROFILE</h1>
              </div>
                
              
         <div className = "hospital-info col-md-12">
              <div className = "col-md-4">
              { 
                hospital_data.map((target,index) => (
                    <div className = "medstar_container" key = {index} {...target}>
                        <img className = "medstar_image"  src = "assets\images\Medstar-Healthcare-Jobs.png" alt = ""/>  
                        <h5 style = {{textAlign: "center", padding: 5}}>{target.hospital_name}</h5>
                        <h6 style = {{textAlign: "center", padding: 5}}>{target.google_location}</h6>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.address}</h6>
                            <button  data-toggle="modal" data-target="#exampleModal" /* onClick= {handleShow} */ disabled={isSubmitting} type = "submit" className = "update_doctor"><i style = {{fontSize: 20}} className= "fa fa-pencil"></i></button>
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-phone"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.phno}</h6>
                            

   
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.hospital_email}</h6>
                            
                        </div>
                    </div>
                    
                ))
    }
              <div>
              <div className = "row">
                  <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                    
                 </div>
                 <div className = "row">
                 <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                 </div>
              </div>
              </div>
              <div className = "col-md-7 ">

              <div className = "hospital_services_container">
                                <h4 style = {{marginLeft: 30}}>Our Specialities</h4>
                                <div className = "d-flex">
                                    <div style = {{marginLeft: 30, marginTop: 10}}>
                                        <ul>
                                         { 
                            speciality.map((item,index) => (
                                                <li key = {index}>{item}</li>
                            ))}
                                               
                                        </ul>
                                    </div>
                                    
                                </div>
                                
                            </div>
    <div style = {{marginLeft: "20px"}}>
        <div className = "row">
            
                 { 
                insurance.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.insurance_company_name}</h4>
                        <h4>Type: {target.type}</h4>
                        
                    </div>
                ))}
               
                    
                 </div>
              
              </div>
    </div>        
              
              
              </div>
              
            </>
        );
    }


export default ADMIN_HOSPITAL_PROFILE;